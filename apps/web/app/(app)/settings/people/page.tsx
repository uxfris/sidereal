import { SettingHeader } from "../_components/setting-header";

export default function People() {
    return <div className="flex flex-col gap-8 p-12">
        <SettingHeader
            title="People"
            description="Inviting people to Fris's Lume gives access to workspace shared projects and credits. You have 1 builder in this workspace."
        />
    </div>
}