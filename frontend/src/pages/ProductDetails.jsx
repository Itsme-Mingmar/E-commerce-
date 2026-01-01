import { useParams } from "react-router-dom"
import { useState } from "react"
import SimilarProducts from "../components/Prouducts/SimilarProducts"

const ProductDetails = () => {
    const { id } = useParams()

    const product = {
        _id: id,
        name: "Whey Protein",
        quantity: 1,
        price: 4500,
        description: "High quality whey protein for muscle growth.",
        images: [
            { URL: "https://picsum.photos/600?1" },
            { URL: "https://picsum.photos/600?2" }
        ],
        category: "Protein"
    }

    const [activeImage, setActiveImage] = useState(product.images[0].URL)

    return (
        <div className="container mx-auto px-25 py-12">

            {/* Product Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* LEFT: Image Section */}
                <div className="flex flex-col md:flex-row gap-4 ">

                    {/* Thumbnails */}
                    <div className="flex md:flex-col gap-3 justify-center">
                        {product.images.map((img, index) => (
                            <img
                                key={index}
                                src={img.URL}
                                alt="thumbnail"
                                onClick={() => setActiveImage(img.URL)}
                                className={`w-15 h-18 object-cover rounded cursor-pointer border 
                                ${activeImage === img.URL ? "border-black" : "border-gray-300"}`}
                            />
                        ))}
                    </div>
                    {/* Main Image */}
                    <img
                        src={activeImage}
                        alt={product.name}
                        className="w-full h-[300px] md:h-[450px] object-cover rounded-lg"
                    />

                </div>

                {/* RIGHT: Details */}
                <div>
                    <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
                    <p className="text-xl text-red-700 mb-3">Rs. {product.price}</p>
                    <p className="text-gray-600 mb-5">{product.description}</p>
                    <div className="flex pb-5">
                        <p className="mr-6">Quantity</p>
                        <button className="border rounded px-2 py-1 text-xl font-medium cursor-pointer">-</button>
                        <span className="mx-4 mt-2">{product.quantity}</span>
                        <button className="border rounded px-2 py-1 text-xl font-medium cursor-pointer">+</button>
                    </div>

                    <button className="bg-amber-400 px-20 lg:px-30 py-2 rounded-lg font-semibold cursor-pointer">
                        Add to Cart
                    </button>
                </div>

            </div>

            {/* Similar Products */}
            <SimilarProducts category={product.category} />

        </div>
    )
}

export default ProductDetails
