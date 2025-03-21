import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const { cart } = useContext(CartContext);
  return (
    <nav className="w-full bg-gray-900 p-4 text-white flex justify-between items-center">
      <Link to="/" className="text-lg font-bold text-yellow-400">
        Products
      </Link>
      <Link to="/cart" className="text-lg text-yellow-400">
        Cart ({cart.length})
      </Link>
    </nav>
  );
};

export default Navbar;
