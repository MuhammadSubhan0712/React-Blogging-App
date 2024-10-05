import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/Firebase/config'; // Import Firebase config
import Navbar from '../components/Navbar';
import { LoaderPinwheel } from 'lucide-react';


const SingleUser = () => {
  const { userId } = useParams(); // Get user ID from the URL
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    console.log('userId from URL:', userId); // Add this for debugging
    
    const UserProfile = async () => {
        try{
        // Fetch user info (assuming user info is stored in 'users' collection)
        const q = query(
          collection(db, 'users'),
          where('userId', '==', userId)
        );

        const userSnapshot = await getDocs(q);
        if (!userSnapshot.empty) {
          setUserInfo(userSnapshot.docs[0].data()); // Assuming there's one matching user
        }
      }
      catch (error) {
        console.error('Error fetching user blogs or info:', error);
        setLoading(false);
      }
    }
    
    UserProfile();
}, [userId]);

  if (loading) {
    return <div className="flex justify-center mt-5 text-2xl p-5"><LoaderPinwheel size={56} /></div>;
  }

  if (!userInfo) {
    return <div className="text-2xl mt-5 p-3 border border-yellow-400 rounded-e-sm flex justify-center text-red-500">User not found.</div>;
  }
 const gotoBlogs = (userId) =>{
  navigate(`/singleuserblogs/${userId}`)
 }

  return (
    <>
      <Navbar />
      <div className="single-user-page p-10 bg-gray-100 min-h-screen">
        {/* User Info Section */}
        <div className="user-info text-center mb-8">
          <img
            src={userInfo.userProfile} // Fallback to default avatar
            alt={userInfo.author}
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold">{userInfo.author}</h1>
          <p className="text-gray-600">{userInfo.email}</p>
        </div>
        <button onClick={()=> gotoBlogs(userInfo.userId)} className='btn btn-primary text-white text-xl p-3 m-5'> See Blogs </button>
      </div>
    </>
  );
};

export default SingleUser;
