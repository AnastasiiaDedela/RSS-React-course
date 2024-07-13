import React, { useState, useEffect } from 'react';
import styles from './MainLayout.module.css';
import { Cards } from '../../types/interfaces';
import { ApiPerson } from '../../types/types';
import Search from '../Search';
import CardsList from '../CardsList';

const MainLayout: React.FC = () => {
  const [cards, setCards] = useState<Cards>({ cards: [] });

  useEffect(() => {
    const storedSearchValue = localStorage.getItem('searchValue') || '';
    doSearch(storedSearchValue);
  }, []);

  const doSearch = (searchValue: string) => {
    let url = 'https://swapi.dev/api/people/?page=2';

    if (searchValue) {
      url = `https://swapi.dev/api/people/?search=${searchValue}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
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
    doSearch(searchTerm);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchBlock}>
        <Search doSearch={handleSearch} />
      </div>
      <div className={styles.cardsBlock}>
        <CardsList cards={cards.cards} />
      </div>
    </div>
  );
};

export default MainLayout;
