import { useState } from "react"
import { Link } from "react-router-dom"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { loginUser } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(loginUser({
      email:formData.email,
      password: formData.password,
    }));
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

      {/* Left Form */}
      <div className="flex items-center justify-center px-4">
        <div className="w-full max-w-md p-4 rounded-lg border border-black/30">

          <h1 className="text-3xl font-bold mb-2">Welcome Back </h1>
          <p className="text-gray-600 mb-8">
            Login to continue your fitness journey
          </p>
          <form onSubmit={handleSubmit} className="space-y-5">

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
            <div className="relative ">
              <label className="block text-sm font-medium mb-1">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2"
              />
              <div className="absolute right-5 top-10 cursor-pointer">
                {showPassword ? (
                  <FaRegEyeSlash onClick={() => setShowPassword(false)} />
                ) : (
                  <FaRegEye onClick={() => setShowPassword(true)} />
                )
                }
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-amber-500 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-amber-400 hover:bg-amber-500 transition py-3 rounded-lg font-semibold cursor-pointer"
            >
              Login
            </button>

          </form>

          {/* Register */}
          <p className="text-sm text-center mt-6">
            Don’t have an account?{" "}
            <Link to="/register" className="text-amber-500 font-medium">
              Sign up
            </Link>
          </p>

        </div>
      </div>

      {/* Right Image (Desktop Only) */}
      <div className="hidden md:block">
        <img
          src="https://picsum.photos/700/800?fitness"
          alt="Login"
          className="w-full h-full object-cover"
        />
      </div>

    </div>
  )
}

export default Login;
