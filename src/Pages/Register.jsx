import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/Firebase/config";


function Register() {
  const navigate = useNavigate();
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  
  const onSubmit = (data) => {
    const auth = getAuth();
    const { email, password } = data;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);

        // To Clear the input form fields
        reset();

        // Navigate to login page after successful registration 
        navigate('/login');
      })
      .catch((error) => {
        console.error("Error Occured:", error.message);
      });
  };

  return (
    <div className="bg-base-100 flex flex-col h-screen items-center justify-center">
      {/* Register form */}
      <div className="w-full max-w-lg">
        <h1 className="text-center bg-base-200 text-3xl font-bold mb-4">Register</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

          {/* First Name */}
          <div className="mb-4">
            <input
              className="input input-bordered w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="First Name"
              {...register("fname", { required: "First name is required" })}
            />
            {errors.fname && <p className="text-red-500 text-xs italic">{errors.fname.message}</p>}
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <input
              className="input input-bordered w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Last Name"
              {...register("lname", { required: "Last name is required" })}
            />
            {errors.lname && <p className="text-red-500 text-xs italic">{errors.lname.message}</p>}
          </div>

          {/* Email */}
          <div className="mb-4">
            <input
              className="input input-bordered w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required", pattern: { value: /\S+@\S+\.\S+/, message: "!!Invalid email Format!!" } })}
            />
            {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="mb-6">
            <input
              className="input input-bordered w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              placeholder="******************"
              {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters long" } })}
            />
            {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
          </div>

          {/* User Image */}
          <div className="mb-6">
            <input
              className="input input-bordered w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="file"
              {...register("userimage" , {required: true})}
            />
            {errors.userimage && <p className="text-red-500 text-xs italic">This field is required</p>}
          </div>

          {/* Register Button */}
          <div className="flex items-center justify-center">
            <button type="submit" className="btn btn-success w-full">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
