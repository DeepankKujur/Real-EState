import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  singOutUserFailure,
  singOutUserStart,
  singOutUserSuccess,
  updateUserStart,
  updateUserSuccess,
  updateuserFailure,
} from "../redux/user/userSlice";

import axios from "axios";

export default function Profile() {
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [imageUrl, setImageUrl] = useState("");
  console.log(imageUrl);
  console.log(file);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [updateSucccess, setUpdateSuccess] = useState(false);

  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = async (file) => {
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await axios.post("http://localhost:3000/upload", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const uploadedImageUrl = res.data.fileUrl;
      setImageUrl(uploadedImageUrl);
      setFormData((prevData) => ({
        ...prevData,
        avatar: uploadedImageUrl,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateuserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateuserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(singOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(singOutUserFailure(data.message));
        return;
      }
      dispatch(singOutUserSuccess(data));
    } catch (error) {
      dispatch(singOutUserFailure(error.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  return (
    <div className="font-[sans-serif] bg-gradient-to-r from-gray-200 to-gray-700 min-h-screen flex justify-center items-center p-4">
      <div className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 p-10 rounded-lg shadow-2xl w-full max-w-3xl flex justify-center items-center">
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
          <div className="mb-6 text-center">
            <h3 className="text-2xl font-bold text-gray-800">Profile</h3>
          </div>
          <div className="flex justify-center items-center mt-2">
            <input
              onChange={handleFileChange}
              type="file"
              ref={fileRef}
              hidden
              accept="image/*"
            />
            <img
              onClick={() => fileRef.current.click()}
              src={imageUrl || currentUser.avatar}
              alt="profile"
              className="rounded-full h-28 w-28 object-cover cursor-pointer border-4 border-gray-300 shadow-md"
            />
          </div>

          {/* Username Field */}
          <div className="mt-6">
            <label className="text-black font-bold text-xs block mb-1">
              Username
            </label>
            <div className="relative flex items-center">
              <input
                name="userName"
                type="text"
                id="username"
                onChange={handleChange}
                defaultValue={currentUser.username}
                className="w-full bg-slate-300 text-sm text-gray-800 border-b border-black focus:border-yellow-400 px-2 py-2 outline-none transition-all hover:border-gray-600 hover:bg-gray-50"
                placeholder="Enter name"
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="mt-4">
            <label className="text-black font-bold text-xs block mb-1">
              Email
            </label>
            <div className="relative flex items-center">
              <input
                name="email"
                type="text"
                id="email"
                onChange={handleChange}
                defaultValue={currentUser.email}
                className="w-full bg-slate-300 text-sm text-gray-800 border-b border-black focus:border-yellow-400 px-2 py-2 outline-none transition-all hover:border-gray-600 hover:bg-gray-50"
                placeholder="Enter email"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mt-4">
            <label className="text-black font-bold text-xs block mb-1">
              Password
            </label>
            <div className="relative flex items-center">
              <input
                name="password"
                type="password"
                id="password"
                onChange={handleChange}
                className="w-full bg-slate-300 text-sm text-gray-800 border-b border-black focus:border-yellow-400 px-2 py-2 outline-none transition-all hover:border-gray-600 hover:bg-gray-50"
                placeholder="Enter password"
              />
            </div>
          </div>

          {/* Buttons Section */}
          <div className="mt-8 flex flex-col gap-4">
            {/* Update Button */}
            <button
              disabled={loading}
              type="submit"
              className="w-full py-2 px-4 text-sm text-white font-semibold rounded-md bg-yellow-500 hover:bg-yellow-600 hover:shadow-lg focus:outline-none transition-all"
            >
              {loading ? "Loading..." : "Update"}
            </button>
            {/* Create Listing Button */}
            <Link
              to="/create-listing"
              className="w-full py-2 px-4 text-sm text-white font-semibold rounded-md bg-purple-600 text-center hover:bg-purple-700 hover:shadow-lg focus:outline-none transition-all"
            >
              Create Listing
            </Link>
            {/* Additional Links */}
            <div className="flex justify-between text-sm mt-4">
              <span
                onClick={handleDeleteUser}
                className="text-white bg-red-600 px-4 py-2 rounded-lg shadow-md cursor-pointer hover:bg-red-700 hover:shadow-lg transition-all"
              >
                Delete Account
              </span>
              <span
                onClick={handleSignOut}
                className="text-white bg-gray-800 px-4 py-2 rounded-lg shadow-md cursor-pointer hover:bg-gray-900 hover:shadow-lg transition-all"
              >
                Sign Out
              </span>
            </div>
            <p className="text-red-700 mt-3">{error ? error : ""}</p>
            <p className="text-green-700 mt-3">
              {updateSucccess ? "User is updated successfully" : ""}
            </p>
            <button
  type="button"
  onClick={handleShowListings}
  className="w-full py-2 px-4 text-sm text-white font-semibold rounded-md bg-green-500 hover:bg-green-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition-all duration-300"
>
  Show Listings
</button>

            <p className="text-green-700 mt-3">
              {showListingsError ? "Error showing listing" : ""}
            </p>

            {userListings &&
              userListings.length > 0 &&
              <div  className='flex flex-col gap-4'>
                <h1 className="text-center mt-3 mb-6 text-3xl font-bold text-gray-800 tracking-wide capitalize">
  Your Listings
</h1>

                { userListings.map((listing) => (
                <div key={listing._id} className="border bg-slate-400 rounded-lg p-3 flex justify-between items-center gap-4">
                  <Link to={`/listings/${listing._id}`}>
                    <img src={listing.imageUrls[0]} alt="listing cover" className="h-16 w-16 object-contain " />
                  </Link>
                  <Link className="flex-1 text-slate-700 font-semibold hover:underline truncate " to={`/listings/${listing._id}`}>
                    <p>{listing.name}</p>
                  </Link>
                  <div className='flex flex-col item-center'>
                  <button
    onClick={() => handleListingDelete(listing._id)}
    className="w-32 mb-1 text-white bg-red-500 hover:bg-red-600 uppercase font-semibold py-2 px-4 rounded-md shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
  >
    Delete
  </button>

                    <Link to={`/update-listing/${listing._id}`}>
                    <button
    className="w-32 text-white bg-green-500 hover:bg-green-600 uppercase font-semibold py-2 px-4 rounded-md shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
  >
    Edit
  </button>

                    </Link>
                  </div>
                </div>
                ))}
              </div>
            }
          </div>
        </form>
      </div>
    </div>
  );
}
