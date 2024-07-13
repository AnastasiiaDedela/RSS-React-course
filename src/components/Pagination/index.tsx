import styles from './Pagination.module.css';
import { useEffect } from 'react';

export type PaginationProps = {
  currentPage: number;
  pageOnClick: (pageNum: number) => void;
  count: number;
};

export default function Pagination({
  currentPage,
  pageOnClick,
  count,
}: PaginationProps) {
  const cadrsPerPage = 10;
  const pages = count / cadrsPerPage;
  const arrayOfPages = Array.from({ length: pages }, (_, i) => i + 1);

  useEffect(() => {
    pageOnClick(currentPage);
  }, [currentPage]);
  return (
    <div>
      <ul className={styles.pagination}>
        <li
          onClick={() => {
            if (currentPage > 1) {
              pageOnClick(currentPage - 1);
            }
          }}
        >
          {'<'}
        </li>
        {arrayOfPages.map((_, index) => (
          <li
            key={index}
            onClick={() => {
              pageOnClick(index + 1);
            }}
            className={currentPage === index + 1 ? `${styles.active}` : ''}
          >
            {index + 1}
          </li>
        ))}
        <li
          onClick={() => {
            if (currentPage < pages) {
              pageOnClick(currentPage - 1);
            }
          }}
        >
          {'>'}
        </li>
      </ul>
    </div>
  );
}
