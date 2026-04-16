import "dotenv/config"
import z from "zod";

const envSchema = z.object({
    PORT: z.coerce.number().default(3001),
    HOST: z.string().default("0.0.0.0"),
    JWT_SECRET: z.string().min(32),
    NODE_ENV: z.enum(["development", "production", "test"]).default("development")
})

export const env = envSchema.parse(process.env)