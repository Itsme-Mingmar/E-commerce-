import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { AiOutlineProduct, AiTwotoneShop } from "react-icons/ai";
import { BsBorderStyle } from "react-icons/bs";
import { MdLogout } from "react-icons/md";

const AdminLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* ===== MOBILE TOP BAR ===== */}
      <div className="md:hidden flex items-center justify-between px-4 py-4 border-b bg-gray-900">
        <button onClick={() => setMenuOpen(true)}>
          <FaBars size={22} className="text-white cursor-pointer" />
        </button>
        <p className="font-bold text-lg text-white">Admin Dashboard</p>
      </div>

      {/* ===== OVERLAY (MOBILE ONLY) ===== */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      {/* ===== SIDEBAR ===== */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-gray-900 text-white z-50
          transform transition-transform duration-300
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-gray-700">
          <div>
            <p className="text-xl font-bold">NutriPulse</p>
            <p className="text-sm text-gray-400">Admin Panel</p>
          </div>

          {/* Close button (mobile only) */}
          <button
            onClick={() => setMenuOpen(false)}
            className="md:hidden cursor-pointer"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* NAV LINKS */}
        <nav className="flex flex-col gap-4 px-6 py-6">
          <Link className="flex items-center gap-3 hover:text-amber-400">
            <FaUsers /> Users
          </Link>

          <Link className="flex items-center gap-3 hover:text-amber-400">
            <AiOutlineProduct /> Products
          </Link>

          <Link className="flex items-center gap-3 hover:text-amber-400">
            <BsBorderStyle /> Orders
          </Link>

          <Link className="flex items-center gap-3 hover:text-amber-400">
            <AiTwotoneShop /> Shop
          </Link>
        </nav>

        {/* LOGOUT */}
        <div className="absolute bottom-6 left-0 w-full px-6">
          <button className="flex items-center justify-center gap-3 w-full bg-red-600 py-2 rounded hover:bg-red-700">
            <MdLogout />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminLayout;
