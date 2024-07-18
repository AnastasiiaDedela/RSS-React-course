import styles from './Pagination.module.css';
export default function Pagination({ currentPage, pageOnClick, count, }) {
    const cadrsPerPage = 10;
    const pages = Math.ceil(count / cadrsPerPage);
    const arrayOfPages = Array.from({ length: pages }, (_, i) => i + 1);
    return (<div>
      <ul className={styles.pagination}>
        <li onClick={() => {
            if (currentPage > 1) {
                pageOnClick(currentPage - 1);
            }
        }}>
          {'<'}
        </li>
        {arrayOfPages.map((_, index) => (<li key={index} onClick={() => {
                pageOnClick(index + 1);
            }} className={currentPage === index + 1 ? `${styles.active}` : ''}>
            {index + 1}
          </li>))}
        <li onClick={() => {
            if (currentPage < pages) {
                pageOnClick(currentPage + 1);
            }
        }}>
          {'>'}
        </li>
      </ul>
    </div>);
}
