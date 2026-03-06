import axios from "axios";

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://adotzee-backend.onrender.com/api";

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 60000,
});

// Response Interceptor: Extracts the nested data and handles success: false
apiClient.interceptors.response.use(
    (response) => {
        const res = response.data as ApiResponse<any>;

        if (res.success) {
            return res.data;
        }

        // Handle backend-driven errors
        const error = new Error(res.message || "Something went wrong");
        return Promise.reject(error);
    },
    (error) => {
        // Handle network errors or HTTP error codes
        console.error("Network/Server Error:", error.response?.data || error.message);
        const customError = new Error(
            error.response?.data?.message ||
            "Service Temporarily Unavailable. Please check your connection."
        );
        return Promise.reject(customError);
    }
);
