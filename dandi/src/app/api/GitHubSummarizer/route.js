import { supabase } from '@/lib/supabase';
import { summarizeReadme } from './chain';

export async function POST(request) {
  console.log('Received request to GitHubSummarizer');
  try {
    // 1. Pobierz klucz API z nagłówków
    console.log('Headers:', Object.fromEntries(request.headers.entries()));
    const apiKey = request.headers.get('x-api-key');
    if (!apiKey) {
      console.log('No API key provided in headers');
      return Response.json({
        success: false,
        message: 'Brak klucza API'
      }, { status: 401 });
    }
    console.log('Validating key:', apiKey);

    // 2. Pobierz URL z body
    const { githubUrl } = await request.json();
    console.log('GitHub URL:', githubUrl);
    
    // 3. Walidacja klucza API
    const { data, error } = await supabase
      .from('api_keys')
      .select('id')
      .eq('value', apiKey)
      .single();

    if (error) {
      console.log('API key validation failed:', error);
      return Response.json({ 
        success: false, 
        message: 'Invalid API key' 
      }, { status: 401 });
    }

    // 4. Pobierz README
    const readmeResult = await getReadmeContent(githubUrl);
    if (!readmeResult.success) {
      console.error('Failed to fetch README:', readmeResult.error);
      return Response.json({ 
        success: false, 
        message: readmeResult.error 
      }, { status: 400 });
    }

    // 5. Podsumuj README
    const summaryResult = await summarizeReadme(readmeResult.content);
    if (!summaryResult.success) {
      return Response.json({ 
        success: false, 
        message: summaryResult.error 
      }, { status: 400 });
    }

    return Response.json({ 
      success: true, 
      data: summaryResult.data,
      message: 'GitHub repository processed successfully' 
    }, { status: 200 });

  } catch (error) {
    console.error('Error processing request:', error);
    return Response.json({ 
      success: false, 
      message: 'Invalid request' 
    }, { status: 400 });
  }
}

async function getReadmeContent(githubUrl) {
  try {
    const urlParts = new URL(githubUrl).pathname.split('/').filter(Boolean);
    const owner = urlParts[0];
    const repo = urlParts[1];
    const readmeUrl = `https://api.github.com/repos/${owner}/${repo}/readme`;
    
    console.log('Requesting GitHub API:', readmeUrl);
    console.log('With token:', process.env.GITHUB_TOKEN ? 'Token present' : 'No token');

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000); // 5s timeout

    const response = await fetch(readmeUrl, {
      headers: {
        'Authorization': `token ${process.env.GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'X-GitHub-Api-Version': '2022-11-28'
      },
      signal: controller.signal
    });

    clearTimeout(timeout);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('GitHub API response status:', response.status);
      console.error('GitHub API response:', errorText);
      throw new Error(`Cannot read README: ${errorText}`);
    }
    
    const data = await response.json();
    const content = Buffer.from(data.content, 'base64').toString('utf-8');
    
    return {
      success: true,
      content
    };
  } catch (error) {
    console.error('Error fetching README:', error);
    return {
      success: false,
      error: 'Failed to fetch README'
    };
  }
}

console.log('Environment variables:', {
  GITHUB_TOKEN: process.env.GITHUB_TOKEN?.slice(0,10) + '...',
  NODE_ENV: process.env.NODE_ENV
});



