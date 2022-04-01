import { useMemo } from 'react';
import { DEFAULT_PAGE_SIZE } from '../constants';

function Pagination({
  pageSize = DEFAULT_PAGE_SIZE,
  page,
  total,
  setPage,
}) {
  const totalPages = useMemo(() => {
    return Math.ceil(total / pageSize);
  }, [pageSize, total]);
  const isInFirstPage = useMemo(() => {
    return page === 1;
  }, [page]);
  const isInLastPage = useMemo(() => {
    return page > totalPages - 1;
  }, [page, totalPages]);
  const pages = useMemo(() => {
    const last = Math.ceil(page / 3) * 3;
    const total = totalPages;
    return [last - 2, last - 1, last].filter(
      (page) => page <= total
    );
  }, [page, totalPages]);
  const show = useMemo(() => {
    return totalPages > 1;
  }, [totalPages]);

  const nextPage = () => {
    setPage(page + 1);
  };
  const previousPage = () => {
    setPage(page - 1);
  };
  const goToPage = (page) => {
    setPage(Number(page));
  };
  const isCurrentPage = (p) => {
    return p === page;
  };
  return show ? (
    <div>
      <ul>
        {!isInFirstPage ? (
          <li>
            <a
              href="# "
              onClick={previousPage}
              aria-label="Go to previous page"
            >
              previous
            </a>
          </li>
        ) : null}
        {pages.map((page) => (
          <li key={page}>
            <a
              href="# "
              onClick={() => goToPage(page)}
              style={
                isCurrentPage(page)
                  ? { backgroundColor: 'gray' }
                  : null
              }
            >
              {page}
            </a>
          </li>
        ))}
        {!isInLastPage ? (
          <li>
            <a
              href="# "
              onClick={nextPage}
              aria-label="Go to next page"
            >
              next
            </a>
          </li>
        ) : null}
      </ul>
    </div>
  ) : null;
}
export default Pagination;
