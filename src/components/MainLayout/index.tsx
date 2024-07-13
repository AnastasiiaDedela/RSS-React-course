import React, { useState, useEffect } from 'react';
import styles from './MainLayout.module.css';
import { Cards } from '../../types/interfaces';
import { ApiPerson } from '../../types/types';
import Search from '../Search';
import CardsList from '../CardsList';
import Pagination from '../Pagination/index';
import { useNavigate, useSearchParams } from 'react-router-dom';

const MainLayout: React.FC = () => {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCards] = useState<Cards>({ cards: [] });

  const navigate = useNavigate();
  const [params] = useSearchParams();

  const currentPage = Number(params.get('page') || 1);

  const pageOnClick = (pageNum: number) => {
    navigate(`/heroes?page=${pageNum}`);
  };

  useEffect(() => {
    const storedSearchValue = localStorage.getItem('searchValue') || '';
    handleRequest(storedSearchValue, currentPage);
  }, [params]);

  const handleRequest = (searchValue: string, currentPage: number) => {
    let url = `https://swapi.dev/api/people/?page=${currentPage}`;

    if (searchValue) {
      url = `https://swapi.dev/api/people/?search=${searchValue}`;
    }
    setIsLoading(true);
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
        console.log('res:', res);
        setCards({ cards: cardsList });
        setCount(res.count);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchBlock}>
        <Search handleRequest={handleRequest} currentPage={currentPage} />
      </div>
      {isLoading ? (
        <h2>LOADING...</h2>
      ) : (
        <>
          <div className={styles.cardsBlock}>
            <CardsList cards={cards.cards} />
          </div>
          <div className={styles.paginationWrapper}>
            <Pagination
              currentPage={currentPage}
              pageOnClick={pageOnClick}
              count={count}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default MainLayout;
