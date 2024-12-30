import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [editProductId, setEditProductId] = useState(null); // Track product to edit
  const [editProductData, setEditProductData] = useState(null); // Store product data for editing
  const [loading, setLoading] = useState(false); // Loading state for fetching data
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [totalPages, setTotalPages] = useState(1); // Total pages for pagination

  // Form State for Editing Product
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  // Fetch product list
  const fetchList = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(backendUrl + `/api/product/list?page=${page}`);
      if (response.data.success) {
        setList(response.data.products);
        setTotalPages(response.data.totalPages);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete Product Handler
  const removeProduct = async (id) => {
    try {
      const response = await axios.delete(backendUrl + "/api/product/remove", {
        data: { id },
        headers: { token },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        // Remove the product from the local list state
        setList((prevList) => prevList.filter((item) => item._id !== id));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Edit Product Handler
  const editProduct = (id) => {
    const productToEdit = list.find(item => item._id === id);
    setEditProductId(id); // Set the current product to be edited
    setEditProductData(productToEdit); // Set the product data for the form
    setName(productToEdit.name);
    setDescription(productToEdit.description);
    setPrice(productToEdit.price);
    setImage(null); // You can set a default image or leave it empty to maintain the old image
  };

  // Handle Product Update
  const handleProductUpdate = async (e) => {
    e.preventDefault();

    if (!name || !description || !price) {
      toast.error("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    if (image) formData.append("image", image);

    try {
      const response = await axios.put(
        backendUrl + `/api/product/update/${editProductId}`,
        formData,
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setEditProductId(null); // Close the form after updating
        setEditProductData(null);
        await fetchList(currentPage); // Refresh list after update
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList(currentPage);
  }, [currentPage]);

  return (
    <>
      <p className="mb-4 text-3xl font-semibold">All Products List</p>

      {/* Edit Product Form (conditionally rendered) */}
      {editProductId && (
        <div className="mb-6">
          <form onSubmit={handleProductUpdate} className="flex flex-col w-full items-start gap-3">
            <div>
              <p className="mb-2">Upload Image (optional)</p>
              <div className="flex gap-2">
                <label htmlFor="image">
                  <img
                    className="w-20"
                    src={!image ? editProductData?.image[0] : URL.createObjectURL(image)}
                    alt="Upload"
                  />
                  <input
                    onChange={(e) => setImage(e.target.files[0])}
                    type="file"
                    id="image"
                    hidden
                  />
                </label>
              </div>
            </div>

            <div className="w-full">
              <p className="mb-2">Product Name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="w-full max-w-[500px] px-3 py-2"
                type="text"
                placeholder="Type here"
                required
              />
            </div>

            <div className="w-full">
              <p className="mb-2">Product Description</p>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className="w-full max-w-[500px] px-3 py-2"
                placeholder="Write content here"
                required
              />
            </div>

            <div>
              <p>Product Price</p>
              <input
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                className="w-full px-3 py-2 sm:w-[120px]"
                type="number"
                placeholder="25"
                required
              />
            </div>

            <div className="flex gap-10">
              <button className="w-28 py-3 mt-4 bg-green-500 text-white" type="submit">
                UPDATE
              </button>

              {/* "Back to List" Button */}
              <button
                type="button"
                className="w-28 py-3 mt-4 bg-gray-500 text-white"
                onClick={() => setEditProductId(null)} // Close the edit form
              >
                Back to List
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Loading State */}
      {loading && <div className="loading-spinner">Loading...</div>}

      {/* Product List */}
      {!editProductId && (
        <div className="flex flex-col gap-2">
          <div className="hidden md:grid grid-cols-[1fr_2fr_1fr_2fr] items-center py-1 px-2 border bg-gray-100 text-sm">
            <b>Image</b>
            <b>Name</b>
            <b>Price</b>
            <b className="text-center">Action</b>
          </div>

          {/* Product Grid */}
          {list.map((item) => (
            <div className="grid grid-cols-[1fr_2fr_1fr_1fr] md:grid-cols-[1fr_2fr_1fr_1fr_1fr] items-center py-2 px-2 border-b" key={item._id}>
              <img src={item.image[0]} alt={item.name} className="w-16 h-16 object-cover" />
              <p>{item.name}</p>
              <p>{currency}{item.price}</p>
              <p className="text-center cursor-pointer text-lg" onClick={() => editProduct(item._id)}>Edit</p>
              <p className="text-center cursor-pointer text-lg" onClick={() => removeProduct(item._id)}>X</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default List;
