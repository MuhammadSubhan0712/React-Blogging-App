import React , {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'; 

const SingleUserBlogs = () => {

    const { userId } = useParams(); // Get user ID from the URL

const [userBlogs, setUserBlogs] = useState([]);
const [userInfo, setUserInfo] = useState(null);
const [loading, setLoading] = useState(true);
  
useEffect(() => {
    console.log('userId from URL:', userId); // Add this for debugging
    
    const fetchUserBlogs = async () => {
      try {
        // Query the Blogs collection to get blogs by this user
        const q = query(
          collection(db, 'Blogs'),
          where('userId', '==', userId)
        );
        const blogsSnapshot = await getDocs();

        const blogsList = blogsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUserBlogs(blogsList);
    }
    catch (error) {
        console.error('Error fetching user blogs or info:', error);
        setLoading(false);
      }
}
fetchUserBlogs();
},[])

return (
    <>
        {/* User's Blogs Section */}
       <div className="user-blogs container mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Blogs by {userInfo.author}</h2>
          {userBlogs.length === 0 ? (
            <p className="text-gray-600">This user has not posted any blogs yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userBlogs.map((blog) => (
                <div key={blog.id} className="bg-white shadow-md rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                  <p className="text-gray-600">{blog.content.substring(0, 100)}...</p>
                  <a href={`#${blog.id}`} className="text-blue-500 hover:underline font-bold">
                    Read More
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
    </>)
};

export default SingleUserBlogs