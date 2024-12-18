import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Listingitem from "../components/Listingitem";

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === "searchTerm") {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";

      const order = e.target.value.split("_")[1] || "desc";

      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("type", sidebardata.type);
    urlParams.set("parking", sidebardata.parking);
    urlParams.set("furnished", sidebardata.furnished);
    urlParams.set("offer", sidebardata.offer);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };

  return (
    <div className="flex flex-col md:flex-row bg-gray-900 text-gray-200 min-h-screen">
      <div className="p-7 border-b-2 md:border-r-2 border-gray-700 md:min-h-screen w-full md:w-1/4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Search Term */}
          <div className="flex flex-col gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              value={sidebardata.searchTerm}
              onChange={handleChange}
              className="border border-gray-600 bg-gray-800 rounded-lg p-3 w-full focus:outline-none focus:ring focus:ring-yellow-500"
            />
          </div>

          {/* Type Section */}
          <div className="flex flex-wrap gap-2 items-center">
            <label className="font-semibold">Type:</label>
            <div className="flex flex-col gap-1">
              <label>
                <input
                  type="radio"
                  id="all"
                  name="type"
                  onChange={handleChange}
                  checked={sidebardata.type === "all"}
                />
                <span className="ml-2">Rent & Sale</span>
              </label>
              <label>
                <input
                  type="radio"
                  id="rent"
                  name="type"
                  onChange={handleChange}
                  checked={sidebardata.type === "rent"}
                />
                <span className="ml-2">Rent</span>
              </label>
              <label>
                <input
                  type="radio"
                  id="sale"
                  name="type"
                  onChange={handleChange}
                  checked={sidebardata.type === "sale"}
                />
                <span className="ml-2">Sale</span>
              </label>
              <label>
                <input
                  type="radio"
                  id="offer"
                  onChange={handleChange}
                  checked={sidebardata.offer}
                  className="accent-gray-500"
                />
                <span className="ml-2 text-gray-300">Offer</span>
              </label>
            </div>
          </div>

          {/* Amenities Section */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Amenities:</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  id="parking"
                  onChange={handleChange}
                  checked={sidebardata.parking}
                />
                <span className="ml-2">Parking</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  id="furnished"
                  onChange={handleChange}
                  checked={sidebardata.furnished}
                />
                <span className="ml-2">Furnished</span>
              </label>
            </div>
          </div>

          {/* Sort Section */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Sort:</label>
            <select
              onChange={handleChange}
              defaultValue={"created_at_desc"}
              id="sort_order"
              className="border border-gray-600 bg-gray-800 rounded-lg p-3 focus:outline-none focus:ring focus:ring-yellow-500"
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>

          {/* Search Button */}
          <button className="bg-yellow-600 text-white p-3 rounded-lg uppercase hover:bg-yellow-500 focus:outline-none focus:ring focus:ring-yellow-500">
            Search
          </button>
        </form>
      </div>

      {/* Listings Section */}
      <div className="flex-1 p-7">
        <h1 className="text-3xl font-semibold border-b border-gray-700 pb-4 text-gray-200">
          Listing Results:
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && listings.length === 0 && (
            <p className="text-xl text-gray-400">No listings found!</p>
          )}
          {loading && (
            <p className="text-xl text-gray-400 text-center w-full">
              Loading...
            </p>
          )}

          {!loading &&
            listings &&
            listings.map((listing) => (
              <Listingitem key={listing._id} listing={listing} />
            ))}
          
          {showMore && (
            <button
              onClick={onShowMoreClick}
              className="text-yellow-500 hover:underline p-4 text-center w-full"
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
