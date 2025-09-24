import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  totalItems,
  onPageChange,
}) => {
  return (
    <div className="flex items-center justify-between p-4 border-t border-[#FFFFFF14]">
      {/* Results */}
      <span className="text-[#A1A1AA] text-sm font-medium">
        {startIndex + 1} — {Math.min(endIndex, totalItems)} of {totalItems}{" "}
        results
      </span>

      <div className="flex items-center gap-6">
        {/* Pages */}
        <span className="text-[#A1A1AA] text-sm font-medium">
          {currentPage} of {totalPages} pages
        </span>

        {/* Prev */}
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="text-sm text-[#A1A1AA] disabled:opacity-50 disabled:cursor-not-allowed font-medium cursor-pointer"
        >
          Prev
        </button>

        {/* Next */}
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="text-sm text-[#A1A1AA] disabled:opacity-50 disabled:cursor-not-allowed font-medium cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
