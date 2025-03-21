import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { cart } = useContext(CartContext);

  return (
    <div className="p-6 container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cart.map((item, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-md">
              <img src={item.image} alt={item.title} className="w-full h-40 object-contain" />
              <h2 className="text-lg font-semibold mt-2">{item.title}</h2>
              <p className="text-gray-500">${item.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;