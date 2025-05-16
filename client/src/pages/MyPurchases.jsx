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
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">My Purchased Properties</h2>
        <p>Loading your purchases...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">My Purchased Properties</h2>
      
      {purchases.length > 0 ? (
        <div className="grid gap-4">
          {purchases.map((purchase) => (
            <div 
              key={purchase._id} 
              className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row gap-4">
                {purchase.listingId?.imageUrls?.[0] && (
                  <img 
                    src={purchase.listingId.imageUrls[0]} 
                    alt={purchase.listingId.name} 
                    className="w-full md:w-48 h-32 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <Link to={`/listing/${purchase.listingId?._id}`}>
                    <h3 className="font-semibold text-lg hover:text-blue-600">
                      {purchase.listingId?.name || "Property not available"}
                    </h3>
                  </Link>
                  <p className="text-gray-600 mb-2">
                    {purchase.listingId?.address}
                  </p>
                  <div className="flex flex-wrap gap-4 mb-2">
                    <span className="text-sm">
                      <span className="font-medium">Amount:</span> ₹{purchase.amount}
                    </span>
                    <span className="text-sm">
                      <span className="font-medium">Purchased on:</span> {new Date(purchase.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Payment ID:</span> {purchase.paymentId}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">You have not made any purchases yet.</p>
          <Link 
            to="/" 
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Properties
          </Link>
        </div>
      )}
    </div>
  );
}