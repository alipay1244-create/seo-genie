import { NextResponse } from 'next/server';

  export async function POST(req: Request) {
    try {
      const { prompt } = await req.json();
      const apiKey = process.env.GROQ_API_KEY;

      if (!apiKey) {
        return NextResponse.json({ error: "API Key missing" }, { status: 500 });
      }

      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "qwen/qwen3.8-27b", // আপনারলিস্টথে নেও সঠিকমডেল
          messages: [
            {
              role: "system",
              content: `You are an SEO expert. Generate 3 high-converting Meta Titles and Meta
  Descriptions. Return ONLY a valid JSON array of objects. Format: [{"title": "...", "description":
  "..."}]`
            },
            {
              role: "user",
              content: prompt
            }
          ],
          response_format: { type: "json_object" },
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("Groq API Error:", text);
        return NextResponse.json({ error: "API Error" }, { status: response.status });
      }

      const data = await response.json();
      const contentStr = data.choices[0].message.content;
      const content = JSON.parse(contentStr);

      const finalResults = Array.isArray(content)
        ? content
        : (content.results || content.options || Object.values(content)[0]);

      return NextResponse.json(finalResults);
    } catch (error: any) {
      console.error("Server Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }