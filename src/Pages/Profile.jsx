import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, updatePassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/Firebase/config";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const [error, setError] = useState("");
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async (user) => {
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            console.log("No such user document!");
          }
        } catch (error) {
          console.error("Error when fetching user data:", error);
        }
      }
    };

    const authInstance = getAuth();
    const unsubscribe = onAuthStateChanged(authInstance, (user) => {
      if (user) {
        fetchUserData(user);
      } else {
        navigate("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, [navigate]);

  // Handle password update
  const handlePasswordUpdate = async (event) => {
    event.preventDefault();
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      const user = auth.currentUser;
      await updatePassword(user, newPassword);
      setPasswordUpdated(true);
      setError("");
    } catch (error) {
      setError("Failed to update password. Try logging in again.");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="text-2xl text-white bg-black flex justify-center mt-5">
        Loading...
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="text-2xl text-white bg-red-600 flex justify-center mt-5">
        No user data available
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="profile-page bg-cyan-700 min-h-screen flex flex-col items-center py-10 px-4">
        <h1 className="text-2xl font-bold p-4 text-blue-50"> YOUR PROFILE</h1>
        <div className="profile-content shadow-lg p-8 rounded-lg bg-base-200 text-gray-600 w-full max-w-md text-center">
          {/* Profile Picture */}
          {userData.photoURL && (
            <div className="profile-picture mb-4">
              <img
                src={userData.photoURL}
                alt="User Profile"
                className="rounded-sm w-48 h-40 mx-auto object-cover"
              />
            </div>
          )}

          {/* User Details */}
          <div className="profile-details mb-6">
            <h2 className="text-3xl font-bold mb-2">{userData.Username}</h2>
            <p className="text-lg text-gray-600">{userData.email}</p>
          </div>

          {/* Toggle Password Update */}
          <button
            onClick={() => setIsUpdatingPassword(!isUpdatingPassword)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mb-4 transition duration-300">
            {isUpdatingPassword ? "Cancel Password Update" : "Change Password"}
          </button>

          {/* Update Password Section */}
          {isUpdatingPassword && (
            <form
              onSubmit={handlePasswordUpdate}
              className="password-update-form mb-6">
              <div className="mb-4">
                <input
                  type={showPassword ? "text" : "password"}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="Enter Old Password" 
                />
              </div>
              <div className="mb-4">
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="Enter New Password"
                />
              </div>

              {/* Toggle Show Password */}
              <div className="mb-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                    className="mr-2"
                  />
                  Show Password
                </label>
              </div>

              {passwordUpdated && (
                <p className="text-green-500 mb-4">
                  Password updated successfully!
                </p>
              )}
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
                Update Password
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
