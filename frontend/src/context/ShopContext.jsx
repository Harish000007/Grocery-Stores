import { createContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "Rs.";
  const delivery_fee = 10;
  const backendUrl = "https://grocery-backend-ybjg.onrender.com";
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || {}
  );
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();

  const addToCart = useCallback(
    async (itemId) => {
      setCartItems((prevCart) => {
        const updatedCart = {
          ...prevCart,
          [itemId]: (prevCart[itemId] || 0) + 1
        };
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
        return updatedCart;
      });

      if (token) {
        try {
          await axios.post(
            `${backendUrl}/api/cart/add`,
            { itemId },
            {
              headers: {
                token
              }
            }
          );
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      }
    },
    [token, backendUrl]
  );

  const getCartCount = useCallback(() => {
    return Object.values(cartItems).reduce(
      (total, quantity) => total + quantity,
      0
    );
  }, [cartItems]);

  const updateQuantity = useCallback(
    async (itemId, quantity) => {
      setCartItems((prevCart) => {
        const updatedCart = {
          ...prevCart,
          [itemId]: quantity
        };
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
        return updatedCart;
      });

      if (token) {
        try {
          await axios.post(
            `${backendUrl}/api/cart/update`,
            { itemId, quantity },
            {
              headers: {
                token
              }
            }
          );
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      }
    },
    [token, backendUrl]
  );

  const getCartAmount = useCallback(() => {
    return Object.entries(cartItems).reduce(
      (totalAmount, [itemId, quantity]) => {
        const itemInfo = products.find((product) => product._id === itemId);
        if (itemInfo && quantity > 0) {
          return totalAmount + itemInfo.price * quantity;
        }
        return totalAmount;
      },
      0
    );
  }, [cartItems, products]);

  const getProductData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      console.log("API Response:", response.data);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.error || "Failed to fetch products");
      }
    } catch (error) {
      console.error(error.response || error);
      toast.error("Error fetching product data");
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  const value = {
    products,
    currency,
    delivery_fee,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
