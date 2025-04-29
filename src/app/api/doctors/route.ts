import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Doctor from '@/models/Doctor';

const SPECIALTY_MAP: Record<string, string> = {
  'general-physician-internal-medicine': 'General Physician',
  // Add more mappings as needed
};

function kebabToTitleCase(str: string) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function getDbSpecialty(slug: string) {
  return SPECIALTY_MAP[slug] || kebabToTitleCase(slug);
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const doctor = await Doctor.create(body);
    return NextResponse.json(doctor, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const specialization = searchParams.get('specialization');
    const experience = searchParams.get('experience') ? parseInt(searchParams.get('experience')!) : undefined;
    const rating = searchParams.get('rating') ? parseFloat(searchParams.get('rating')!) : undefined;
    const gender = searchParams.get('gender');
    const languages = searchParams.getAll('languages');
    const sortBy = searchParams.get('sortBy') || 'rating';
    
    const query: any = {};
    
    if (specialization) {
      query.specialization = getDbSpecialty(specialization);
    }
    
    if (experience) {
      query.experience = { $gte: experience };
    }
    
    if (rating) {
      query.rating = { $gte: rating };
    }
    
    if (gender) {
      query.gender = gender;
    }
    
    if (languages.length > 0) {
      query.languages = { $in: languages };
    }
    
    console.log('API Query:', query);
    
    const total = await Doctor.countDocuments(query);
    console.log('Total doctors found:', total);
    
    const pages = Math.ceil(total / limit);
    
    const doctors = await Doctor.find(query)
      .sort({ [sortBy]: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    
    console.log('Doctors returned:', doctors.length);
    
    return NextResponse.json({
      doctors,
      pagination: {
        total,
        page,
        limit,
        pages,
      },
    });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
} 