"use client";

import { Meeting } from "@workspace/types";
import { createContext, ReactNode, useContext } from "react";

const MeetingsContext = createContext<Meeting[] | undefined>(undefined);

type MeetingsProviderProps = {
    meetings: Meeting[];
    children: ReactNode;
};

export function MeetingsProvider({
    meetings,
    children,
}: MeetingsProviderProps) {
    return (
        <MeetingsContext.Provider value={meetings}>
            {children}
        </MeetingsContext.Provider>
    );
}

// Optional: custom hook for safer usage
export function useMeetings() {
    const context = useContext(MeetingsContext);
    if (!context) {
        throw new Error("useMeetings must be used within a MeetingsProvider");
    }
    return context;
}