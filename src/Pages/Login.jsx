import React, { useRef } from 'react';
import { getAuth , signInWithEmailAndPassword } from "firebase/auth";
import { Link , useNavigate } from 'react-router-dom';
import { auth } from '../config';

const Login = () => {
  const email = useRef();
  const password = useRef();

const navigate = useNavigate();

const submit = (event) => {
  event.preventDefault()

  const auth = getAuth();

  signInWithEmailAndPassword(auth, email.current.value , password.current.value)
  

    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      navigate = "postblog";

    })
    
    .catch((error) => {
      const errorMessage = error.message;
      console.log("Error====>",errorMessage);
      alert(errorMessage);    
    });
}

  return (
  
<>
<div>
      {/* Login Header */}
      <h1 className="text-3xl flex justify-center font-bold bg-base-200 w-full p-3 mt-5 mb-6">
        Login
      </h1>

      {/* Login Form */}
      <div className="flex-grow flex items-center justify-center w-full px-4">
        <div className="w-full max-w-xs">
          <form onSubmit={submit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            {/* Email Input */}
            <div className="mb-4">
              <input
                id="email"
                type="email"
                className="input input-bordered w-full"
                placeholder="Enter your Email"
                ref={email}
              />
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <input
                id="password"
                type="password"
                className="input input-bordered w-full mb-3"
                placeholder="Enter your Password"
                ref={password}
              />
            </div>

            {/* Login Button */}
            <div className="flex items-center justify-between">
              <button type="submit" className="btn btn-primary w-full">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
