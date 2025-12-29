import React from 'react'
import { Link } from 'react-router-dom';
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

const NewArrival = () => {
    const newArrivals = [
        {
            productId: 1,
            name: "Protein",
            price: 5000,
            images: [
                {
                    URL: "https://picsum.photos/500/500?/random=1",
                    altText: "Protein"
                }
            ]
        },
        {
            productId: 2,
            name: "Protein",
            price: 5000,
            images: [
                {
                    URL: "https://picsum.photos/500/500?/random=2",
                    altText: "Protein"
                }
            ]
        },
        {
            productId: 3,
            name: "Protein",
            price: 5000,
            images: [
                {
                    URL: "https://picsum.photos/500/500?/random=3",
                    altText: "Protein"
                }
            ]
        },
        {
            productId: 4,
            name: "Protein",
            price: 5000,
            images: [
                {
                    URL: "https://picsum.photos/500/500?/random=4",
                    altText: "Protein"
                }
            ]
        },
        {
            productId: 5,
            name: "Protein",
            price: 5000,
            images: [
                {
                    URL: "https://picsum.photos/500/500?/random=5",
                    altText: "Protein"
                }
            ]
        },
        {
            productId: 6,
            name: "Protein",
            price: 5000,
            images: [
                {
                    URL: "https://picsum.photos/500/500?/random=6",
                    altText: "Protein"
                }
            ]
        },
        {
            productId: 7,
            name: "Protein",
            price: 5000,
            images: [
                {
                    URL: "https://picsum.photos/700/700?/random=7",
                    altText: "Protein"
                }
            ]
        },
    ]
    return (
        <section>
            <div className='container mx-auto text-center mb-10 relative'>
                <h2 className="text-3xl font-bold mb-4">Explore New Arrival</h2>
                <p className="text-lg uppercase tracking-wider text-gray-600 mb-8">
                    Fresh drops for your fitness journey
                </p>
                {/* Scroll Buttons */}
                <div className='absolute right-0 bottom-[-30px] flex space-x-2'>
                    <button className='p-2 rounded border bg-white text-black'>
                        <FiChevronRight />
                    </button>
                    <button className='p-2 rounded border bg-white text-black'>
                        <FiChevronLeft />
                    </button>

                </div>
            </div>
            {/* Scrollable Content */}
            <div className='container mx-auto overflow-x-scroll flex space-x-6 relative'>
                {newArrivals.map((product) => (
                    <div key={product._id}>
                        <img
                            src={product.images[0]?.URL}
                            alt={product.name}
                        />
                        <div className='absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-whit p-4 rounded-b-lg'>
                            <Link to={`/product/${product._id}`}className='block'>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>

    )
}

export default NewArrival