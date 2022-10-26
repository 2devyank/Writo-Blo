import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useUserAuth } from '../Context'
import { db } from '../firebase';
import "../style/profile.css"

function Profile() {
  const {user} =useUserAuth();
  // console.log(user);

  const [show, setShow] = useState(false);
  const [bio,setbio]=useState("");

  const handlebio = async() => {
   await setDoc(doc(db,"users",localStorage.getItem("Id")),{
     bio
   })
  

    setShow(false)

  }
  const handleShow = () => setShow(true);
  const handleclose = () => setShow(false);

  return (
    <>
    <div className='prof'>
      {/* //buttons */}
        <div className='buts'>
          <Button>LOGOUT</Button>
          <Button onClick={handleShow}>ADD BIO</Button>
        </div>
        {/* //img and profile */}
      <div className='mid'>
      <img src={user.photoURL} alt=""  />
      <h3>{user.displayName}</h3>

      <div className="ar"><p>Lorem ipsum dolor sit amet Lorem ipsum dolor sit, 
        amet consectetur adipisicing elit. Ratione numquam 
        dignissimos doloremque maiores rerum itaque facilis laborum minus eligendi suscipit!</p></div>
      </div>

      {/* // my posts */}
      <div>
        My Posts
        <hr />

      </div>


    </div>
    <Modal show={show} onHide={handleclose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>ADD YOUR BIO</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <textarea name="" id="" className="mod" value={bio} onChange={(e)=>setbio(e.target.value)}  />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleclose}>
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