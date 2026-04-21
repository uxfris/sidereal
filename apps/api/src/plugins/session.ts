import { FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";

export default fp(async (app) => {
    app.decorate("verifySession", async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const session = await app.auth.api.getSession({
                headers: request.headers as any,
            });

            if (!session) {
                return reply.status(401).send({
                    error: "UNAUTHORIZED",
                });
            }

            request.user = session.user;
            request.session = session.session;
        } catch (err) {
            request.log.error(err);

            return reply.status(401).send({
                error: "INVALID_SESSION",
            });
        }
    });
});