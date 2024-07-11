import React, { useState, useEffect } from 'react';
import styles from './Search.module.css';
import { SearchProps } from '../../types/types';

const Search: React.FC<SearchProps> = ({ doSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const storedSearchValue = localStorage.getItem('searchValue');
    if (storedSearchValue) {
      setSearchValue(storedSearchValue);
    }
  }, []);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    const validSearchValue = searchValue.trim();
    localStorage.setItem('searchValue', validSearchValue);
    doSearch(validSearchValue);
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
