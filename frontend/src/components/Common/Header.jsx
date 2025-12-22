import { useState } from "react";
import { Link } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { HiBars3BottomRight } from "react-icons/hi2";
import SearchBar from "./SearchBar";
import CartDrawer from "./CartDrawer";

function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <>
      <nav className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto flex justify-between py-6 px-10">

          <div>
            <Link to="/" className="text-2xl font-bold">
              NutriPulse
            </Link>
          </div>

          <div className="flex font-bold space-x-10">
            <Link to="/" className="hover:text-gray-400">New Arrival</Link>
            <Link to="/" className="hover:text-gray-400">Best Seller</Link>
          </div>

          <div className="flex space-x-5 items-center relative">
            <Link to="/" className="hover:text-gray-500">
              <CiUser className="w-5 h-5" />
            </Link>

            <button onClick={() => setDrawerOpen(true)} className="relative">
              <LiaShoppingBagSolid className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-red-500 rounded-full text-white px-1.5 text-sm">
                4
              </span>
            </button>

            <button className="md:hidden">
              <HiBars3BottomRight />
            </button>

            <SearchBar />
          </div>

        </div>
      </nav>
      <CartDrawer drawerOpen={drawerOpen} toggledrawerOpen={setDrawerOpen} />
    </>
  )
}

export default Header