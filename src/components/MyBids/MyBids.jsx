import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";

const MyBids = () => {
  const { user } = useContext(AuthContext);
  const [bids, setBids] = useState([]);
  const [error, setError] = useState(null);

  const handleDeleteBid = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        
        fetch(`http://localhost:3000/bids/${_id}`, {
          method: 'DELETE',
        })
        .then(res => res.json())
        .then(data => {
          console.log('after delete', data)
          if(data.deletedCount){
            Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        //
        const remainingBids = bids.filter(bid => bid._id !==_id);
        setBids(remainingBids)
        }
        })
        // Swal.fire({
        //   title: "Deleted!",
        //   text: "Your file has been deleted.",
        //   icon: "success",
        // });
      }
    });
  };

  useEffect(() => {
    const load = async () => {
      if (!user?.email) return;
      try {
        const base =
          import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";
        const res = await fetch(
          `${base}/bids?email=${encodeURIComponent(user.email)}`
        );
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`HTTP ${res.status}: ${text.slice(0, 200)}`);
        }
        const data = await res.json();
        setBids(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        setError("Could not load bids.");
      }
    };
    load();
  }, [user?.email]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-linear-to-r from-[#fdf2ff] via-[#e6f4ff] to-[#fdf2ff] rounded-2xl shadow-lg p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              My <span className="text-[#8B5CF6]">Bids</span>
            </h1>
            <p className="text-gray-600 mt-2">
              You have placed {bids.length} bid{bids.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="bg-white rounded-full px-6 py-3 shadow-md">
              <span className="text-gray-600">Total Bids: </span>
              <span className="font-bold text-[#8B5CF6] text-xl">
                {bids.length}
              </span>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-red-500 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-red-700 font-medium">{error}</span>
            </div>
          </div>
        )}

        {bids.length === 0 && !error ? (
          <div className="bg-white rounded-2xl shadow-md p-8 text-center">
            <div className="mx-auto w-24 h-24 bg-[#f0e6ff] rounded-full flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-[#8B5CF6]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No Bids Yet
            </h3>
            <p className="text-gray-600 mb-6">
              You haven't placed any bids on products yet.
            </p>
            <button
              className="btn-primary text-white px-6 py-3 rounded-full hover:shadow-lg transition-all"
              onClick={() => (window.location.href = "/allProducts")}
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr className="bg-[#f0e6ff]">
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">
                      Product
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">
                      Buyer
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">
                      Bid Amount
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">
                      Date
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bids.map((bid, index) => (
                    <tr
                      key={bid._id}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img
                                src={bid.product?.image}
                                alt={bid.product?.title}
                              />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">
                              {bid.product?.title}
                            </div>
                            <div className="text-gray-500 text-sm">
                              ${bid.product?.price}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img src={bid?.buyer_image} alt={bid.buyer_name} />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">
                              {bid.buyer_name}
                            </div>
                            <div className="text-gray-500 text-sm">
                              {bid.buyer_email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-lg font-bold text-[#8B5CF6]">
                          ${bid.bid_price}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            bid.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : bid.status === "accepted"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {bid.status.charAt(0).toUpperCase() +
                            bid.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        {new Date().toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        <button
                          onClick={() => handleDeleteBid(bid._id)}
                          className="px-4 py-2 border-2 border-red-500 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium"
                        >
                          Remove Bid
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBids;
