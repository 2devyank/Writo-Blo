import { collection, doc, getDoc, getDocs, getDocsFromCache, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import "../style/single.css"
import ReactMarkdown from 'react-markdown'
import { useUserAuth } from '../Context';
import { Button } from 'react-bootstrap';
import {useRef} from "react";

function SinglePost() {
const [post,setpost]=useState({});
const {name}=useParams();
const {user}=useUserAuth();



// console.log(name);
    useEffect(()=>{
      let list=[];
      const fetchdata=async()=>{
        try{
            const q= query(collection(db,"posts"),where("title","==",`${name}`));
          onSnapshot(q,(querysnapshot)=>{
            // const querysnapshot=await getDocs(q);
             querysnapshot.forEach((doc)=>{
               localStorage.setItem("dob",doc.id);
               
               list.push({dod:doc.id,...doc.data()})
               setpost(list[0])
               
              })
            })
          }catch(err){
            console.log(err);
        }
    }
    fetchdata();

  },[])
    // console.log(post.numbe)
    const [like,setlike]=useState(null);
    const buttonref=useRef(null);
  // const [abled,setabled]=useState(true);
    const upgrade=async()=>{
      buttonref.current.disabled=true;
      setlike(post.numbe+1);
      // setabled(false);
      const updateref=  doc(db,"posts",localStorage.getItem("dob"))
      await updateDoc(updateref,{
        numbe:post.numbe+1
      })
    }
    console.log(like);
    
// console.log(new Date(post.createdAt.seconds * 1000).toLocaleDateString("en-US"));
  return (
    <div className='pd'>

      <div className='side'>

  <Button className='like' ref={buttonref} onClick={upgrade}>
  <h4>❤️</h4>
  </Button> 

   

        <p>{like>post.numbe?(like):(post.numbe)}</p>



      </div>
      {!post?(
       <div> 
     
       Loading ...
     </div>
      ):(
   
    <div className='display'>
    <span>
    {post.name}</span>
    <br />
    <span  className='dat'>
        {/* {new Date(post.createdAt.seconds * 1000).toLocaleDateString("en-US")} */}
        </span>
    <h1>

    {post.title}
    </h1>
    {/* <span >{post.tags.map((t)=> <span>#{t+"  "}</span> )}</span> */}
    {/* {post.tags[0]} */}
  <p>
  <ReactMarkdown>
    {post.post}
    </ReactMarkdown>
      </p> 

</div>
      )}
        
    </div>
  )
}

export default SinglePost