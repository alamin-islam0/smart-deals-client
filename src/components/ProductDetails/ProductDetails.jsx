import React from "react";
import { useLoaderData, Link } from "react-router-dom";

const ProductDetails = () => {
  const product = useLoaderData();

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          to="/products"
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
                  <span className="text-sm text-navy-900">New</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-600">
                    Usage Time:
                  </span>
                  <span className="text-sm text-navy-900">3 Month</span>
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
                  Art And Hobbies
                </span>
              </div>

              {/* Price Range */}
              <div className="mb-4">
                <span className="text-2xl font-bold text-green-600">
                  ${product?.price_range || "22.5 - 30"}
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
                      src={product?.seller?.avatar || "/default-avatar.png"}
                      alt="Seller"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-navy-900">
                      {product?.seller?.name || "Sara Chen"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {product?.seller?.email || "crafts.by.sara@shop.net"}
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
                    {product?.contact || "sara.chen_contact"}
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
              <button className="mt-auto w-full text-center py-3 bg-white border-2 border-[#8B5CF6] text-[#8B5CF6] rounded-full 
             hover:bg-gradient-to-r hover:from-[#632EE3] hover:to-[#9F62F2] hover:text-white 
             transition-all duration-300 font-medium">
                I Want Buy This Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
