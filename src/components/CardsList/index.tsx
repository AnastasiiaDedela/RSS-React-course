import styles from './CardList.module.css';
import CardItem from '../CardItem';
import { Hero } from '../../types/types';

export type CardsProps = {
  heroes: Hero[];
};

const CardsList: React.FC<CardsProps> = ({ heroes }) => {
  return (
    <div className={styles.wrapper}>
      <h2>Results Found :</h2>
      <div className={styles.cardsList}>
        {heroes.map((hero, index) => (
          <CardItem key={index} hero={hero} />
        ))}
      </div>
    </div>
  );
};

export default CardsList;
