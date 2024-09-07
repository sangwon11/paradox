import React, { useState, useEffect } from 'react'
import './MoviePage.style.css';
import { useSearchMovieQuery } from '../../hooks/useSearchMovie';
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';
import { useSearchParams } from 'react-router-dom';
import { Container, Row, Col, Form, Spinner, Alert } from 'react-bootstrap';
import MovieCard from '../../common/MovieCard/MovieCard';
import ReactPaginate from 'react-paginate';

const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const [page, setPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortBy, setSortBy] = useState('popularity.desc');
  const keyword = query.get('q') || '';

  const { data: movieData, isLoading: isLoadingMovies, isError: isMoviesError, error: moviesError } = useSearchMovieQuery({ keyword, page });

  const { data: genreData, isLoading: isLoadingGenres, isError: isGenresError, error: genresError } = useMovieGenreQuery();

  useEffect(() => {
    setPage(1);
  }, [keyword, selectedGenre, sortBy]);

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
    setPage(1);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setPage(1);
  };

  if (isLoadingMovies || isLoadingGenres) {
    return (
      <div className="text-center">
        <Spinner animation="border" />
        <p>Loading...</p>
      </div>
    );
  }

  if (isMoviesError || isGenresError) {
    return <Alert variant="danger">Error: {moviesError?.message || genresError?.message}</Alert>;
  }

  const filteredMovies = movieData.results
    .filter(movie => (selectedGenre ? movie.genre_ids.includes(parseInt(selectedGenre)) : true))
    .sort((a, b) => {
      if (sortBy === 'popularity.asc') {
        return a.popularity - b.popularity;
      } else if (sortBy === 'popularity.desc') {
        return b.popularity - a.popularity;
      }
      return 0;
    });

  if (filteredMovies.length === 0) {
    return <div>No results found for "{keyword}"</div>;
  }

  return (
    <Container>
      <Row>
        <Col lg={4} xs={12}>
          <Form>
            <Form.Group controlId="genreSelect">
              <Form.Label>Filter by Genre</Form.Label>
              <Form.Control as="select" value={selectedGenre} onChange={handleGenreChange}>
                <option value="">All Genres</option>
                {genreData.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="sortSelect">
              <Form.Label>Sort by</Form.Label>
              <Form.Control as="select" value={sortBy} onChange={handleSortChange}>
                <option value="popularity.desc">Popularity (High to Low)</option>
                <option value="popularity.asc">Popularity (Low to High)</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Col>
        <Col lg={8} xs={12}>
          <Row>
            {filteredMovies.map((movie, index) => (
              <Col key={index} lg={4} xs={12}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
          {movieData.total_pages > 1 && (
            <ReactPaginate
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={movieData.total_pages}
              previousLabel="< previous"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
              forcePage={page - 1}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MoviePage;