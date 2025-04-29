import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Doctor from '@/models/Doctor';

const sampleDoctors = [
  {
    name: 'Dr. John Smith',
    specialization: 'General Physician',
    experience: 15,
    languages: ['English', 'Hindi'],
    consultationFee: 500,
    rating: 4.8,
    reviewCount: 120,
    imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
    gender: 'Male',
    availability: {
      today: ['10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM'],
      tomorrow: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM'],
    },
    education: ['MBBS, MD - General Medicine'],
    about: 'Dr. John Smith is a highly experienced general physician with over 15 years of practice. He specializes in preventive care and chronic disease management.',
    location: {
      address: '123 Medical Center, Main Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
    },
  },
  {
    name: 'Dr. Sarah Johnson',
    specialization: 'General Physician',
    experience: 10,
    languages: ['English', 'Tamil'],
    consultationFee: 600,
    rating: 4.9,
    reviewCount: 85,
    imageUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
    gender: 'Female',
    availability: {
      today: ['09:00 AM', '10:00 AM', '11:00 AM', '03:00 PM'],
      tomorrow: ['10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM'],
    },
    education: ['MBBS, MD - Internal Medicine'],
    about: 'Dr. Sarah Johnson is a dedicated general physician with expertise in internal medicine. She focuses on providing comprehensive care to her patients.',
    location: {
      address: '456 Health Hub, Park Road',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110001',
    },
  },
  {
    name: 'Dr. Michael Brown',
    specialization: 'General Physician',
    experience: 20,
    languages: ['English', 'Telugu'],
    consultationFee: 800,
    rating: 4.7,
    reviewCount: 150,
    imageUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
    gender: 'Male',
    availability: {
      today: ['11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'],
      tomorrow: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM'],
    },
    education: ['MBBS, MD - General Medicine, Fellowship in Internal Medicine'],
    about: 'Dr. Michael Brown is a senior general physician with extensive experience in treating complex medical conditions. He is known for his thorough approach to diagnosis and treatment.',
    location: {
      address: '789 Medical Plaza, Lake View',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560001',
    },
  },
  {
    name: 'Dr. Emily Davis',
    specialization: 'General Physician',
    experience: 8,
    languages: ['English', 'Kannada'],
    consultationFee: 450,
    rating: 4.6,
    reviewCount: 95,
    imageUrl: 'https://randomuser.me/api/portraits/women/4.jpg',
    gender: 'Female',
    availability: {
      today: ['10:00 AM', '11:00 AM', '03:00 PM', '04:00 PM'],
      tomorrow: ['09:00 AM', '10:00 AM', '02:00 PM', '03:00 PM'],
    },
    education: ['MBBS, MD - General Medicine'],
    about: 'Dr. Emily Davis is a compassionate general physician who believes in patient-centered care. She has a special interest in preventive medicine and health promotion.',
    location: {
      address: '321 Wellness Center, Hill Road',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600001',
    },
  },
  {
    name: 'Dr. Robert Wilson',
    specialization: 'General Physician',
    experience: 12,
    languages: ['English', 'Malayalam'],
    consultationFee: 550,
    rating: 4.5,
    reviewCount: 110,
    imageUrl: 'https://randomuser.me/api/portraits/men/5.jpg',
    gender: 'Male',
    availability: {
      today: ['09:00 AM', '10:00 AM', '02:00 PM', '03:00 PM'],
      tomorrow: ['10:00 AM', '11:00 AM', '03:00 PM', '04:00 PM'],
    },
    education: ['MBBS, MD - Internal Medicine'],
    about: 'Dr. Robert Wilson is a skilled general physician with expertise in managing chronic diseases. He is committed to providing high-quality healthcare to his patients.',
    location: {
      address: '654 Health Point, Garden Road',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500001',
    },
  },
  // Add 15 more doctors for pagination testing
  ...Array.from({ length: 15 }).map((_, i) => ({
    name: `Dr. Test Doctor ${i + 6}`,
    specialization: 'General Physician',
    experience: 5 + i,
    languages: ['English', i % 2 === 0 ? 'Hindi' : 'Tamil'],
    consultationFee: 400 + (i * 10),
    rating: 4.0 + (i % 5) * 0.1,
    reviewCount: 50 + i * 3,
    imageUrl: `https://randomuser.me/api/portraits/men/${i + 6}.jpg`,
    gender: i % 2 === 0 ? 'Male' : 'Female',
    availability: {
      today: ['10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM'],
      tomorrow: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM'],
    },
    education: ['MBBS, MD - General Medicine'],
    about: `Dr. Test Doctor ${i + 6} is a test general physician for pagination.`,
    location: {
      address: `${100 + i} Test Street`,
      city: 'Test City',
      state: 'Test State',
      pincode: `4000${i}`,
    },
  })),
];

export async function GET() {
  try {
    await connectDB();
    
    // Clear existing doctors
    await Doctor.deleteMany({});
    
    // Insert sample doctors
    const doctors = await Doctor.insertMany(sampleDoctors);
    
    return NextResponse.json({
      message: 'Sample doctors added successfully',
      count: doctors.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
} 