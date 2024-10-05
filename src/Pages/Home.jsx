import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate , Link} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/Firebase/Methods";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/Firebase/config";
import { Loader } from "lucide-react";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading , setLoading] = useState(true)
  const [CheckUser, setCheckUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCheckUser(true);
      } else {
        setCheckUser(false);
      }
    });
  }, []);

  // Fetch blogs from Firestore
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogCollection = collection(db, "Blogs"); // Adjust collection name if necessary
        const blogSnapshot = await getDocs(blogCollection);
        const blogList = blogSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setLoading(true);
      }
    };
    fetchBlogs();
  }, []);

  // Handle navigation to SingleUser page
  const goToUserProfile = (userId) => {
    navigate(`/singleuser/${userId}`); // This navigates to the single user's page
  };

  return (
    <>
      <Navbar Login={!CheckUser ? "Login" : ""} />
      <div className="p-10 bg-green-200 h-screen">
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
                className="text-blue-500 hover:underline"
              >
                {blog.title}
              </a>
            ))}
          </div>
          {/* Blog posts section */}

          { loading ? (
           <h2 className="text-2xl flex justify-center mt-9"><Loader size={56} /></h2>
          ) :
          blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div
                id={blog.id}
                key={blog.id}
                className="bg-white shadow-md rounded-lg p-6"
              >
                {/* User Profile Image */}
                <div
                  className="profile-image flex items-center mb-4 cursor-pointer"
                  onClick={() => goToUserProfile(blog.userId)}
                >
                  <img
                    src={blog.userProfile} // Default image if no author photo
                    alt="User Profile"
                    className="rounded-full w-12 h-12 mr-4"
                  />
                  <div>
                    <p className="text-gray-700 font-semibold">
                      {blog.author}
                    </p>
                   <Link to="singleuser"> <span className="text-sm text-gray-500">Click to view profile</span></Link>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                <p className="text-gray-700 mb-4">
                  by <span className="font-semibold">{blog.author}</span>
                </p>
                <p className="text-gray-600">{blog.content.substring(0, 100)}...</p>
                <a
                  href={`#${blog.id}`}
                  className="text-blue-500 hover:underline font-bold"
                >
                  Read More
                </a>
              </div>

            ))}
          </div>
          ) : (
           <p className="text-2xl font-bold p-3 border border-black rounded-lg center flex justify-center mt-9">No blogs added yet..</p> 
        )}
        </div> 
      </div>
    </>
  );
};

export default Home;
