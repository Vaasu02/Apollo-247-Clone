import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image 
              src="/logo.svg" 
              alt="Apollo 247 Clone" 
              width={120} 
              height={40} 
              className="mr-2"
            />
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/specialties" className="text-gray-700 hover:text-blue-600">
            Specialties
          </Link>
          <Link href="/doctors" className="text-gray-700 hover:text-blue-600">
            Doctors
          </Link>
          <Link href="/hospitals" className="text-gray-700 hover:text-blue-600">
            Hospitals
          </Link>
          <Link href="/pharmacy" className="text-gray-700 hover:text-blue-600">
            Pharmacy
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Login
          </button>
          <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50">
            Register
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 