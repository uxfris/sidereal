import OpenAI from "openai";
import { env } from "../config/env";

const client = new OpenAI({ apiKey: env.OPENAI_API_KEY });

export async function summarizeTranscript(params: {
    title?: string;
    transcript: string;
}) {
    const prompt = `
You are summarizing meeting notes.

Title: ${params.title ?? "Untitled"}
Transcript:
${params.transcript}

Return JSON with:
- summary
- actionItems
- decisions
- sentiment
`;

    const res = await client.responses.create({
        model: "gpt-4.1-mini",
        input: prompt,
    });

    return res.output_text;
}