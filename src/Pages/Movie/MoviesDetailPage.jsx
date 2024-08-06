import { useEffect, useState ,Suspense} from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchMovieDetails } from 'Movie-API/api';
import { useLocation, Outlet } from 'react-router-dom';
import css from './MovieDetailPage.module.css'

const MoviesDetailPage = () => {

    const { movieId } = useParams();
    const [movieDetails, setMovieDetails] = useState(null);
    const location = useLocation();
  
    // Add console logs for the location object
    useEffect(() => {
      console.log('Location object:', location);
    }, [location]);
  
    const backLink = location.state?.from ?? '/movies';
    const movieTitleFromState = location.state?.movieTitle;
  
    useEffect(() => {
      const fetchDetails = async () => {
        try {
          const movie = await fetchMovieDetails(movieId);
          setMovieDetails(movie);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchDetails();
    }, [movieId]);
  
    if (!movieDetails) {
      return <div>Loading...</div>;
    }
  return (
    <>
      {backLink && (
        <Link to={backLink} className={css.goBackLink}>
          <button className={css.goBackButton}>⬅ Go back</button>
        </Link>
      )}
      <div className={css.movieDetailsContainer}>
        <img
          className={css.image}
          src={
            movieDetails.poster_path
              ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
              : `https://fakeimg.pl/600x400?text=No+Image+Available`
          }
          alt={movieDetails.title}
        />
        <div className={css.movieDetailsWrap}>
          <h1>{movieDetails.title}</h1>
          {movieTitleFromState && (
            <h4 className={css.stateInfo}>
              Passed from state: {movieTitleFromState}
            </h4>
          )}
          <h4>User score: {Math.round(movieDetails.vote_average * 10)}%</h4>
          <h2>Overview</h2>
          <p>{movieDetails.overview}</p>
          <h2>Genres</h2>
          <p>
            {movieDetails.genres.map(genre => (
              <span key={genre.id}> {genre.name}</span>
            ))}
          </p>
        </div>
      </div>

      <hr />
      <h3>Additional information</h3>
      <Link to="cast" className={css.link}>
        <button className={css.infoButton}>Cast</button>
      </Link>
      <Link to="reviews" className={css.link}>
        <button className={css.infoButton}>Reviews</button>
      </Link>
      <hr />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
}

export default MoviesDetailPage;