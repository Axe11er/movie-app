import React from 'react';
import PropTypes from 'prop-types';
import Search from '../Search';
import Rated from '../Rated';
import s from './Tabs.module.css';
import ErrorBoundary from '../ErrorBoundary';

export default function Tabs({
  movies,
  ratedMovies,
  activeTab,
  keyword,
  loading,
  totalResults,
  page,
  onSearchChange,
  setKeyword,
  onTabLabelClick,
  onPageChange,
  getRatedMovies,
  rateMovie,
}) {
  const searchTab = activeTab.search ? (
    <ErrorBoundary>
      <Search
        movies={movies}
        keyword={keyword}
        loading={loading}
        totalResults={totalResults}
        page={page}
        onSearchChange={onSearchChange}
        setKeyword={setKeyword}
        onPageChange={onPageChange}
        rateMovie={rateMovie}
      />
    </ErrorBoundary>
  ) : null;
  const ratedTab = activeTab.rated ? (
    <ErrorBoundary>
      <Rated movies={ratedMovies} onRatingChange={rateMovie} />
    </ErrorBoundary>
  ) : null;

  return (
    <div className={s.container}>
      <div className={s.tabLabels} onClick={onTabLabelClick}>
        <span className={`${s.tab} ${activeTab.search ? s.activeTab : ''}`} role="button" tabIndex="0">
          Search
        </span>
        <span
          className={`${s.tab} ${activeTab.rated ? s.activeTab : ''}`}
          onClick={getRatedMovies}
          role="button"
          tabIndex="-1"
        >
          Rated
        </span>
      </div>
      {searchTab}
      {ratedTab}
    </div>
  );
}

Tabs.defaultProps = {
  movies: [],
  ratedMovies: [],
  activeTab: {},
  keyword: '',
  page: 1,
  loading: false,
  totalResults: 0,
  onTabLabelClick: () => {},
  getRatedMovies: () => {},
  onSearchChange: () => {},
  setKeyword: () => {},
  onPageChange: () => {},
  rateMovie: () => {},
};

Tabs.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
  ratedMovies: PropTypes.arrayOf(PropTypes.object),
  activeTab: PropTypes.objectOf(PropTypes.bool),
  keyword: PropTypes.string,
  page: PropTypes.number,
  loading: PropTypes.bool,
  totalResults: PropTypes.number,
  onTabLabelClick: PropTypes.func,
  getRatedMovies: PropTypes.func,
  onSearchChange: PropTypes.func,
  setKeyword: PropTypes.func,
  onPageChange: PropTypes.func,
  rateMovie: PropTypes.func,
};
