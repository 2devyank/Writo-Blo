import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from "../Context.jsx";
import { db } from '../firebase.jsx';
import "../style/home.css"

function Home() {
  const { postdata, handlesearch, user } = useUserAuth()
  const navigate = useNavigate();
  return (
    <div className='home'>
      <div className='cardcover'>
        {
          handlesearch().map((post) => {
            return <div className='cardprof' >
              <span >{post.name}</span>
              <br />
              <span className="name">{new Date(post.createdAt.seconds * 1000).toLocaleDateString("en-US")}</span>
              <h3>{post.title}</h3>
              <span className='tags'>{post.tags.map((t) => <span>#{t + "  "}</span>)}</span>

              <p>
              <ReactMarkdown>
              {post.post.substring(0, 70)}...
              </ReactMarkdown>
              </p>
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