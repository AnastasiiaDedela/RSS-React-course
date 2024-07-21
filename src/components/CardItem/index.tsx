import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSelectHero } from '../../redux/slices/heroesSlice';
import { RootState } from '../../redux/store';
import styles from './CardItem.module.css';
import { Hero } from '../../types/types';

export type CardItemProps = {
  hero: Hero;
};

const CardItem: React.FC<CardItemProps> = ({ hero }) => {
  const dispatch = useDispatch();
  const selectedHeroes = useSelector(
    (state: RootState) => state.heroes.selectedHeroes,
  );
  const isSelected = selectedHeroes.some((h) => h.url === hero.url);

  const handleSelect = () => {
    dispatch(toggleSelectHero(hero));
  };

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.cardImg}>
        <img src={hero.image} alt={hero.name} className={styles.cardImage} />
      </div>
      <div className={styles.cardContent}>
        <h3>{hero.name}</h3>
        <input type="checkbox" checked={isSelected} onChange={handleSelect} />
      </div>
    </div>
  );
};

export default CardItem;
