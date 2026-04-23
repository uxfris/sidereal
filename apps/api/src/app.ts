import Fastify from "fastify"
import swaggerPlugin from "./plugins/swagger"
import multipartPlugin from "./plugins/multipart"
import { registerRoute } from "./routes"
import { registerErrorHandler } from "./middleware/error-handler"
import rateLimitPlugin from "./plugins/rate-limit"
import betterAuthPlugin from "./plugins/better-auth"
import sessionPlugin from "./plugins/session"
import workspaceAccessPlugin from "./plugins/workspace-access"
import corsPlugin from "./plugins/cors"
import { registerZod } from "./lib/zod"
import fastifySensible from "@fastify/sensible"

export async function buildApp() {
  const app = Fastify({
    logger: {
      transport: {
        target: "pino-pretty",
      },
    },
  })

  await app.register(fastifySensible)
  await app.register(betterAuthPlugin)
  await app.register(sessionPlugin)
  await app.register(workspaceAccessPlugin)
  await app.register(multipartPlugin)
  await app.register(rateLimitPlugin)
  await app.register(corsPlugin)

  registerZod(app)
  await registerErrorHandler(app)
  await app.register(swaggerPlugin)
  await registerRoute(app)

  return app
}
