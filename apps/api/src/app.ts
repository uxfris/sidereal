import Fastify from "fastify";
import swaggerPlugin from "./plugins/swagger";
import multipartPlugin from "./plugins/multipart";
import { registerRoute } from "./routes";
import { registerErrorHandler } from "./middleware/error-handler";
import rateLimitPlugin from "./plugins/rate-limit";
import betterAuthPlugin from "./plugins/better-auth";
import sessionPlugin from "./plugins/session";


export async function buildApp() {
    const app = Fastify({
        logger: {
            transport: {
                target: "pino-pretty"
            }
        }
    })

    await app.register(swaggerPlugin)
    app.register(betterAuthPlugin)
    app.register(sessionPlugin)
    await app.register(multipartPlugin)
    await app.register(rateLimitPlugin)

    await registerRoute(app)
    await registerErrorHandler(app)

    return app

}