import fp from "fastify-plugin";
import { createAuth } from "packages/auth/src";
import { env } from "../config/env";

export default fp(async (app) => {

    const auth = createAuth({
        baseUrl: env.AUTH_URL,
        betterAuthSecret: env.BETTER_AUTH_SECRET,
        trustedOrigins: [env.FRONTEND_URL],
        google: {
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET
        },
        microsoft: {
            clientId: env.MICROSOFT_CLIENT_ID,
            clientSecret: env.MICROSOFT_CLIENT_SECRET
        }
    })

    app.decorate("auth", auth)

    app.route({
        method: ["GET", "POST"],
        url: "api/auth/*",
        async handler(request, reply) {
            try {
                const protocol = request.headers["x-forwarded-proto"] || request.protocol
                const url = new URL(request.url, `${protocol}://${request.headers.host}`)

                const headers = new Headers()
                for (const [key, value] of Object.entries(headers)) {
                    if (!value) continue

                    if (Array.isArray(value)) {
                        value.forEach((v) => headers.append(key, v))
                    }
                    else {
                        headers.set(key, value)
                    }
                }

                let body: BodyInit | undefined;

                if (request.method !== "GET" && request.body) {
                    body = JSON.stringify(request.body)
                    headers.set("content-type", "application/json")
                }

                const webRequest = new Request(url.toString(), {
                    method: request.method,
                    headers: headers,
                    body: body
                })

                const response = await auth.handler(webRequest)

                reply.status(response.status)

                response.headers.forEach((value, key) => {
                    reply.header(key, value)
                })

                const text = await response.text()

                return reply.send(text)

            } catch (error) {
                request.log.error(error)
                return reply.status(500).send({
                    error: "AUTH_HANDLER_ERROR"
                })
            }
        }
    })
})