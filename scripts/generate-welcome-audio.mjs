import { createWriteStream } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';

const apiKey = process.env.ELEVENLABS_API_KEY;
if (!apiKey) {
    throw new Error('ELEVENLABS_API_KEY no está configurada en .env.local.');
}

const outputPath = resolve('Base/assets/audio/bienvenida-imperio.mp3');
const client = new ElevenLabsClient();
const audio = await client.textToSpeech.convert('onwK4e9ZLuTAKqWW03F9', {
    text: '¡Bienvenido a Imperio de Negocios! Aprende a invertir, gestiona tu capital y construye tu estrategia empresarial. ¡Tu imperio comienza hoy! Toma decisiones, descubre oportunidades y convierte tus ideas en grandes negocios.',
    modelId: 'eleven_v4',
    voiceSettings: {
        stability: 0.6,
        similarityBoost: 0.75,
    },
});

await mkdir(dirname(outputPath), { recursive: true });
await pipeline(Readable.fromWeb(audio), createWriteStream(outputPath));
console.log(`Audio de bienvenida generado en ${outputPath}`);
