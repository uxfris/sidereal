import { FastifyInstance } from "fastify";

export async function meRoute(app: FastifyInstance) {
    app.get(
        "/me",
        {
            preHandler: app.verifySession
        },
        async (req) => {
            return req.user
        }
    );

}