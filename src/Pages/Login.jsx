import React from 'react';
import { useForm } from 'react-hook-form';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { auth } from "../config/Firebase/config";
import Navbar from '../components/Navbar';

const Login = () => {
  const navigate = useNavigate();

  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  
  const onSubmit = (data) => {
    const auth = getAuth();
    const { email, password } = data;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);

        // Navigate to the blog post page after sucessful login
        navigate('/blogpost');
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log("Error:", errorMessage);
        alert(errorMessage);
      });
  };

  return (
    <>
      <div>

      <nav className="bg-[#7749F8] sm:p-0 p-1 flex flex-wrap justify-between items-center">
        <Link to="/" className="text-white sm:ml-24 ml-5 sm:text-[1.4rem] text-[1.3rem] font-bold hover:bg-[#5628F6]  rounded-lg transition duration-300 sm:px-2 px-0 py-0  sm:py-1">Personal Blogging App</Link>
        <div className="flex justify-center items-center font-semibold sm:mr-12 mr-5 ">
          <Link to="/register" className="text-white sm:px-2 px-0 py-0  sm:py-1 hover:bg-[#5628F6]  rounded-lg transition duration-300">Register</Link>
        </div>
      </nav>

        {/* Login Header */}
        <h1 className="text-3xl flex justify-center font-bold bg-base-200 w-full p-3 mt-5 mb-6">
          Login
        </h1>

        {/* Login Form */}
        <div className="flex-grow flex items-center justify-center w-full px-4">
          <div className="w-full max-w-xs">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

              {/* Email Input */}
              <div className="mb-4">
                <input
                  id="email"
                  type="email"
                  className="input input-bordered w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "!!Invalid email Format!!"
                    }
                  })}
                />
                {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
              </div>

              {/* Password Input */}
              <div className="mb-6">
                <input
                  id="password"
                  type="password"
                  className="input input-bordered w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long"
                    }
                  })}
                />
                {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
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
