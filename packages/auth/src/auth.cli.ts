import { betterAuth } from "better-auth";
import { prismaAdapter } from "@better-auth/prisma-adapter";
import { PrismaClient } from "generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!
})

const prisma = new PrismaClient(
    {
        adapter: adapter
    }
);

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),

    baseURL: "http://localhost:3001",
    trustedOrigins: ["http://localhost:3000"],

    socialProviders: {
        google: {
            clientId: "dummy",
            clientSecret: "dummy",
        },
        microsoft: {
            clientId: "dummy",
            clientSecret: "dummy",
        },
    },
});