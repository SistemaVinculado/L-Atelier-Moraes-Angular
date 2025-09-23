import { Injectable } from '@angular/core';
import { GoogleGenAI, GenerateContentResponse } from '@google/genai';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private readonly ai: GoogleGenAI;
  private readonly model = 'gemini-2.5-flash';

  constructor() {
    if (!process.env.API_KEY) {
      console.error("API_KEY is not set.");
    }
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  }

  async generateProjectBrief(idea: string): Promise<string> {
    const prompt = `
      Como um Estrategista Digital Fundamentalista no L'Atelier Moraes, um estúdio de prestígio, sua tarefa é pegar a ideia bruta de um cliente e expandi-la para um briefing de projeto estruturado e profissional. O tom deve ser prestigioso, fundamentalista e de autoridade.

      Ideia do Cliente: "${idea}"

      Gere um briefing de projeto usando a seguinte estrutura de markdown. Não use listas numeradas, em vez disso, comece cada ponto em uma nova linha com um asterisco (*).

      **1. Princípios e Vetores de Sucesso**
      * Uma declaração de visão clara e fundamental.
      * 2-3 metas primárias mensuráveis que definirão o sucesso do projeto.

      **2. Arquétipo de Usuário Fundamental**
      * Descreva o arquétipo de usuário principal.
      * Esboce suas necessidades e dores fundamentais que este projeto resolverá.

      **3. Funcionalidades Essenciais (MVP)**
      * Liste de 3 a 5 funcionalidades essenciais para o MVP (Produto Mínimo Viável).
      * Explique brevemente o valor fundamental de cada funcionalidade.

      **4. Arquitetura Tecnológica Recomendada**
      * Recomende uma arquitetura tecnológica de ponta para frontend e backend.
      * Justifique as escolhas com base em princípios (ex: para escalabilidade, performance, prestígio tecnológico).

      **5. Próximos Passos Estratégicos**
      * Descreva os próximos passos imediatos para iniciar a colaboração (ex: Workshop de Fundamentos, Prototipagem de Princípios de UI/UX, etc.).

      Mantenha a linguagem clara, concisa e de autoridade. A saída deve ser apenas o briefing em markdown.
    `;

    try {
      const response: GenerateContentResponse = await this.ai.models.generateContent({
        model: this.model,
        contents: prompt,
      });
      // FIX: Access the 'text' property directly instead of calling it as a function.
      return response.text;
    } catch (error) {
      console.error('Error generating project brief:', error);
      return 'Desculpe, encontramos um problema ao gerar o briefing. Isso pode ser devido a uma chave de API inválida ou a um problema de rede. Por favor, tente novamente mais tarde.';
    }
  }
}