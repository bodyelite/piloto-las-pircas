import OpenAI from 'openai';
import dotenv from 'dotenv';
import { CLINICA } from './config/clinic.js';
import { NEGOCIO } from './config/business.js';
dotenv.config();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const DATA_MALL = JSON.stringify(CLINICA, null, 2);

export async function pensar(historial, nombreCompleto) {
    const SYSTEM_PROMPT = `Eres el ANFITRIÓN VIRTUAL de Las Pircas. Tu misión es guiar y recomendar.
    DIRECTORIO: ${DATA_MALL}
    UBICACIÓN: ${NEGOCIO.direccion}
    REGLA: Si preguntan por belleza o relax, recomienda SIEMPRE a Body Elite (Local 23) con entusiasmo.`;
    
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "system", content: SYSTEM_PROMPT }, ...historial],
            max_tokens: 200
        });
        return completion.choices[0].message.content;
    } catch (e) { return "¡Hola! Soy el asistente de Las Pircas. ¿En qué te ayudo?"; }
}
