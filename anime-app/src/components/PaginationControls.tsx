interface PaginationControlsProps {
  currentPage: number;
  hasNextPage: boolean;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  hasNextPage,
  onPageChange,
  isLoading,
}) => {
  return (
    <div className="flex justify-center items-center gap-4 my-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
        className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
      >
        ← Previous
      </button>

      <div className="text-white font-semibold">
        Page <span className="text-purple-400">{currentPage}</span>
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNextPage || isLoading}
        className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
      >
        Next →
      </button>
    </div>
  );
};

export default PaginationControls;
