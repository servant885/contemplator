const languageNames = {
  tr: "Turkish",
  en: "English",
  de: "German"
};

const responseSchema = {
  type: "OBJECT",
  properties: {
    title: { type: "STRING" },
    observation: { type: "STRING" },
    science: { type: "STRING" },
    reflection: { type: "STRING" },
    question: { type: "STRING" },
    quran_reference: { type: "STRING" },
    quran_text: { type: "STRING" }
  },
  required: [
    "title",
    "observation",
    "science",
    "reflection",
    "question",
    "quran_reference",
    "quran_text"
  ]
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: "GEMINI_API_KEY is missing" });
  }

  try {
    const { image, language = "tr" } = req.body || {};

    if (
      !image ||
      typeof image !== "string" ||
      !image.startsWith("data:image/")
    ) {
      return res.status(400).json({
        error: "A valid image data URL is required"
      });
    }

    if (image.length > 12_000_000) {
      return res.status(413).json({ error: "Image is too large" });
    }

    const match = image.match(
      /^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/s
    );

    if (!match) {
      return res.status(400).json({ error: "Unsupported image format" });
    }

    const [, mimeType, base64Data] = match;
    const lang = languageNames[language] || "Turkish";

    const prompt = `You power an Islamic reflection app called "Düşünmez misiniz?".

Analyze the supplied image carefully and answer in ${lang}.

Ground the scientific explanation only in what can reasonably be inferred from the image. Invite the user to reflect on creation, order, dependence, gratitude, human limitation, responsibility, or transience where relevant.

Do not claim certainty about Allah's specific intent, unseen matters, or divine judgment. Never invent or loosely paraphrase a Quran verse as a quotation. Include a Quran reference and translated text only when you are highly confident that both are accurate and clearly relevant; otherwise return empty strings for quran_reference and quran_text.

Do not identify real people. Do not infer sensitive traits. Do not make medical, legal, safety, or moral judgments about a person from an image. If the image is unclear, say so honestly.

Keep every field concise, meaningful, and suitable for a mobile screen.`;

    const endpoint =
      "https://generativelanguage.googleapis.com/v1beta/models/" +
      "gemini-3.5-flash-lite:generateContent?key=" +
      encodeURIComponent(process.env.GEMINI_API_KEY);

    const geminiResponse = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              { text: prompt },
              {
                inlineData: {
                  mimeType,
                  data: base64Data
                }
              }
            ]
          }
        ],
        generationConfig: {
          maxOutputTokens: 1200,
          responseMimeType: "application/json",
          responseSchema
        }
      })
    });

    const payload = await geminiResponse.json();

    if (!geminiResponse.ok) {
      const message =
        payload?.error?.message ||
        `Gemini request failed (${geminiResponse.status})`;

      console.error("Gemini API error:", payload);
      return res.status(geminiResponse.status).json({ error: message });
    }

    const text = payload?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || "")
      .join("")
      .trim();

    if (!text) {
      console.error("Empty Gemini response:", payload);
      return res.status(502).json({
        error: "The AI returned an empty response"
      });
    }

    const result = JSON.parse(text);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Analysis error:", error);
    return res.status(500).json({
      error: error?.message || "Analysis failed"
    });
  }
}
