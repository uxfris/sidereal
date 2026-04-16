import { buildApp } from "./app";
import { env } from "./config/env";

async function start() {
    const app = await buildApp()

    await app.listen({
        port: env.PORT,
        host: env.HOST
    })
}

start()