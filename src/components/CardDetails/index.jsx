import { useNavigate, useParams } from 'react-router-dom';
import styles from './CardDetails.module.css';
import { useEffect, useState, useRef } from 'react';
const CardDetails = () => {
    const { id } = useParams();
    const [hero, setHero] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { page } = useParams();
    const navigate = useNavigate();
    const wrapperRef = useRef(null);
    useEffect(() => {
        console.log('one');
        fetch(`https://swapi.dev/api/people/${id}`)
            .then((res) => res.json())
            .then((res) => {
            setHero(res);
            setIsLoading(false);
        })
            .catch((err) => {
            setError(err);
            console.error('Error fetching data:', err);
        });
        return () => {
            console.log('two');
        };
    }, [id]);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current &&
                !wrapperRef.current.contains(event.target)) {
                navigate(`/search/${page}`);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [navigate, page]);
    return (<div ref={wrapperRef} className={styles.wrapper}>
      {isLoading && <p>Loading...</p>}
      {hero && (<div className={styles.detailsSidebar}>
          <button className={styles.closeBtn} onClick={() => {
                navigate(`/search/${page}`);
            }}>
            X
          </button>
          <div className={styles.detailsContent}>
            <h2>Card Details :</h2>
            <p>
              <b>Name:</b> {hero.name}
            </p>
            <p>
              <b>Height:</b> {hero.height}
            </p>
            <p>
              <b>Mass:</b> {hero.mass}
            </p>
            <p>
              <b>Hair color:</b> {hero.hair_color}
            </p>
            <p>
              <b>Skin color:</b> {hero.skin_color}
            </p>
            <p>
              <b>Eye color:</b> {hero.eye_color}
            </p>
            <p>
              <b>Birth year:</b> {hero.birth_year}
            </p>
            <p>
              <b>Gender:</b> {hero.gender}
            </p>
          </div>
        </div>)}
      {error && <p>Error: {error}</p>}
    </div>);
};
export default CardDetails;
