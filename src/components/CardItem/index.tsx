import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleSelectHero } from '../../redux/slices/selectedHeroesSlice';
import styles from './CardItem.module.css';
import { Hero } from '../../types/types';
import { useNavigate, useParams } from 'react-router-dom';

export type CardItemProps = {
  hero: Hero;
  isSelected: boolean;
};

const CardItem: React.FC<CardItemProps> = ({ hero, isSelected, ...props }) => {
  const navigate = useNavigate();
  const { page } = useParams<{ page: string }>();
  const dispatch = useDispatch();

  const handleSelect = () => {
    dispatch(toggleSelectHero(hero));
  };

  return (
    <div
      {...props}
      className={styles.cardWrapper}
      data-testid="card-item"
      data-selected={isSelected.toString()}
    >
      <div
        className={styles.cardImg}
        onClick={() => {
          const linkArray = hero.url.split('/');
          const userIndex = linkArray[linkArray.length - 2];
          navigate(`/search/${page}/details/${userIndex}`);
        }}
      >
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
