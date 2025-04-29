'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { NextSeo } from 'next-seo';
import Header from '@/components/layout/Header';
import DoctorFilters from '@/components/doctors/DoctorFilters';
import DoctorList from '@/components/doctors/DoctorList';
import Pagination from '@/components/common/Pagination';
import { getDoctors } from '@/lib/api';
import { Doctor, DoctorFilters as DoctorFiltersType } from '@/types/doctor';

export default function SpecialtyPage() {
  const params = useParams();
  const specialty = params.specialty as string;
  
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<DoctorFiltersType>({
    page: 1,
    limit: 10,
    specialization: specialty,
  });
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    pages: 0,
  });
  
  useEffect(() => {
    const fetchDoctors = async () => {
      setIsLoading(true);
      try {
        console.log('Fetching doctors with filters:', filters);
        const response = await getDoctors(filters);
        console.log('API Response:', response);
        setDoctors(response.doctors);
        setPagination(response.pagination);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDoctors();
  }, [filters]);
  
  const handleFilterChange = (newFilters: DoctorFiltersType) => {
    console.log('Filter changed:', newFilters);
    setFilters({
      ...newFilters,
      page: 1, // Reset to first page when filters change
    });
  };
  
  const handlePageChange = (page: number) => {
    setFilters({
      ...filters,
      page,
    });
  };
  
  const formatSpecialtyTitle = (specialty: string) => {
    return specialty
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  const specialtyTitle = formatSpecialtyTitle(specialty);
  
  return (
    <>
      <NextSeo
        title={`${specialtyTitle} Doctors Near You | Apollo 247 Clone`}
        description={`Find and book appointments with the best ${specialtyTitle} doctors near you. Compare doctors, read reviews, and book online consultations.`}
        openGraph={{
          title: `${specialtyTitle} Doctors Near You | Apollo 247 Clone`,
          description: `Find and book appointments with the best ${specialtyTitle} doctors near you. Compare doctors, read reviews, and book online consultations.`,
          url: `https://apollo-clone.com/specialties/${specialty}`,
          site_name: 'Apollo 247 Clone',
        }}
      />
      
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {specialtyTitle} Doctors
            </h1>
            <p className="text-gray-600">
              Find and book appointments with the best {specialtyTitle} doctors near you.
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/4">
              <DoctorFilters 
                onFilterChange={handleFilterChange} 
                activeFilters={filters} 
              />
            </div>
            
            <div className="lg:w-3/4">
              <DoctorList doctors={doctors} isLoading={isLoading} />
              
              {!isLoading && doctors.length > 0 && (
                <Pagination 
                  pagination={pagination} 
                  onPageChange={handlePageChange} 
                />
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
} 