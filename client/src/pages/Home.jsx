import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      {/* Top Section */}
      <div className="flex flex-col gap-8 p-15 px-3 max-w-6xl mx-auto mt-20">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Looking for your next <span className="text-slate-500">perfect</span>
          <br />
          place with ease
        </h1>
        <div className="flex flex-col text-gray-400 gap-1 text-xs sm:text-sm">
          <p>Your perfect home awaits at Gd-Groups, the top choice for finding your next living space.</p>
          <p>We offer an extensive variety of properties for you to choose from.</p>
        </div>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-blue-700 font-bold hover:underline"
        >
          Let's get started...
        </Link>
      </div>

      {/* Swiper */}

      {/* Listing results for offer */}
    </div>
  );
}
