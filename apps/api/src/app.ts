import Fastify from "fastify";
import swaggerPlugin from "./plugins/swagger";
import authPlugin from "./plugins/auth";
import multipartPlugin from "./plugins/multipart";
import { registerRoute } from "./routes";
import { registerErrorHandler } from "./middleware/error-handler";

export async function buildApp() {
    const app = Fastify({
        logger: true
    })

    await app.register(swaggerPlugin)
    await app.register(authPlugin)
    await app.register(multipartPlugin)

    await registerRoute(app)
    await registerErrorHandler(app)

    return app

}