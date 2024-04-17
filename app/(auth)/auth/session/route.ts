import { createClient } from '@/utils/supabase/server';

export async function GET() {
  const supabase = createClient();

  const session = await supabase.auth.getUser();
  console.log({ session });
  return Response.json(session);
}
