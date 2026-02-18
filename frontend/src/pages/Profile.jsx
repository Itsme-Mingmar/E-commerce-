import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice"


const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const orders = [
    {
      id: "ORD12345",
      image: "https://picsum.photos/200",
      createdAt: "2024-02-15",
      total: 4500,
      status: "Delivered"
    },
    {
      id: "ORD12346",
      image: "https://picsum.photos/201",
      createdAt: "2024-03-02",
      total: 3200,
      status: "Processing"
    }
  ]

  return (
    <div className="container mx-auto px-6 py-12">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* RIGHT: User Info */}
        <div className="border rounded-lg px-6 py-12 h-fit">
          <p className="font-bold mb-4">{user?.name}</p>

          <p className="font-normal mb-6 opacity-60">{user?.email}</p>

          <button
            onClick={async () => {
              await dispatch(logout());
              setTimeout(()=>{
                navigate("/login");
              },1000)
            }} 
            className="w-full bg-red-500 text-white py-2 rounded-lg cursor-pointer">
            Logout
          </button>
        </div>

        {/* LEFT: Orders */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-6">My Orders</h2>

          <div className="space-y-4">
            {orders.map(order => (
              <Link
                key={order.id}
                to={`/order/${order.id}`}
                className="flex items-center gap-4 border rounded-lg p-4 hover:bg-gray-50 transition"
              >
                <img
                  src={order.image}
                  alt="Order"
                  className="w-20 h-20 object-cover rounded"
                />

                <div className="flex-1">
                  <p className="font-medium">Order #{order.id}</p>
                  <p className="text-sm text-gray-600">
                    Created: {order.createdAt}
                  </p>
                  <p className="text-sm text-gray-600">
                    Total: Rs. {order.total}
                  </p>
                </div>

                <span
                  className={`text-sm font-medium ${order.status === "Delivered"
                    ? "text-green-600"
                    : "text-amber-500"
                    }`}
                >
                  {order.status}
                </span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Profile
