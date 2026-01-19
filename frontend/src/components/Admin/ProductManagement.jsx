import React from 'react'
import { Link } from 'react-router-dom'

const ProductManagement = () => {
  const Products = [
    {
      _id: "1",
      name: "Printed Resort Shirt",
      price: 29.99,
      sku: "PRNT-RES-004",
    },
    {
      _id: "2",
      name: "Chino Pants",
      price: 55,
      sku: "BW-005",
    },
    {
      _id: "3",
      name: "Cargo Pants",
      price: 50,
      sku: "BW-008",
    }
  ]
  return (
    <div className='min-h-screen w-full p-6 md:p-12 bg-gray-100'>
      <h1 className='font-bold text-xl pb-6'>Product Management</h1>
      <div className='bg-gray-300 grid grid-cols-9 p-1 rounded font-medium'>
        <p className='col-span-3'>NAME</p>
        <p className='col-span-2'>PRICE</p>
        <p className='col-span-2'>SUK</p>
        <p className='col-span-2'>ACTIONS</p>
      </div>

      {
        Products.length <= 0 && (
          <p className='pt-4'>There are no products.</p>
        )

      }
      {
        Products.map((product) => {
          return (
            <div key={product._id} className='grid grid-cols-9 p-3 shadow-xs border border-gray-200 border-t-0 rounded text-sm font-medium'>
              <p className='col-span-3'>{product.name}</p>
              <p className='col-span-2 text-gray-700'>{product.price}</p>
              <p className='col-span-2 text-gray-700'>{product.sku}</p>
              <div className='col-span-2 text-white/80'>
                <Link to="/admin/product/edit/:{product._id}" className=' p-1 mr-2 px-2 rounded bg-amber-400 cursor-pointer'>Edit</Link>
                <button className='p-1 px-2 rounded bg-red-500 cursor-pointer'>Delete</button>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default ProductManagement