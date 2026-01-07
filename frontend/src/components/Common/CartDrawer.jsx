import { IoMdClose } from "react-icons/io";
import CartContents from "../Cart/CartContents";
import { useNavigate } from "react-router-dom";

function CartDrawer({ drawerOpen, toggledrawerOpen }) {
  const navigate = useNavigate();
  const handleCheckout = ()=>{
    navigate("/checkout");
    toggledrawerOpen(!drawerOpen);
  }

  return (
    <div
      className={`fixed z-50 top-0 right-0 h-full w-3/4 md:w-1/3 bg-gray-800 text-white flex flex-col shadow-lg transition-transform duration-300 ${drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
    >

      {/* Header */}
      <div className="p-4 border-b border-gray-600 flex justify-between">
        <p>🛒 Cart Drawer</p>
        <button className="cursor-pointer" onClick={() => toggledrawerOpen(false)}>
          <IoMdClose />
        </button>
      </div>

      {/* Cart Items (Scrollable area) */}
      <div className="flex-1 p-4 overflow-y-auto">
         <CartContents />
      </div>

      {/* Checkout Button (Always at bottom) */}
      <div className="p-4 border-t border-gray-600">
        <button onClick={handleCheckout} className="w-full bg-amber-400 py-3 rounded-lg text-gray-900 hover:bg-amber-500 font-semibold cursor-pointer">
          Checkout
        </button>
      </div>

    </div>
  );
}

export default CartDrawer;
