import { useState } from "react"
import ProductCard from "../components/Prouducts/ProductCard"
import ProductFilter from "../components/Common/ProductFilter"
import { FiFilter } from "react-icons/fi"
import { IoMdClose } from "react-icons/io"

const Collection = () => {
  const [filters, setFilters] = useState({
    category: "",
    tags: ""
  })

  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const products = [
    {
      _id: "1",
      name: "Whey Protein",
      price: 4500,
      images: [{ URL: "https://picsum.photos/300" }]
    },
    {
      _id: "2",
      name: "Whey Protein",
      price: 4500,
      images: [{ URL: "https://picsum.photos/300" }]
    },
    {
      _id: "3",
      name: "Whey Protein",
      price: 4500,
      images: [{ URL: "https://picsum.photos/300" }]
    },
    {
      _id: "4",
      name: "Whey Protein",
      price: 4500,
      images: [{ URL: "https://picsum.photos/300" }]
    },
    {
      _id: "5",
      name: "Whey Protein",
      price: 4500,
      images: [{ URL: "https://picsum.photos/300" }]
    },
  ]

  return (
    <div className="container mx-auto px-6 py-16">

      {/* MOBILE FILTER BUTTON */}
      <div className="flex justify-between items-center mb-6 md:hidden">
        <h2 className="text-xl font-semibold">Products</h2>
        <button
          onClick={() => setIsFilterOpen(true)}
          className="flex items-center gap-2 border px-4 py-2 rounded cursor-pointer"
        >
          <FiFilter />
          Filter
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* DESKTOP FILTER */}
        <div className="hidden md:block md:col-span-1">
          <ProductFilter filters={filters} setFilters={setFilters} />
        </div>

        {/* PRODUCTS */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

      </div>

      {/* MOBILE FILTER DRAWER */}
      <div
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity
        ${isFilterOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsFilterOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 h-full w-3/4 bg-white z-50 p-6 transition-transform
        ${isFilterOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Filter</h3>
          <button className="cursor-pointer" onClick={() => setIsFilterOpen(false)}>
            <IoMdClose size={22} />
          </button>
        </div>

        <ProductFilter filters={filters} setFilters={setFilters} />
      </div>

    </div>
  )
}

export default Collection
