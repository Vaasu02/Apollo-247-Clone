export interface Doctor {
  _id: string;
  name: string;
  specialization: string;
  experience: number;
  languages: string[];
  consultationFee: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  gender: string;
  availability: {
    today: string[];
    tomorrow: string[];
  };
  education: string[];
  about: string;
  location: {
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
}

export interface DoctorFilters {
  page: number;
  limit: number;
  specialization?: string;
  experience?: number;
  rating?: number;
  gender?: string;
  languages?: string[];
  sortBy?: 'rating' | 'experience' | 'consultationFee';
}

export interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface DoctorsResponse {
  doctors: Doctor[];
  pagination: PaginationInfo;
} 