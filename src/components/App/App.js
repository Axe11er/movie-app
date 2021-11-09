import { Button } from 'antd';
import _ from 'lodash';
import React, { Component } from 'react';
import MovieApiService from '../../services/MovieApiService';
import ErrorBoundary from '../ErrorBoundary';
import s from './App.module.css';
import Tabs from '../Tabs';
import ErrorIndicator from '../ErrorIndicator';
import Spinner from '../Spinner';

export default class App extends Component {
  mdbApi = new MovieApiService();

  state = {
    movies: [],
    ratedMovies: [],
    keyword: '',
    page: 1,
    totalResults: 0,
    lastSearch: '',
    activeTab: { search: true, rated: false },
    loading: false,
    error: { status: false, message: null },
  };

  componentDidUpdate(_prevProps, prevState) {
    if (this.state.page !== prevState.page) {
      this.getMovies(this.state.lastSearch, this.state.page);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  onError = (err) => {
    this.setState({ error: { ...this.state.error, status: true, message: err.message }, loading: false });
  };

  onErrorClick = () => {
    this.setState({ error: { ...this.state.error, status: false, message: '' } });
  };

  onSearchChange = (value) => {
    this.setState({ keyword: value });
    if (value.trim()) {
      this.getMovies(this.state.keyword);
      this.setState({ page: 1, lastSearch: this.state.keyword });
    }
  };

  onSearchChange = _.debounce(this.onSearchChange, 700);

  getMovies(keyword, page) {
    this.setState({
      loading: true,
      error: { status: false },
    });
    this.mdbApi
      .getMoviesByKeyword(keyword, page)
      .then((data) => {
        if (data.movies.length === 0) {
          this.setState({ totalResults: 0 });
          throw new Error('Ничего не найдено :(');
        }
        this.setState({
          movies: data.movies,
          keyword: '',
          totalResults: data.totalResults,
          loading: false,
        });
      })
      .catch(this.onError);
  }

  onTabLabelClick = (e) => {
    switch (e.target.textContent) {
      case 'Search':
        this.setState({ activeTab: { search: true, rated: false } });
        break;
      case 'Rated':
        this.setState({ activeTab: { search: false, rated: true } });
        break;
      default:
        break;
    }
  };

  onPageChange = (page) => {
    this.setState({ page });
  };

  createGuestSession = async () => {
    localStorage.setItem('guest_session_id', await this.mdbApi.createGuestSession());
  };

  rateMovie = (value, movieId) => {
    this.setState({
      loading: true,
      error: { status: false },
    });
    this.mdbApi
      .rateMovie(value, movieId, localStorage.getItem('guest_session_id'))
      .then(() => {
        this.timeoutId = setTimeout(this.getRatedMovies, 1000);
      })
      .catch(this.onError);
  };

  getRatedMovies = () => {
    this.setState({
      loading: true,
      error: { status: false },
    });
    this.mdbApi
      .getRatedMovies(localStorage.getItem('guest_session_id'))
      .then((data) =>
        this.setState({
          ratedMovies: data.movies,
          loading: false,
        })
      )
      .catch(this.onError);
  };

  render() {
    const { movies, ratedMovies, loading, error, keyword, page, totalResults, activeTab } = this.state;

    const errorMessage = error.status ? <ErrorIndicator message={error.message} onClick={this.onErrorClick} /> : null;
    const spinner = loading ? <Spinner /> : null;
    const cards = (
      <Tabs
        movies={movies}
        ratedMovies={ratedMovies}
        activeTab={activeTab}
        keyword={keyword}
        loading={loading}
        totalResults={totalResults}
        page={page}
        onSearchChange={this.onSearchChange}
        onTabLabelClick={this.onTabLabelClick}
        onPageChange={this.onPageChange}
        getRatedMovies={this.getRatedMovies}
        rateMovie={this.rateMovie}
      />
    );

    return (
      <ErrorBoundary>
        <div className={s.container}>
          <Button value="create guest session" onClick={this.createGuestSession}>
            create guest session
          </Button>
          {cards}
          {errorMessage}
          {spinner}
        </div>
      </ErrorBoundary>
    );
  }
}
