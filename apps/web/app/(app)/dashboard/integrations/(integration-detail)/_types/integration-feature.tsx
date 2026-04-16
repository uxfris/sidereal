import { ComponentType } from "react";

type IconType = ComponentType<{ className?: string }>;

export type IntegrationFeature = {
    id: string;
    icon: IconType;
    palette: string;
    title: string;
    description: string;
};