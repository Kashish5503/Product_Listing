import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`).then((response) => {
      setProduct(response.data);
    });
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="border p-4 rounded-lg shadow-md hover:shadow-lg transition bg-white">
      {/* Product Image */}
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-contain"
      />

      {/* Product Details */}
      <div className="mt-4">
        <h1 className="text-lg font-bold">{product.title}</h1>
        <p className="text-sm text-gray-500">{product.category}</p>
        <p className="text-xl font-semibold mt-2">${product.price}</p>
        <p className="text-gray-700 text-sm mt-2 line-clamp-2">
          {product.description}
        </p>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={() => addToCart(product)}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 w-full hover:bg-blue-600 transition"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetails;
