import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface AnalysisResult {
  improvements: string[];
  marketingScore: number; // 1-10
  summary: string;
}

export const analyzeFoodImage = async (base64Data: string, mimeType: string): Promise<AnalysisResult> => {
  try {
    const prompt = `
      You are a professional food photographer and retoucher expert for delivery platforms like Wolt and Foodora.
      Analyze the attached food image.
      Provide the output in valid JSON format with the following schema:
      {
        "improvements": ["string", "string", "string"],
        "marketingScore": number,
        "summary": "string"
      }
      
      "improvements": List 3 specific technical improvements (e.g., color balance, exposure, sharpening, removing glare) that would make this photo more appetizing.
      "marketingScore": A number between 1 and 10 rating how appetizing it currently looks.
      "summary": A 2-sentence summary of why these changes will increase conversion rates/orders.
      
      Do not include markdown code blocks. Just the raw JSON.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Data
            }
          },
          {
            text: prompt
          }
        ]
      }
    });

    const text = response.text || "{}";
    // Clean up if markdown is present
    const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    return JSON.parse(cleanJson) as AnalysisResult;

  } catch (error) {
    console.error("Error analyzing image:", error);
    throw new Error("Failed to analyze image with Gemini.");
  }
};