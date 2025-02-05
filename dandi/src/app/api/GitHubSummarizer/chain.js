import { CohereClient } from "cohere-ai";

// Initialize Cohere client
const cohere = new CohereClient({ 
  token: process.env.COHERE_API_KEY 
});

// Create prompt template
const SUMMARY_TEMPLATE = `Analyze and summarize this GitHub repository based on its README content:

{readme_content}

Please provide:
1. A concise summary of the repository
2. List of key features and interesting facts (start each with "- ")`;

export async function summarizeReadme(readmeContent) {
  try {
    console.log('Starting README summarization...');
    
    const response = await cohere.generate({
      model: 'command',
      prompt: SUMMARY_TEMPLATE.replace('{readme_content}', readmeContent),
      max_tokens: 1000,
      temperature: 0,
    });
    
    const text = response.generations[0].text;
    const lines = text.split('\n');
    
    // Extract summary and facts
    const summary = lines.filter(line => !line.startsWith('- ')).join('\n').trim();
    const cool_facts = lines.filter(line => line.startsWith('- '));
    
    console.log('Summarization successful');
    
    return {
      success: true,
      data: {
        summary,
        cool_facts
      }
    };
  } catch (error) {
    console.error("Error summarizing README:", error);
    return {
      success: false,
      error: "Failed to summarize README content"
    };
  }
} 