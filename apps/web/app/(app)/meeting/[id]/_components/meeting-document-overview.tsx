import { Stars } from "@solar-icons/react/ssr";

export function MeetingDocumentOverview() {
    return (
        <section className="bg-secondary rounded-md p-6">
            <div className="flex gap-4">
                <Stars weight="Bold" className="text-2xl text-primary" />
                <div className="space-y-3">
                    <p className="text-sm text-primary font-semibold uppercase">Overview</p>
                    <p className="text-base font-medium">
                        The session focused on recalibrating the Q4 roadmap to prioritize internal efficiency
                        over aggressive market expansion, responding to recent Antarctic supply chain shifts.
                    </p>
                </div>
            </div>
        </section>
    )
}