import React from 'react';
import { useMovieDetailQuery } from '../../hooks/useMovieDetail';
import { useParams } from 'react-router-dom'; 

const MovieDetailPage = () => {
  const { id } = useParams();

  const { data: movie, isLoading, error } = useMovieDetailQuery({ id });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>장르: {movie.genres.map(genre => genre.name).join(', ')}</p>
      <p>인기도: {movie.popularity}</p>
      <p>줄거리: {movie.overview}</p>
      <p>예산: ${movie.budget}</p>
      <p>개봉일: {movie.release_date}</p>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
    </div>
  );
};

export default MovieDetailPage;