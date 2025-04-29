import Image from 'next/image';
import { Doctor } from '@/types/doctor';
import { FaStar, FaLanguage, FaClock } from 'react-icons/fa';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-4">
        <div className="flex items-start">
          <div className="relative w-20 h-20 rounded-full overflow-hidden mr-4">
            <Image
              src={doctor.imageUrl}
              alt={doctor.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800">{doctor.name}</h3>
            <p className="text-sm text-gray-600">{doctor.specialization}</p>
            <p className="text-sm text-gray-600">{doctor.experience} years of experience</p>
            
            <div className="flex items-center mt-1">
              <div className="flex items-center text-yellow-400">
                <FaStar className="w-4 h-4" />
                <span className="ml-1 text-sm font-medium text-gray-700">
                  {doctor.rating.toFixed(1)} ({doctor.reviewCount} reviews)
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-2">
          {doctor.languages.map((language, index) => (
            <span 
              key={index} 
              className="inline-flex items-center text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded"
            >
              <FaLanguage className="w-3 h-3 mr-1" />
              {language}
            </span>
          ))}
        </div>
        
        <div className="mt-4">
          <div className="flex items-center text-sm text-gray-600">
            <FaClock className="w-4 h-4 mr-1" />
            <span>Available Today: {doctor.availability.today.length} slots</span>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="text-lg font-bold text-blue-600">
            ₹{doctor.consultationFee}
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard; 