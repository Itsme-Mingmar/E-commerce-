import { useNavigate } from "react-router-dom";

const Order = () => {
    const navigate = useNavigate();
    const dummyOrder = {
        _id: "ORD-2026-0001",
        status: "pending",
        isPaid: true,
        paymentMethod: "Card",
        totalPrice: 7200,
        paidAt: "2026-01-05",

        shippingAddress: {
            address: "Kathmandu Street 12",
            city: "Kathmandu",
            country: "Nepal",
        },

        items: [
            {
                productId: "p1",
                name: "Whey Protein Gold",
                image: "https://picsum.photos/300",
                price: 3500,
                quantity: 1,
            },
            {
                productId: "p2",
                name: "Pre Workout Extreme",
                image: "https://picsum.photos/300",
                price: 1850,
                quantity: 2,
            },
        ],
    };

    const order = dummyOrder;

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            {/* MAIN CONTENT */}
            <div className="grid md:grid-cols-3 gap-6">
                {/* LEFT SIDE */}
                <div className="md:col-span-2 space-y-6">
                    {/* ITEMS */}
                    <div className="border rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4">Order Items</h3>

                        <div className="space-y-4">
                            {order.items.map((item) => (
                                <div
                                    key={item.productId}
                                    className="flex items-center justify-between border-b pb-3"
                                >
                                    <div className="flex gap-4">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                        <div>
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-sm text-gray-500">
                                                Qty: {item.quantity}
                                            </p>
                                        </div>
                                    </div>

                                    <p className="font-medium">
                                        Rs. {item.price * item.quantity}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* SHIPPING */}
                    <div className="border rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-2">
                            Shipping Address
                        </h3>
                        <p>{order.shippingAddress.address}</p>
                        <p>
                            {order.shippingAddress.city},{" "}
                            {order.shippingAddress.country}
                        </p>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="border rounded-lg p-6 h-fit space-y-4">
                    <h3 className="text-lg font-semibold">Order Summary</h3>

                    <div className="text-sm space-y-2">
                        <div className="flex justify-between">
                            <span>Order ID</span>
                            <span className="font-medium">{order._id}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Status</span>
                            <span className="capitalize font-medium text-orange-600">
                                {order.status}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span>Payment</span>
                            <span className="font-medium text-green-600">
                                Paid
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span>Payment Method</span>
                            <span className="font-medium">
                                {order.paymentMethod}
                            </span>
                        </div>
                    </div>

                    <hr />

                    <div className="flex justify-between text-lg font-semibold">
                        <span>Total</span>
                        <span>Rs. {order.totalPrice}</span>
                    </div>

                    <button onClick={()=>navigate("/profile")} className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded cursor-pointer">
                        View My Orders
                    </button>

                    <button onClick={()=> navigate("/collections/all")} className="w-full bg-amber-400 hover:bg-amber-500 py-2 rounded cursor-pointer">
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Order;
