import { supabase } from '@/lib/supabase';

export async function GET() {
  const { data, error } = await supabase
    .from('api_keys')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
  return Response.json(data);
}

export async function POST(request) {
  const { name } = await request.json();
  const value = `dandi-${crypto.randomUUID()}`;

  const { data, error } = await supabase
    .from('api_keys')
    .insert([{ name, value, usage: 0 }])
    .select()
    .single();

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
  return Response.json(data);
} 