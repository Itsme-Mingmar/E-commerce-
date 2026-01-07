import ProductCard from "./ProductCard"

const SimilarProducts = ({ category }) => {
  // Mock similar products
  const products = [
    {
      _id: "2",
      name: "Mass Gainer",
      price: 5200,
      category: "Protein",
      images: [{ URL: "https://picsum.photos/400?1" }]
    },
    {
      _id: "3",
      name: "BCAA Energy",
      price: 3200,
      category: "Protein",
      images: [{ URL: "https://picsum.photos/400?2" }]
    },
    {
      _id: "3",
      name: "BCAA Energy",
      price: 3200,
      category: "Protein",
      images: [{ URL: "https://picsum.photos/400?2" }]
    },
    {
      _id: "3",
      name: "BCAA Energy",
      price: 3200,
      category: "Protein",
      images: [{ URL: "https://picsum.photos/400?2" }]
    }
  ]

  return (
    <section className="mt-20">
      <h2 className="text-2xl font-bold mb-8">
        You May Also Like: 
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default SimilarProducts
