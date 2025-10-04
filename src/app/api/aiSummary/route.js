import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { publicationText, maxTokens = 200 } = await req.json();

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gemini-1.5',
        input: [
          {
            role: 'user',
            content: `Summarize the following publication in bullet points highlighting key findings, results, and implications:\n\n${publicationText}`,
          },
        ],
        max_output_tokens: maxTokens,
      }),
    });

    const data = await response.json();

    const summary = data.output_text || 'No summary available';

    return NextResponse.json({ summary });
  } catch (error) {
    console.error('Error fetching AI summary:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
