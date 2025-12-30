import ProductCard from "./ProductCard"

const BestSeller = () => {
  const bestSellers = [
    {
      _id: "1",
      name: "Whey Protein",
      price: 4500,
      category: "Protein",
      isBestSeller: true,
      images: [{ URL: "https://picsum.photos/400?1" }]
    },
    {
      _id: "1",
      name: "Whey Protein",
      price: 4500,
      category: "Protein",
      isBestSeller: true,
      images: [{ URL: "https://picsum.photos/400?1" }]
    },
    {
      _id: "1",
      name: "Whey Protein",
      price: 4500,
      category: "Protein",
      isBestSeller: true,
      images: [{ URL: "https://picsum.photos/400?1" }]
    },
    {
      _id: "1",
      name: "Whey Protein",
      price: 4500,
      category: "Protein",
      isBestSeller: true,
      images: [{ URL: "https://picsum.photos/400?1" }]
    },
    {
      _id: "1",
      name: "Whey Protein",
      price: 4500,
      category: "Protein",
      isBestSeller: true,
      images: [{ URL: "https://picsum.photos/400?1" }]
    },
    {
      _id: "2",
      name: "Creatine Monohydrate",
      price: 2800,
      category: "Performance",
      isBestSeller: true,
      images: [{ URL: "https://picsum.photos/400?2" }]
    },
    {
      _id: "3",
      name: "BCAA Energy",
      price: 3200,
      category: "Recovery",
      isBestSeller: true,
      images: [{ URL: "https://picsum.photos/400?3" }]
    }
  ]

  return (
    <section className=" pb-10 bg-gray-50">
      <div className="container mx-auto px-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-wider text-gray-500 mb-2">
            Most Popular Picks
          </p>
          <h2 className="text-3xl font-bold">
            Best Sellers
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {bestSellers.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

      </div>
    </section>
  )
}

export default BestSeller
