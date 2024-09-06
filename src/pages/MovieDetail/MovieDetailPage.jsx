import React from 'react';
import { useMovieDetailQuery } from '../../hooks/useMovieDetail';
import { useNavigate, useParams } from 'react-router-dom'; 
import './MovieDetailPage.style.css';
import { Badge } from 'react-bootstrap';

const MovieDetailPage = () => {
  const { id } = useParams();
  const { data: movie, isLoading, error } = useMovieDetailQuery({ id });
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='movie-detail'>
      <div className='movie-info'>
        <h1>{movie.title}</h1>
        <div>
          <Badge bg="danger" >Release Date</Badge> {movie.release_date}
        </div>
        <div>
          <Badge bg="danger" >Popularity</Badge> {movie.popularity}
        </div>
        <div>
          <Badge bg="danger" >Budget</Badge> ${movie.budget}
        </div>
        <div>
          <Badge bg="danger" >Genre</Badge > {movie.genres.map(genre => genre.name).join(', ')}
        </div>
        <div>
          <Badge bg="danger" >Overview</Badge> {movie.overview}
        </div>
        <button onClick={() => navigate(`/movies/${id}/reviews`)} className='review-btn'>Reviews</button>
        <button className='review-btn'>Trailer</button>
      </div>
      <img className='movie-img' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
    </div>
  );
};

export default MovieDetailPage;