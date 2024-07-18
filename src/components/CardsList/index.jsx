import styles from './CardList.module.css';
import CardItem from '../CardItem';
import { useNavigate, useParams } from 'react-router-dom';
const CardsList = ({ heroes }) => {
    const navigate = useNavigate();
    const { page } = useParams();
    return (<div className={styles.wrapper}>
      <h2>Results Found :</h2>
      <div className={styles.cardsList}>
        {heroes.map((hero, index) => (<div onClick={() => {
                const linkArray = hero.url.split('/');
                const userIndex = linkArray[linkArray.length - 2];
                navigate(`/search/${page}/details/${userIndex}`);
            }}>
            <CardItem key={index} name={hero.name} image={hero.image}/>
          </div>))}
      </div>
    </div>);
};
export default CardsList;
