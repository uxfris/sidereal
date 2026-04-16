import { z } from "zod";

export const IntegrationCategoryEnum = z.enum([
    "Work Management",
    "Team communication",
    "Knowledge Base",
    "Product & Engineering",
    "Revenue & Automation"
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
    featured: z.boolean().optional(),
});

export type Integration = z.infer<typeof IntegrationSchema>


export const IntegrationRecentActivitySchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string().optional(),
    timestamp: z.string(),
})

export type IntegrationRecentActivity = z.infer<typeof IntegrationRecentActivitySchema>