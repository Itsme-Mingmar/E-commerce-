import React from 'react'
import { MdDeleteSweep } from "react-icons/md";
import { useSelector } from 'react-redux';

const CartContents = () => {
  const { cart } = useSelector(state => state.cart);
  return (
    <div>
      {cart?.products?.map((product, index) => (
        <div key={index} className="flex items-start justify-between py-4 border-b">

          <div className="flex items-start">
            <img
              src={product.image}
              alt={product.name}
              className="w-28 h-24 object-cover mr-4 rounded"
            />
          </div>

          <div>
            <h3>{product.name}</h3>
            <div className="flex items-center mt-4">
              <button className="border rounded px-2 py-1 text-xl font-medium cursor-pointer">-</button>
              <span className="mx-4">{product.quantity}</span>
              <button className="border rounded px-2 py-1 text-xl font-medium cursor-pointer">+</button>
            </div>
          </div>

          <div>
            <p className="font-medium">
              Rs. {product.price.toLocaleString()}
            </p>
            <button className="cursor-pointer">
              <MdDeleteSweep className="h-6 w-6 mt-3 text-red-600" />
            </button>
          </div>

        </div>
      ))}
    </div>
  )
}

export default CartContents;