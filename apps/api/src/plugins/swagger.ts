import fp from "fastify-plugin"
import swagger from "@fastify/swagger"
import swaggerUi from "@fastify/swagger-ui"
import { jsonSchemaTransform } from "../lib/zod"

export default fp(async (app) => {
  await app.register(swagger, {
    openapi: {
      openapi: "3.0.0",
      info: {
        title: "Lume API",
        version: "1.0.0",
      },
    },
    transform: jsonSchemaTransform,
  })

  await app.register(swaggerUi, {
    routePrefix: "/docs",
    staticCSP: true,
    uiConfig: {
      docExpansion: "list",
      deepLinking: false,
    },
  })
})
