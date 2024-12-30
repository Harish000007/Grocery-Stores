import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { currency, addToCart } = useContext(ShopContext);

  return (
    <div className="container px-0">
      <div className="Product_col outline p-4 outline-slate-100 rounded-lg cursor-pointer shadow-md transition ease-in-out delay-200 hover:-translate-y-3">
        <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
          <div className="bg-gray-100 mb-4 p-4">
            <img
              className="cursor-pointer hover:scale-110 hover:transition-transform h-[200px] w-[250px] object-contain"
              src={image[0]}
              alt="Product Image"
              loading="lazy"
              width="500"
              height="200"
              decoding="async"
            />
          </div>
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
          <h3 className="text-gray-700 font-semibold text-sm truncate">
            {name}
          </h3>
          <div className="flex gap-4 py-2">
            <h1 className="text-lg font-semibold">
              {currency}
              {price}
            </h1>
          </div>
        </Link>
        <div className="grid grid-cols-2 items-center py-2 px-0">
          <button
            onClick={() => addToCart(id)}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground text-white  h-10 px-4 py-2 bg-green-600 text-xs"
            type="button"
          >
            Add To Cart
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-shopping-basket ps-2"
            >
              <path d="m15 11-1 9" />
              <path d="m19 11-4-7" />
              <path d="M2 11h20" />
              <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4" />
              <path d="M4.5 15.5h15" />
              <path d="m5 11 4-7" />
              <path d="m9 11 1 9" />
            </svg>
          </button>
          <a className="flex justify-end gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              width="25"
              className="hover:text-red-600 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
