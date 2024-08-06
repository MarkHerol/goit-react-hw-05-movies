import React, { useEffect, useState } from 'react';
import { fetchMovieByQuery } from 'Movie-API/api';
import { MovieList } from 'components/MovieList/MovieList';
import { Outlet, useSearchParams, useParams } from 'react-router-dom';
import css from './MoviesPage.module.css';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const movieName = searchParams.get('query') ?? ''; // Default to an empty string
  const { movieId } = useParams();
  console.log('movieId', movieId);

  const [isLoading, setIsLoading] = useState(false);

  const updateQueryString = query => {
    const nextParams = query !== '' ? { query } : {};
    setSearchParams(nextParams);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      if (!movieName.trim()) {
        setMovies([]); // Clear movies when search is empty
        return;
      }
      setIsLoading(true);

      try {
        const movies = await fetchMovieByQuery(movieName);
        console.log('movies', movies);
        setMovies(movies);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [movieName]);

  return (
    <div>
      <div className={css.inputWrapper}>
        <input
          type="text"
          className={css.input}
          onChange={e => updateQueryString(e.target.value)}
          placeholder="Search movies..."
          value={movieName}
        />
      </div>
      {isLoading ? (
        <p style={{ textAlign: 'center' }}>Loading...</p>
      ) : (
        <MovieList movies={movies} />
      )}
      <Outlet />
    </div>
  );
};

export default MoviesPage;
