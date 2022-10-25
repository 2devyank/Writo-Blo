import { collection, getDoc, onSnapshot, query, where } from 'firebase/firestore';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { db } from '../firebase';

function SinglePost() {
const [post,setpost]=useState({});
const {name}=useParams();
// console.log(name);
    useEffect(()=>{
        let list=[];
        const fetchdata=async()=>{
        try{
            const q=query(collection(db,"posts"),where("title","==",`${name}`));
            onSnapshot(q,(querysnapshot)=>{
              querysnapshot.forEach((doc)=>{
                list.push({...doc.data()})
                setpost(list[0])
              })
            })
        }catch(err){
            console.log(err);
        }
    }
    fetchdata();

    },[])
console.log(post);
  return (
    <div>

    </div>
  )
}

export default SinglePost