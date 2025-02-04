import { supabase } from '@/lib/supabase';

export async function DELETE(request, { params }) {
  const { id } = params;
  
  const { error } = await supabase
    .from('api_keys')
    .delete()
    .eq('id', id);

  if (error) {
    return Response.json({ 
      success: false, 
      error: error.message 
    }, { status: 400 });
  }

  return Response.json({ success: true });
} 