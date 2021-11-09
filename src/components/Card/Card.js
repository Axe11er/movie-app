import { Rate } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import s from './Card.module.css';

export default function Card({ title, overview, poster, genres, releaseDate, rating, onChange }) {
  const reduceOverview = (text) => {
    if (text.length > 100) {
      const reducedText = text.split(' ').reduce((string, word, index) => {
        // eslint-disable-next-line no-param-reassign
        string += index < 15 ? `${word} ` : '';
        return string;
      }, '');
      return `${reducedText}...`;
    }
    return text;
  };

  let ratingColor = null;
  if (rating >= 0 && rating < 3) ratingColor = s.card__rating_bad;
  if (rating >= 3 && rating < 5) ratingColor = s.card__rating_average;
  if (rating >= 5 && rating < 7) ratingColor = s.card__rating_good;
  if (rating >= 7) ratingColor = s.card__rating_awesome;

  const genresList = genres.map(({ id, name }) => <span key={id}>{name}</span>);
  return (
    <div className={s.card}>
      <img src={poster !== null ? poster : 'image not found'} alt="poster" className={s.card__poster} />
      <div className={s.card__body}>
        <header className={s.card__header}>
          <img src={poster !== null ? poster : 'image not found'} alt="poster" className={s.card__poster_mini} />
          <div className={s.card__title__container}>
            <div className={s.card__title}>
              <h1>{title}</h1>
              <div className={`${s.card__rating} ${ratingColor}`}>{rating}</div>
            </div>
            <div className={s.card__date}>{releaseDate}</div>
            <div className={s.card__tags}>{genresList}</div>
          </div>
        </header>

        <div className={s.card__description}>
          <p>{reduceOverview(overview)}</p>
        </div>
        <Rate className={s.card__stars} count={10} value={rating} onChange={onChange} />
      </div>
    </div>
  );
}

Card.defaultProps = {
  title: '',
  overview: '',
  poster: '',
  genres: [],
  releaseDate: '',
  rating: 0,
  onChange: () => {},
};

Card.propTypes = {
  title: PropTypes.string,
  overview: PropTypes.string,
  poster: PropTypes.string,
  genres: PropTypes.arrayOf(PropTypes.object),
  releaseDate: PropTypes.string,
  rating: PropTypes.number,
  onChange: PropTypes.func,
};
