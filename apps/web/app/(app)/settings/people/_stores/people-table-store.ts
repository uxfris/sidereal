import { create } from "zustand";
import {
    SortingState,
    Updater,
} from "@tanstack/react-table";

type PeopleTableStore = {
    sorting: SortingState;

    search: string;

    setSorting: (
        updater: Updater<SortingState>
    ) => void;

    setSearch: (value: string) => void;

    resetFilters: () => void;
};

export const usePeopleTableStore =
    create<PeopleTableStore>((set) => ({
        sorting: [],
        search: "",

        setSorting: (updater) =>
            set((state) => ({
                sorting:
                    typeof updater === "function"
                        ? updater(state.sorting)
                        : updater,
            })),

        setSearch: (search) =>
            set({ search }),

        resetFilters: () =>
            set({
                sorting: [],
                search: "",
            }),
    }));