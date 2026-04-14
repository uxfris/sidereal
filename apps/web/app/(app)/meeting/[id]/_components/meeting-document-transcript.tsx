"use client"

import { MinimalisticMagnifier, Pen } from "@solar-icons/react";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@workspace/ui/components/input-group"
import { Button } from "@workspace/ui/components/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@workspace/ui/components/tooltip";

import { Conversation, Sentence } from "@workspace/types/conversations"
import { cn } from "@workspace/ui/lib/utils";
import { useState } from "react";

const MOCK_CONVERSATION: Conversation = {
    "id": "conv_001",
    "messages": [
        {
            "id": "msg_1",
            "timestamp": "04:12",
            "speaker": "Elena Voss",
            "sentences": [
                {
                    "id": "s1",
                    "text": "If we look at the current trajectory of the Antarctic data centers, the cooling costs are actually decreasing by 12% YoY.",
                    "startTimeMs": 0,
                    "endTimeMs": 9000
                },
                {
                    "id": "s2",
                    "text": "I think we should re-invest that margin back into the generative latency optimizations Sarah mentioned.",
                    "startTimeMs": 9000,
                    "endTimeMs": 18000
                }
            ]
        },
        {
            "id": "msg_2",
            "timestamp": "04:45",
            "speaker": "Marcus Thorne",
            "sentences": [
                {
                    "id": "s3",
                    "text": "Agreed.",
                    "startTimeMs": 18000,
                    "endTimeMs": 20000
                },
                {
                    "id": "s4",
                    "text": "But we need to be careful about the latency floor.",
                    "startTimeMs": 20000,
                    "endTimeMs": 26000
                },
                {
                    "id": "s5",
                    "text": "If we push too hard on the compression models, we might lose the \"human-feeling\" nuance that makes Atelier AI different from the legacy bots.",
                    "startTimeMs": 26000,
                    "endTimeMs": 35000
                }
            ]
        },
        {
            "id": "msg_3",
            "timestamp": "05:22",
            "speaker": "Elena Voss",
            "sentences": [
                {
                    "id": "s6",
                    "text": "Then it's settled.",
                    "startTimeMs": 35000,
                    "endTimeMs": 38000
                },
                {
                    "id": "s7",
                    "text": "We will keep the high-fidelity weights for our Premium Tier and only use the distilled versions for the mobile lightweight experience.",
                    "startTimeMs": 38000,
                    "endTimeMs": 52000
                }
            ]
        }
    ]
}


export function MeetingDocumentTranscript() {

    const [currentTime, setCurrentTime] = useState(0)

    const isSentenceActive = (currentTime: number, sentence: Sentence) => {
        return currentTime >= sentence.startTimeMs &&
            currentTime <= sentence.endTimeMs
    }

    return (
        <section className="space-y-4 pb-32">
            <div className="flex flex-col md:flex-row justify-between gap-2">
                <h2 className="text-lg font-semibold">
                    Smart Transcript
                </h2>
                {/* Search and Edit */}
                <div className="flex items-center gap-3">
                    <InputGroup className="bg-input w-64 flex-1">
                        <InputGroupInput placeholder="Find in transcript..." />
                        <InputGroupAddon className="w-5">
                            <MinimalisticMagnifier />
                        </InputGroupAddon>
                    </InputGroup>
                    <TooltipProvider delayDuration={700}>
                        <Tooltip>
                            <TooltipTrigger asChild >
                                <Button variant="outline" size="icon-xs">
                                    <Pen className="text-muted-foreground" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                Edit transcript
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
            {/* Transcript Content */}
            {MOCK_CONVERSATION.messages.map((message) => {
                const isMessageActive = message.sentences.some((s) =>
                    isSentenceActive(currentTime, s))
                return (
                    <div key={message.id} className={cn("flex gap-2 px-6 py-4 lg:-mx-6 rounded-md", isMessageActive && "bg-primary/5")}>
                        <div className="hidden md:block w-16 flex-none pt-1">
                            <p className="text-xs text-muted-foreground">
                                {message.timestamp}
                            </p>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <p className="text-xs font-semibold uppercase">
                                    {message.speaker}
                                </p>
                                <p className="md:hidden text-xs text-muted-foreground">
                                    {message.timestamp}
                                </p>
                            </div>
                            <p className="text-[15px] leading-6">
                                {message.sentences.map((sentence) => {
                                    const isActive = isSentenceActive(currentTime, sentence)
                                    return (
                                        <span key={sentence.id} className={cn(isActive ? "text-accent-4" : "text-muted-foreground")}>
                                            {sentence.text}{" "}
                                        </span>
                                    )
                                })}
                            </p>
                        </div>
                    </div>
                )
            })}

        </section>
    )
}