import { collection, getDoc, getDocs, getDocsFromCache, onSnapshot, query, where } from 'firebase/firestore';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import "../style/single.css"

function SinglePost() {
const [post,setpost]=useState({});
const {name}=useParams();
// console.log(name);
    useEffect(()=>{
        let list=[];
        const fetchdata=async()=>{
        try{
            const q= query(collection(db,"posts"),where("title","==",`${name}`));
          // onSnapshot(q,(querysnapshot)=>{
            const querysnapshot=await getDocs(q);
             querysnapshot.forEach((doc)=>{
               
               list.push({...doc.data()})
                setpost(list[0])
                
              })
            // })
        }catch(err){
            console.log(err);
        }
    }
    fetchdata();

    },[])
    console.log(post)
// console.log(new Date(post.createdAt.seconds * 1000).toLocaleDateString("en-US"));
  return (
    <div className='pd'>
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
  {post.post}
      </p> 

</div>
      )}
        
    </div>
  )
}

export default SinglePost