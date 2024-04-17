import { createClient } from '@supabase/supabase-js';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export function useUpload() {
  return useMutation({
    mutationKey: ['upload'],
    mutationFn: async (file: File) => {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      const response = await fetch(`${defaultUrl}/api/upload`, {
        method: 'POST',
        body: JSON.stringify({ name: file.name, sizeInBytes: file.size }),
      });

      if (!response.ok) {
        // toast here? idk
        console.log({ text: await response.text() });
        return;
      }

      const { uploadInfo, url } = await response.json();

      const parsedURL = z.string().url().parse(url);

      await supabase.storage
        .from('files')
        .uploadToSignedUrl(uploadInfo.data.path, uploadInfo.data.token, file!);

      return parsedURL;
    },
  });
}
