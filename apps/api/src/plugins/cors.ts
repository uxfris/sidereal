import fp from "fastify-plugin"
import cors from "@fastify/cors"
import { env } from "../config/env"

export default fp(async (app) => {
  await app.register(cors, {
    origin: [env.FRONTEND_URL],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["content-type", "authorization", "x-workspace-id", "x-request-id"],
    exposedHeaders: ["x-request-id"],
  })
})
