import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card';
import ErrorBoundary from '../ErrorBoundary';
import s from './Rated.module.css';

export default function Rated({ movies, onRatingChange }) {
  const cards = movies.map(({ id, rating, ...rest }) => (
    <ErrorBoundary key={id}>
      <Card
        key={id}
        rating={rating}
        {...rest}
        onChange={(value) => {
          onRatingChange(value, id);
        }}
      />
    </ErrorBoundary>
  ));
  return (
    <div className={s.container}>
      <div className={s.cards}>{cards}</div>
    </div>
  );
}

Rated.defaultProps = {
  movies: [],
  onRatingChange: () => {},
};

Rated.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
  onRatingChange: PropTypes.func,
};
