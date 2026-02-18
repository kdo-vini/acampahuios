import { GoogleGenAI } from "@google/genai";
import { CAMP_NAME, CAMP_DATE, CAMP_LOCATION_NAME, REGISTRATION_FEE } from '../constants';

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
Contexto do Evento:
- Nome: "${CAMP_NAME}"
- Data: "${CAMP_DATE}"
- Local: "${CAMP_LOCATION_NAME}" (Natureza, piscina, alojamentos)
- Valor: R$ ${REGISTRATION_FEE.toFixed(2)} (PIX ou Cartão)
- Adote um Jovem: Programa de doações para ajudar quem não pode pagar.

Diretrizes de Comportamento:
1. Você é um assistente jovem, cristão e animado, mas OBJETIVO.
2. Responda ESTRITAMENTE o que o usuário perguntou. Não encha linguiça.
3. NÃO repita data, local ou valor da inscrição a menos que o usuário pergunte especificamente sobre isso.
4. Se perguntarem "o que levar", liste diretamente: roupa de cama/banho, itens de higiene pessoal, roupas confortáveis/esportivas, Bíblia e caderno.
5. Use emojis, mas sem exageros.
6. Mantenha as respostas curtas (máximo 2 parágrafos curtos).
`;

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!apiKey) {
    return "Desculpe, o sistema de chat está em manutenção (Chave API não configurada).";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-flash-lite-latest',
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    
    return response.text || "Desculpe, não consegui entender. Pode repetir?";
  } catch (error) {
    console.error("Erro ao comunicar com Gemini:", error);
    return "Tive um probleminha técnico. Tente novamente em instantes!";
  }
};