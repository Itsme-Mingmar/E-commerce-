import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Checkout = ({ cart }) => {

  /*  DUMMY CART */
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
  }

  cart = dummyCart
  const navigate = useNavigate()

  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    country: "",
  })
  const [paymentMethod, setPaymentMethod] = useState("Khalti")
  const [loading, setLoading] = useState(false)
  const [checkoutId, setCheckoutId] = useState(null)
  const [showPaymentPopup, setShowPaymentPopup] = useState(false)

  const handleChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    })
  }

  const CreateCheckoutHandler = async () => {
    /*
    if (!shippingAddress.address || !shippingAddress.city || !shippingAddress.country) {
      alert("Please fill all shipping fields")
      return
    }
    */
    try {
      setLoading(true)
      setCheckoutId(123);
      setShowPaymentPopup(true);

    /*
      const { data } = await axios.post("/api/checkout", {
        shippingAddress,
        paymentMethod,
      })

      // ✅ store checkout id
      setCheckoutId(data.data._id)

      // ✅ open payment popup
      setShowPaymentPopup(true)
      */
    } catch (error) {
      alert(error.response?.data?.message || "Checkout failed")
    } finally {
      setLoading(false)
    }
  }

  /* 
  const handlePayment = (provider) => {
    console.log("Checkout ID:", checkoutId)
    console.log("Payment Provider:", provider)

    // 🔜 later integrate real payment gateway
    navigate(`/order-success/${checkoutId}`)
  }
  */

  return (
    <>
      {/* 🔹 BLUR BACKGROUND WHEN PAYMENT POPUP IS OPEN */}
      <div className={`container mx-auto px-4 py-14 ${showPaymentPopup ? "blur-sm pointer-events-none" : ""}`}>
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
                  required
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
                <label className="flex p-5 items-center gap-6 border rounded cursor-pointer">
                  <input
                    type="radio"
                    value="Paypal"
                    checked={paymentMethod === "Paypal"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <p className="font-bold">PayPal</p>
                  <img className="w-24 ml-auto" src="/paypal.png" alt="" />
                </label>

                <label className="flex p-5 items-center gap-6 border rounded cursor-pointer">
                  <input
                    type="radio"
                    value="Khalti"
                    checked={paymentMethod === "Khalti"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <p className="font-bold">Khalti</p>
                  <img className="w-24 ml-auto" src="/khalti.png" alt="" />
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE – ORDER SUMMARY */}
          <div className="border rounded-lg p-6 h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="space-y-4">
              {cart.product.map((item) => (
                <div key={item.productId} className="flex justify-between border-b pb-2">
                  <div className="flex gap-4">
                    <img src={item.image} className="w-14 h-14 rounded object-cover" />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-medium">Rs. {item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <button
              onClick={CreateCheckoutHandler}
              disabled={loading}
              className="w-full mt-6 bg-amber-400 py-3 rounded-lg font-semibold hover:bg-amber-500 cursor-pointer"
            >
              {loading ? "Processing..." : "Continue to Payment"}
            </button>
          </div>
        </div>
      </div>

      {/* PAYMENT POPUP */}
      {showPaymentPopup && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" />

          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl w-[90%] max-w-md text-center space-y-6">

              <h2 className="text-2xl font-bold">Complete Payment</h2>

              {paymentMethod === "Paypal" && (
                <button onClick={() => handlePayment("PAYPAL")} className="w-full border p-4 rounded">
                  <img src="/paypal.png" className="mx-auto h-12" />
                </button>
              )}

              {paymentMethod === "Khalti" && (
                <button onClick={() => handlePayment("KHALTI")} className="w-full border p-4 rounded">
                  <img src="/khalti.png" className="mx-auto h-12" />
                </button>
              )}

              <button onClick={() => setShowPaymentPopup(false)} className="text-gray-500 underline">
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Checkout
