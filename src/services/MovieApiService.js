/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
import placeholder from './placeholder-image.png';

export default class MovieApiService {
  _apiKey = 'api_key=d619febe005f34c3e6c87a8020271086';

  _apiBase = 'https://api.themoviedb.org/3/';

  getMoviesByKeyword = async (keyword, page = 1) => {
    const res = await fetch(`${this._apiBase}search/movie?${this._apiKey}&query=${keyword}&page=${page}`);
    if (!res.ok) throw new Error(`Could not fetch ${this._apiBase}?query=${keyword} received ${res.status}`);
    const data = await res.json();
    return this._transformData(data);
  };

  getGenres = async () => {
    const res = await fetch(`${this._apiBase}genre/movie/list?${this._apiKey}`);
    if (!res.ok) throw new Error(`Could not fetch ${this._apiBase}genre/movie/list received ${res.status}`);
    const body = await res.json();
    return body.genres;
  };

  createGuestSession = async () => {
    const res = await fetch(`${this._apiBase}authentication/guest_session/new?${this._apiKey}`);
    if (!res.ok)
      {throw new Error(`Could not fetch ${this._apiBase}authentication/guest_session/new received ${res.status}`);}
    const body = await res.json();

    return body.guest_session_id;
  };

  rateMovie = async (value, movie_id, guest_session_id) => {
    const res = await fetch(
      `${this._apiBase}movie/${movie_id}/rating?${this._apiKey}&guest_session_id=${guest_session_id}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({ value: value === 0 ? 1 : value }),
      }
    );
    if (!res.ok) throw new Error(`Could not fetch ${this._apiBase}movie/${movie_id}/rating received ${res.status}`);
  };

  getRatedMovies = async (guest_session_id) => {
    const res = await fetch(
      `${this._apiBase}guest_session/${guest_session_id}/rated/movies?${this._apiKey}&language=en-US&sort_by=created_at.asc`
    );
    if (!res.ok) throw new Error(`Could not fetch ${this._apiBase}guest_session/rated/movies received ${res.status}`);
    const data = await res.json();
    return this._transformData(data);
  };

  _transformData = async (data) => {
    const genres = await this.getGenres();
    return {
      movies: data.results.map((item) => ({
          id: item.id,
          overview: item.overview,
          poster: item.poster_path ? `https://image.tmdb.org/t/p/original/${item.poster_path}` : placeholder,
          releaseDate: item.release_date,
          title: item.title,
          rating: item.rating,
          voteAverage: item.vote_average,
          genres: genres.filter((genre) =>
            item.genre_ids.some((id) => id === genre.id)
          ),
        })),
      totalResults: data.total_results,
    };
  };
}
