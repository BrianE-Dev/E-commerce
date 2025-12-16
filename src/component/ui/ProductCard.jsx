import React, { useContext } from "react";
import Indicator from "./Indicator";
import { Activity } from "react";
import { AppContext } from "../../context/AppContext";
import { useCart } from "../../hooks/useCart";

function ProductCard({ product }) {
  const { name, price, category, imageUrl, discPercent } = product;
  const { updateCartLength } = useContext(AppContext);
  const { addToCart, cartItems, getCartItem, getTotalItem } = useCart();
  const percent = discPercent / 100;
  const discount = percent * price;
  return (
    <div
      onClick={() => {
        addToCart(product);
        updateCartLength();
        console.log(getTotalItem);
      }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl duration-300 ease-in-out hover:translate-y-1"
    >
      <img
        src={imageUrl || product.images[0]}
        alt={name}
        className="w-full h-48 object-cover object-center"
      />

      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {name || product.title}
        </h3>
        {/* Old Price */}
        <p className="text-brandblue line-through text-xl">
          £{price || product.price}
        </p>
        <Activity mode={discPercent ? "visible" : "hidden"}>
          <p className="text-2xl font-bold text-indigo-600 mb-4">
            £{(price - discount).toFixed(2)}
          </p>
        </Activity>

        <Activity mode={product.discountPercentage ? "visible" : "hidden"}>
          <p className="text-sm font-normal mb-4">
            £{(product.price * product.discountPercentage).toFixed(2)}
          </p>
        </Activity>

        <p>
          <Indicator isAvailable={product.inStock || product.availability} />
        </p>
        <button
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
          onClick={() => {
            addToCart(product);
            console.log(cartItems.length);
            updateCartLength();
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
