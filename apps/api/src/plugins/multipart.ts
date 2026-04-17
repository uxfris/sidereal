import fastifyMultipart from "@fastify/multipart";
import fp from "fastify-plugin";

export default fp(async (app) => {
    await app.register(fastifyMultipart, {
        limits: {
            fieldSize: 1024 * 1024 * 500
        }
    })
})