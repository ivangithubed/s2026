import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const buttonClass =
    "p-2 rounded-md bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-200 dark:hover:bg-slate-800 transition";

  return (
    <nav className="flex justify-center items-center space-x-2 mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={buttonClass}>
        <ChevronLeft size={20} />
      </button>

      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-4 py-2 rounded-md transition ${currentPage === number ? "bg-lime-600 dark:bg-lime-400 text-white dark:text-slate-950" : "bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-slate-800"}}`}>
          {number}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={buttonClass}>
        <ChevronRight size={20} />
      </button>
    </nav>
  );
};
