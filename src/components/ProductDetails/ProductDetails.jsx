import React from 'react';
import { useLoaderData, Link } from 'react-router-dom';

const ProductDetails = () => {
    const product = useLoaderData();
    
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Back Button */}
            <Link to="/products" className="inline-flex items-center mb-6 text-gray-600 hover:text-gray-800">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Back To Products
            </Link>

            {/* Main Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Image Section */}
                <div className="bg-gray-200 rounded-lg overflow-hidden">
                    <img
                        src={product.image || 'placeholder-image.jpg'}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Product Info Section */}
                <div className="space-y-6">
                    <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
                    
                    {/* Category Badge */}
                    <div className="inline-block">
                        <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">
                            {product.category || 'Art And Hobbies'}
                        </span>
                    </div>

                    {/* Price Section */}
                    <div className="space-y-2">
                        <div className="text-3xl font-bold text-green-600">
                            ${product.price || '22.5 - 30'}
                        </div>
                        <p className="text-gray-600">Price starts from</p>
                    </div>

                    {/* Product Details */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-900">Product Details</h2>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-gray-600">Product ID:</p>
                                <p className="font-medium">{product.id || '6817538214cb36e8c88214'}</p>
                            </div>
                            <div>
                                <p className="text-gray-600">Posted:</p>
                                <p className="font-medium">{product.postedDate || '10/19/2024'}</p>
                            </div>
                            <div>
                                <p className="text-gray-600">Condition:</p>
                                <p className="font-medium">{product.condition || 'New'}</p>
                            </div>
                            <div>
                                <p className="text-gray-600">Usage Time:</p>
                                <p className="font-medium">{product.usageTime || '3 Month'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Seller Information */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-900">Seller Information</h2>
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                                <img
                                    src={product.sellerImage || 'seller-placeholder.jpg'}
                                    alt="Seller"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">{product.sellerName || 'Sara Chen'}</h3>
                                <p className="text-sm text-gray-600">{product.sellerEmail || 'crafts.by.sara@shop.net'}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-gray-600">Location:</p>
                                <p className="font-medium">{product.location || 'Los Angeles, CA'}</p>
                            </div>
                            <div>
                                <p className="text-gray-600">Contact:</p>
                                <p className="font-medium">{product.contact || 'sara.chen_contact'}</p>
                            </div>
                            <div>
                                <p className="text-gray-600">Status:</p>
                                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm">
                                    {product.status || 'On Sale'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Product Description */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-900">Product Description</h2>
                        <p className="text-gray-600 leading-relaxed">
                            {product.description || `It Is A Long Established Fact That A Reader Will Be Distracted By The
                            Readable Content Of A Page When Looking At Its Layout. The Point Of
                            Using Lorem Ipsum Is That It Has A More-Or-Less Normal Distribution
                            Of Letters, As Opposed To Using 'Content Here, Content Here', Making
                            It Look Like Readable English.`}
                        </p>
                    </div>

                    {/* Buy Button */}
                    <button className="w-full py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                        I Want Buy This Product
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;