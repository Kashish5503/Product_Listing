import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const ProductList = () => {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  const categories = [...new Set(products.map((product) => product.category))];

  const sortedProducts = () => {
    let sorted = [...products];
    if (sortOrder === "low-to-high") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high-to-low") {
      sorted.sort((a, b) => b.price - a.price);
    }
    if (selectedCategory) {
      sorted = sorted.filter((p) => p.category === selectedCategory);
    }
    return sorted.filter((p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="p-4 container mx-auto">
      {/* Filters Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 w-full md:w-1/2 rounded-lg shadow-sm"
        />
        <div className="flex gap-4 w-full md:w-1/2">
          <select
            onChange={(e) => setSortOrder(e.target.value)}
            className="border p-2 rounded-lg flex-grow shadow-sm"
          >
            <option value="default">Sort By</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
          </select>
          <select
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border p-2 rounded-lg flex-grow shadow-sm"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product List */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedProducts().map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-40 object-contain"
            />
            <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
            <p className="text-gray-500">${product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2 w-full hover:bg-blue-600 transition"
            >
              Add to Cart
            </button>
            <Link
              to={`/product/${product.id}`}
              className="text-blue-500 block mt-2"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
