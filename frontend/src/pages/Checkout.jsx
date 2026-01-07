import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Checkout = ({ cart }) => {
    const dummyCart = {
        product: [
            {
                productId: "prod_001",
                name: "Whey Protein 2kg",
                image: "https://picsum.photos/200?random=1",
                price: 4500,
                quantity: 1,
            },
            {
                productId: "prod_002",
                name: "Creatine Monohydrate",
                image: "https://picsum.photos/200?random=2",
                price: 3000,
                quantity: 2,
            },
            {
                productId: "prod_003",
                name: "Multivitamin Tablets",
                image: "https://picsum.photos/200?random=3",
                price: 1500,
                quantity: 1,
            },
        ],
    };
    cart = dummyCart;
    const navigate = useNavigate()

    const [shippingAddress, setShippingAddress] = useState({
        address: "",
        city: "",
        country: "",
    })

    const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery")
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setShippingAddress({
            ...shippingAddress,
            [e.target.name]: e.target.value,
        })
    }

    const placeOrderHandler = async () => {
        if (!shippingAddress.address || !shippingAddress.city || !shippingAddress.country) {
            alert("Please fill all shipping fields")
            return
        }

        try {
            setLoading(true)

            const { data } = await axios.post("/api/checkout", {
                shippingAddress,
                paymentMethod,
            })

            // redirect to order / success page
            navigate(`/checkout-success/${data.data._id}`)
        } catch (error) {
            alert(error.response?.data?.message || "Checkout failed")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container mx-auto px-4 py-14">
            <h1 className="text-3xl font-bold mb-10">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                {/* LEFT SIDE */}
                <div className="space-y-8">

                    {/* Shipping Address */}
                    <div className="border rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>

                        <div className="space-y-4">
                            <input
                                type="text"
                                name="address"
                                placeholder="Street Address"
                                className="w-full border p-3 rounded"
                                value={shippingAddress.address}
                                onChange={handleChange}
                            />

                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                className="w-full border p-3 rounded"
                                value={shippingAddress.city}
                                onChange={handleChange}
                            />

                            <input
                                type="text"
                                name="country"
                                placeholder="Country"
                                className="w-full border p-3 rounded"
                                value={shippingAddress.country}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="border rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

                        <div className="space-y-6">
                            <label className="flex p-5 items-center gap-6 border rounded cursor-pointer select-none">
                                <input
                                    type="radio"
                                    value="Cash on Delivery"
                                    checked={paymentMethod === "Cash on Delivery"}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <p className="font-bold">PayPal</p>
                                <img className="w-30 ml-40 " src="paypal.png" alt="" />
                            </label>

                            <label className="flex items-center gap-6 p-5 border rounded cursor-pointer select-none">
                                <input
                                    type="radio"
                                    value="Online Payment"
                                    checked={paymentMethod === "Online Payment"}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <p className="font-bold">Khalti</p>
                                <img className="w-30 ml-40  " src="khalti.png" alt="" />
                            </label>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE – ORDER SUMMARY */}
                <div className="border rounded-lg p-6 h-fit">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                    <div className="space-y-4">
                        {cart?.product?.map((item) => (
                            <div
                                key={item.productId}
                                className="flex justify-between border-b pb-2"
                            >
                                <div className="flex gap-4">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-14 h-14 object-cover rounded"
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
                    <div className="flex justify-between my-6">
                        <p className="font-bold">Total Price:</p>
                        <p className="font-medium">Rs.3500</p>
                    </div>
                    <button
                        onClick={placeOrderHandler}
                        disabled={loading}
                        className="w-full mt-6 bg-amber-400 font-semibold py-3 rounded-lg hover:bg-amber-500 cursor-pointer"
                    >
                        {loading ? "Processing..." : "Continue to Payment"}
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Checkout
