import { prisma } from "@workspace/database";

export async function verifyBetterAuthUser(token: string) {
    /**
     * Replace with actual BetterAuth verification logic.
     * This may be:
     * - BetterAuth SDK verification
     * - Session lookup
     * - OAuth token introspection
     */

    const email = "verified@example.com";

    let user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        user = await prisma.user.create({
            data: { email },
        });
    }

    return user;
}