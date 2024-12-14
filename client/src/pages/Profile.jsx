import React from 'react';
import { Link } from 'react-router-dom';


export default function SignIn() {
  return (
    <div className="font-[sans-serif] bg-white min-h-screen flex justify-center items-center p-4">
      <div className="bg-gray-50 p-10 rounded-lg shadow-lg w-full max-w-2xl flex justify-center items-center">
        <form className="w-full max-w-lg">
          <div className="mb-6 text-center">
            <h3 className="text-xl font-bold text-blacl-400">Profile</h3>
          </div>

          {/* Full Name Field */}
          <div>
            <label className="text-black text-xs block mb-1">Full Name</label>
            <div className="relative flex items-center">
              <input
                name="name"
                type="text"
                required
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
                required
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
                required
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
              type="button"
              className="w-full py-2 px-4 text-sm text-white font-semibold rounded-md bg-gray-700 hover:bg-gray-800 focus:outline-none"
            >
              Update
            </button>
            {/* Create Listing Button */}
            <Link
              type="button"
              className="w-full py-2 px-4 text-sm text-white font-semibold rounded-md bg-purple-900 text-center hover:bg-purple-600 focus:outline-none"
            >
              Create Listing
            </Link>
            {/* Additional Links */}
            <div className="flex justify-between text-sm mt-4">
              <span className="text-gray-500 cursor-pointer hover:text-gray-700">Delete Account</span>
              <span className="text-gray-500 cursor-pointer hover:text-gray-700">Sign Out</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
