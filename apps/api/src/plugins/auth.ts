import fastifyJwt from "@fastify/jwt";
import fp from "fastify-plugin";
import { env } from "../config/env";

export default fp(async (app) => {
    await app.register(fastifyJwt, {
        secret: env.JWT_SECRET
    })

    app.decorate("authenticate", async (request, _) => {
        await request.jwtVerify()
    })
})