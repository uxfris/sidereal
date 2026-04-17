import "fastify";
import type { FastifyRequest, FastifyReply } from "fastify";

declare module "fastify" {
    interface FastifyInstance {
        auth: ReturnType<typeof import("@workspace/auth").createAuth>
        verifySession: any
    }

    interface FastifyRequest {
        user?: any
        session?: any
    }
}