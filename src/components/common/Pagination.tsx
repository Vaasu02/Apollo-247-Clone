import { PaginationInfo } from '@/types/doctor';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface PaginationProps {
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
}

const Pagination = ({ pagination, onPageChange }: PaginationProps) => {
  const { page, pages, total } = pagination;
  
  if (pages <= 1) return null;
  
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(pages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-3 py-1 rounded-md ${
            page === i
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          {i}
        </button>
      );
    }
    
    return pageNumbers;
  };
  
  return (
    <div className="flex items-center justify-between mt-8">
      <div className="text-sm text-gray-700">
        Showing <span className="font-medium">{total > 0 ? (page - 1) * pagination.limit + 1 : 0}</span> to{' '}
        <span className="font-medium">
          {Math.min(page * pagination.limit, total)}
        </span>{' '}
        of <span className="font-medium">{total}</span> results
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className={`p-2 rounded-md ${
            page === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          <FaChevronLeft className="w-4 h-4" />
        </button>
        
        {renderPageNumbers()}
        
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === pages}
          className={`p-2 rounded-md ${
            page === pages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          <FaChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination; 