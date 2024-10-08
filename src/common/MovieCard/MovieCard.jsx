import React from 'react';
import './MovieCard.style.css';
import { Badge } from 'react-bootstrap';
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({movie}) => {

  const { data: genreData } = useMovieGenreQuery();
  const navigate = useNavigate();

  const showGenre = (genreIdList) => {
    if(!genreData) return []
    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id)
      return genreObj.name;
    })
    return genreNameList;
  }
  const gotoMovieDetailPage = (id) => {
    navigate(`/movies/${id}`);
  }

  return (
    <div style={{backgroundImage:'url(' + `https://media.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}` + ')'}}
    className='movie-card' onClick={() => gotoMovieDetailPage(movie.id)}
    >
      <div className='overlay'>
        <h1>{movie.title}</h1>
        {showGenre(movie.genre_ids).map((genre, index) => (
          <Badge bg="danger" key={index}>
            {genre}
          </Badge>
        ))}
        <div>
          <div>{movie.adult?'over18':'under18'}</div>
        </div>
      </div>
    </div>
  )
}

export default MovieCard;