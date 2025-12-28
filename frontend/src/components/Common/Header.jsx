import { useState } from "react";
import { Link } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { HiBars3BottomRight } from "react-icons/hi2";
import SearchBar from "./SearchBar";
import CartDrawer from "./CartDrawer";
import { useLocation, useNavigate } from "react-router-dom"

function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <>
      <nav className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto flex justify-between py-6 px-10">

          <div>
            <Link to="/" className="text-2xl font-bold">
              NutriPulse
            </Link>
          </div>

          <div className="hidden md:flex font-bold space-x-10">
            <button
              onClick={() => scrollToSection("best-seller")}
              className="hover:text-gray-400 cursor-pointer"
            >
              Best Seller
            </button>

            <button
              onClick={() => scrollToSection("new-arrival")}
              className="hover:text-gray-400 cursor-pointer"
            >
              New Arrival
            </button>
          </div>

          <div className="flex space-x-5 items-center relative">
            <Link to="/" className="hover:text-gray-500">
              <CiUser className="w-5 h-5" />
            </Link>

            <button onClick={() => setDrawerOpen(true)} className="relative cursor-pointer">
              <LiaShoppingBagSolid className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-red-500 rounded-full text-white px-1.5 text-sm">
                4
              </span>
            </button>
            <SearchBar />
            <button onClick={() => setMobileMenuOpen(prev => !prev)} className="md:hidden cursor-pointer">
              <HiBars3BottomRight />
            </button>
          </div>
        </div>
      </nav>
      <CartDrawer drawerOpen={drawerOpen} toggledrawerOpen={setDrawerOpen} />
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed z-40 top-20 left-0 h-full w-3/4 md:hidden bg-gray-800 text-white px-6 py-4 space-y-4">
          <h3 className="font-bold py-3 border-b border-gray-600">Menu</h3>
          <Link
            to="/"
            className="block hover:text-gray-400"
            onClick={() => setMobileMenuOpen(false)}
          >
            New Arrival
          </Link>
          <Link
            to="/"
            className="block hover:text-gray-400"
            onClick={() => setMobileMenuOpen(false)}
          >
            Best Seller
          </Link>
        </div>
      )}
    </>
  )
}

export default Header