import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../style/create.css"

function CreatePost() {
  return (
    <div className="create">

    <Form className="col">
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Title</Form.Label>
      <Form.Control className="in" type="text" placeholder="Enter title" />
      
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>tags</Form.Label>
      <Form.Control type="text" placeholder="tags..."  className="in" />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Content</Form.Label>
    <textarea name="" id="" className="area"/>
     
    </Form.Group>
    
    <Button variant="primary" type="submit">
      Submit Post
    </Button>
  </Form>
    </div>
  )
}

export default CreatePost