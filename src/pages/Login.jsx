import React from 'react'
import { Button } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../Context'
import "../style/login.css"

function Login() {
  const {googlesignin}=useUserAuth();
const navigate=useNavigate();
  const handlelogin=async(e)=>{
    e.preventDefault();
    try{
await googlesignin();
navigate("/")
    }catch(err){
console.log(err);
    }
  }
const location=useLocation();
console.log(location);
  return (
    <div className='outer'>
        <div className='inner'>
            <h2>Login</h2>
            <Button variant='outline-light' onClick={handlelogin}>Login With Google</Button>
        </div>
    </div>
  )
}

export default Login