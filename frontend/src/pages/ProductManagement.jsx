import React from 'react'

const ProductManagement = () => {
  return (
    <div className='min-h-screen w-full p-6 md:p-12 bg-gray-100'>
        <h1 className='font-bold text-xl'>Product Management</h1>
        <div className='bg-gray-300 grid grid-cols-11 p-1 rounded'>
          <p className='col-span-4'>NAME</p>
          <p className='col-span-2'>PRICE</p>
          <p className='col-span-2'>SUK</p>
          <p className='col-span-3'>ACTIONS</p>
        </div>
       
    </div>
  )
}

export default ProductManagement