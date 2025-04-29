import { useState } from 'react';
import { DoctorFilters as DoctorFiltersType } from '@/types/doctor';
import { FaFilter, FaTimes } from 'react-icons/fa';

interface DoctorFiltersProps {
  onFilterChange: (filters: DoctorFiltersType) => void;
  activeFilters: DoctorFiltersType;
}

const DoctorFilters = ({ onFilterChange, activeFilters }: DoctorFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleFilterChange = (key: keyof DoctorFiltersType, value: any) => {
    onFilterChange({
      ...activeFilters,
      [key]: value,
    });
  };
  
  const clearFilters = () => {
    onFilterChange({
      page: 1,
      limit: 10,
    });
  };
  
  const filterCount = Object.keys(activeFilters).filter(
    key => key !== 'page' && key !== 'limit' && activeFilters[key as keyof DoctorFiltersType]
  ).length;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold flex items-center">
          <FaFilter className="mr-2" />
          Filters
          {filterCount > 0 && (
            <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
              {filterCount}
            </span>
          )}
        </h2>
        {filterCount > 0 && (
          <button 
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
          >
            <FaTimes className="mr-1" />
            Clear All
          </button>
        )}
      </div>
      
      <div className="space-y-4">
        {/* Experience Filter */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Experience</h3>
          <select 
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            value={activeFilters.experience || ''}
            onChange={(e) => handleFilterChange('experience', e.target.value ? parseInt(e.target.value) : undefined)}
          >
            <option value="">Any Experience</option>
            <option value="1">1+ years</option>
            <option value="5">5+ years</option>
            <option value="10">10+ years</option>
            <option value="15">15+ years</option>
            <option value="20">20+ years</option>
          </select>
        </div>
        
        {/* Rating Filter */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Rating</h3>
          <select 
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            value={activeFilters.rating || ''}
            onChange={(e) => handleFilterChange('rating', e.target.value ? parseInt(e.target.value) : undefined)}
          >
            <option value="">Any Rating</option>
            <option value="4">4+ Stars</option>
            <option value="4.5">4.5+ Stars</option>
          </select>
        </div>
        
        {/* Gender Filter */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Gender</h3>
          <div className="space-y-2">
            {['Male', 'Female', 'Other'].map((gender) => (
              <label key={gender} className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value={gender}
                  checked={activeFilters.gender === gender}
                  onChange={(e) => handleFilterChange('gender', e.target.checked ? gender : undefined)}
                  className="mr-2"
                />
                {gender}
              </label>
            ))}
          </div>
        </div>
        
        {/* Languages Filter */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Languages</h3>
          <div className="space-y-2">
            {['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam'].map((language) => (
              <label key={language} className="flex items-center">
                <input
                  type="checkbox"
                  checked={activeFilters.languages?.includes(language) || false}
                  onChange={(e) => {
                    const currentLanguages = activeFilters.languages || [];
                    if (e.target.checked) {
                      handleFilterChange('languages', [...currentLanguages, language]);
                    } else {
                      handleFilterChange(
                        'languages', 
                        currentLanguages.filter(lang => lang !== language)
                      );
                    }
                  }}
                  className="mr-2"
                />
                {language}
              </label>
            ))}
          </div>
        </div>
        
        {/* Sort By */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Sort By</h3>
          <select 
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            value={activeFilters.sortBy || 'rating'}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          >
            <option value="rating">Rating</option>
            <option value="experience">Experience</option>
            <option value="consultationFee">Consultation Fee</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default DoctorFilters; 