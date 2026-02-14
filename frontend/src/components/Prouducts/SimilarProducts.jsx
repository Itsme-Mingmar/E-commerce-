import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { fetchSimilarProducts } from "../../redux/slices/productSlice";
import ProductCard from "./ProductCard"

const SimilarProducts = ({ id }) => {
  const dispatch = useDispatch();
  const { similarProducts, loading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
  if (!id) return;   

  dispatch(fetchSimilarProducts(id));

}, [dispatch, id]);


  if (loading) return <p>Loading similar products...</p>;
  if (error)
    return (
      <div className="text-center py-20 text-red-500">
        Error: {error}
      </div>
    );

  return (
    <section className="mt-20">
      <h2 className="text-2xl font-bold mb-8">
        You May Also Like:
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {similarProducts?.length > 0 ? (
          similarProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p>No similar products found.</p>
        )}
      </div>
    </section>
  )
}

export default SimilarProducts
