import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("http://localhost:3000/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-5xl text-center pb-14">
        Recent <span className="text-primary">Products</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {/* Product Image */}
            <div className="aspect-[4/3] bg-gray-200 relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Details */}
            <div className="p-6">
              <button className="bg-[#ede5fc] text-primary px-3 py-1 mb-4 rounded-full">
                {product.status}
              </button>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1">
                {product.title}
              </h3>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[#8B5CF6] text-2xl font-bold">
                  ${product.price_min} - {product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-gray-500 line-through text-lg">
                    ${product.originalPrice}
                  </span>
                )}
              </div>

              {/* View Details Button */}
              <Link
                to={`/productDetails/${product._id}`}
                className="block w-full text-center py-3 bg-white border-2 border-[#8B5CF6] text-[#8B5CF6] rounded-full 
             hover:bg-gradient-to-r hover:from-[#632EE3] hover:to-[#9F62F2] hover:text-white 
             transition-all duration-300 font-medium"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
