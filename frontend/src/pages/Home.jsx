import React from 'react'
import hero from '../assets/hero-image.webp'
import { Link } from 'react-router-dom'
import NewArrival from '../components/Prouducts/NewArrival'

const Home = () => {
  return (
    <>
      <section className='relative z-0'>
        <img src={hero} alt="Rabbit" className='w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover' />
        <div className='absolute inset-0 flex items-center z-10'>
          <div>
            <h1 className='text-3xl md:text-4xl p-6 text-white font-bold leading-normal tracking-normal ml-6'>
              Fuel your body. <br />
              Power your performance. <br />
              {/* Button */}
              <Link
                to="#"
                className="mt-8 text-2xl bg-amber-400 hover:bg-amber-500 
                       text-black px-4 py-2 rounded-lg
                       transition duration-300"
              >
                Explore →
              </Link>
            </h1>
          </div>
        </div>
      </section>
      {/* NEW ARRIVAL */}
      <section id="new-arrival">
        <div className='h-[600px]'>
          <NewArrival />
        </div>
      </section>
      {/* BEST SELLER */}
      <section id="best-seller">
        <div className='h-[600px]'>
          <p>Best seller</p>
        </div>
      </section>
    </>
  )
}

export default Home