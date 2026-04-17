import { FastifyInstance } from "fastify";

export async function healthRoute(app: FastifyInstance) {
    app.get(
        "/health",
        {
            schema: {
                tags: ["System"],
                summary: "Health check",
                response: {
                    200: {
                        type: "object",
                        properties: {
                            status: { type: "string" },
                            service: { type: "string" },
                            timestamp: { type: "string" },
                        },
                    },
                },
            },
        },
        async () => {
            return {
                status: "ok",
                service: "lume-api",
                timestamp: new Date().toISOString(),
            };
        }
    );

}