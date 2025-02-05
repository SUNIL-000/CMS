import React, { useState } from 'react'
import "./login.css"



const Login1 = () => {
    const [email,setEmail]= useState("");
    const [password,setPassword]= useState("");

  return (
    <div className='maindiv'>
        <div className='inputdiv'>
            <input type="email" name="" placeholder='Email Id' value={email}  onChange={(e)=>{setEmail(e.target.value)}} />
            <input type="password" name="" placeholder='password'  value={password} onChange={(e)=>{setPassword(e.target.value)}} />
        </div>

        <div>
            <input type="checkbox" name="" placeholder='Email Id'  />

           </div>
    </div>
  )
}

export default Login1