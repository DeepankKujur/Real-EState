import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PaymentSuccess() {
  const { currentUser } = useSelector((state) => state.user);
  const query = new URLSearchParams(useLocation().search);
  const paymentId = query.get("payment_id");
  const [purchaseDetails, setPurchaseDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!paymentId) return;
  
    const fetchPurchaseDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/payment/payment-details/${paymentId}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        
        if (data.success) {
          setPurchaseDetails(data.purchase);
        }
      } catch (error) {
        console.error("Error fetching payment details:", error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPurchaseDetails();
  }, [paymentId]);

  return (
    <div className="min-h-screen w-full bg-gray-900 text-gray-100 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex items-center justify-center h-full">
        <div className="w-full max-w-2xl bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700">
          {/* Header Section */}
          <div className="bg-green-600 p-6 sm:p-8 text-center">
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-white/10 mb-4">
              <svg
                className="h-12 w-12 text-white animate-checkmark"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Payment Successful!
            </h1>
          </div>

          {/* Content Section */}
          <div className="p-6 sm:p-8 space-y-6">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mb-4"></div>
                <p className="text-gray-400 text-lg">Loading payment details...</p>
              </div>
            ) : purchaseDetails ? (
              <>
                <div className="space-y-4">
                  <div className="bg-gray-700 p-5 rounded-xl border border-gray-600">
                    <h3 className="font-bold text-xl text-white mb-2">
                      {purchaseDetails.listingId?.name || "Property"}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-300">
                      <div>
                        <p className="font-medium">Amount Paid:</p>
                        <p className="text-lg font-semibold text-green-400">
                          ₹{purchaseDetails.amount}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">Date:</p>
                        <p className="text-gray-300">
                          {new Date(purchaseDetails.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm text-gray-400 mb-1">Transaction ID</p>
                    <p className="font-mono text-gray-200 bg-gray-600 p-2 rounded break-all">
                      {purchaseDetails.paymentId}
                    </p>
                  </div>
                </div>

                <div className="pt-4">
                  <p className="text-gray-400 text-center">
                    Thank you for your purchase. A confirmation has been sent to your email.
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <svg
                  className="mx-auto h-12 w-12 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-300">
                  Payment details not available
                </h3>
                <p className="mt-1 text-gray-500">
                  We could not retrieve your payment information.
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link
                to="/"
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 text-center"
              >
                Back to Home
              </Link>
              
              {currentUser && (
                <Link
                  to="/my-purchases"
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 text-center"
                >
                  View My Purchases
                </Link>
              )}
            </div>

            {/* Support Link */}
            <div className="pt-6 text-center">
              <p className="text-sm text-gray-500">
                Need help?{" "}
                <Link
                  to="/contact"
                  className="text-blue-400 hover:text-blue-300 font-medium underline"
                >
                  Contact our support team
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}