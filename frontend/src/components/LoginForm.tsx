import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react'; // 👁️ import icons
import LoginButton from './buttons/LoginButton';
import { loginUser } from '../API/authAPI';
import { useAuth } from '../context/AuthContext';

type LoginFormProps = {
  setIsRegister: (value: boolean) => void;
};

function LoginForm({ setIsRegister }: LoginFormProps) {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // 👁️ toggle

  const handleLogin = async () => {
    try {
      const { user, token } = await loginUser({ email, password });
      const normalizedUser = {
        _id: user.id,
        username: user.username,
        email: user.email,
        location: user.location,
      };

      login(normalizedUser, token);
      alert(`Welcome back, ${normalizedUser.username}!`);
      navigate('/dashboard');
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="space-y-3">
      <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
        Login to Your Account
      </h2>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
          required
        />

        {/* Password input with eye icon */}
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
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

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        <LoginButton buttonName="Login" onClick={handleLogin} />
      </form>

      <p className="mt-4 text-center text-gray-700 text-sm">
        Don't have an account?
        <button
          type="button"
          className="text-blue-600 ml-1 hover:underline"
          onClick={() => setIsRegister(true)}
        >
          Register here
        </button>
      </p>
    </div>
  );
}

export default LoginForm;
