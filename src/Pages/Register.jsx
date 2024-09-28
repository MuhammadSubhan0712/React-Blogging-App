import React, { useRef } from 'react'
import {Link , useNavigate} from "react-router-dom"

import { initializeApp } from "firebase/app";

import { getAuth ,   createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from '../Config';


function Register() {

  const navigate = useNavigate()

  const registration = (event) => {
   event.preventDefault()
   const auth = getAuth();

  createUserWithEmailAndPassword(
    auth,
    email.current.value,
    password.current.value
  )
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user);
    fname.current.value = "";
    lname.current.value = "";
    email.current.value = "";
    password.current.value = "";
    navigate = "login";
  })

  .catch((error) => {
    const errorMessage = error.message;
    console.log(errorMessage);
  });
  }

  const fname = useRef()
  const lname = useRef()
  const email = useRef()
  const password = useRef()

  return (
    <div className='bg-base-300 flex flex-col h-screen items-center'>

    {/*  Register form  */}

    <div className="w-full max-w-lg mt-5">
      <form onSubmit={registration} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-center text-2xl font-bold mb-4">Register</h1>

         {/* First Name  */}
        <div className="mb-4">
    
          <input
            
            className="input input-bordered w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="First Name" ref={fname} />
        </div>

         {/* Last Name  */}
        <div className="mb-4">
          <input
            
            className="input input-bordered w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Last Name" ref={lname}/>
        </div>

        {/*  Email  */}
        <div className="mb-4">
       
          <input
            
            className="input input-bordered w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            placeholder="Email" ref={email}/>
        </div>

         {/* Password  */}
        <div className="mb-6">
          <input
          
            className="input input-bordered w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="******************" ref={password}/>
        </div>

         {/* Register Button  */}
        <div className="flex items-center justify-center">
          <button type="submit" className="btn btn-success w-full">Register</button>
        </div>

      </form>
    </div>

    {/*  Paragraph for signup error  */}
    <p  className="text-center text-gray-500 text-xs"></p>

    {/*  ------------------------------------------------------------- */}
    </div>
  )
}

export default Register