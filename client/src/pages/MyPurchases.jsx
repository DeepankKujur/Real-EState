import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function MyPurchases() {
  const { currentUser } = useSelector((state) => state.user);
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser?._id) return;
  
    const fetchPurchases = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/payment/user-purchases/${currentUser._id}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        
        if (data.success) {
          setPurchases(data.purchases);
        } else {
          console.error("Failed to fetch purchases:", data.message);
        }
      } catch (err) {
        console.error("Error fetching purchases:", err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPurchases();
  }, [currentUser]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">My Purchased Properties</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-800 rounded-lg p-4 animate-pulse">
                <div className="bg-gray-700 h-48 rounded-md mb-4"></div>
                <div className="bg-gray-700 h-4 rounded w-3/4 mb-3"></div>
                <div className="bg-gray-700 h-3 rounded w-1/2 mb-2"></div>
                <div className="bg-gray-700 h-3 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">My Purchased Properties</h2>
          <Link 
            to="/" 
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Browse More
          </Link>
        </div>
        
        {purchases.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {purchases.map((purchase) => (
              <div 
                key={purchase._id} 
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-700"
              >
                {purchase.listingId?.imageUrls?.[0] && (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={purchase.listingId.imageUrls[0]} 
                      alt={purchase.listingId.name} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-4">
                  <Link to={`/listing/${purchase.listingId?._id}`}>
                    <h3 className="font-bold text-lg mb-2 hover:text-blue-400 transition-colors duration-200">
                      {purchase.listingId?.name || "Property not available"}
                    </h3>
                  </Link>
                  <p className="text-gray-400 mb-3 text-sm">
                    {purchase.listingId?.address}
                  </p>
                  
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-blue-400 font-medium">
                      ₹{purchase.amount}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {new Date(purchase.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="bg-gray-700 p-2 rounded">
                    <p className="text-xs text-gray-400 mb-1">Transaction ID</p>
                    <p className="font-mono text-xs text-gray-300 break-all">
                      {purchase.paymentId}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <svg 
              className="w-16 h-16 text-gray-600 mb-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="1.5" 
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-medium text-gray-300 mb-2">
              No Purchases Yet
            </h3>
            <p className="text-gray-500 mb-6 max-w-md">
              You have not made any property purchases yet. Browse our listings to find your perfect property.
            </p>
            <Link 
              to="/" 
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg transition-colors duration-200"
            >
              Explore Properties
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
