import { apiClient } from "./apiClient";
import { Course, College, AddonCourse } from "@/types";

export interface RecommendationRequest {
    interests: string;
    budget: number;
    location: string;
    preferredStream: string;
}

export interface RecommendationResponse {
    courses: Course[];
    colleges: College[];
    addons: AddonCourse[];
}

export const recommendationService = {
    getRecommendations: async (data: RecommendationRequest): Promise<RecommendationResponse> => {
        return apiClient.post("/Recommendations", data);
    },
};
