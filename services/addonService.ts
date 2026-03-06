import { apiClient } from "./apiClient";
import { AddonCourse } from "@/types";

export const addonService = {
    getAll: async (): Promise<AddonCourse[]> => {
        return apiClient.get("/AddonCourses");
    },
};
