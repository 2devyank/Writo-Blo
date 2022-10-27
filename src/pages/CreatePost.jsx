import React from 'react'
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import "../style/create.css"
import {useState} from "react";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
function CreatePost() {
  const [file,setfile]=useState(null);
  
  const [title,settitle]=useState("");
  const [post,setpost]=useState("");

  const [tags,setTags]=useState([]);
  const [input,setinput]=useState("");

const handleKeyDown=(e)=>{
  const { key } = e;
  const trimmedInput = input.trim();

  if (key === ',' && trimmedInput.length && !tags.includes(trimmedInput)) {
    e.preventDefault();
    setTags(prevState => [...prevState, trimmedInput]);
    setinput('');
  }
  }
const onChange=(e)=>{
  e.preventDefault();
const {value}=e.target;
setinput(value);
}
const deletetag=(index)=>{
  setTags(pstate=>pstate.filter((tag,i)=>i!==index))
}


const navigate=useNavigate();

const createPost=async(e)=>{
  e.preventDefault();
  await addDoc(collection(db,"posts"),{title,post,tags,createdAt:serverTimestamp(),name:localStorage.getItem("name"),id:localStorage.getItem("Id")})
navigate("/");
}


  return (
    <div className="create">

    <Form className="col" onSubmit={createPost}>
    <input type="file" value={file} onChange={(e)=>setfile(e.target.files[0])} />
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Title</Form.Label>
      <Form.Control value={title} onChange={(e)=>settitle(e.target.value)} className="in" type="text" placeholder="Enter title" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Tags</Form.Label>
      <br />
      {
        tags.map((tag,index)=>(
          <div className="tag-item">
          <span>{tag}</span>
          <span className='close' onClick={()=>deletetag(index)}>&times;</span>
        </div>
        ))}
     
    
      <br/>

      <Form.Control value={input} onChange={onChange} onKeyDown={handleKeyDown} className="in" type="text" placeholder="Enter title" />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Content</Form.Label>
    <textarea name="" id="" className="area" value={post} onChange={(e)=>setpost(e.target.value)}/>
     
    </Form.Group>
    
    <Button  variant="primary" type="submit">
      Submit Post
    </Button>
  </Form>
    </div>
  )
}

export default CreatePost