import { create } from "zustand";

interface UiState {
    isLeadModalOpen: boolean;
    openLeadModal: (courseName?: string, source?: string) => void;
    closeLeadModal: () => void;
    selectedCourseForLead: string | null;
    leadSource: string | null;
}

export const useUiStore = create<UiState>((set) => ({
    isLeadModalOpen: false,
    selectedCourseForLead: null,
    leadSource: null,
    openLeadModal: (courseName, source) =>
        set({
            isLeadModalOpen: true,
            selectedCourseForLead: courseName || null,
            leadSource: source || null
        }),
    closeLeadModal: () =>
        set({
            isLeadModalOpen: false,
            selectedCourseForLead: null,
            leadSource: null
        }),
}));

interface SearchState {
    globalSearchQuery: string;
    setGlobalSearchQuery: (query: string) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
    globalSearchQuery: "",
    setGlobalSearchQuery: (query) => set({ globalSearchQuery: query }),
}));
