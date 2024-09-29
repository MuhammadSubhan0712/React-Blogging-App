import React, { useRef, useState } from 'react';
import { Edit3, Trash2, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {  getAuth , onAuthStateChanged , signOut, } from "firebase/auth";
import { auth , db } from '../Config';
import {
  collection,
  addDoc,
  getDocs,
  doc, 
  deleteDoc,
  updateDoc ,
  query,
  Timestamp,
  where,
  orderBy, 
} from "firebase/firestore"


const BlogPost = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]); // State to store the list of blogs
  const placeholder = useRef();
  const text = useRef();



// When user login:
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log(uid);
  } 
  else {
    navigate = "dashboard";
  }
});


const logout = () => {
  const auth = getAuth();

  signOut(auth)
    .then(() => {
      console.log("Logout succesfully");
      navigate = "login";
    })

    .catch((error) => {
      console.log(error);
    });
}






  // Function to handle blog submission
  const publishBlog = (event) => {
    event.preventDefault();

    const newBlog = {
      title: placeholder.current.value,
      content: text.current.value,
    };

    // Adding the new blog to the list of blogs
    setBlogs([newBlog, ...blogs]);

    // Clear input fields after submission
    placeholder.current.value = '';
    text.current.value = '';
  };

  // Function to delete a blog post
  const deleteBlog = (indexToDelete) => {
    const updatedBlogs = blogs.filter((_, index) => index !== indexToDelete);
    setBlogs(updatedBlogs);
  };

  return (
    <>
      <div>
        <h1 className="text-4xl flex justify-center font-bold bg-white w-full p-2 mt-5">
          <FileText className="mr-2" /> Dashboard
        </h1>

        {/* Blog Form */}
        <div className="w-full max-w-lg mt-5">
          <form onSubmit={publishBlog} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            {/* Placeholder (Title) */}
            <div className="mb-4">
              <input
                className="input input-bordered w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Title"
                ref={placeholder}
              />
            </div>

            {/* Blog Content */}
            <div className="mb-4">
              <textarea
                rows={6}
                className="textarea textarea-bordered w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="What is in your mind"
                ref={text}
              />
            </div>

            {/* Publish Button */}
            <div className="flex items-center justify-start">
              <button type="submit" className="btn btn-primary flex items-center">
                <Edit3 className="mr-2" /> Publish Blog
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* List of Published Blogs */}
      {blogs.length > 0 && (
        <div className="w-full max-w-lg mt-10">
          <h2 className="text-2xl font-bold mb-4">Published Blogs</h2>
          <ul className="space-y-4">
            {blogs.map((blog, index) => (
              <li key={index} className="bg-white shadow-md rounded px-6 py-4 flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold">{blog.title}</h3>
                  <p className="text-gray-700">{blog.content}</p>
                </div>
                <button
                  onClick={() => deleteBlog(index)}
                  className="btn btn-outline btn-error btn-sm ml-4">
                  <Trash2 />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default BlogPost;
