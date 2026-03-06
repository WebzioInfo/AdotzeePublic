export interface Course {
  id: string;
  name: string;
  description: string;
  stream: string;
  level: "UG" | "PG";
  duration: string;
  careerOpportunities: string[];
  imageUrl?: string;
  feeRange?: string;
  isActive: boolean;
}

export interface College {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  establishedYear: number;
  accreditation: string[];
  facilities: string[];
  imageUrl?: string;
  rating?: number;
  isActive: boolean;
  courses?: Course[];
}

export interface AddonCourse {
  id: string;
  name: string;
  description: string;
  duration: string;
  certifyingBody: string;
  price: number;
  imageUrl?: string;
  isActive: boolean;
}

export interface Lead {
  id?: string;
  name: string;
  email: string;
  phone: string;
  interestedCourse?: string;
  message?: string;
  status?: string;
  createdAt?: string;
}

export interface RecommendationRequest {
  interests: string[];
  preferredStream: string;
  preferredLocation?: string;
  educationLevel: string;
}

export interface SearchResult {
  courses: Course[];
  colleges: College[];
  addons: AddonCourse[];
}
