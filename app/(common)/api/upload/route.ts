import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { nanoid } from "nanoid";
import { calculateRetention } from "@/app/utils/calculateRetention";

const body = z.object({
  name: z.string(),
  sizeInBytes: z.number(),
});

export async function POST(request: Request) {
  const response = await fetch(
    `https://proxycheck.io/v2/${request.headers.get("x-forwarded-for")}?key=${
      process.env.PROXYCHECK_API_KEY
    }&risk=1&short=1`
  );

  const { risk } = await response.json();

  if (risk > 66) {
    return new Response(
      JSON.stringify({
        error: "You are not allowed to upload files. Your IP is too suspicious",
      }),
      {
        status: 403,
      }
    );
  }

  const { name, sizeInBytes } = body.parse(await request.json());

  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
  );

  const generatedFileName = nanoid(12) + "/" + name;

  const uploadInfo = await client.storage
    .from("files")
    .createSignedUploadUrl(generatedFileName);

  if (uploadInfo.error) {
    return new Response(
      JSON.stringify({
        error: "Failed to create upload URL",
      }),
      {
        status: 400,
      }
    );
  }

  const retention = calculateRetention({
    isLoggedIn: false,
    sizeInBytes,
  });

  const expiresAt = new Date(Date.now() + retention).getTime();

  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/files/${generatedFileName}`;

  return new Response(JSON.stringify({ uploadInfo, expiresAt, url }), {
    status: 200,
  });
}
