import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SimilarProducts from "../components/Prouducts/SimilarProducts";
import { fetchProductDetails } from "../redux/slices/productSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedProduct, loading, error } = useSelector(
    (state) => state.products
  );

  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  // Set first image after product loads
  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setActiveImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  const handleQuantity = (action) => {
    if (action === "plus") setQuantity((prev) => prev + 1);
    if (action === "minus" && quantity > 1)
      setQuantity((prev) => prev - 1);
  };

  if (loading)
    return <div className="text-center py-20">Loading product...</div>;

  if (error)
    return (
      <div className="text-center py-20 text-red-500">
        Error: {error}
      </div>
    );

  if (!selectedProduct) return null;

  return (
    <div className="container mx-auto px-6 md:px-20 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* LEFT: Images */}
        <div className="flex flex-col md:flex-row gap-4">

          {/* Thumbnails */}
          <div className="flex md:flex-col gap-3 justify-center">
            {selectedProduct.images?.map((img, index) => (
              <img
                key={index}
                src={img.url}
                alt="thumbnail"
                onClick={() => setActiveImage(img.url)}
                className={`w-16 h-20 object-cover rounded cursor-pointer border 
                ${activeImage === img.url
                    ? "border-black"
                    : "border-gray-300"}`}
              />
            ))}
          </div>

          {/* Main Image */}
          <img
            src={activeImage}
            alt={selectedProduct.name}
            className="w-full h-[300px] md:h-[450px] object-cover rounded-lg"
          />
        </div>

        {/* RIGHT: Details */}
        <div>
          <h1 className="text-3xl font-bold mb-3">
            {selectedProduct.name}
          </h1>

          <p className="text-xl text-red-600 mb-3">
            Rs. {selectedProduct.price}
          </p>

          <p className="text-gray-600 mb-6">
            {selectedProduct.description}
          </p>

          {/* Quantity */}
          <div className="flex items-center space-x-4 pb-6">
            <p className="mr-6">Quantity</p>

            <button
              onClick={() => handleQuantity("minus")}
              className="rounded bg-gray-200 px-3 py-1 text-lg"
            >
              -
            </button>

            <span>{quantity}</span>

            <button
              onClick={() => handleQuantity("plus")}
              className="rounded bg-gray-200 px-3 py-1 text-lg"
            >
              +
            </button>
          </div>

          <button className="bg-amber-400 px-16 md:px-24 py-3 rounded-lg font-semibold hover:bg-amber-500 transition">
            Add to Cart
          </button>
        </div>
      </div>

      {/* Similar Products */}
      <div className="mt-16">
        {selectedProduct?._id && (
          <SimilarProducts id={id} />
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
