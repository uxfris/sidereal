import fp from "fastify-plugin"
import cors from "@fastify/cors"
import { env } from "../config/env"

export default fp(async (app) => {
  await app.register(cors, {
    origin: [env.FRONTEND_URL],
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "PATCH", "DELETE"],
    exposedHeaders: ["x-request-id"],
  })
})
