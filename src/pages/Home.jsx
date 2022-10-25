import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import {useUserAuth} from "../Context.jsx";
import { db } from '../firebase.jsx';
import "../style/home.css"

function Home() {
  const [postdata,setpostdata]=useState([]);
  useEffect(()=>{
    const fetchdata=async()=>{
      let list=[];
      try{
        const querysnapshot=await getDocs(collection(db,"posts"))
        querysnapshot.forEach((doc)=>{
          list.push({...doc.data()})
          setpostdata(list);
        })
      }catch(err){
        console.log(err)
      }
     
    }
    fetchdata();
  },[])
  // console.log(postdata[0].timestamp);
  // console.log(postdata)
  return (
    <div className='home'>

      <div className='cardcover'>
 
 {
   postdata.map((post)=>{
     
    return  <div className='card'>
      <p >{post.name}</p>
      <span className="name">{new Date(post.createdAt.seconds * 1000).toLocaleDateString("en-US")}</span>
      <h3>{post.title}</h3>
      <span>{post.tags.map((t)=> <span>#{t+"  "}</span> )}</span>
      <p>{post.post.substring(0,70)}...</p>

      </div>
   })
      
}
 
 
      </div>


    </div>
  )
}

export default Home