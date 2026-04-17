import { FastifyInstance } from "fastify";

export async function userRoute(app: FastifyInstance) {
    app.get("/me",
        { preHandler: [app.verifySession] },
        async (request) => {
            return request.user
        }
    )

}