import { Component } from 'react';
// import Search from '../Search/Search';
// import SearchResults from '../SearchResults/SearchResults';
import styles from './MainLayout.module.css';
import { Cards } from '../../types/interfaces';
import { ApiPerson } from '../../types/types';

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
    let url = 'https://swapi.dev/api/people/?page=3';

    if (searchValue) {
      url = `https://swapi.dev/api/people/?search=${searchValue}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        const cardList = res.cardList.map((person: ApiPerson) => {
          const splitedURL = person.url.split('/');
          let id = splitedURL[splitedURL.length - 2];

          return {
            name: person.name,
            description: person.birth_year,
            image: `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`,
            age: person.birth_year,
          };
        });
        this.setState({ cards: cardList });
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.searchBlock}>Search</div>
        <div className={styles.cardsBlock}>Cards</div>
      </div>
    );
  }
}

export default MainLayout;
