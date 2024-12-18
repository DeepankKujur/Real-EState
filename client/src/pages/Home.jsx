import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import darkimage from "../assets/img.jpg";
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from 'swiper/modules';
import SwiperCore from "swiper";
import 'swiper/css/bundle';
import Listingitem from "../components/Listingitem";


export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);



  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferListings();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen">
  {/* Header - Banner Section */}
  <header className="relative text-center bg-gradient-to-r from-black via-black to-gray-900 text-white py-16 shadow-2xl overflow-hidden">
  {/* Background Image with animation */}
  <div
    className="absolute inset-0 bg-cover bg-center opacity-60 transform scale-105 animate-[zoom-in_15s_infinite]"
    style={{ backgroundImage: `url(${darkimage})` }}
  ></div>

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
      Discover a variety of rental houses and apartments with ease at
      GD-Groups. Your next home is just a click away.
    </p>

    <div className="text-center mt-8">
      <Link
        to="/search"
        className="px-8 py-3 text-lg text-blue-700 bg-white font-bold rounded-lg shadow-xl hover:bg-blue-300 hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-110"
      >
        Start Your Search
      </Link>
    </div>
  </div>
</header>


  {/* Swiper (for listing images or cards) */}
  <Swiper navigation>
    {offerListings &&
      offerListings.length > 0 &&
      offerListings.map((listing) => (
        <SwiperSlide key={listing._id}>
          <div
            style={{
              background: `url(${listing.imageUrls[0]}) center no-repeat`,
              backgroundSize: 'cover',
            }}
            className="h-[500px]"
            key={listing._id}
          ></div>
        </SwiperSlide>
      ))}
  </Swiper>

  {/* Listing results for offer */}
  <div className="w-full mx-auto p-3 flex flex-col gap-8 ">
    {offerListings && offerListings.length > 0 && (
      <div className="my-4">
        <div className="my-3 text-center">
          <h2 className="text-3xl font-semibold text-white underline">Recent offers</h2>
          <Link className="text-sm text-yellow-400 hover:underline mt-2" to={'/search?offer=true'}>
            Show more offers
          </Link>
        </div>
        <div className="flex flex-wrap gap-4 justify-center mt-6">
          {offerListings.map((listing) => (
            <Listingitem listing={listing} key={listing._id} />
          ))}
        </div>
      </div>
    )}

    {rentListings && rentListings.length > 0 && (
      <div className="my-4">
        <div className="my-3 text-center">
          <h2 className="text-3xl font-semibold text-white underline">Recent places for rent</h2>
          <Link className="text-sm text-yellow-400 hover:underline mt-2" to={'/search?type=rent'}>
            Show more places for rent
          </Link>
        </div>
        <div className="flex flex-wrap gap-4 justify-center mt-6">
          {rentListings.map((listing) => (
            <Listingitem listing={listing} key={listing._id} />
          ))}
        </div>
      </div>
    )}

    {saleListings && saleListings.length > 0 && (
      <div className="my-4">
        <div className="my-3 text-center">
          <h2 className="text-3xl font-semibold text-white underline">Recent places for sale</h2>
          <Link className="text-sm text-yellow-400 hover:underline mt-2" to={'/search?type=sale'}>
            Show more places for sale
          </Link>
        </div>
        <div className="flex flex-wrap gap-4 justify-center mt-6">
          {saleListings.map((listing) => (
            <Listingitem listing={listing} key={listing._id} />
          ))}
        </div>
      </div>
    )}
  </div>
</div>

  );
}
