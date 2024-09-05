import React, { useState } from 'react'
import './MoviePage.style.css';
import { useSearchMovieQuery } from '../../hooks/useSearchMovie';
import { useSearchParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import MovieCard from '../../common/MovieCard/MovieCard';
import ReactPaginate from 'react-paginate';

const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const [page,setPage] = useState(1);
  const keyword = query.get("q");

  const {data, isLoading, isError,error} = useSearchMovieQuery({keyword, page});
  const handlePageClick = ({selected}) => {
    setPage(selected + 1)
  }
  console.log('ddd',data)

  if (!data?.results || data.results.length === 0) {
    return <div>No results found for "{keyword}"</div>
  }

  return (
    <Container>
      <Row>
        <Col lg={4} xs={12}></Col>
        <Col lg={8} xs={12}>
          <Row>
            {data?.results.map((movie, index) =>
              <Col key={index} lg={4} xs={12}>
                <MovieCard movie={movie} />
              </Col>)}
          </Row>
          <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={data?.total_pages}
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
        </Col>
      </Row>
    </Container>
  )
}

export default MoviePage;