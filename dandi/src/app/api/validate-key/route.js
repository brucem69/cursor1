import { supabase } from '@/lib/supabase';

export async function POST(request) {
  console.log('Received request to validate key');
  try {
    const { apiKey } = await request.json();
    console.log('Validating key:', apiKey);
    
    const { data, error } = await supabase
      .from('api_keys')
      .select('id')
      .eq('value', apiKey)
      .single();

    if (error) {
      console.log('Validation failed:', error);
      return Response.json({ 
        success: false, 
        message: 'Invalid API key' 
      }, { status: 401 });
    }

    console.log('Validation successful');
    return Response.json({ 
      success: true, 
      message: 'Valid API key' 
    }, { status: 200 });
  } catch (error) {
    console.error('Error processing request:', error);
    return Response.json({ 
      success: false, 
      message: 'Invalid request' 
    }, { status: 400 });
  }
} 