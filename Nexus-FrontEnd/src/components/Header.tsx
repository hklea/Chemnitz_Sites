import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';  // User icon
import { useAuth } from '../context/AuthContext';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-black">CHEMNITZ</h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about-chemnitz"
            className={({ isActive }) =>
              isActive ? "text-blue-700 font-semibold" : "text-black hover:text-blue-700"
            }
          >
            Culture
          </NavLink>

          <NavLink
            to="/culture"
            className={({ isActive }) =>
              isActive ? "text-blue-700 font-semibold" : "text-black hover:text-blue-700"
            }
          >
            Map
          </NavLink>

          {user ? (
            <>
              
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "text-blue-700 font-semibold" : "text-black hover:text-blue-700"
            }
          >
            Profile
          </NavLink>


              <button
                onClick={handleLogout}
                className="bg-transparent border border-black text-black px-5 py-1 rounded-2xl hover:bg-blue-500 hover:text-white"
              >
                Log Out
              </button>
            </>
          ) : (
            <NavLink to="/auth">
              <button className="bg-transparent border border-black text-black px-5 py-1 rounded-2xl hover:bg-neutral-400 hover:text-white">
                Log In
              </button>
            </NavLink>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-black focus:outline-none"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 space-y-3 bg-white">
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              isActive ? "block text-blue-600 font-semibold" : "block text-gray-700 hover:text-blue-600"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about-chemnitz"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              isActive ? "block text-blue-700 font-semibold" : "block text-black hover:text-blue-700"
            }
          >
            Culture
          </NavLink>

          <NavLink
            to="/culture"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              isActive ? "block text-blue-700 font-semibold" : "block text-black hover:text-blue-700"
            }
          >
            Map
          </NavLink>

          {user ? (
            <>
              <NavLink
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="flex items-center space-x-2 text-black hover:text-blue-700"
              >
                <span>Profile</span>
              </NavLink>

              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="w-full bg-transparent border border-black text-black px-5 py-1 rounded-2xl hover:bg-blue-500 hover:text-white"
              >
                Log Out
              </button>
            </>
          ) : (
            <NavLink to="/auth" onClick={() => setMenuOpen(false)}>
              <button className="w-full bg-transparent border border-black text-black px-5 py-1 rounded-2xl hover:bg-neutral-400 hover:text-white">
                Log In
              </button>
            </NavLink>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
