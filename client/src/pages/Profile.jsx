import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, updateUserStart, updateUserSuccess, updateuserFailure } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';


export default function Profile() {
  const { currentUser,loading,error} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [updateSucccess, setUpdateSuccess] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
// in this step we are sending data to backend and in response we Converts the response from the backend into a JavaScript object. and then use this data to the frontend 
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
 }

  
  const handleDeleteUser =async () => {
     try {
       dispatch(deleteUserStart());
       const res = await fetch(`/api/user/delete/${currentUser._id}`, {
         method: 'DELETE',
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
   }
  
  return (
    <div className="font-[sans-serif] bg-gray-400 min-h-screen flex justify-center items-center p-4 ">
      <div className="bg-gray-200 p-10 rounded-lg shadow-lg w-full  max-w-3xl flex justify-center items-center ">
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
          <div className="mb-6 text-center">
            <h3 className="text-xl font-bold text-black">Profile</h3> {/* Fixed typo 'text-blacl-400' to 'text-black' */}
          </div>
          <div className="flex justify-center items-center mt-2">
           
            <img
    src={currentUser.avatar}
    alt="profile"
    className="rounded-full h-28 w-28 object-cover cursor-pointer"
  />
</div>

          {/* Full Name Field */}
          <div>
            <label className="text-black text-xs block mb-1">UserName</label>
            <div className="relative flex items-center">
              <input
                name="userName"
                type="text"
                id='username'
                onChange={handleChange}
                defaultValue={currentUser.username}
                className="w-full bg-transparent text-sm text-black border-b border-gray-300 focus:border-yellow-400 px-2 py-2 outline-none"
                placeholder="Enter name"
              />
              <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-2" viewBox="0 0 24 24">
                <circle cx="10" cy="7" r="6" />
                <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5z" />
              </svg>
            </div>
          </div>

          {/* Email Field */}
          <div className="mt-4">
            <label className="text-black text-xs block mb-1">Email</label>
            <div className="relative flex items-center">
              <input
                name="email"
                type="text"
                id='email'
                onChange={handleChange}
                defaultValue={currentUser.email}
                className="w-full bg-transparent text-sm text-black border-b border-gray-300 focus:border-yellow-400 px-2 py-2 outline-none"
                placeholder="Enter email"
              />
              <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-2" viewBox="0 0 682.667 682.667">
                <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" />
              </svg>
            </div>
          </div>

          {/* Password Field */}
          <div className="mt-4">
            <label className="text-black text-xs block mb-1">Password</label>
            <div className="relative flex items-center">
              <input
                name="password"
                type="password"
                id='password'
                onChange={handleChange}
                className="w-full bg-transparent text-sm text-black border-b border-gray-300 focus:border-yellow-400 px-2 py-2 outline-none"
                placeholder="Enter password"
              />
              <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-2 cursor-pointer" viewBox="0 0 128 128">
                <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" />
              </svg>
            </div>
          </div>

          {/* Buttons Section */}
          <div className="mt-8 flex flex-col gap-4">
            {/* Update Button */}
            <button
              disabled={loading}
              type="submit"
              className="w-full py-2 px-4 text-sm text-white font-semibold rounded-md bg-gray-700 hover:bg-gray-800 focus:outline-none"
            >
            {loading? 'Loading...':'Update'}
            </button>
            {/* Create Listing Button */}
            <Link to="/create-listing"
              type="button"
              className="w-full py-2 px-4 text-sm text-white font-semibold rounded-md bg-purple-900 text-center hover:bg-purple-600 focus:outline-none"
            >
              Create Listing
            </Link>
            {/* Additional Links */}
            <div className="flex justify-between text-sm mt-4">
              <span onClick={handleDeleteUser} className="text-gray-500 cursor-pointer hover:text-gray-700">Delete Account</span>
              <span className="text-gray-500 cursor-pointer hover:text-gray-700">Sign Out</span>
            </div>
            <p className='text-red-700 mt-5'>{ error?error:''}</p>
            <p className='text-green-700 mt-5'>{ updateSucccess?'User is updated successfully':''}</p>
          </div>
        </form>
      </div>
    </div>
  );
}
