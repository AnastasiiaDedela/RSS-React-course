import styles from './CardList.module.css';
import CardItem from '../CardItem';
import { Hero } from '../../types/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export type CardsProps = {
  heroes: Hero[];
};

const CardsList: React.FC<CardsProps> = ({ heroes }) => {
  const selectedHeroes = useSelector(
    (state: RootState) => state.selectedHeroes.selectedHeroes,
  );
  return (
    <div className={styles.wrapper}>
      <h2>Results Found :</h2>
      <div className={styles.cardsList}>
        {heroes.map((hero, index) => (
          <CardItem
            key={index}
            hero={hero}
            isSelected={selectedHeroes.some((h: Hero) => h.url === hero.url)}
            data-testid="card-item"
          />
        ))}
      </div>
    </div>
  );
};

export default CardsList;
