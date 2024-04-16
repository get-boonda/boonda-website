import { createClient } from '@/utils/supabase/server';

export async function GET() {
  const supabase = createClient();

  return Response.json(await supabase.auth.getUser());
}
