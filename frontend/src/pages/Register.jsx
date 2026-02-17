import { useState } from "react"
import { Link } from "react-router-dom"
import { registerUser } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";


const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const { loading, error, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match")
      return
    }
    dispatch(registerUser({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    }))
  }
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

      {/* Error message */}
      {error && (
        <p className="text-red-500 text-sm">
          {error}
        </p>
      )}

      {/* Success message */}
      {user && (
        <p className="text-green-500 text-sm">
          Registration successful!
        </p>
      )}

      {/* Form Section */}
      <div className="flex items-center justify-center px-6  ">
        <div className="w-full max-w-md border p-8 rounded-lg border-black/30">

          <h1 className="text-3xl font-bold mb-2">
            Create Account
          </h1>
          <p className="text-gray-600 mb-8">
            Join NutriPulse and start your fitness journey
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Basanta Tamang"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 "
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2"
              />
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-400 hover:bg-amber-500 cursor-pointer transition py-3 rounded-lg font-semibold"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

          </form>

          {/* Login Link */}
          <p className="text-sm text-center mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-amber-500 font-medium">
              Login
            </Link>
          </p>

        </div>
      </div>

      {/* Right Image */}
      <div className="hidden md:block">
        <img
          src="https://picsum.photos/700/800?gym"
          alt="Register"
          className="w-full h-full object-cover"
        />
      </div>

    </div>
  )
}

export default Register
