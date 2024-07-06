import { Component } from 'react';
import styles from './MainLayout.module.css';
import { Cards } from '../../types/interfaces';
import { ApiPerson } from '../../types/types';
import Search from '../Search';
import CardsList from '../CardsList';

class MainLayout extends Component<Record<string, never>, Cards> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      cards: [],
    };
  }

  componentDidMount() {
    this.doSearch('');
  }

  doSearch = (searchValue: string) => {
    let url = 'https://swapi.dev/api/people/?page=2';

    if (searchValue) {
      url = `https://swapi.dev/api/people/?search=${searchValue}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        const cardsList = res.results.map((person: ApiPerson) => {
          const splitedURL = person.url.split('/');
          let id = splitedURL[splitedURL.length - 2];

          return {
            name: person.name,
            description: person.birth_year,
            image: `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`,
            age: person.birth_year,
          };
        });
        this.setState({ cards: cardsList });
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  handleSearch = (searchTerm: string) => {
    this.doSearch(searchTerm);
  };

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.searchBlock}>
          <Search doSearch={this.handleSearch} />
        </div>
        <div className={styles.cardsBlock}>
          <CardsList cards={this.state.cards} />
        </div>
      </div>
    );
  }
}

export default MainLayout;
