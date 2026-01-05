import { Link } from "react-router-dom"

const ProductCard = ({ product }) => {
  return (
    <div className="group rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition">
      
      {/* Image */}
      <div className="relative">
        <img
          src={product.images[0]?.URL}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4 text-left">
        <h3 className="font-semibold text-lg line-clamp-1">
          {product.name}
        </h3>

        <p className="text-gray-500 text-sm mt-1">
          {product.category}
        </p>

        <div className="flex items-center justify-between mt-4">
          <span className="font-bold text-lg">
            Rs. {product.price}
          </span>

          <Link
            to={`/product/${product._id}`}
            className="text-sm font-semibold text-amber-500 hover:underline"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
