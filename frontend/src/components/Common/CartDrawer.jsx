import { IoMdClose } from "react-icons/io";

function CartDrawer({drawerOpen, toggledrawerOpen}) {

  return (
    <div
      className={`fixed top-0 right-0 h-full w-3/4 md:w-1/3 bg-gray-800 text-white flex flex-col shadow-lg transition-transform duration-300 ${
        drawerOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4 border-b border-gray-600 flex justify-between">
        <p>🛒 Cart Drawer</p>
        <button onClick={()=> toggledrawerOpen(false)}>
            <IoMdClose/>
        </button>
      </div>
      <div className="p-4">Cart contents...</div>
    </div>
  );
}

export default CartDrawer;
