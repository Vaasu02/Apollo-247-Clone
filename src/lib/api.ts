import axios from 'axios';
import { Doctor, DoctorFilters, DoctorsResponse } from '@/types/doctor';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
});

export const addDoctor = async (doctorData: Omit<Doctor, '_id' | 'createdAt' | 'updatedAt'>) => {
  const response = await api.post<Doctor>('/doctors', doctorData);
  return response.data;
};

export const getDoctors = async (filters: DoctorFilters): Promise<DoctorsResponse> => {
  const params = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        value.forEach(v => params.append(key, v));
      } else {
        params.append(key, String(value));
      }
    }
  });
  
  const response = await api.get(`/doctors?${params.toString()}`);
  return response.data;
}; 