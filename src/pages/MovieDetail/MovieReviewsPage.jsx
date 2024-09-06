import React, {useState} from 'react'
import { useMovieReviewsQuery } from '../../hooks/useMovieReview';
import { useParams } from 'react-router-dom';
import { Badge } from 'react-bootstrap';

const MovieReviewsPage = () => {
    const { id } = useParams();
    const { data: reviews, isLoading, error } = useMovieReviewsQuery({ id });
  
    // 모든 리뷰를 보거나 일부만 보는 상태 관리
    const [showAllReviews, setShowAllReviews] = useState(false);
  
    // 처음에는 2개의 리뷰만 표시
    const displayedReviews = showAllReviews ? reviews.results : reviews.results.slice(0, 2);
  
    if (isLoading) {
      return <div>Loading reviews...</div>;
    }
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }
  
    return (
      <div>
        <h2>Reviews</h2>
        {reviews.results.length > 0 ? (
          <ul>
            {displayedReviews.map(review => (
              <li key={review.id}>
                <strong>{review.author}:</strong>
                <p>{review.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>There are no reviews</p>
        )}
  
        {/* 리뷰가 2개 이상일 경우에만 더보기/접기 버튼 표시 */}
        {reviews.results.length > 2 && (
          <Badge bg='danger' onClick={() => setShowAllReviews(!showAllReviews)}>
            {showAllReviews ? "Fold" : "more..."}
          </Badge>
        )}
      </div>
    );
  };
  
  export default MovieReviewsPage;