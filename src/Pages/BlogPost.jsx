import React, { useEffect, useRef, useState } from "react";
import { Edit3, Trash2, FileText, FilePenLine } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../config/Firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  query,
  Timestamp,
  orderBy,
} from "firebase/firestore";
import Navbar from "../components/Navbar";

const BlogPost = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const placeholder = useRef();
  const author = useRef();
  const text = useRef();
  const [CheckUser, setCheckUser] = useState(null);

  // User authentication check
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCheckUser(user);
        return;
      }
      navigate("/login"); // Redirect to login if not authenticated
    });
  }, []);

  // Fetch blog data
  async function getData() {
    const q = query(collection(db, "Blogs"), orderBy("time", "desc"));
    const querySnapshot = await getDocs(q);
    const Blogs = [];
    querySnapshot.forEach((doc) => {
      Blogs.unshift({ id: doc.id, ...doc.data() });
    });
    setBlogs(Blogs);
  }

  useEffect(() => {
    getData();
  }, []);

  // Publish a new blog
  const publishBlog = async (event) => {
    event.preventDefault();

    const newBlog = {
      title: placeholder.current.value,
      author: author.current.value,
      content: text.current.value,
      userId: CheckUser.uid, // Store the logged-in user's ID
      userProfile: CheckUser.photoURL, // Store user profile image
    };

    if (!newBlog.title || !newBlog.author || !newBlog.content) {
      alert("You must fill all input fields");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "Blogs"), {
        ...newBlog,
        time: Timestamp.fromDate(new Date()),
      });

      setBlogs([
        ...blogs,
        {
          id: docRef.id,
          ...newBlog,
          time: Timestamp.fromDate(new Date()),
        },
      ]);
      placeholder.current.value = "";
      author.current.value = "";
      text.current.value = "";
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // Edit a blog
  const editBlog = async (i) => {
    const updPlaceholder = prompt("Enter title to update");
    const updAuth = prompt("Enter author name to update");
    const updText = prompt("Enter content to update");

    const toUpdate = doc(db, "Blogs", blogs[i].id);
    await updateDoc(toUpdate, {
      title: updPlaceholder,
      author: updAuth,
      content: updText,
    });

    const updatedBlogs = [...blogs];
    updatedBlogs[i].title = updPlaceholder;
    updatedBlogs[i].author = updAuth;
    updatedBlogs[i].content = updText;
    setBlogs(updatedBlogs);
  };

  // Delete a blog
  const deleteBlog = async (i) => {
    const ToDelete = blogs[i].id;
    const updatedBlogs = [...blogs];
    updatedBlogs.splice(i, 1);
    setBlogs(updatedBlogs);

    await deleteDoc(doc(db, "Blogs", ToDelete));
  };

  // Navigate to a user's single blog page
  const handleUserClick = (userId) => {
    navigate(`/user/${userId}`);
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center flex-wrap gap-3 items-center">
        <h1 className="text-4xl flex justify-center font-bold bg-white w-full p-2 mt-5">
          <FileText className="mr-2" /> Dashboard
        </h1>

        {/* Blog Form */}
        <div className="w-full max-w-lg mt-5 ">
          <form
            onSubmit={publishBlog}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            {/* Title Input */}
            <div className="mb-4">
              <input
                className="input input-bordered w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Title"
                ref={placeholder}
              />
            </div>

            {/* Author Input */}
            <div className="mb-4">
              <input
                className="input input-bordered w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Author"
                ref={author}
              />
            </div>

            {/* Content Input */}
            <div className="mb-4">
              <textarea
                rows={6}
                className="textarea textarea-bordered w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="What's on your mind?"
                ref={text}
              />
            </div>

            {/* Publish Button */}
            <div className="flex items-center justify-start">
              <button
                type="submit"
                className="btn btn-primary flex items-center">
                <Edit3 className="mr-2" /> Publish Blog
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* List of Published Blogs */}
      {blogs.length > 0 && (
        <div className="flex justify-center gap-5 ">
          <div className="w-full max-w-lg mt-10 mb-5">
            <h2 className="text-2xl text-center font-bold mb-4">
              Published Blogs
            </h2>
            <ul className="space-y-4">
              {blogs.map((blog, index) => (
                <li
                  key={index}
                  className="bg-white shadow-md rounded px-6 py-4 flex justify-between items-start">
                  <div>
                    {/* Profile Image and Navigation */}
                    <img
                      src={blog.userProfile}
                      alt="Profile"
                      className="w-10 h-10 rounded-full cursor-pointer mb-2"
                      onClick={() => handleUserClick(blog.userId)}
                    />
                    <h3 className="text-xl font-bold">{blog.title}</h3>
                    <p className="text-gray-700">{blog.content}</p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => editBlog(index)}
                      className="btn btn-outline btn-secondary btn-sm">
                      <FilePenLine size={32} strokeWidth={1.75} />
                    </button>
                    <button
                      onClick={() => deleteBlog(index)}
                      className="btn btn-outline btn-error btn-sm">
                      <Trash2 size={32} strokeWidth={1.75} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogPost;
