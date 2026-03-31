import React from 'react';
import styles from './Card.module.scss';

function Card({ id, title, imageUrl, price, onFavourite, onPlus, favorited=false, added=false }) {
    const [isAdded, setIsAdded] = React.useState(added);
    const [isFavorite, setIsFavorite] = React.useState(favorited);

    const onClickPlus = () => {
        onPlus({ id, title, imageUrl, price });
        setIsAdded(!isAdded);
    };

    const onClickFavorite = () => {
        onFavourite({ id, title, imageUrl, price });
        setIsFavorite(!isFavorite);
    };

    return (
        <div className={styles.card}>
            <div className={styles.favorite}>
                <img
                    src={process.env.PUBLIC_URL + (isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg")}
                    alt="Unliked"
                    onClick={onClickFavorite}
                />
            </div>
            <img width={133} height={112} src={process.env.PUBLIC_URL + imageUrl} alt="" />
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена:</span>
                    <b>{price} руб.</b>
                </div>
                <img
                    className={styles.plus}
                    onClick={onClickPlus}
                    src={process.env.PUBLIC_URL + (isAdded ? "/img/btn-checked.svg" : "/img/btn-unchecked.svg")}
                    alt="Plus"
                />
            </div>
        </div>
    );
}

export default Card;
