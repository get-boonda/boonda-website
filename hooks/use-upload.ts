import { createClient } from '@supabase/supabase-js';
import { useMutation } from '@tanstack/react-query';

export function useUpload() {
  return useMutation({
    mutationKey: ['upload'],
    mutationFn: async (file: File) => {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      const response = await fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        body: JSON.stringify({ name: file.name, sizeInBytes: file.size }),
      });

      if (!response.ok) {
        // toast here? idk
        console.log({ text: await response.text() });
        return;
      }

      const { expiresAt, uploadInfo } = await response.json();
      console.log({ uploadInfo });

      await supabase.storage
        .from('files')
        .uploadToSignedUrl(uploadInfo.data.path, uploadInfo.data.token, file!);
    },
  });
}
