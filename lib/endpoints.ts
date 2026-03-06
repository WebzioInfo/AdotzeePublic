export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.adotzee.com/api";

export const ENDPOINTS = {
    COURSES: {
        GET_ALL: "/Courses",
        GET_BY_ID: (id: string) => `/Courses/${id}`,
    },
    COLLEGES: {
        GET_ALL: "/Colleges",
        GET_BY_ID: (id: string) => `/Colleges/${id}`,
    },
    ADDONS: {
        GET_ALL: "/AddonCourses",
        GET_BY_ID: (id: string) => `/AddonCourses/${id}`,
    },
    SEARCH: {
        GLOBAL: "/Search", // ?q={query}
    },
    RECOMMENDATIONS: {
        GET: "/Recommendations",
    },
    LEADS: {
        CREATE: "/Leads",
    },
};
