import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, loginUser } from "../config/Firebase/Methods";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/Firebase/config";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  let [CheckUser, setCheckUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setCheckUser(true);

        return;
      }
      setCheckUser(false);
    });
  }, []);

  // Fetch blogs from Firestore
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogCollection = collection(db, "Blogs"); 
        const blogSnapshot = await getDocs(blogCollection);
        const blogList = blogSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogList);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <>
      <Navbar Login={!CheckUser ? "Login" : ""} />
      <div className="p-10 h-screen  bg-green-200">
        <h1 className="text-green-800 text-center text-3xl font-bold">
          Good Morning Readers
        </h1>
        <div className="container mx-auto p-5">
          {/* Blog headings section */}
          <h2 className="text-2xl font-semibold mb-4">Top Blogs</h2>
          <div className="flex flex-wrap gap-4 mb-6">
            {blogs.map((blog) => (
              <a
                key={blog.id}
                href={`#${blog.id}`}
                className="text-blue-500 hover:underline">
                {blog.title}
              </a>
            ))}
          </div>

          {/* Blog posts section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div
                id={blog.id}
                key={blog.id}
                className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                <p className="text-gray-700 mb-4">
                  by <span className="font-semibold">{blog.title}</span>
                </p>
                <p className="text-gray-600">{blog.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
