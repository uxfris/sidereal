import Fastify from "fastify";
import swaggerPlugin from "./plugins/swagger";
import authPlugin from "./plugins/auth";
import multipartPlugin from "./plugins/multipart";
import { registerRoute } from "./routes";
import { registerErrorHandler } from "./middleware/error-handler";
import rateLimitPlugin from "./plugins/rate-limit";
import corsPlugin from "./plugins/cors";


export async function buildApp() {
    const app = Fastify({
        logger: {
            transport: {
                target: "pino-pretty"
            }
        }
    })

    await app.register(corsPlugin)
    await app.register(swaggerPlugin)
    await app.register(authPlugin)
    await app.register(multipartPlugin)
    await app.register(rateLimitPlugin)

    await registerRoute(app)
    await registerErrorHandler(app)

    return app

}