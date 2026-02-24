export const Pagination = ({ currentPage, total, limit, onPageChange }) => {
  const totalPages = Math.ceil(total / limit);

  if (totalPages <= 1) return null;

  const pages = [];

  const addPage = (page) => {
    if (!pages.includes(page) && page >= 1 && page <= totalPages) {
      pages.push(page);
    }
  };

  // всегда первая
  addPage(1);

  // предыдущая
  addPage(currentPage - 1);

  // текущая
  addPage(currentPage);

  // следующая
  addPage(currentPage + 1);

  // всегда последняя
  addPage(totalPages);

  // сортируем
  pages.sort((a, b) => a - b);

  const renderPages = () => {
    const items = [];
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const prevPage = pages[i - 1];

      if (prevPage && page - prevPage > 1) {
        items.push("...");
      }

      items.push(page);
    }

    return items;
  };

  return (
    <div className="pagination">
      <button
        className="pagination-nav"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Назад
      </button>

      {renderPages().map((item, index) =>
        item === "..." ? (
          <span key={`ellipsis-${index}`}>...</span>
        ) : (
          <button
            key={item}
            onClick={() => onPageChange(item)}
            className={`pagination-page ${item === currentPage ? "active" : ""}`}
          >
            {item}
          </button>
        )
      )}

      <button
        className="pagination-nav"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Вперед
      </button>
    </div>
  );
};
