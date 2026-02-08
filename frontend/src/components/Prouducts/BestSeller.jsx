import { useEffect, useState } from "react"
import ProductCard from "./ProductCard"
import axios from "axios";

const BestSeller = () => {
 const [bestSellers, setBestSellers] = useState([]);

 useEffect(()=>{
  const fetchbestSeller = async()=>{
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/getBestSeller`
      );
      setBestSellers(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  }
  fetchbestSeller()
 }, [])

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
