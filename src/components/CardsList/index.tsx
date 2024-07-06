import { Component } from 'react';
import styles from './CardList.module.css';
import { CardsProps } from '../../types/types';
import CardItem from '../CardItem';

class CardsList extends Component<CardsProps> {
  render() {
    const { cards } = this.props;
    return (
      <div className={styles.wrapper}>
        <h2>Results Found : </h2>
        <div className={styles.cardsList}>
          {cards &&
            cards.map((card, index) => (
              <CardItem
                key={index}
                name={card.name}
                description={card.description}
                age={card.age}
                image={card.image}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default CardsList;
