import { NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY;
const model = process.env.GEMINI_MODEL || "models/gemini-pro-latest";

if (!apiKey) {
  throw new Error("❌ GEMINI_API_KEY not found in environment variables");
}

export async function POST(req) {
  try {
    const { source_url } = await req.json();

    if (!source_url || source_url.trim() === "") {
      return NextResponse.json({ error: "Missing source_url" }, { status: 400 });
    }

    // ---- Gemini prompt ----
    const prompt = `
Summarize the scientific paper at this URL.
Focus on:
- Key findings
- Main methodology
- Space exploration relevance
Write a clean, concise summary.

URL: ${source_url}
`;

    // ---- Gemini API Call ----
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API error:", data);
      return NextResponse.json({ error: data.error?.message || "Gemini error" }, { status: response.status });
    }

    const summary =
      data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "No summary available.";

    return NextResponse.json({ summary });
  } catch (error) {
    console.error("AI Summary route error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
