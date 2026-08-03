import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const languageNames = {
  tr: "Turkish",
  en: "English",
  de: "German"
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: "OPENAI_API_KEY is missing" });
  }

  try {
    const { image, language = "tr" } = req.body || {};

    if (!image || typeof image !== "string" || !image.startsWith("data:image/")) {
      return res.status(400).json({ error: "A valid image data URL is required" });
    }

    if (image.length > 12_000_000) {
      return res.status(413).json({ error: "Image is too large" });
    }

    const lang = languageNames[language] || "Turkish";

    const response = await openai.responses.create({
      model: "gpt-5.6",
      input: [
        {
          role: "system",
          content: [
            {
              type: "input_text",
              text: `You power an Islamic reflection app called \"DÃ¼ÅÃ¼nmez misiniz?\". Analyze the user's image carefully and respond only in valid JSON. Write in ${lang}. Be accurate, gentle, concise, and spiritually responsible. Do not claim certainty about Allah's specific intent, unseen matters, or divine judgment. Do not invent Quran verses or hadith. Only include a Quran reference when you are highly confident it is genuinely relevant; otherwise set quran_reference and quran_text to empty strings. Never fabricate quotations. Avoid identifying real people. Do not make medical, legal, or safety claims from an image. If the image is unclear, say so honestly. JSON shape: {\"title\":string,\"observation\":string,\"science\":string,\"reflection\":string,\"question\":string,\"quran_reference\":string,\"quran_text\":string}`
            }
          ]
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: "Turn this image into a meaningful reflection grounded in observable science and Islamic contemplation."
            },
            {
              type: "input_image",
              image_url: image,
              detail: "low"
            }
          ]
        }
      ],
      text: {
        format: {
          type: "json_schema",
          name: "reflection_result",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              title: { type: "string" },
              observation: { type: "string" },
              science: { type: "string" },
              reflection: { type: "string" },
              question: { type: "string" },
              quran_reference: { type: "string" },
              quran_text: { type: "string" }
            },
            required: ["title","observation","science","reflection","question","quran_reference","quran_text"]
          }
        }
      }
    });

    const text = response.output_text;
    const result = JSON.parse(text);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    const message = error?.message || "Analysis failed";
    return res.status(500).json({ error: message });
  }
}
