import { useState } from "react";
import { registerUser } from "../API/authAPI";
import LoginButton from "./buttons/LoginButton";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff } from "lucide-react"; // 👁️ icons

type RegisterFormProps = {
  setIsRegister: (value: boolean) => void;
};

function RegisterForm({ setIsRegister }: RegisterFormProps) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👁️

  const handleRegister = async () => {
    const user = { username, email, password, location };

    try {
      const { user: registeredUser, token } = await registerUser(user);

      const normalizedUser = {
        _id: registeredUser.id,
        username: registeredUser.username,
        email: registeredUser.email,
        location: registeredUser.location,
      };

      login(normalizedUser, token);
      alert(`Welcome, ${username}!`);
      navigate("/dashboard");
    } catch (err: any) {
      console.error(err);
      setError(
        err?.response?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="space-y-3">
      <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
        Create an Account
      </h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
          required
        />

        {/* Password with eye icon */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-3 text-gray-600 hover:text-gray-900"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <input
          type="text"
          placeholder="Location (optional)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
        />

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        <LoginButton buttonName="Register" onClick={handleRegister} />
      </div>

      <p className="mt-4 text-center text-gray-700 text-sm">
        Already have an account?
        <button
          type="button"
          className="text-blue-600 ml-1 hover:underline"
          onClick={() => setIsRegister(false)}
        >
          Login here
        </button>
      </p>
    </div>
  );
}

export default RegisterForm;
