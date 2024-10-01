import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { storage } from "../config/Firebase/Methods";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { auth, db } from "../config/Firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

function Register() {
  const [isSubmission, setIsSubmission] = useState(false);

  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmission(true);
    console.log(data);

    try {
      console.log("Registering user...");
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredentials.user;
      console.log("User Registered Successfully.");

      let imageUrl = "";
      if (image) {
        const imageRef = ref(storage, `profileImage/${user.uid}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
        console.log("Image Uploaded:", imageUrl);
      }
      await updateProfile(user, { displaName: data.fname, photoURL: imageUrl });
      console.log("Profile Updated");

      await setDoc(doc(db, "users", user.uid), {
        Username: data.fname,
        email: data.email,
        id: data.uid,
        photoURL: imageUrl,
      });
      console.log("User data stored in the firestore..");

      setIsSubmission(false); // Reset to false after submission completes
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <>
      <nav className="bg-[#7749F8] sm:p-2 p-3 flex flex-wrap justify-between items-center">
        <Link
          to="/"
          className="text-white sm:ml-24 ml-5 sm:text-[1.4rem] text-[1.3rem] font-bold hover:bg-[#5628F6]  rounded-lg transition duration-300 sm:px-2 px-0 py-0  sm:py-1">
          Personal Blogging App
        </Link>
        <div className="flex justify-center items-center font-semibold sm:mr-12 mr-5 ">
          <Link
            to="/Login"
            className="text-white sm:px-2 px-0 py-0  sm:py-1 hover:bg-[#5628F6]  rounded-lg transition duration-300">
            Login
          </Link>
        </div>
      </nav>

      <div className="bg-base-100 flex flex-col h-screen items-center justify-center">
        {/* Register form */}
        <div className="w-full max-w-lg">
          <h1 className="text-center bg-base-200 p-3 text-3xl font-bold mb-4">
            Register
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            {/* First Name */}
            <div className="mb-4">
              <input
                className="input input-bordered w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Full Name"
                {...register("fname", { required: "Full name is required" })}
              />
              {errors.fname && (
                <p className="text-red-500 text-xs italic">
                  {errors.fname.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="mb-4">
              <input
                className="input input-bordered w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "!!Invalid email Format!!",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs italic">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="mb-6">
              <input
                className="input input-bordered w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                placeholder="******************"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs italic">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* User Image */}
            <div className="mb-6">
              <input
                className="input input-bordered w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            {/* Register Button */}
            <div className="flex items-center justify-center">
              <button type="submit" className="btn btn-success w-full">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
