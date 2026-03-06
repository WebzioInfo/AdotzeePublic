import { create } from "zustand";

interface UiState {
    isLeadModalOpen: boolean;
    openLeadModal: (courseName?: string) => void;
    closeLeadModal: () => void;
    selectedCourseForLead: string | null;
}

export const useUiStore = create<UiState>((set) => ({
    isLeadModalOpen: false,
    selectedCourseForLead: null,
    openLeadModal: (courseName) =>
        set({ isLeadModalOpen: true, selectedCourseForLead: courseName || null }),
    closeLeadModal: () =>
        set({ isLeadModalOpen: false, selectedCourseForLead: null }),
}));

interface SearchState {
    globalSearchQuery: string;
    setGlobalSearchQuery: (query: string) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
    globalSearchQuery: "",
    setGlobalSearchQuery: (query) => set({ globalSearchQuery: query }),
}));
