export const ROLES = [
    {
        id: "owner",
        role: "Owner",
        isPro: false,
        description:
            "Full control over the workspace, including billing, integrations, and access to all meeting recordings and AI summaries.",
    },
    {
        id: "admin",
        role: "Admin",
        isPro: true,
        description:
            "Can manage members, control workspace settings, and access all shared meeting notes, recordings, and AI insights.",
    },
    {
        id: "member",
        role: "Member",
        isPro: false,
        description:
            "Can join meetings, view and collaborate on AI-generated notes, summaries, and action items they have access to.",
    },
    {
        id: "guest",
        role: "Guest",
        isPro: true,
        description:
            "Limited access to specific meetings, notes, and AI summaries shared with them. Ideal for external collaborators.",
    },
]