import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { useNavigate, useLocation } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const scrollToSection = (id) => {
    if (location.pathname !== "/") {
      navigate("/")
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    }
  }
  return (
    <footer className='border-t py-10 bg-gray-900 text-white'>
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-3 gap-15 '>
        {/* Shopping */}
        <div className='text-center'>
          <h3 className='text-lg mb-4'>Shop</h3>
          <ul className='space-y-3'>
            <li>
              <button onClick={() => scrollToSection("best-seller")} className='hover:text-gray-400'>New Arrival</button>
            </li>
            <li>
              <button onClick={() => scrollToSection("new-arrival")} className='hover:text-gray-400'>Best Seller</button>
            </li>
          </ul>
        </div>
        {/* Contect us */}
        <div className='text-center'>
          <h3 className='text-lg mb-4'>Contect</h3>
          <ul className='space-y-3'>
            <li>
              <Link to="#" className='hover:text-gray-400'>Contact Us</Link>
            </li>
            <li>
              <Link to="#" className='hover:text-gray-400'>About Us</Link>
            </li>
          </ul>
        </div>
        {/* Follow Us */}
        <div className="text-center">
          <h3 className="text-lg mb-4">
            Follow Us
          </h3>

          <div className="flex space-x-5 justify-center">
            <a
              href="#"
              className="hover:text-white cursor-pointer transition"
              aria-label="Facebook"
            >
              <FaFacebookF className="w-5 h-5" />
            </a>

            <a
              href="#"
              className="hover:text-white cursor-pointer transition"
              aria-label="Instagram"
            >
              <FaInstagram className="w-5 h-5" />
            </a>

            <a
              href="#"
              className="hover:text-white cursor-pointer transition"
              aria-label="Twitter"
            >
              <FaTwitter className="w-5 h-5" />
            </a>

            <a
              href="#"
              className="hover:text-white cursor-pointer transition"
              aria-label="YouTube"
            >
              <FaYoutube className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-4 pt-4 text-center text-sm">
        © {new Date().getFullYear()} NutriPulse. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer