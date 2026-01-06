import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import img from "../assets/vedhika.jpeg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("login/", { email, password });

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "admin") navigate("/admin-dashboard");
      else if (res.data.role === "trainer") navigate("/trainer-dashboard");
      else navigate("/trainee-dashboard");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-400 px-4">
      
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 animate-slide-up">
        
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={img}
            alt="Logo"
            className="w-24 h-24 rounded-full object-cover shadow-lg mb-3 border-4 border-blue-200"
          />
          <h1 className="text-2xl font-extrabold text-blue-700 tracking-wide">
            VEEDHI | KURAKULAS
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Sign in to continue
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            />
          </div>

          {/* <div className="flex justify-between text-sm">
            <a href="#" className="text-blue-600 hover:underline">
              Forgot password?
            </a>
            <a href="#" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </div> */}

          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold shadow-md hover:from-blue-700 hover:to-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>

      {/* Animations */}
      <style>{`
        .animate-slide-up {
          animation: slideUp 0.8s cubic-bezier(.4,0,.2,1);
        }
        @keyframes slideUp {
          from {
            transform: translateY(40px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default Login;
