import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from '../ErrorBoundary';
import Paginator from '../Paginator';
import SearchField from '../SearchField';
import Card from '../Card';
import s from './Search.module.css';

export default function Search({
  movies,
  keyword,
  page,
  loading,
  totalResults,
  onSearchChange,
  setKeyword,
  onPageChange,
  rateMovie,
}) {
  const cards = movies.map(({ id, voteAverage, rating, ...rest }) => (
    <ErrorBoundary key={id}>
      <Card
        rating={voteAverage}
        {...rest}
        onChange={(value) => {
          rateMovie(value, id);
        }}
      />
    </ErrorBoundary>
  ));

  const paginator =
    totalResults > 20 && !loading ? <Paginator total={totalResults} onChange={onPageChange} page={page} /> : null;

  return (
    <div className={s.container}>
      <SearchField
        keyword={keyword}
        //   onChange={(e) => {
        //     onSearchChange(e.target.value);
        //   }}
        onChange={onSearchChange}
        setKeyword={setKeyword}
      />
      <div className={s.cards}>{cards}</div>
      {paginator}
    </div>
  );
}

Search.defaultProps = {
  movies: [],
  keyword: '',
  page: 1,
  loading: false,
  totalResults: 0,
  onSearchChange: () => {},
  setKeyword: () => {},
  onPageChange: () => {},
  rateMovie: () => {},
};

Search.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
  keyword: PropTypes.string,
  page: PropTypes.number,
  loading: PropTypes.bool,
  totalResults: PropTypes.number,
  onSearchChange: PropTypes.func,
  setKeyword: PropTypes.func,
  onPageChange: PropTypes.func,
  rateMovie: PropTypes.func,
};
