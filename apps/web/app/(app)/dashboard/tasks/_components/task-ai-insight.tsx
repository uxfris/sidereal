
import { Soundwave, Stars } from "@solar-icons/react/ssr";
import { Card, CardContent, CardHeader } from "@workspace/ui/components/card";
import { Separator } from "@workspace/ui/components/separator";

export function TaskAIInsight() {
    const isEmpty = true;
    return (
        <Card className="px-5 py-8 bg-accent-3/30 border border-accent-3/50">
            <CardHeader className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
                    <Stars className="text-primary-foreground w-5 h-5" />
                </div>
                <h3 className="text-base text-primary font-semibold">AI Insight</h3>
            </CardHeader>
            {isEmpty ?
                <CardContent className="flex items-center flex-col gap-4">
                    <Soundwave className="w-8 h-8 text-primary/20" />
                    <p className="text-primary/80 text-center">
                        Atelier is listening. Start your first
                        meeting to surface unique team
                        insights here.
                    </p>
                </CardContent>
                :
                <CardContent>
                    <p className="text-primary/80">Based on yesterday's <b>Quarterly
                        Forecast</b> meeting, there's a 92%
                        confidence that <b>Client Billing
                            Updates</b> should be prioritized
                        ahead of the roadmap refine.</p>
                    <Separator className="my-6 bg-primary/5" />
                    <div className="space-y-4">
                        <h4 className="text-primary/75 text-xs font-semibold uppercase">Urgent Contexts</h4>
                        <div className="space-y-3">
                            <ul className="text-primary font-medium">
                                Latency Lag (3 mentions)
                            </ul>
                            <ul className="text-primary font-medium">
                                Marcus's Q3 Feedback
                            </ul>
                        </div>
                    </div>
                </CardContent>
            }

        </Card>
    )
}