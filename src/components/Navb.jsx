import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Navigate, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../Context';
import "../style/navbar.css"

function Navb() {
  const navigate=useNavigate();
  const {search,setsearch}=useUserAuth();
  
  const handlehomeclick=()=>{
    navigate("/")
  }
  const handleprofileclick=()=>{
    navigate("/profile")
  }
  const handlecreateclick=()=>{
    navigate("/create")
  }
  return (
    <Navbar className='nav'  expand="lg">
    <Container fluid>
      <Navbar.Brand className='titl' onClick={handlehomeclick}>WritoBlo</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          <Nav.Link onClick={handleprofileclick}>Profile</Nav.Link>
          <Nav.Link onClick={handlecreateclick} >Create Post</Nav.Link>
         
        
        </Nav>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            
            onChange={(e)=>setsearch(e.target.value)}
          />
          {/* <Button variant="outline-success">Search</Button> */}
        </Form>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Navb