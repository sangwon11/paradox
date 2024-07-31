import React from 'react'
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies';
import 'react-multi-carousel/lib/styles.css';
import { Alert } from 'bootstrap';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import { responsive } from '../../../../constants/responsive';

const PopularMovieSlide = () => {
    const {data, isLoading, isError, error} = usePopularMoviesQuery();

    if (isLoading) {
        return <h1>Loading....</h1>
    }
    if (isError) {
        return <Alert>{error.message}</Alert>
    }
  return (
    <div>
      <MovieSlider title='Popular Movies' movies={data.results} responsive={responsive} />
    </div>
  );
};

export default PopularMovieSlide;