import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 



function AuthForm() {
  const navigate = useNavigate();
  const { login } = useAuth(); 
  const [isRegister, setIsRegister] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const toggleMode = () => {
    setIsRegister(!isRegister);
    setError("");
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError("");

  //   try {
  //     if (isRegister) {
  //       await axios.post("http://localhost:5000/api/auth/register", {
  //         username,
  //         email,
  //         password,
  //         location,
  //       });
  //       alert("Registration successful! You can now log in.");
  //       setIsRegister(false);
  //     } else {
  //       const res = await axios.post("http://localhost:5000/api/auth/login", {
  //         email,
  //         password,
  //       });

  //       // ✅ Use context to log in
  //       login(res.data.user, res.data.token);

  //       alert(`Welcome back, ${res.data.user.username}!`);
  //       navigate("/dashboard");
  //     }
  //   } catch (err: any) {
  //     if (err.response?.data?.message) {
  //       setError(err.response.data.message);
  //     } else {
  //       setError("Something went wrong. Please try again.");
  //     }
  //   }
  // };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 flex items-center justify-center relative overflow-hidden">
      {/* Blurred glass layer */}
      <div className="absolute inset-0 backdrop-blur-2xl bg-white/10 z-0"></div>

      {/* Auth card */}
      <div className="z-10 w-full max-w-md p-8 bg-white bg-opacity-70 rounded-2xl shadow-2xl backdrop-blur-lg">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          {isRegister ? "Create an Account" : "Welcome Back"}
        </h2>

        <form  className="space-y-4">
          {isRegister && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
                required
              />
              <input
                type="text"
                placeholder="Location (optional)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
              />
            </>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
            required
          />

          {error && (
            <p className="text-red-600 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300"
          >
            {isRegister ? "Register" : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-700 text-sm">
          {isRegister ? "Already have an account?" : "Don't have an account?"}
          <button
            type="button"
            onClick={toggleMode}
            className="text-blue-600 ml-1 hover:underline"
          >
            {isRegister ? "Login here" : "Register here"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default AuthForm;
