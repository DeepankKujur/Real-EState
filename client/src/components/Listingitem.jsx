import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

export default function Listingitem({ listing }) {
  return (
    <div className="bg-gray-800 shadow-lg hover:shadow-xl transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt="listing cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="p-4 flex flex-col gap-3 w-full">
          <p className="truncate text-xl font-semibold text-white">
            {listing.name}
          </p>
          <div className="flex items-center gap-2">
            <MdLocationOn className="h-5 w-5 text-yellow-500" />
            <p className="text-sm text-gray-400 truncate w-full">
              {listing.address}
            </p>
          </div>
          <p className="text-sm text-gray-300 line-clamp-3">
            {listing.description}
          </p>
          <p className="text-yellow-400 mt-2 font-semibold text-lg">
            $
            {listing.offer
              ? listing.discountPrice.toLocaleString("en-US")
              : listing.regularPrice.toLocaleString("en-US")}
            {listing.type === "rent" && " / month"}
          </p>
          <div className="text-gray-300 flex gap-6">
            <div className="font-bold text-sm">
              {listing.bedrooms > 1
                ? `${listing.bedrooms} Beds`
                : `${listing.bedrooms} Bed`}
            </div>
            <div className="font-bold text-sm">
              {listing.bathrooms > 1
                ? `${listing.bathrooms} Baths`
                : `${listing.bathrooms} Bath`}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
