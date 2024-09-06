import React, {useState} from 'react'
import { useMovieReviewsQuery } from '../../hooks/useMovieReview';
import { useParams } from 'react-router-dom';
import { Badge } from 'react-bootstrap';

const MovieReviewsPage = () => {
    const { id } = useParams();
    const { data: reviews, isLoading, error } = useMovieReviewsQuery({ id });
    const [showAllReviews, setShowAllReviews] = useState(false);
  
    if (isLoading) {
      return <div>Loading reviews...</div>;
    }
    if (error) {
      return <div>Error: {error.message}</div>;
    }
    if (!reviews || !reviews.results || reviews.results.length === 0) {
      return <div>There are no reviews</div>;
    }
  
    const displayedReviews = showAllReviews ? reviews.results : reviews.results.slice(0, 2);
  
    return (
      <div>
        <h2>Reviews</h2>
        <ul>
          {displayedReviews.map(review => (
            <li key={review.id}>
              <strong>{review.author}:</strong>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
  
        {reviews.results.length > 2 && (
          <Badge bg='danger' onClick={() => setShowAllReviews(!showAllReviews)}>
            {showAllReviews ? "Flod" : "more..."}
          </Badge>
        )}
      </div>
    );
  };
  
  export default MovieReviewsPage;