import { useState } from "react"
import ProductCard from "../components/Prouducts/ProductCard"
import ProductFilter from "../components/Common/ProductFilter"
import { FiFilter } from "react-icons/fi"
import { IoMdClose } from "react-icons/io"
import { fetchAllProducts, fetchProductByFilter } from "../redux/slices/productSlice"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"


const Collection = () => {
  const [filters, setFilters] = useState({
    category: "",
    tags: ""
  })

  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {

    if (filters.category || filters.tags) {

      dispatch(fetchProductByFilter(filters));

    } else {

      dispatch(fetchAllProducts());

    }

  }, [filters, dispatch]);
  if (loading) return <p>Loading similar products...</p>;
  if (error)
    return (
      <div className="text-center py-20 text-red-500">
        Error: {error}
      </div>
    );
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
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity md:hidden
        ${isFilterOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsFilterOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 h-full w-3/4 bg-white z-50 p-6 transition-transform md:hidden
        ${isFilterOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-between items-center mb-6 border-b border-gray-900">
          <h3 className="text-lg font-semibold">Filter</h3>
          <button className="cursor-pointer pb-6" onClick={() => setIsFilterOpen(false)}>
            <IoMdClose size={22} />
          </button>
        </div>

        <ProductFilter filters={filters} setFilters={setFilters} />
      </div>

    </div>
  )
}

export default Collection
