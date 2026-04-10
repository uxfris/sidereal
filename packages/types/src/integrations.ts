import { z } from "zod";

export const IntegrationCategoryEnum = z.enum([
    "all",
    "video",
    "communication",
    "productivity"
])

export const IntegrationStatusEnum = z.enum([
    "connected",
    "disconnected",
    "coming soon"
])

export const IntegrationSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    category: IntegrationCategoryEnum,
    logo: z.string(), // path or URL
    status: IntegrationStatusEnum,
    actionLabel: z.string(), // e.g. "Connect"
    featured: z.boolean().optional(),
});

export type Integration = z.infer<typeof IntegrationSchema>