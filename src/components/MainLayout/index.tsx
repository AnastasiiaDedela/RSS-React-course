import React, { useState, useEffect } from 'react';
import styles from './MainLayout.module.css';
import { Cards } from '../../types/interfaces';
import { ApiPerson } from '../../types/types';
import Search from '../Search';
import CardsList from '../CardsList';

const MainLayout: React.FC = () => {
  const [cards, setCards] = useState<Cards>({ cards: [] });
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    console.log('hello');
    const storedSearchValue = localStorage.getItem('searchValue') || '';
    console.log('storedSearchValue on mount: ', storedSearchValue); // Log the stored value

    doSearch(storedSearchValue);
  }, []);

  const doSearch = (searchValue: string) => {
    console.log('doSearch called with: ', searchValue); // Log the search value passed
    let url = 'https://swapi.dev/api/people/?page=2';

    if (searchValue) {
      url = `https://swapi.dev/api/people/?search=${searchValue}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        console.log('Fetch response: ', res); // Log the response
        const cardsList = res.results.map((person: ApiPerson) => {
          const splitedURL = person.url.split('/');
          const id = splitedURL[splitedURL.length - 2];

          return {
            name: person.name,
            description: person.birth_year,
            image: `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`,
            age: person.birth_year,
          };
        });
        setCards({ cards: cardsList });
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  const handleSearch = (searchTerm: string) => {
    console.log('handleSearch called with: ', searchTerm); // Log the search term passed
    doSearch(searchTerm);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchBlock}>
        {!hidden && <Search doSearch={handleSearch} />}
      </div>
      <button
        onClick={() => {
          setHidden(!hidden);
        }}
      >
        Display
      </button>
      <div className={styles.cardsBlock}>
        <CardsList cards={cards.cards} />
      </div>
    </div>
  );
};

export default MainLayout;
