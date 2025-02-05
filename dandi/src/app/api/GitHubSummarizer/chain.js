import { CohereClient } from "cohere-ai";
import { OutputFixingParser, StructuredOutputParser } from "@langchain/core/output_parsers";
import { z } from "zod";

// Initialize Cohere client
const cohere = new CohereClient({ 
  token: process.env.COHERE_API_KEY 
});

// Define output schema
const outputSchema = z.object({
  summary: z.string().describe("A concise summary of the repository"),
  cool_facts: z.array(z.string()).describe("List of interesting facts and key features")
});

// Create parser
const parser = StructuredOutputParser.fromZodSchema(outputSchema);

// Create prompt template
const SUMMARY_TEMPLATE = `Analyze and summarize this GitHub repository based on its README content:

{readme_content}

Format your response as a JSON object with the following structure:
{
  "summary": "A concise summary of the repository",
  "cool_facts": ["fact 1", "fact 2", "fact 3", ...]
}`;

export async function summarizeReadme(readmeContent) {
  try {
    console.log('Starting README summarization...');
    
    // Skróć treść jeśli jest za długa
    const maxLength = 4000;
    const truncatedContent = readmeContent.length > maxLength 
      ? readmeContent.slice(0, maxLength) + '...'
      : readmeContent;
    
    const response = await cohere.generate({
      model: 'command',
      prompt: SUMMARY_TEMPLATE.replace('{readme_content}', truncatedContent),
      max_tokens: 500,  // Zmniejszamy limit tokenów
      temperature: 0,
      timeout: 8000,  // 8 sekund timeout
    });
    
    // Parse structured output
    const parsed = await parser.parse(response.generations[0].text);
    
    console.log('Summarization successful');
    
    return {
      success: true,
      data: parsed
    };
  } catch (error) {
    console.error("Error summarizing README:", error);
    return {
      success: false,
      error: "Failed to summarize README content"
    };
  }
} 