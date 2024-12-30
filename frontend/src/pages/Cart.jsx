import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import { Link } from "react-router-dom";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity } =
    useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    // Convert cartItems into an array of objects
    const tempData = Object.entries(cartItems)
      .map(([id, quantity]) => ({
        _id: id,
        quantity,
      }))
      .filter((item) => item.quantity > 0); // Only include items with quantity > 0

    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      <div>
        {cartData.map((item) => {
          const productData = products.find(
            (product) => product._id === item._id
          );

          // Handle missing product data gracefully
          if (!productData) return null;

          return (
            <div
              key={item._id}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              {/* Product Info */}
              <div className="flex items-start gap-6">
                <img
                  className="w-16 sm:w-20"
                  src={productData.image?.[0]} // Fallback for image
                  alt={productData.name} // Fallback for name
                />
                <div>
                  <p className="text-xs sm:text-lg font-medium">
                    {productData.name}
                  </p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>
                      {currency}
                      {productData.price}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quantity Input */}
              <div className="p-2 border flex gap-4 items-center px-5 w-full sm:w-3/6">
                <button
                  disabled={item.quantity <= 1}
                  onClick={() => updateQuantity(item._id, item.quantity - 1)} // Decrement quantity
                  className="px-3 py-1 text-xl sm:text-base"
                >
                  -
                </button>
                <h2 className="text-lg sm:text-xl">{item.quantity}</h2>
                <button
                  onClick={() => updateQuantity(item._id, item.quantity + 1)} // Increment quantity
                  className="px-3 py-1 text-xl sm:text-base"
                >
                  +
                </button>
              </div>

              {/* Remove Item */}
              <img
                onClick={() => updateQuantity(item._id, 0)} // Set quantity to 0 to remove item
                className="w-4 mr-4 sm:w-5 cursor-pointer"
                src={assets.bin_icon}
                alt="Remove"
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <Link to="/place-order">
            <button  className="bg-green-600 text-white text-sm my-8 px-8 py-3">
              PROCEED TO CHECKOUT
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
