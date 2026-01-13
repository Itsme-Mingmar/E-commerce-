import React from 'react'
import { Link } from 'react-router-dom'

const AdminHomePage = () => {
    const orders = [{
        _id: "12vejw34b34i",
        user: {
            name: "Admin User"
        },
        totalPrice: "Rs.54600",
        status: "Delivered"
    }, {
        _id: "12vejw34b34i",
        user: {
            name: "Admin User"
        },
        totalPrice: "Rs.54600",
        status: "Delivered"
    }, {
        _id: "12vejw34b34i",
        user: {
            name: "Admin User"
        },
        totalPrice: "Rs.54600",
        status: "Delivered"
    }, 
    ]
    return (
        <div className='container min-h-screen p-6 md:p-12'>
            {/* calculation */}
            <div>
                <p className='font-bold mb-5'>Admin Dashboard</p>
                <div className='flex gap-3'>
                    <div className='basis-1/3 p-3 sm:p-1 rounded shadow-md font-semibold'>
                        <p>Revenue</p>
                        <p>Rs.456</p>
                    </div>
                    <div className='basis-1/3 p-3 rounded shadow-md font-semibold'>
                        <p>Total Orders</p>
                        <p>4</p>
                        <Link to="/" className='text-blue-800/80 font-light text-xs font-medium'>Manage Orders</Link>
                    </div>
                    <div className='basis-1/3 p-3 rounded shadow-md font-semibold'>
                        <p>Total Products</p>
                        <p>45</p>
                        <Link to="/" className='text-blue-800/80 text-xs font-medium'>Manage Products</Link>
                    </div>
                </div>
            </div>
            {/* Orders */}
            <div className='overflow-x-auto'>
                <p className='font-bold my-5'>Recent Orders</p>
                <div className='flex bg-gray-200 rounded p-2 font-medium text-xs'>
                    <p className='basis-2/5'>ORDER ID</p>
                    <p className='basis-1/5'>USER</p>
                    <p className='basis-1/5'>TOTAL PRICE</p>
                    <p className='basis-1/5'>STATUS</p>
                </div>
                { orders.length> 0 ?(
                    orders.map((order) => (
                        <div key={order._id} className='flex border-b border-gray-300 p-3 font-medium text-xs overflow-auto'>
                            <p className='basis-2/5 font-semibold'>{order._id}</p>
                            <p className='basis-1/5 text-gray-500'>{order.user.name}</p>
                            <p className='basis-1/5 text-gray-500'>{order.totalPrice}</p>
                            <p className='basis-1/5 text-gray-500'>{order.status}</p>
                        </div>
                    ))
                ):( <p className='p-4'>No resent order founds</p>)
                }
            </div>
        </div>
    )
}
export default AdminHomePage