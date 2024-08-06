import React, { useEffect, useState } from 'react';
import ReviewListItem from '../ReviewListItem/ReviewListItem';
import { fetchMovieReviews } from 'Movie-API/api';
import css from './ReviewList.module.css'

const ReviewList = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!movieId) return;
      setIsLoading(true);

      try {
        const reviews = await fetchMovieReviews(movieId);
        setReviews(reviews);
        console.log(reviews);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (isLoading) {
    return <p style={{ textAlign: 'center' }}>Loading reviews...</p>;
  }

  if (reviews.length === 0) {
    return <p style={{ textAlign: 'center' }}>No reviews found.</p>;
  }

  return (
    <div className={css.reviewList}>
      {reviews.map(review => (
        <ReviewListItem key={review.id} author={review.author} content={review.content} />
      ))}
    </div>
  );
};

export default ReviewList;