import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

const NewArrival = () => {
    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeftPos, setScrollLeftPos] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

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

    const updateScrollButtons = () => {
        const container = scrollRef.current

        if (!container) return

        const isAtStart = container.scrollLeft <= 0
        const isAtEnd =
            container.scrollLeft + container.clientWidth >=
            container.scrollWidth - 1

        setScrollLeft(!isAtStart)
        setCanScrollRight(!isAtEnd)
    }

    const scrollLeftHandler = () => {
        scrollRef.current.scrollBy({
            left: -300,
            behavior: "smooth",
        })
    }

    const scrollRightHandler = () => {
        scrollRef.current.scrollBy({
            left: 300,
            behavior: "smooth",
        })
    }
    // mouse scroll drag scrolling

    const handleMouseDown = (e) => {
        setIsDragging(true)
        setStartX(e.pageX - scrollRef.current.offsetLeft)
        setScrollLeftPos(scrollRef.current.scrollLeft)
    }

    const handleMouseLeave = () => {
        setIsDragging(false)
    }

    const handleMouseUp = () => {
        setIsDragging(false)
    }

    const handleMouseMove = (e) => {
        if (!isDragging) return

        e.preventDefault()
        const x = e.pageX - scrollRef.current.offsetLeft
        const walk = (x - startX) * 1.5 // scroll speed
        scrollRef.current.scrollLeft = scrollLeftPos - walk
    }



    return (
        <section className='py-10 px-10 mb-10'>
            <div className='container mx-auto text-center relative'>
                <h2 className="text-3xl font-bold mb-4">Explore New Arrival</h2>
                <p className="text-lg uppercase tracking-wider text-gray-600 mb-8">
                    Fresh drops for your fitness journey
                </p>
                {/* Scroll Buttons */}
                <div className="absolute right-4 bottom-[-30px] flex space-x-2 my-3">
                    <button
                        onClick={scrollLeftHandler}
                        className={`p-2 rounded border ${scrollLeft
                            ? "bg-white text-black cursor-pointer"
                            : "bg-gray-200 text-gray-400"
                            }`}
                    >
                        <FiChevronLeft />
                    </button>

                    <button
                        onClick={scrollRightHandler}
                        className={`p-2 rounded border ${canScrollRight
                            ? "bg-white text-black cursor-pointer"
                            : "bg-gray-200 text-gray-400"
                            }`}
                    >
                        <FiChevronRight />
                    </button>
                </div>

            </div>
            {/* Scrollable Content */}
            <div ref={scrollRef} onScroll={updateScrollButtons} onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove} className='container mx-auto overflow-x-scroll flex space-x-6 relative'>
                {newArrivals.map((product) => (
                    <div key={product._id} className='min-w-[100%] sm:min-w-[30%] relative'>
                        <img
                            src={product.images[0]?.URL}
                            alt={product.name}
                            className='w-full object-cover lg:h-[500px] rounded-lg h-[400px]'
                            draggable='false'
                        />
                        <div className='absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-whit p-4 rounded-b-lg' draggable='false'>
                            <Link to={`/product/${product._id}`} className='block'>
                                <h4 className='font-semibold text-lg line-clamp-1'>{product.name}</h4>
                                <p className='font-bold text-lg'>Rs. {product.price}</p>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>

    )
}

export default NewArrival