import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

function localFallback(input) {
  const market = input.mercado || {};
  const tendencia = Number(market.tendencia) || 0;
  const accion = tendencia > 0.04 ? 'esperar' : tendencia < -0.04 ? 'mantener' : 'mantener';

  return {
    proveedor: 'local',
    accion,
    empresa: String(market.empresa || ''),
    confianza: tendencia > 0.04 || tendencia < -0.04 ? 55 : 45,
    riesgo: Math.abs(tendencia) > 0.08 ? 'alto' : 'medio',
    razon: tendencia > 0.04
      ? 'La empresa ha subido con rapidez y conviene esperar una confirmacion.'
      : tendencia < -0.04
        ? 'La empresa esta cayendo y todavia no hay una senal clara de recuperacion.'
        : 'No hay una senal suficientemente clara para tomar una posicion.',
    horizonte: 'corto plazo'
  };
}

function buildPrompt(input) {
  return `
Eres un asesor de inversiones dentro de un videojuego de simulacion. Analiza los datos recibidos, no inventes datos y no ejecutes ninguna operacion.
Responde SOLO con JSON valido, sin markdown, usando exactamente estas claves:
{"accion":"comprar|vender|mantener|esperar","empresa":"string","confianza":0,"riesgo":"bajo|medio|alto","razon":"string breve","horizonte":"corto plazo|mediano plazo|largo plazo"}
La recomendacion es orientativa y debe reconocer la incertidumbre.
Datos:
${JSON.stringify(input)}
`;
}

function parseIAResponse(text, empresaEsperada) {
  const raw = String(text || '').replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
  const parsed = JSON.parse(raw);

  const acciones = new Set(['comprar', 'vender', 'mantener', 'esperar']);
  const riesgos = new Set(['bajo', 'medio', 'alto']);

  if (!acciones.has(parsed.accion) || !riesgos.has(parsed.riesgo) || String(parsed.empresa || '') !== empresaEsperada) {
    throw new Error('Respuesta de IA fuera del contrato');
  }

  return {
    proveedor: 'backend',
    accion: parsed.accion,
    empresa: empresaEsperada,
    confianza: Math.max(0, Math.min(100, Number(parsed.confianza) || 0)),
    riesgo: parsed.riesgo,
    razon: String(parsed.razon || 'Sin razon disponible').slice(0, 300),
    horizonte: String(parsed.horizonte || 'corto plazo')
  };
}

async function callGroq(prompt, input) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error('GROQ_API_KEY no configurada');

  const model = process.env.GROQ_MODEL || 'llama-3.1-8b-instant';
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model,
      temperature: 0.35,
      max_tokens: 220,
      messages: [
        { role: 'system', content: 'Devuelve exclusivamente JSON valido.' },
        { role: 'user', content: prompt }
      ]
    })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Groq ${response.status}: ${text.slice(0, 200)}`);
  }

  const data = await response.json();
  return parseIAResponse(data.choices?.[0]?.message?.content, input.mercado.empresa);
}

async function callGemini(prompt, input) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY no configurada');

  const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      generationConfig: {
        temperature: 0.35,
        maxOutputTokens: 220,
        responseMimeType: 'application/json'
      },
      contents: [{ role: 'user', parts: [{ text: prompt }] }]
    })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Gemini ${response.status}: ${text.slice(0, 200)}`);
  }

  const data = await response.json();
  return parseIAResponse(data.candidates?.[0]?.content?.parts?.[0]?.text, input.mercado.empresa);
}

app.post('/api/asesor', async (req, res) => {
  try {
    const input = req.body;
    if (!input || input.tipo !== 'asesor' || !input.mercado?.empresa) {
      return res.status(400).json({ error: 'Solicitud invalida' });
    }

    const prompt = buildPrompt(input);

    try {
      const resultado = await callGroq(prompt, input);
      return res.json(resultado);
    } catch (groqError) {
      console.warn('Groq fallo, intento Gemini:', groqError);
      try {
        const resultado = await callGemini(prompt, input);
        return res.json(resultado);
      } catch (geminiError) {
        console.warn('Gemini fallo, uso fallback local:', geminiError);
        return res.json(localFallback(input));
      }
    }
  } catch (error) {
    console.error('Error API asesor:', error);
    return res.json(localFallback(req.body || {}));
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API corriendo en http://localhost:${PORT}`));
