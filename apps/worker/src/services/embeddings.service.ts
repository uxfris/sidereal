import OpenAI from "openai";
import { env } from "../config/env";

const client = new OpenAI({ apiKey: env.OPENAI_API_KEY });

export async function embedText(text: string) {
    const res = await client.embeddings.create({
        model: "text-embedding-3-small",
        input: text,
    });

    return res.data[0]?.embedding ?? [];
}