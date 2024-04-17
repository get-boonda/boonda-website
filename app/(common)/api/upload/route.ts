import { createClient } from '@/app/utils/supabase/server';
import { z } from 'zod';
const body = z.object({
  name: z.string(),
  sizeInBytes: z.number(),
});

export async function POST(request: Request) {
  const response = await fetch(
    `https://proxycheck.io/v2/${request.headers.get('x-forwarded-for')}?key=${
      process.env.PROXYCHECK_API_KEY
    }&risk=1&short=1`
  );

  const { risk } = await response.json();

  if (risk > 66) {
    return new Response(
      JSON.stringify({
        error: 'You are not allowed to upload files. Your IP is too suspicious',
      }),
      {
        status: 403,
      }
    );
  }

  const { name, sizeInBytes } = body.parse(await request.json());

  console.log({
    name,
    sizeInBytes,
  });

  const client = createClient(process.env.SUPABASE_SERVICE_KEY);

  const uploadInfo = await client.storage
    .from('files')
    .createSignedUploadUrl(name);

  if (uploadInfo.error) {
    console.log(uploadInfo.error);
    return new Response(
      JSON.stringify({
        error: 'Failed to create upload URL',
      }),
      {
        status: 400,
      }
    );
  }

  const minAge = 1000 * 60 * 60 * 24 * 30;
  const maxAge = 1000 * 60 * 60 * 24 * 365;
  const maxSize = 1024 * 1024 * 50;
  const expiresIn =
    minAge + (-maxAge + minAge) * Math.pow(sizeInBytes / maxSize - 1, 3);

  const expiresAt = new Date(Date.now() + expiresIn).getTime();

  return new Response(JSON.stringify({ uploadInfo, expiresAt }), {
    status: 200,
  });
}
