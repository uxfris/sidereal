import { create } from "zustand"

type MeetingViewState = {
    meetingView: "grid" | "list"
    setMeetingView: (val: "grid" | "list") => void
}

export const useMeetingView = create<MeetingViewState>((set) => ({
    meetingView: "grid",
    setMeetingView: (val) => set({ meetingView: val }),
}))