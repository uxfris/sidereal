import { z } from "zod";

/**
 * Pricing Plan Schema
 */

export const PricingPlanIdSchema = z.enum([
    "starter",
    "studio-pro",
    "enterprise"
])

export const PricingPlanSchema = z.object({
    id: PricingPlanIdSchema,
    name: z.string(),
    tagline: z.string(),
    price: z.union([z.number(), z.literal("Custom")]),
    billingPeriod: z.string().optional(),
    description: z.string(),
    features: z.array(z.string()),
    ctaLabel: z.string(),
    highlighted: z.boolean().default(false),
    currentPlan: z.boolean().default(false),
});

export const PricingPlansSchema = z.array(PricingPlanSchema);

/**
 * Type Inference
 */
export type PricingPlan = z.infer<typeof PricingPlanSchema>;

/**
 * Pricing Data
 */
export const pricingPlans: PricingPlan[] = [
    {
        id: "starter",
        name: "Starter",
        tagline: "For focused individuals",
        price: 0,
        description: "Forever free",
        features: [
            "Unlimited transcripts",
            "800 mins of storage/seat",
            "5 meetings/month",
            "Basic AI summaries",
            "Single workspace",
        ],
        ctaLabel: "Starter Plan",
        highlighted: false,
        currentPlan: true,
    },
    {
        id: "studio-pro",
        name: "Studio Pro",
        tagline: "For high-intensity studios",
        price: 25,
        billingPeriod: "per month",
        description: "Billed monthly",
        features: [
            "Unlimited transcripts",
            "500GB storage capacity",
            "Unlimited meetings/month",
            "Advanced AI chat assistant",
            "Priority support",
        ],
        ctaLabel: "Upgrade",
        highlighted: true,
        currentPlan: false,
    },
    {
        id: "enterprise",
        name: "Enterprise",
        tagline: "For scaling organizations",
        price: "Custom",
        description: "Billed annually",
        features: [
            "Unlimited transcripts",
            "5TB+ storage with scaling",
            "Unlimited meetings/month",
            "Dedicated account support",
            "SSO & SAML integration",
        ],
        ctaLabel: "Book a demo",
        highlighted: false,
        currentPlan: false,
    },
];