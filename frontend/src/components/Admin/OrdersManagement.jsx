import React from 'react'

const OrdersManagement = () => {
   const orders = [{
        _id: "#12vejw34b34i",
        user: {
            name: "Admin User"
        },
        totalPrice: "Rs.54600",
        status: "Delivered"
    }, {
        _id: "#12vejw34b34i",
        user: {
            name: "Admin User"
        },
        totalPrice: "Rs.54600",
        status: "Delivered"
    }, {
        _id: "#12vejw34b34i",
        user: {
            name: "Admin User"
        },
        totalPrice: "Rs.54600",
        status: "Delivered"
    }, 
    ]
    return (
        <div className='container min-h-screen p-6 md:p-12'>
            <div className='overflow-x-auto'>
                <p className='font-bold my-5'>Recent Orders</p>
                <div className='flex bg-gray-200 rounded p-2 font-medium text-xs'>
                    <p className='basis-2/6'>ORDER ID</p>
                    <p className='basis-1/6'>USER</p>
                    <p className='basis-1/6'>TOTAL PRICE</p>
                    <p className='basis-1/6'>STATUS</p>
                    <p className='basis-1/6'>STATUS</p>
                </div>
                { orders.length> 0 ?(
                    orders.map((order) => (
                        <div key={order._id} className='flex border-b border-gray-300 p-3 font-medium text-xs overflow-auto'>
                            <p className='basis-2/6 font-semibold'>{order._id}</p>
                            <p className='basis-1/6 text-gray-500'>{order.user.name}</p>
                            <p className='basis-1/6 text-gray-500'>{order.totalPrice}</p>
                            <p className='basis-1/6 text-gray-500'>{order.status}</p>
                            <p className='basis-1/6 text-gray-500'>{order.status}</p>
                        </div>
                    ))
                ):( <p className='p-4'>No resent order founds</p>)
                }
            </div>
        </div>
    )
}

export default OrdersManagement