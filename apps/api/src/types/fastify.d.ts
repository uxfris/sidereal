import "fastify"
import type {
  FastifyReply,
  FastifyRequest,
  preHandlerAsyncHookHandler,
} from "fastify"
import type { createAuth } from "@workspace/auth"

type Auth = ReturnType<typeof createAuth>
type SessionData = NonNullable<Awaited<ReturnType<Auth["api"]["getSession"]>>>

declare module "fastify" {
  interface FastifyInstance {
    auth: Auth
    verifySession: preHandlerAsyncHookHandler
  }
  interface FastifyRequest {
    user?: SessionData["user"]
    session?: SessionData["session"]
  }
}
