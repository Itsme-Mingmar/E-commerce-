import React, { useState } from 'react'

const EditProductPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    images: [
      {
        url: "https://picsum.photos/100?1"
      },
      {
        url: "https://picsum.photos/100?2"
      }
    ]
  })
  const handleInput = ({ target: { name, value } }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleAddImage = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    //
  };
  const submitData = (e) => {
    e.preventDefault();
    console.log(formData);
    //
  }
  return (
    <div className='min-h-screen bg-gray-100 md:px-20 px-8 pt-6 pb-16'>
      <h1 className='flex justify-center font-bold text-gray-700 text-xl border-b border-gray-300 py-4 mb-6 '>Edit Product</h1>
      <div>
        <form onSubmit={submitData}>
          <label className='label font-medium text-gray-700 py-1' >Product Name</label>
          <input
            type="text"
            name='name'
            value={formData.name}
            onChange={handleInput}
            className='input w-full p-2 border border-gray-400 rounded mb-6 '
          />
          <label className='font-medium text-gray-700 py-1' >Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInput}
            rows={6}
            className='w-full border border-gray-400 rounded mb-6 p-2'
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
                name='countInStock'
                value={formData.countInStock}
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
                name='sku'
                value={formData.sku}
                onChange={handleInput}
                className='w-full p-2 border border-gray-400 rounded mb-6 '
              />
            </div>
            <div>
              <label className='block font-medium text-gray-700 ' >Category</label>
              <select name='category' value={formData.category} onChange={handleInput} className='border border-gray-400 rounded p-2 '>
                <option value="">Select</option>
                <option value="protein">Protein</option>
                <option value="pre-workout & performance">Pre-Workout & Performance</option>
                <option value="vitamins & wellness">Vitamins & Wellness</option>
              </select>
            </div>
          </div>
          <p className='font-medium text-gray-700 mb-1'>Images</p>
          <div className=' border border-gray-400 px-3 py-3 rounded mb-4'>
            {
              formData.images.map((image, index) => {
                return (
                  <div key={index} className='flex gap-4 mb-6 items-center'>
                    <img
                      src={image.url}
                      alt={'Product Items'}
                      className='h-20 w-20 rounded'
                    />
                    <label className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded cursor-pointer">
                      Choose Image
                      <input
                        type="file"
                        onChange={handleAddImage}
                        className='hidden'
                      />
                    </label>
                  </div>
                )
              })
            }
          </div>
          <button type='submit' className='text-white/80 bg-amber-400 hover:bg-amber-500 rounded w-full py-2 font-medium cursor-pointer'>Update Product</button>
        </form>
      </div>
    </div>
  )
}

export default EditProductPage