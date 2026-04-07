"use client"

import { create } from 'zustand'

type MeetingSelectionState = {
    selectionMode: boolean,
    selectedIds: string[]

    setSelectionMode: (val: boolean) => void
    toggleSelect: (id: string) => void
    selectAll: (ids: string[]) => void
    clearSelection: () => void
}

export const useMeetingSelection = create<MeetingSelectionState>((set) => ({
    selectionMode: false,
    selectedIds: [],

    setSelectionMode: (val) => set({ selectionMode: val }),

    toggleSelect: (id) =>
        set((state) => ({
            selectedIds: state.selectedIds.includes(id)
                ? state.selectedIds.filter(i => i !== id)
                : [...state.selectedIds, id]
        })),

    selectAll: (ids) => set({ selectedIds: ids }),

    clearSelection: () => set({ selectedIds: [] })
}))