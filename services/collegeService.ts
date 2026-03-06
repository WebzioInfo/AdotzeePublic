import { apiClient } from "./apiClient";
import { College } from "@/types";

export const collegeService = {
    getAll: async (): Promise<College[]> => {
        return apiClient.get("/Colleges");
    },
    getById: async (id: string): Promise<College> => {
        return apiClient.get(`/Colleges/${id}`);
    },
};
