import React from 'react'
import { Button } from 'react-bootstrap'
import { useUserAuth } from '../Context'
import "../style/profile.css"

function Profile() {
  const {user} =useUserAuth();
  // console.log(user);
  return (
    <div className='prof'>
      {/* //buttons */}
        <div className='buts'>
          <Button>ADD BIO</Button>
          <Button>LOGOUT</Button>
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
  )
}

export default Profile