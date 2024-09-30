import React , { useState }from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { signUpUser, uploadImage , storage} from '../config/Firebase/Methods';
import {
  getDownloadURL,
  ref,
  uploadBytes
} from "firebase/storage";


import { auth } from "../config/Firebase/config";


function Register() {

  const [isSubmission, setIsSubmission] = useState(false); 

  const navigate = useNavigate();
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  
  const onSubmit = async (data) => {
    setIsSubmission(true);
    console.log(data);

    try {
      const userProfileImageUrl = await uploadImage(data.profileImage[0], data.email);
      const userData = await signUpUser({
        email: data.email,
        password: data.password,
        fullName: data.fname,
        profileImage: userProfileImageUrl
      });
      console.log(userData);
      navigate('/login');
    } catch (error) {
      alert(error);
      console.log(error);
    }
    setIsSubmission(false); // Reset to false after submission completes
  };

  const uploadImage = async (file, userEmail) => {
    const storageRef = ref(storage, `profileImages/${userEmail}`);
    const uploadTask = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(uploadTask.ref);
    return downloadURL;
  };
  return (
    <>
     <nav className="bg-[#7749F8] sm:p-0 p-1 flex flex-wrap justify-between items-center">
        <Link to="/" className="text-white sm:ml-24 ml-5 sm:text-[1.4rem] text-[1.3rem] font-bold hover:bg-[#5628F6]  rounded-lg transition duration-300 sm:px-2 px-0 py-0  sm:py-1">Personal Blogging App</Link>
        <div className="flex justify-center items-center font-semibold sm:mr-12 mr-5 ">
          <Link to="/Login" className="text-white sm:px-2 px-0 py-0  sm:py-1 hover:bg-[#5628F6]  rounded-lg transition duration-300">Login</Link>
        </div>
      </nav>

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
              placeholder="Full Name"
              {...register("fname", { required: "Full name is required" })}
            />
            {errors.fname && <p className="text-red-500 text-xs italic">{errors.fname.message}</p>}
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
              {...register("profileImage" , {required: true})}
            />
            {errors.profileImage && <p className="text-red-500 text-xs italic">This field is required</p>}
          </div>

          {/* Register Button */}
          <div className="flex items-center justify-center">
            <button type="submit" className="btn btn-success w-full">Register</button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default Register;
