import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { message, history = [] } = await req.json();

    if (!message || message.trim() === "") {
      return NextResponse.json({ error: "Empty message." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("Missing Gemini API key.");

    // ✅ Build conversation history correctly
    const conversation = [
      ...history
        .filter((msg) => msg?.text?.trim())
        .map((msg) => ({
          role: msg.role === "assistant" ? "model" : "user",
          parts: [{ text: msg.text }],
        })),
      { role: "user", parts: [{ text: message }] },
    ];

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: conversation }),
      }
    );

    const data = await response.json();

    if (data.error) {
      console.error("Gemini API error:", data.error);
      return NextResponse.json({ error: data.error.message }, { status: 400 });
    }

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No reply received from Gemini.";

    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error("Chat route error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
