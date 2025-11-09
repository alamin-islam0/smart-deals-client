import React, { useContext, useEffect, useRef, useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const product = useLoaderData();
  const [bids, setBids] = useState([]);
  const bidModalRef = useRef(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch(`http://localhost:3000/products/bids/${product?._id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("bids for this product", data);
        // Sort bids by bid_price in descending order (highest first)
        const sortedBids = data.sort((a, b) => b.bid_price - a.bid_price);
        setBids(sortedBids);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [product?._id]);

  const handleBidModalOpen = () => {
    bidModalRef.current.showModal();
  };

  const handleBidSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const url = e.target.url.value;
    const bid = e.target.bid.value;
    const number = e.target.number.value;
    console.log(product._id, name, email, url, bid, number);
    const newBid = {
      product: product._id,
      buyer_name: name,
      buyer_email: email,
      buyer_image: url,
      bid_price: bid,
      buyer_contact: number,
      status: "pending",
    };
    fetch("http://localhost:3000/bids", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("after placing bid", data);
        if (data.insertedId) {
          bidModalRef.current.close();
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Your bid has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          //Add the new bid to the state with product_info
          newBid._id = data.insertedId;
          newBid.product_info = {
            title: product.title,
            price_min: product.price_min,
            price_max: product.price_max,
            image: product.image,
          };
          const newBids = [...bids, newBid];
          newBids.sort((a, b) => b.bid_price - a.bid_price);
          setBids(newBids);
        }
      });
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          to="/allProducts"
          className="inline-flex items-center text-sm font-medium mb-6 text-gray-700 hover:text-gray-900"
        >
          <svg
            className="w-5 h-5 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back To Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Image and Product Description */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <img
                src={product?.image || "placeholder-image-url"}
                alt={product?.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Description */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold text-navy-900 mb-4">
                Product Description
              </h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-600">
                    Condition:
                  </span>
                  <span className="text-sm text-navy-900">{product?.condition}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-600">
                    Usage Time:
                  </span>
                  <span className="text-sm text-navy-900">{product?.usage}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {product?.description ||
                  `It Is A Long Established Fact That A Reader Will Be Distracted By The Readable Content Of A Page When Looking At Its Layout. The Point Of Using Lorem Ipsum Is That It Has A More-Or-Less Normal Distribution Of Letters, As Opposed To Using 'Content Here, Content Here', Making It Look Like Readable English.`}
              </p>
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="flex flex-col">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h1 className="text-3xl font-bold text-navy-900 mb-2">
                {product?.title}
              </h1>
              {/* Category Tag */}
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-sm font-medium bg-purple-100 text-purple-600 rounded-full">
                  {product?.category}
                </span>
              </div>
              {/* Price Range */}
              <div className="mb-4">
                <span className="text-2xl font-bold text-green-600">
                  ${product?.price_min} - ${product?.price_max}
                </span>
                <p className="text-sm text-gray-600 mt-1">Price starts from</p>
              </div>
              {/* Product Details Section */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-navy-900 mb-4">
                  Product Details
                </h2>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Product ID:</span>{" "}
                    {product?.id || "68f753e42174ce36e8c88214"}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Posted:</span>{" "}
                    {product?.posted_date || "10/19/2024"}
                  </p>
                </div>
              </div>
              {/* Seller Information */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-navy-900 mb-4">
                  Seller Information
                </h2>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                    <img
                      src={product?.seller_image || "/default-avatar.png"}
                      alt="Seller"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-navy-900">
                      {product?.seller_name || "Sara Chen"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {product?.email || "crafts.by.sara@shop.net"}
                    </p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Location:</span>{" "}
                    {product?.location || "Los Angeles, CA"}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Contact:</span>{" "}
                    {product?.seller_contact || "01722-930883"}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Status:</span>{" "}
                    <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">
                      On sale
                    </span>
                  </p>
                </div>
              </div>
              {/* Buy Button */}
              <button
                onClick={handleBidModalOpen}
                className="mt-auto w-full text-center py-3 bg-white border-2 border-[#8B5CF6] text-[#8B5CF6] rounded-full 
             hover:bg-gradient-to-r hover:from-[#632EE3] hover:to-[#9F62F2] hover:text-white 
             transition-all duration-300 font-medium"
              >
                I Want Buy This Product
              </button>

              {/* //Modal */}
              {/* <button
                className="btn"
                onClick={() =>
                  document.getElementById("my_modal_5").showModal()
                }
              >
                open modal
              </button> */}
              <dialog
                ref={bidModalRef}
                className="modal modal-bottom sm:modal-middle"
              >
                <div className="modal-box">
                  <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-md">
                    <h2 className="text-2xl font-semibold text-center text-gray-900 mb-6">
                      Give Seller Your Offered Price
                    </h2>

                    <form onSubmit={handleBidSubmit} className="space-y-4">
                      {/* Buyer Name & Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Buyer Name
                          </label>
                          <input
                            type="text"
                            readOnly
                            name="name"
                            defaultValue={user?.displayName || ""}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Buyer Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            readOnly
                            defaultValue={user?.email || ""}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                      </div>

                      {/* Buyer Image URL */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Buyer Image URL
                        </label>
                        <input
                          type="url"
                          name="url"
                          readOnly
                          defaultValue={user?.photoURL}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>

                      {/* Price */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Place your Price
                        </label>
                        <input
                          type="text"
                          name="bid"
                          placeholder="Place your bid"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>

                      {/* Contact Info */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Contact Info
                        </label>
                        <input
                          type="text"
                          name="number"
                          placeholder="e.g. +1-555-1234"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>

                      {/* Buttons */}
                      <div className="flex justify-end gap-3 pt-4">
                        <button
                          type="button"
                          className="px-5 py-2 border border-purple-500 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        >
                          Submit Bid
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="modal-action">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn btn-primary text-white px-8 py-3 rounded-full transition-colors">
                        Close
                      </button>
                    </form>
                  </div>
                </div>
              </dialog>
            </div>
          </div>
        </div>
      </div>
      {/* Bids collection */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">
            Bids For This Products:{" "}
            <span className="text-[#8B5CF6]">{bids.length}</span>
          </h2>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">
                    SL No
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">
                    Product
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">
                    Seller
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">
                    Bid Price
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {bids.map((bid, index) => (
                  <tr
                    key={bid._id || index}
                    className="border-b border-gray-100"
                  >
                    <td className="py-4 px-4 text-sm text-gray-900">
                      {index + 1}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden">
                          <img
                            src={
                              bid.product_info?.image ||
                              product?.image ||
                              "placeholder-image-url"
                            }
                            alt={bid.product_info?.title || "Product"}
                            className="w-16 h-16 object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {bid.product_info?.title || "N/A"}
                          </p>
                          <p className="text-sm text-gray-600">
                            ${bid.product_info?.price_min || 0} - $
                            {bid.product_info?.price_max || 0}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-300 rounded-full">
                          <img
                            src={bid.buyer_image || "/default-avatar.png"}
                            alt={bid.buyer_name || "Buyer"}
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {bid.buyer_name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {bid.buyer_email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm font-semibold text-gray-900">
                      ${bid.bid_price}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <button className="px-4 py-2 border-2 border-green-500 text-green-600 rounded-lg hover:bg-green-50 transition-colors font-medium">
                          Accept Offer
                        </button>
                        <button className="px-4 py-2 border-2 border-red-500 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium">
                          Reject Offer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
