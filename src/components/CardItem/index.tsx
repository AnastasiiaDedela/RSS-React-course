import styles from './CardItem.module.css';

export type CardItemProps = {
  name: string;
  image: string;
};

const CardItem: React.FC<CardItemProps> = ({ name, image }) => {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.cardImg}>
        <img src={image} alt={name} className={styles.cardImage} />
      </div>
      <div className={styles.cardContent}>
        <h3>{name}</h3>
      </div>
    </div>
  );
};

export default CardItem;
