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

    // 4. If API key is valid, process the request
    console.log('API key valid, processing GitHub URL:', githubUrl);
    
    const readmeResult = await getReadmeContent(githubUrl);
    if (!readmeResult.success) {
      return Response.json({ 
        success: false, 
        message: readmeResult.error 
      }, { status: 400 });
    }

    // Get summary using LangChain
    const summaryResult = await summarizeReadme(readmeResult.content);
    if (!summaryResult.success) {
      return Response.json({ 
        success: false, 
        message: summaryResult.error 
      }, { status: 400 });
    }

    const summary = {
      url: githubUrl,
      readme: readmeResult.content,
      summary: summaryResult.data.summary,
      cool_facts: summaryResult.data.cool_facts
    };

    // 5. Zwróć wynik
    return Response.json({ 
      success: true, 
      data: summary,
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
    // Transform URL to GitHub API format
    const urlParts = new URL(githubUrl).pathname.split('/').filter(Boolean);
    const owner = urlParts[0];
    const repo = urlParts[1];
    const readmeUrl = `https://api.github.com/repos/${owner}/${repo}/readme`;
    
    console.log('Requesting GitHub API:', readmeUrl);
    console.log('With token:', process.env.GITHUB_TOKEN ? 'Token present' : 'No token');

    // Fetch README content with GitHub token
    const response = await fetch(readmeUrl, {
      headers: {
        'Authorization': `token ${process.env.GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('GitHub API response status:', response.status);
      console.error('GitHub API response:', errorText);
      throw new Error(`Cannot read README: ${errorText}`);
    }
    
    const data = await response.json();
    
    // Decode content from base64
    const content = Buffer.from(data.content, 'base64').toString('utf-8');
    
    // Log the content
    console.log('README Content:', content);
    
    return {
      success: true,
      content: content
    };

  } catch (error) {
    console.error('Error fetching README:', error);
    return {
      success: false,
      error: 'Failed to fetch README'
    };
  }
}



