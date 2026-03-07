import { ChangeEvent, FormEvent, useState } from "react";
import { v4 } from "uuid";
import Header from "../(components)/Header";

interface ProductFormData {
    name: string;
    price: number;
    stockQuantity: number;
    rating: number;
}

interface CreateProductModelProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (FormData: ProductFormData) => void;
}

export default function CreateProductModel({
    isOpen, 
    onClose, 
    onCreate
}: CreateProductModelProps) {
    const [formData, setFormData] = useState({
        productId: v4(),
        name: "",
        price: 0,
        stockQuantity: 0,
        rating: 0
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]:
          name === "price" || name === "stockQuantity" || name === "rating"
            ? parseFloat(value)
            : value,
      });
    };
    
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onCreate(formData);
        onClose();
    }

    if(!isOpen) return null;

    const labelStyle = "block text-sm font-medium text-gray-700"
    const inbutStyle = "block w-full mb-2 p-2 border-gray-500 border-2 rounded-md"

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-auto h-full z-20">
        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
          <Header name="Create New Product" />
          <form onSubmit={handleSubmit} className="mt-5">
            {/* PRODUCT NAME */}
            <label htmlFor="name" className={labelStyle}>
              Product Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Product Name"
              onChange={handleChange}
              value={formData.name}
              className={inbutStyle}
              required
            />            {/* PRICE */}
            <label htmlFor="productPrice" className={labelStyle}>
              Price
            </label>
            <input
              type="number"
              name="price"
              placeholder="Price"
              onChange={handleChange}
              value={formData.price}
              className={inbutStyle}
              required
            />
            {/* STOCK QUANTITY */}
            <label htmlFor="stockQuantity" className={labelStyle}>
              Stock Quantity
            </label>
            <input
              type="number"
              name="stockQuantity"
              placeholder="Stock Quantity"
              onChange={handleChange}
              value={formData.stockQuantity}
              className={inbutStyle}
              required
            />
            {/* RATING */}
            <label htmlFor="rating" className={labelStyle}>
              Rating
            </label>
            <input
              type="number"
              name="rating"
              placeholder="Rating"
              onChange={handleChange}
              value={formData.rating}
              className={inbutStyle}
              required
            />

            {/* CREATE ACTIONS */}
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Create
            </button>
            <button
              onClick={onClose}
              type="button"
              className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    );
}         