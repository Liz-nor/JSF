interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const handleNextPage = () => {
    onPageChange(Math.min(currentPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    onPageChange(Math.max(currentPage - 1, 1));
  };

  return (
    <div className="flex justify-center items-center my-4">
      <button
        className="rounded-lg text-white px-4 py-2 m-2 bg-blue-500 hover:bg-blue-600"
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        className="rounded-lg text-white px-4 py-2 m-2 bg-blue-500 hover:bg-blue-600"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
