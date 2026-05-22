import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { HiBars3BottomRight } from "react-icons/hi2";
import { useSelector } from "react-redux";
import CartDrawer from "./CartDrawer";

function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Redux state
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  // Total cart quantity
  const cartCount =
    cart?.products?.reduce(
      (total, item) => total + item.quantity,
      0
    ) || 0;

  const scrollToSection = (id) => {
    if (location.pathname !== "/") {
      navigate("/");

      setTimeout(() => {
        document
          .getElementById(id)
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto flex justify-between py-6 px-10">

          {/* Logo */}
          <div>
            <Link to="/" className="text-2xl font-bold">
              NutriPulse
            </Link>
          </div>

          {/* Desktop Menu */}
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

          {/* Right Section */}
          <div className="flex space-x-5 items-center relative">

            {/* Admin button only for admin */}
            {user?.role === "admin" && (
              <Link
                to="/admin"
                className="border rounded px-2 py-1"
              >
                Admin
              </Link>
            )}

            {/* User profile or login */}
            {user ? (
              <button onClick={() => navigate("/profile")}>
                <CiUser className="w-5 h-5 cursor-pointer" />
              </button>
            ) : (
              <Link
                to="/login"
                className="border px-3 py-1 rounded"
              >
                Login
              </Link>
            )}

            {/* Cart icon only for logged-in users */}
            {user && (
              <button
                onClick={() => setDrawerOpen(true)}
                className="relative cursor-pointer"
              >
                <LiaShoppingBagSolid className="w-5 h-5" />

                {/* Dynamic Cart Count */}
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 rounded-full text-white px-1.5 text-sm">
                    {cartCount}
                  </span>
                )}
              </button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() =>
                setMobileMenuOpen((prev) => !prev)
              }
              className="md:hidden cursor-pointer"
            >
              <HiBars3BottomRight />
            </button>
          </div>
        </div>
      </nav>

      {/* Cart Drawer */}
      <CartDrawer
        drawerOpen={drawerOpen}
        toggledrawerOpen={setDrawerOpen}
      />

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed z-40 top-20 left-0 h-full w-3/4 md:hidden bg-gray-800 text-white px-6 py-4 space-y-4">

          <h3 className="font-bold py-3 border-b border-gray-600">
            Menu
          </h3>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              scrollToSection("new-arrival");
            }}
            className="block hover:text-gray-400"
          >
            New Arrival
          </button>

          <button
            className="block hover:text-gray-400"
            onClick={() => {
              setMobileMenuOpen(false);
              scrollToSection("best-seller");
            }}
          >
            Best Seller
          </button>
        </div>
      )}
    </>
  );
}

export default Header;