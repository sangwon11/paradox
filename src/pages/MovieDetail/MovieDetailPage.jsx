import React from 'react';
import { useMovieDetailQuery } from '../../hooks/useMovieDetail';
import { useMovieVideosQuery } from '../../hooks/useMovieVideo';
import { useNavigate, useParams } from 'react-router-dom'; 
import './MovieDetailPage.style.css';
import { Badge } from 'react-bootstrap';
import Recommended from './Recommended';

const MovieDetailPage = () => {
  const { id } = useParams();
  const { data: movie, isLoading: isLoadingMovie, error: movieError } = useMovieDetailQuery({ id });
  const { data: videos, isLoading: isLoadingVideos, error: videosError } = useMovieVideosQuery({ id });

  const navigate = useNavigate();

  if (isLoadingMovie || isLoadingVideos) {
    return <div>Loading...</div>;
  }

  if (movieError || videosError) {
    return <div>Error: {movieError?.message || videosError?.message}</div>;
  }

  // 예고편 중 유튜브 링크만 가져오기 (TMDB에서 제공하는 주요 사이트는 YouTube가 많음)
  const trailer = videos.results.find(video => video.site === 'YouTube' && video.type === 'Trailer');

  return (
    <div>
      <div className='detail-cotainer'>
        <div className='movie-detail'>
          <img className='movie-img' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
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
            {trailer ? (
              <div>
                <h2>Trailer</h2>
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
                <p>예고편을 찾을 수 없습니다.</p>
            )}
            <div className='review-btn-area'>
              <button onClick={() => navigate(`/movies/${id}/reviews`)} className='review-btn'>Reviews</button>
            </div>
          </div>
        </div>
      </div>
      <Recommended />
    </div>
  );
};

export default MovieDetailPage;