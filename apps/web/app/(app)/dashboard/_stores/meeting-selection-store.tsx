"use client"

import { create } from 'zustand'

type MeetingSelectionState = {
    isSelection: boolean,
    setIsSelection: (val: boolean) => void
}

export const useMeetingSelection = create<MeetingSelectionState>((set) => ({
    isSelection: false,
    setIsSelection: (val: boolean) => set({ isSelection: val })
}))