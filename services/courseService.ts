import { apiClient } from "./apiClient";
import { Course } from "@/types";

export const courseService = {
    getAll: async (): Promise<Course[]> => {
        return apiClient.get("/Courses");
    },
    getById: async (id: string): Promise<Course> => {
        return apiClient.get(`/Courses/${id}`);
    },
};
