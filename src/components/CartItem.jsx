// src/components/CartItem.jsx
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function CartItem({ item }) {
  const { removeFromCart } = useContext(CartContext);

  return (
    <div className="flex justify-between items-center border p-2 my-2 rounded">
      <div>
        <h3 className="font-bold">{item.name}</h3>
        <p>${item.price}</p>
      </div>
      <button
        className="text-red-500 font-semibold"
        onClick={() => removeFromCart(item.id)}
      >
        Remove
      </button>
    </div>
  );
}
