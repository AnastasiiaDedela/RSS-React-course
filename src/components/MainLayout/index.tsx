import React, { useEffect } from 'react';
import styles from './MainLayout.module.css';
import Search from '../Search';
import CardsList from '../CardsList';
import Pagination from '../Pagination';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useGetHeroesQuery } from '../../redux/api/heroApi';
import { useDispatch } from 'react-redux';
import {
  setCount,
  setHeroes,
  setIsLoading,
} from '../../redux/slices/heroesSlice';

const MainLayout: React.FC = () => {
  const { page: currentPage } = useParams<{ page: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const pageNumber = parseInt(currentPage || '1', 10);
  const searchValue = localStorage.getItem('searchValue') || '';

  const { data, error, isLoading } = useGetHeroesQuery({
    page: pageNumber,
    searchValue,
  });

  useEffect(() => {
    if (pageNumber < 1 || pageNumber > 9) {
      navigate(`/search/1`);
    }
  }, [pageNumber, navigate]);

  useEffect(() => {
    if (data) {
      dispatch(setHeroes(data.results));
      dispatch(setCount(data.count));
      dispatch(setIsLoading(false));
    } else if (error) {
      console.error('Error fetching data:', error);
      dispatch(setIsLoading(false));
    }
  }, [data, error, dispatch]);

  const pageOnClick = (pageNum: number) => {
    navigate(`/search/${pageNum}`);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchBlock}>
        <Search
          handleRequest={(searchValue: string, pageNumber: number) => {
            localStorage.setItem('searchValue', searchValue);
            navigate(`/search/${pageNumber}`);
          }}
          currentPage={pageNumber}
        />
      </div>
      {isLoading ? (
        <h2>LOADING...</h2>
      ) : (
        <>
          <div className={styles.contentWrapper}>
            <div className={styles.cardsWrapper}>
              <CardsList heroes={data?.results || []} />
            </div>
            <div className={styles.detailsWrapper}>
              <Outlet />
            </div>
          </div>
          <div className={styles.paginationWrapper}>
            <Pagination
              currentPage={pageNumber}
              pageOnClick={pageOnClick}
              count={data?.count || 0}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default MainLayout;
