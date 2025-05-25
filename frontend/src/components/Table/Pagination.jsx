const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPages = () => {
    const pages = [];

    if (totalPages <= 5) {
      // semua halaman jika jumlah total halaman kecil
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        // 1 2 3 ... last
        pages.push(1, 2, 3, 'dots', totalPages);
      } else if (currentPage >= totalPages - 2) {
        // 1 ... last-2 last-1 last
        pages.push(1, 'dots', totalPages - 2, totalPages - 1, totalPages);
      } else {
        // 1 ... current-1 current current+1 ... last
        pages.push(1, 'dots', currentPage - 1, currentPage, currentPage + 1, 'dots', totalPages);
      }
    }

    return pages;
  };

  const pages = getPages();

  return (
    <div className="flex items-center gap-2 mt-4">
      <button
        className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {pages.map((page, index) =>
        page === 'dots' ? (
          <span key={`dots-${index}`} className="px-3 py-1">
            ...
          </span>
        ) : (
          <button
            key={`page-${page}`}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded ${
              currentPage === page ? 'bg-green-600 text-white' : 'bg-gray-100'
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
