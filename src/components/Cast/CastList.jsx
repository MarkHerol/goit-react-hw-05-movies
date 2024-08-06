import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from 'Movie-API/api';
import { CastListItem } from 'components/CastListItem/CastListItem';

const CastList = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await fetchMovieCast(movieId);
        setCast(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCast();
  }, [movieId]);

  return (
    <>
      {cast.length !== 0 ? (
        <div>
          <h2>Movie Cast</h2>
          <ul>
            {cast.map(({ id, profile_path, original_name, name }) => (
              <CastListItem
                key={id}
                id={id}
                profilePath={profile_path}
                originalName={original_name}
                name={name}
              />
            ))}
          </ul>
        </div>
      ) : (
        <div>We don't have any cast for this movie.</div>
      )}
    </>
  );
};

export default CastList;