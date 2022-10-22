import React from 'react'
import {useUserAuth} from "../Context.jsx";

function Home() {
  const {name}=useUserAuth();
  
  return (
    <div>Home

    </div>
  )
}

export default Home