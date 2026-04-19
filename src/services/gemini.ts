import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.GEMINI_API_KEY || "" });

export async function getPlantRecommendation(userInput: {
  mbti: string;
  goal: string; // e.g., "Psychological healing", "Interior design", "Easy to grow"
  environment: string; // e.g., "Low light", "Small room", "Balcony"
}) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `대한민국 MZ세대 '식집사'를 위한 MBTI 기반 반려식물 추천 서비스입니다.
      사용자 정보:
      - MBTI: ${userInput.mbti}
      - 키우는 목적: ${userInput.goal}
      - 재배 환경: ${userInput.environment}
      
      위 정보를 바탕으로:
      1. 해당 MBTI 성향과 왜 이 식물이 잘 어울리는지 설명해주세요.
      2. 추천하는 반려식물 1가지를 상세히 소개해주세요 (꽃말, 관리 난이도 포함).
      3. 심리적 치유를 위한 간단한 '식물과 교감하는 팁'을 1가지 제안해주세요.
      
      응답은 한국어로, 따뜻하고 감성적인 어조의 Markdown 형식으로 작성해주세요.`,
      config: {
        systemInstruction: "당신은 식물 테라피스트이자 전문 가드너입니다. MZ세대의 감성에 맞춰 따뜻하고 전문적인 조언을 제공합니다.",
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error getting plant recommendation:", error);
    return "식물 추천을 가져오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
  }
}
