import styles from './Search.module.css';
import { SearchProps } from '../../types/types';
import useSearchQuery from '../../customHooks/useSearchQuery';

const Search: React.FC<SearchProps> = ({ doSearch }) => {
  const x = useSearchQuery('searchValue');
  const { value: searchValue, setValue: setSearchValue } = x;

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    const validSearchValue = searchValue.trim();
    doSearch(validSearchValue);
    localStorage.setItem('searchValue', validSearchValue);
  };

  const throwError = () => {
    throw new Error('This is a test error');
  };

  return (
    <div className={styles.searchWrapper}>
      <input
        type="text"
        value={searchValue}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Please enter your search term..."
      />
      <button onClick={handleSearch} className={styles.searchSubmitBtn}>
        Search
      </button>
      <button onClick={throwError} className={styles.errorBtn}>
        Throw Error
      </button>
    </div>
  );
};

export default Search;
