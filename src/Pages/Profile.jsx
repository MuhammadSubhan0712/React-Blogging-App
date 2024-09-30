import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/Firebase/config';
import { useNavigate } from 'react-router-dom';


const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchUserData = async (user) => {
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            console.log('No such user document!');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    const authInstance = getAuth();
    const unsubscribe = onAuthStateChanged(authInstance, (user) => {
      if (user) {
        fetchUserData(user);
      } else {
        navigate('/login');
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>No user data available</div>;
  }

  return (
    <div className="profile-page flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">User Profile</h1>
      <div className="profile-container bg-white shadow-lg p-6 rounded-lg max-w-lg">
        {/* Profile Picture */}
        {userData.profileImage && (
          <div className="profile-picture mb-4">
            <img
              src={userData.profileImage}
              alt="User Profile"
              className="rounded-full w-32 h-32 object-cover"
            />
          </div>
        )}

        {/* User Details */}
        <div className="profile-details">
          <h2 className="text-2xl font-semibold mb-2">{userData.fullName}</h2>
          <p className="text-lg text-gray-600">{userData.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
