import "dotenv/config"
import z from "zod";

const envSchema = z.object({
    REDIS_URL: z.string(),
    DATABASE_URL: z.string(),
    AWS_REGION: z.string(),
    AWS_ACCESS_KEY_ID: z.string(),
    AWS_SECRET_ACCESS_KEY: z.string(),
    S3_BUCKET: z.string(),
    WHISPER_API_URL: z.string(),
    OPENAI_API_KEY: z.string(),
})

export const env = envSchema.parse(process.env)