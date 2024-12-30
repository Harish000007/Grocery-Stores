import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");

  // Fetch product data based on the ID
  const fetchProductData = () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  // If product data is not found
  if (!productData) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Layout */}
      <div className="flex flex-col sm:flex-row gap-10">
        {/* Product Images */}
        <div className="flex-1 flex gap-3 sm:flex-row">
          {/* Thumbnail Images */}
          <div className="flex sm:flex-col gap-3 overflow-y-auto sm:w-[20%] w-full">
            {productData.image?.map((item, index) => (
              <img
                key={index}
                src={item}
                onClick={() => setImage(item)}
                alt={`Thumbnail ${index}`}
                className="cursor-pointer w-[24%] sm:w-full flex-shrink-0 hover:opacity-80 transition"
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="w-full sm:w-[80%]">
            <img
              src={image}
              className="w-full h-auto object-cover"
              alt="Product"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-semibold text-3xl">{productData.name}</h1>
          <div className="flex items-center py-2">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className="w-6 h-6 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ml-3">
              4.4
            </span>
          </div>
          {/* Price */}
          <p className="mt-4 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          {/* Description */}
          <p className="mt-5 text-gray-600 md:w-4/5 leading-relaxed">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8"></div>
          <button
            onClick={() => addToCart(productData._id)}
            className="bg-green-600 text-white px-8 py-3 text-sm rounded-md active:bg-green-600"
          >
            Add To Cart
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchage policy within 7 days.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
