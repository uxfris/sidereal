import fp from "fastify-plugin"
import { randomUUID } from "node:crypto"

/**
 * Ensures every response echoes `x-request-id` so clients and downstream
 * services (worker jobs) can correlate logs. Fastify already populates
 * `request.id`; this just exposes it on the wire.
 *
 * Upstream generation: we configure `genReqId` in the server entrypoint so
 * Fastify trusts an incoming `x-request-id` header from a reverse proxy.
 */
export default fp(async (app) => {
  app.addHook("onRequest", async (request, reply) => {
    reply.header("x-request-id", request.id)
  })
})

/**
 * `genReqId` wired into `Fastify({ genReqId })`. Respects an incoming
 * x-request-id header (trust-your-proxy) and falls back to a fresh UUID.
 */
export function genReqId(req: { headers: Record<string, unknown> }): string {
  const incoming = req.headers["x-request-id"]
  if (
    typeof incoming === "string" &&
    incoming.length > 0 &&
    incoming.length <= 200
  ) {
    return incoming
  }
  return randomUUID()
}
