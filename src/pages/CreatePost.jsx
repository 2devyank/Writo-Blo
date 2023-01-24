import React from 'react'
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import "../style/create.css"
import { useState } from "react";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { v4 } from "uuid"
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { useEffect } from 'react';
import { useUserAuth } from '../Context';
// import storage from "../firebase"
function CreatePost() {
  const [file, setfile] = useState(null);
  const { user } = useUserAuth();

  const [title, settitle] = useState("");
  const [post, setpost] = useState("");

  const [tags, setTags] = useState([]);
  const [input, setinput] = useState("");

  const handleKeyDown = (e) => {
    const { key } = e;
    const trimmedInput = input.trim();

    if (key === ',' && trimmedInput.length && !tags.includes(trimmedInput)) {
      e.preventDefault();
      setTags(prevState => [...prevState, trimmedInput]);
      setinput('');
    }
  }
  const onChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setinput(value);
  }
  const deletetag = (index) => {
    setTags(pstate => pstate.filter((tag, i) => i !== index))
  }


  const navigate = useNavigate();

  const createPost = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "posts"), { title, numbe: 0, img: localStorage.getItem("img"), post, tags, createdAt: serverTimestamp(), name: localStorage.getItem("name"), id: localStorage.getItem("Id") })
    navigate("/");
  }

  // const uploadimage=()=>{
  //   if(file==null) return;
  //   const imageRef=ref(storage,`images/${file.name+v4()}`)
  //   uploadBytes(imageRef,file).then(()=>{
  //     alert('image uploaded')
  //   })
  // }

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, file);


      uploadTask.on('state_changed',
        (snapshot) => {

          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {

          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            localStorage.setItem("img", downloadURL);
          });
        }
      );


    };
    file && uploadFile()
  }, [file])

localStorage.removeItem("img")

  return (
    <div className="create">

      <Form className="col" onSubmit={createPost}>
        <input type="file" onChange={(e) => { setfile(e.target.files[0]) }} />
        {/* <Button >upload</Button> */}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control value={title} onChange={(e) => settitle(e.target.value)} className="in" type="text" placeholder="Enter title" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Tags</Form.Label>
          <br />
          <span className="gr">
            (Add upto 4 tags)
          </span>

          <br />
          {
            tags.map((tag, index) => (
              <div className="tag-item">
                <span>{tag}</span>
                <span className='close' onClick={() => deletetag(index)}>&times;</span>
              </div>
            ))}


          <br />

          <Form.Control value={input} onChange={onChange} onKeyDown={handleKeyDown} className="in" type="text" placeholder="Enter title" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Content</Form.Label>
          <textarea name="" id="" className="area" value={post} onChange={(e) => setpost(e.target.value)} />

        </Form.Group>

        <Button variant="outline-light" type="submit">
          Submit Post
        </Button>
      </Form>
    </div>
  )
}

export default CreatePost