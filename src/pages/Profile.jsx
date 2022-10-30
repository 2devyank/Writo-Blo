import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../Context'
import { db,storage } from '../firebase';
import "../style/profile.css"

function Profile() {
  const {user,logout} =useUserAuth();
  console.log(user);

  const [show, setShow] = useState(false);
  const [bio,setbio]=useState("");
  const [userbio,setuserbio]=useState({});
  const [userpost,setuserpost]=useState([]);

  const handlebio = async() => {
   await setDoc(doc(db,"users",localStorage.getItem("Id")),{
     bio
   })
  

    setShow(false)

  }
  const handleShow = () => setShow(true);
  const handleclose = () => setShow(false);

  useEffect(()=>{
    const fetchdata=async()=>{
    
      try{
        const docRef=doc(db,"users",localStorage.getItem("Id"))
        await getDoc(docRef)
        .then((doc)=>{
          setuserbio(doc.data())
        })
            }catch(err){
        console.log(err);
      }

    }
    fetchdata();

    const fetchpost=async()=>{
      let list=[];
      try{
        const q=query(collection(db,"posts"),where("name","==",localStorage.getItem("name")))
        const querysnapshot=await getDocs(q);
        querysnapshot.forEach((doc)=>{
          list.push({...doc.data()})
          setuserpost(list);
        })
      }catch(err){
        console.log(err);
      }

    }
fetchpost();
  },[])
  const navigate=useNavigate();
  // console.log(userpost);
  const funout=()=>{
    logout();
    navigate("/login")
    
  }
  return (
    <>
    <div className='prof'>
      {/* //buttons */}
        <div className='buts'>
          <Button variant="outline-light" onClick={funout}>LOGOUT</Button>
          <Button  variant="outline-light" onClick={handleShow}>ADD BIO</Button>
        </div>
        {/* //img and profile */}
      <div className='mid'>
      <img src={user.photoURL} alt=""  />
      <h3>{user.displayName}</h3>

    {userbio?(
       <div className="ar"><p>{userbio.bio}</p>
       </div>
    ):(
<div className="ar"><p></p>
        </div>
    )}  
      </div>

      {/* // my posts */}
      <div>
       <h3>
          My Posts
         </h3>
        <hr />
        <div className='cardcover'>


        {
          userpost.map((post)=>{
            
    return  <div className='cardprof' >
      <span >{post.name}</span>
      <br />
      <span className="name">{new Date(post.createdAt.seconds * 1000).toLocaleDateString("en-US")}</span>
      <h3>{post.title}</h3>
      <span className='tags'>{post.tags.map((t)=> <span>#{t+"  "}</span> )}</span>
  
      <p>{post.post.substring(0,70)}...</p>
{/* <p>❤️</p> */}
{/* <button onClick={handlecard(`${post.title}`)}>View Full</button> */}
{/* <Link to={`/${post.title}`}>FULL</Link>
 */}
 <Link className='link' to={`/${post.title}`}>View Blog</Link>
      </div>
   })
  }

            </div>
      </div>


    </div>
    <Modal className="modal" show={show} onHide={handleclose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>ADD YOUR BIO</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <textarea name="" id="" className="mod" value={bio} onChange={(e)=>setbio(e.target.value)}  />
        </Modal.Body>
        <Modal.Footer>
          <Button  variant="secondary" onClick={handleclose}>
            Close
          </Button>
          <Button variant="primary" onClick={handlebio}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Profile