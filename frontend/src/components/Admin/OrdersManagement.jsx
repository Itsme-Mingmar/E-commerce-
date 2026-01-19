import React, { useState } from 'react'

const OrdersManagement = () => {
    const [orders, setOrders] = useState([{
        _id: "#ORD-1001",
        user: {
            name: "Admin User"
        },
        totalPrice: "Rs.54600",
        status: "pending"
    }, {
        _id: "#ORD-1002",
        user: {
            name: "Admin User"
        },
        totalPrice: "Rs.54600",
        status: "pending"
    }, {
        _id: "#ORD-1003",
        user: {
            name: "Admin User"
        },
        totalPrice: "Rs.54600",
        status: "pending"
    },
    ])
    const handleOrderStatus = (id, value) => {
        setOrders(prev =>
            prev.map(order =>
                order._id === id ? { ...order, status: value } : order
            )
        )
    }

    return (
  <div className="container min-h-screen p-6 md:p-12">
    <p className="font-bold my-5">Orders Management</p>

    {/* ONLY TABLE SCROLLS */}
    <div className="overflow-x-auto w-full">
      <div className="min-w-[900px]">

        <div className="flex bg-gray-200 rounded p-2 font-medium text-xs">
          <p className="basis-2/6 shrink-0">ORDER ID</p>
          <p className="basis-1/6 shrink-0">USER</p>
          <p className="basis-1/6 shrink-0">TOTAL PRICE</p>
          <p className="basis-1/6 shrink-0">STATUS</p>
          <p className="basis-1/6 shrink-0">ACTIONS</p>
        </div>

        {/* TABLE BODY */}
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order._id}
              className="flex border-b border-gray-300 p-3 font-medium text-xs items-center"
            >
              <p className="basis-2/6 shrink-0 font-semibold">
                {order._id}
              </p>

              <p className="basis-1/6 shrink-0 text-gray-500">
                {order.user.name}
              </p>

              <p className="basis-1/6 shrink-0 text-gray-500">
                {order.totalPrice}
              </p>

              <select
                disabled={order.status === "delivered"}
                onChange={(e) =>
                  handleOrderStatus(order._id, e.target.value)
                }
                value={order.status}
                className="shrink-0 text-gray-500 border border-gray-400 rounded py-2 pl-3 mr-4"
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>

              <button
                onClick={() =>
                  handleOrderStatus(order._id, "delivered")
                }
                className={`basis-1/6 shrink-0 rounded py-2 text-white/90
                  ${
                    order.status === "delivered"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700 cursor-pointer"
                  }`}
              >
                Mark as Delivered
              </button>
            </div>
          ))
        ) : (
          <p className="p-4">No recent orders found</p>
        )}
      </div>
    </div>
  </div>
);

}

export default OrdersManagement