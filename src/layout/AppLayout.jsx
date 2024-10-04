import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import './AppLayout.style.css';



const AppLayout = () => {
  const [keyword,setKeyword] = useState("");
  const navigate = useNavigate();
  const searchByKeyword = (e) => {
    e.preventDefault()
    navigate(`/movies?q=${keyword}`);
    setKeyword("");
  }
  return (
    <div id='navbar'>
      <Navbar expand="lg" className="navbar-bg">
        <Container fluid>
          <Navbar.Brand href="" className='logo'>Paradox</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="/" className='link'>Home</Nav.Link>
              <Nav.Link href="/movies" className='link'>Movies</Nav.Link>
            </Nav>
            <Form className="d-flex" onSubmit={searchByKeyword}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <Button variant="outline-success" className='search-btn' type='submit'>Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  )
}

export default AppLayout;