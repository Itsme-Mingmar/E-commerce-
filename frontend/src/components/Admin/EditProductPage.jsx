import React, { useState } from 'react'

const EditProductPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    discription: "",
    price: "",
    stock: "",
    suk: "",
    category: "",
    images: [
      {
        url: ""
      }
    ]
  })
  const handleInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  return (
    <div className='min-h-screen bg-gray-100 md:px-20 px-8 pt-6 pb-16'>
      <h1 className='flex justify-center font-bold text-gray-700 text-xl border-b border-gray-300 py-4 mb-6 '>Edit Product</h1>
      <div>
        <form >
          <label className='font-medium text-gray-700 py-1' >Product Name</label>
          <input
            type="text"
            name='name'
            value={formData.name}
            onChange={handleInput}
            className='w-full p-2 border border-gray-400 rounded mb-6 '
          />
          <label className='font-medium text-gray-700 py-1' >Description</label>
          <textarea
            name="description"
            value={formData.discription}
            onChange={handleInput}
            rows={6}
            className='w-full border border-gray-400 rounded mb-6'
          />
          <div className='grid grid-cols-2 gap-6'>
            <div>
              <label className='font-medium text-gray-700 py-1' >Price</label>
              <input
                type="number"
                name='price'
                value={formData.price}
                onChange={handleInput}
                className='w-full p-2 border border-gray-400 rounded mb-6 '
              />
            </div>
            <div>

              <label className='font-medium text-gray-700 py-1' >Stock</label>
              <input
                type="number"
                name='stock'
                value={formData.stock}
                onChange={handleInput}
                className='w-full p-2 border border-gray-400 rounded mb-6 '
              />
            </div>
          </div>
          <div className='grid grid-cols-2 gap-6 mb-6'>
            <div>
              <label className='font-medium text-gray-700 py-1' >SUK</label>
              <input
                type="number"
                name='suk'
                value={formData.suk}
                onChange={handleInput}
                className='w-full p-2 border border-gray-400 rounded mb-6 '
              />
            </div>
            <div>
              <label className='block font-medium text-gray-700 ' >Category</label>
              <select className='border border-gray-400 rounded p-2 '>
                <option value="protein">Protein</option>
                <option value="pre-workout & performance">Pre-Workout & Performance</option>
                <option value="vitamins & wellness">Vitamins & Wellness</option>
              </select>
            </div>
          </div>
          <p className='font-medium text-gray-700 mb-1'>Images</p>
          <div className='border-2 border-gray-300 px-3 py-3 rounded mb-4'>
            <div className='flex gap-4 mb-6'>
              <input
                type="text"
                name='url'
                placeholder='Image URL'
                value={formData.images.url}
                onChange={handleInput}
                className='w-full p-2 border border-gray-400 rounded'
              />
              <button className='bg-red-600 rounded text-white/90 px-3 cursor-pointer'>X</button>
            </div>
            <div className='flex gap-4 '>
              <input
                type="text"
                name='url'
                placeholder='Image URL'
                value={formData.images.url}
                onChange={handleInput}
                className='w-full p-2 border border-gray-400 rounded'
              />
              <button className='bg-red-600 rounded text-white/90 px-3 cursor-pointer'>X</button>
            </div>
          </div>
          <button className='border border-gray-400 rounded hover:bg-gray-200 w-full py-2 text-gray-700 font-medium cursor-pointer mb-6'>+ Add Image</button>
          <button className='text-white/80 bg-amber-400 hover:bg-amber-500 rounded w-full py-2 font-medium cursor-pointer'>Update Product</button>
        </form>
      </div>
    </div>
  )
}

export default EditProductPage