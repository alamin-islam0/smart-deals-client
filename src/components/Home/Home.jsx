import React from "react";
import leftBg from "../../assets/left-bg.png";
import rightBg from "../../assets/right-bg.png";
import LatestProducts from "../LatestProducts/LatestProducts";

const latestProductsPromise = fetch('http://localhost:3000/latest-products')
.then(res => res.json())


const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative min-h-[80vh] bg-gradient-to-r from-[#fdf2ff] via-[#e6f4ff] to-[#fdf2ff] overflow-hidden">
        {/* Background Images */}
        <img
          src={leftBg}
          alt="Left Background"
          className="absolute left-0 top-0 h-full w-auto opacity-50"
        />
        <img
          src={rightBg}
          alt="Right Background"
          className="absolute right-0 top-0 h-full w-auto opacity-50"
        />

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Deal Your <span className="text-[#8B5CF6]">Products</span>
              <br />
              In A <span className="text-[#8B5CF6]">Smart</span> Way !
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              SmartDeals helps you sell, resell, and shop from trusted local
              sellers — all in one place!
            </p>

            {/* Search Bar */}
            <div className="flex justify-center gap-4 mb-8">
              <div className="relative flex-1 max-w-2xl">
                <input
                  type="text"
                  placeholder="Search For Products, Categories..."
                  className="w-full px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-[#8B5CF6] shadow-sm"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#8B5CF6] text-white p-2 rounded-full hover:bg-[#7C3AED] transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              <button className="btn-primary text-white px-8 py-3 rounded-full transition-colors">
                Watch All Products
              </button>
              <button className="border-2 border-[#8B5CF6] text-[#8B5CF6] px-8 py-3 rounded-full hover:bg-gradient-to-r from-[#632EE3] to-[#9F62F2] hover:text-white">
                Post an Product
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <LatestProducts latestProductsPromise = {latestProductsPromise}>
            
        </LatestProducts>
      </div>
    </div>
  );
};

export default Home;
