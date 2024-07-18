import React, { useEffect } from 'react';
import styles from './MainLayout.module.css';
import Search from '../Search';
import CardsList from '../CardsList';
import Pagination from '../Pagination/index';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCount, setHeroes, setIsLoading, } from '../../redux/slices.ts/heroesSlice';
const MainLayout = () => {
    // const [count, setCount] = useState(0);
    // const [isLoading, setIsLoading] = useState(true);
    // const [heroes, setHeroes] = useState<Hero[]>([]);
    const heroes = useSelector((state) => state.heroes.heroes);
    const count = useSelector((state) => state.heroes.count);
    const isLoading = useSelector((state) => state.heroes.isLoading);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { page: currentPage } = useParams();
    const pageOnClick = (pageNum) => {
        navigate(`/search/${pageNum}`);
    };
    useEffect(() => {
        const validPage = parseInt(currentPage);
        if (validPage < 1 || validPage > 9) {
            navigate(`/search/1`);
        }
    }, [currentPage]);
    useEffect(() => {
        const storedSearchValue = localStorage.getItem('searchValue') || '';
        handleRequest(storedSearchValue, parseInt(currentPage || '1'));
    }, [currentPage]);
    const handleRequest = (searchValue, currentPage) => {
        let url = `https://swapi.dev/api/people/?page=${currentPage}`;
        if (searchValue) {
            url += `&search=${searchValue}`;
        }
        fetch(url)
            .then((res) => res.json())
            .then((res) => {
            const heroes = res.results.map((person) => {
                const splitedURL = person.url.split('/');
                const id = splitedURL[splitedURL.length - 2];
                return {
                    ...person,
                    image: `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`,
                };
            });
            dispatch(setHeroes(heroes));
            dispatch(setCount(res.count));
            dispatch(setIsLoading(false));
        })
            .catch((error) => {
            setIsLoading(false);
            console.error('Error fetching data:', error);
        });
    };
    return (<div className={styles.wrapper}>
      <div className={styles.searchBlock}>
        <Search handleRequest={handleRequest} currentPage={parseInt(currentPage || '1', 10)}/>
      </div>
      {isLoading ? (<h2>LOADING...</h2>) : (<>
          <div className={styles.contentWrapper}>
            <div className={styles.cardsWrapper}>
              <CardsList heroes={heroes}/>
            </div>
            <div className={styles.detailsWrapper}>
              <Outlet />
            </div>
          </div>
          <div className={styles.paginationWrapper}>
            <Pagination currentPage={parseInt(currentPage || '1', 10)} pageOnClick={pageOnClick} count={count}/>
          </div>
        </>)}
    </div>);
};
export default MainLayout;
