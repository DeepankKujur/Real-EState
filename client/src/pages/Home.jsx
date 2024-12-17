import React from 'react';
import { Link } from 'react-router-dom';
import darkimage from "../assets/img.jpg"

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header - Banner Section */}
      <header className="relative text-center bg-gradient-to-r from-black via-black to-gray-900 text-white py-40 shadow-2xl overflow-hidden">
  {/* Background Image with animation */}
  <div className="absolute inset-0 bg-cover bg-center opacity-60 transform scale-105 animate-[zoom-in_15s_infinite]" 
        style={{ backgroundImage: `url(${darkimage})` }}>
  </div>
  
  <div className="relative z-10 px-5">
    {/* Title and Subtitle */}
    <h1 className="text-6xl font-extrabold tracking-wide mb-4 animate__animated animate__fadeIn animate__delay-1s">
      Welcome to GD-Groups
    </h1>
    <h2 className="text-4xl lg:text-6xl font-extrabold text-center mb-4 animate__animated animate__fadeIn animate__delay-2s">
      Find your <span className="text-sky-400">perfect</span> place now
    </h2>
  </div>

  {/* Content Section with description and call-to-action */}
  <div className="relative z-10 px-5 mt-8">
    <p className="text-lg lg:text-xl text-center font-light text-gray-300 mb-8 animate__animated animate__fadeIn animate__delay-3s">
      Discover a variety of rental houses and apartments with ease at GD-Groups. Your next home is just a click away.
    </p>

    <div className="text-center mt-8">
      <Link
        to="/search"
        className="px-8 py-3 text-lg text-blue-700 bg-white font-bold rounded-lg shadow-xl hover:bg-gray-200 hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105"
      >
        Start Your Search
      </Link>
    </div>
  </div>
</header>




      {/* Swiper (for listing images or cards) */}
      <div className="mt-20">
        {/* Add your Swiper component or image gallery here */}
      </div>

      {/* Listing results for offer */}
      <div className="mt-20 px-5">
        {/* Add your property listings or search results here */}
      </div>
    </div>
  );
}
