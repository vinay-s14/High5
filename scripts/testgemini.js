// scripts/testgemini.js
import { GoogleGenAI } from '@google/genai';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Initialize the GoogleGenAI client
// It automatically looks for the GEMINI_API_KEY in the environment
const ai = new GoogleGenAI({});

// The long text we want to summarize
const longText = `
The sun rose over the rolling hills, painting the sky in hues of orange, pink, and gold. 
A lone cyclist, Sarah, began her journey on the winding country road. She had prepared 
for weeks for this endurance ride, packing only the essentials: water, a repair kit, 
and a small bag of energy gels. Her goal was to reach the coastal town of Port Blossom 
by sundown, a distance of over 150 miles. The air was crisp, and the silence was broken 
only by the hum of her tires on the asphalt. She felt a profound sense of freedom and 
determination as the miles slowly clicked away beneath her. The challenge was immense, 
but her focus was absolute.
`;

/**
 * Summarizes a given text using the Gemini API.
 */
async function testSummarization() {
  console.log('Starting summarization test...');
  console.log('--- Original Text ---');
  console.log(longText.trim());

  try {
    // FIX: Access generateContent through the 'models' submodule.
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash', // A great model for fast summarization
      contents: longText,
      config: {
        // Use a system instruction to explicitly set the model's task and style
        systemInstruction: "You are an expert summarizer. Condense the following text into a single, concise paragraph that captures the main events and theme.",
      },
    });

    const summary = response.text.trim();
    
    console.log('\n--- Gemini Summary ---');
    console.log(summary);
    console.log('\n✅ Summarization check complete.');

  } catch (error) {
    console.error('\n❌ Summarization failed. Check your API key and network connection.');
    // You can remove the old error details line, or keep it for general debugging
    console.error('Error details:', error.message);
  }
}

testSummarization();