import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useUserAuth} from "../Context.jsx";
import { db } from '../firebase.jsx';
import "../style/home.css"

function Home() {
  const {postdata,handlesearch,user}=useUserAuth()
  // console.log(postdata[0].timestamp);
  // console.log(postdata)
 const  navigate=useNavigate();
  // const handlecard=(name)=>{
  //     navigate(`/home/${name}`)

  // }

  return (

    <div className='home'>

      <div className='cardcover'>
 
 {
   handlesearch().map((post)=>{
     
    return  <div className='cardprof' >
      <span >{post.name}</span>
      <br />
      <span className="name">{new Date(post.createdAt.seconds * 1000).toLocaleDateString("en-US")}</span>
      <h3>{post.title}</h3>
      <span className='tags'>{post.tags.map((t)=> <span>#{t+"  "}</span> )}</span>
  
      <p>{post.post.substring(0,70)}...</p>
{/* <p>❤️</p> */}
{/* <button onClick={handlecard(`${post.title}`)}>View Full</button> */}
<h6>❤️ {post.numbe}</h6>

<Link className='link' to={`/${post.title}`}>View Blog</Link>
      </div>
   })
      
}
 
 
      </div>


    </div>
  )
}

export default Home