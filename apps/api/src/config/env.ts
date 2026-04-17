import "dotenv/config"
import z from "zod";

const envSchema = z.object({
    PORT: z.coerce.number().default(3001),
    HOST: z.string().default("0.0.0.0"),
    JWT_SECRET: z.string().min(32),
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    APP_URL: z.string(),

    AUTH_URL: z.string(),
    BETTER_AUTH_SECRET: z.string(),
    FRONTEND_URL: z.string(),

    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),

    MICROSOFT_CLIENT_ID: z.string(),
    MICROSOFT_CLIENT_SECRET: z.string(),
})

export const env = envSchema.parse(process.env)