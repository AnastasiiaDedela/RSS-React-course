import { Component } from 'react';
import styles from './CardItem.module.css';
import { CardItemProps } from '../../types/types';

class CardItem extends Component<CardItemProps> {
  render() {
    const { name, description, age, image } = this.props;
    return (
      <div className={styles.cardWrapper}>
        <div className={styles.cardImg}>
          <img src={image} alt={name} className={styles.cardImage} />
        </div>
        <div className={styles.cardContent}>
          <h3>{name}</h3>
          <p>Age: {age}</p>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

export default CardItem;
