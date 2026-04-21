import type { FastifyInstance } from "fastify"
import {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform,
  type ZodTypeProvider,
} from "fastify-type-provider-zod"

export function registerZod(app: FastifyInstance) {
  app.setValidatorCompiler(validatorCompiler)
  app.setSerializerCompiler(serializerCompiler)
  return app.withTypeProvider<ZodTypeProvider>()
}

export { jsonSchemaTransform }
