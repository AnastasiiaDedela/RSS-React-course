import React, { Component } from 'react';
import styles from './Search.module.css';
import { SearchValue, SearchProps } from '../../types/types';

class Search extends Component<SearchProps, SearchValue> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      searchValue: '',
    };
  }

  componentDidMount() {
    const searchValue = localStorage.getItem('searchValue');
    if (searchValue) {
      this.setState({ searchValue: searchValue });
    }
  }

  onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchValue: e.target.value });
  };

  handleSearch = () => {
    const { searchValue } = this.state;
    const validSearchValue = searchValue.trim();
    localStorage.setItem('searchValue', validSearchValue);
    this.props.doSearch(validSearchValue);
  };

  throwError = () => {
    throw new Error('This is a test error');
  };

  render() {
    return (
      <div className={styles.searchWrapper}>
        <input
          type="text"
          value={this.state.searchValue}
          onChange={this.onChangeInput}
          className={styles.input}
          placeholder="Please enter your search term..."
        />
        <button onClick={this.handleSearch} className={styles.searchSubmitBtn}>
          Search
        </button>
        <button onClick={this.throwError} className={styles.errorBtn}>
          Throw Error
        </button>
      </div>
    );
  }
}

export default Search;
