// // // import { Link } from 'react-router-dom';
// // // import { useState } from 'react';
// // // import { Menu, X } from 'lucide-react'; // icon library, optional

// // // function Header() {
// // //   const [menuOpen, setMenuOpen] = useState(false);

// // //   return (
// // //     <header className="bg-white shadow-md">
// // //       <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
// // //         {/* Logo */}
// // //         <h1 className="text-2xl font-bold text-black">CHEMNITZ</h1>

// // //         {/* Desktop Nav */}
// // //         <nav className="hidden md:flex space-x-6 items-center">
// // //           <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
// // //           <Link to="/about-chemnitz" className="text-black hover:text-blue-700">Culture</Link>
// // //           <Link to="/culture" className="text-black hover:text-blue-700">Map</Link>
// // //           <Link to="/auth">
// // //             <button className="bg-transparent border border-black text-black px-5 py-1 rounded-2xl hover:bg-neutral-400 hover:text-white">
// // //                Register
// // //             </button>
// // //           </Link>
// // //         </nav>

// // //         {/* Mobile Menu Button */}
// // //         <button
// // //           onClick={() => setMenuOpen(!menuOpen)}
// // //           className="md:hidden text-black focus:outline-none"
// // //         >
// // //           {menuOpen ? <X size={28} /> : <Menu size={28} />}
// // //         </button>
// // //       </div>

// // //       {/* Mobile Menu */}
// // //       {menuOpen && (
// // //         <div className="md:hidden px-6 pb-4 space-y-3 bg-white">
// // //           <Link to="/" onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-blue-600">Home</Link>
// // //           <Link to="/about-chemnitz" onClick={() => setMenuOpen(false)} className="block text-black hover:text-blue-700">Culture</Link>
// // //           <Link to="/culture" onClick={() => setMenuOpen(false)} className="block text-black hover:text-blue-700">Map</Link>
// // //           <Link to="/auth" onClick={() => setMenuOpen(false)}>
// // //             <button className="w-full bg-transparent border border-black text-black px-5 py-1 rounded-2xl hover:bg-neutral-400 hover:text-white">
// // //               Register
// // //             </button>
// // //           </Link>
// // //         </div>
// // //       )}
// // //     </header>
// // //   );
// // // }

// // // export default Header;
// // import { Link } from 'react-router-dom';
// // import { useState } from 'react';
// // import { Menu, X } from 'lucide-react';
// // import { useAuth } from '../context/AuthContext'; // ✅ Import useAuth

// // function Header() {
// //   const [menuOpen, setMenuOpen] = useState(false);
// //   const { user, logout } = useAuth(); // ✅ Use the auth context

// //   return (
// //     <header className="bg-white shadow-md">
// //       <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
// //         {/* Logo */}
// //         <h1 className="text-2xl font-bold text-black">CHEMNITZ</h1>

// //         {/* Desktop Nav */}
// //         <nav className="hidden md:flex space-x-6 items-center">
// //           <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
// //           <Link to="/about-chemnitz" className="text-black hover:text-blue-700">Culture</Link>
// //           <Link to="/culture" className="text-black hover:text-blue-700">Map</Link>

// //           {user ? (
// //             <>
// //               <Link to="/dashboard" className="text-black hover:text-blue-700">Dashboard</Link>
// //               <span className="text-black">Hello, {user.username}</span>
// //               <button
// //                 onClick={logout}
// //                 className="bg-transparent border border-black text-black px-5 py-1 rounded-2xl hover:bg-red-500 hover:text-white"
// //               >
// //                 Logout
// //               </button>
// //             </>
// //           ) : (
// //             <Link to="/auth">
// //               <button className="bg-transparent border border-black text-black px-5 py-1 rounded-2xl hover:bg-neutral-400 hover:text-white">
// //                 Register
// //               </button>
// //             </Link>
// //           )}
// //         </nav>

// //         {/* Mobile Menu Button */}
// //         <button
// //           onClick={() => setMenuOpen(!menuOpen)}
// //           className="md:hidden text-black focus:outline-none"
// //         >
// //           {menuOpen ? <X size={28} /> : <Menu size={28} />}
// //         </button>
// //       </div>

// //       {/* Mobile Menu */}
// //       {menuOpen && (
// //         <div className="md:hidden px-6 pb-4 space-y-3 bg-white">
// //           <Link to="/" onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-blue-600">Home</Link>
// //           <Link to="/about-chemnitz" onClick={() => setMenuOpen(false)} className="block text-black hover:text-blue-700">Culture</Link>
// //           <Link to="/culture" onClick={() => setMenuOpen(false)} className="block text-black hover:text-blue-700">Map</Link>

// //           {user ? (
// //             <>
// //               <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="block text-black hover:text-blue-700">Dashboard</Link>
// //               <span className="block text-black">Hello, {user.username}</span>
// //               <button
// //                 onClick={() => { logout(); setMenuOpen(false); }}
// //                 className="w-full bg-transparent border border-black text-black px-5 py-1 rounded-2xl hover:bg-red-500 hover:text-white"
// //               >
// //                 Logout
// //               </button>
// //             </>
// //           ) : (
// //             <Link to="/auth" onClick={() => setMenuOpen(false)}>
// //               <button className="w-full bg-transparent border border-black text-black px-5 py-1 rounded-2xl hover:bg-neutral-400 hover:text-white">
// //                 Register
// //               </button>
// //             </Link>
// //           )}
// //         </div>
// //       )}
// //     </header>
// //   );
// // }

// // export default Header;
// import { Link } from 'react-router-dom';
// import { useState } from 'react';
// import { Menu, X, User } from 'lucide-react';  // <-- Import User icon
// import { useAuth } from '../context/AuthContext';

// function Header() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const { user, logout } = useAuth();

//   return (
//     <header className="bg-white shadow-md">
//       <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//         {/* Logo */}
//         <h1 className="text-2xl font-bold text-black">CHEMNITZ</h1>

//         {/* Desktop Nav */}
//         <nav className="hidden md:flex space-x-6 items-center">
//           <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
//           <Link to="/about-chemnitz" className="text-black hover:text-blue-700">Culture</Link>
//           <Link to="/culture" className="text-black hover:text-blue-700">Map</Link>

//           {user ? (
//             <>
//               {/* Dashboard Icon linking to dashboard */}
//               <Link to="/dashboard" className="text-black hover:text-blue-700">
//                 <User size={24} />
//               </Link>

//               {/* <button
//                 onClick={logout}
//                 className="bg-transparent border border-black text-black px-5 py-1 rounded-2xl hover:bg-red-500 hover:text-white"
//               >
//                 Logout
//               </button> */}
//             </>
//           ) : (
//             <Link to="/auth">
//               <button className="bg-transparent border border-black text-black px-5 py-1 rounded-2xl hover:bg-neutral-400 hover:text-white">
//                 Register
//               </button>
//             </Link>
//           )}
//         </nav>

//         {/* Mobile Menu Button */}
//         <button
//           onClick={() => setMenuOpen(!menuOpen)}
//           className="md:hidden text-black focus:outline-none"
//         >
//           {menuOpen ? <X size={28} /> : <Menu size={28} />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="md:hidden px-6 pb-4 space-y-3 bg-white">
//           <Link to="/" onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-blue-600">Home</Link>
//           <Link to="/about-chemnitz" onClick={() => setMenuOpen(false)} className="block text-black hover:text-blue-700">Culture</Link>
//           <Link to="/culture" onClick={() => setMenuOpen(false)} className="block text-black hover:text-blue-700">Map</Link>

//           {user ? (
//             <>
//               <Link to="/dashboard" onClick={() => setMenuOpen(false)} className=" text-black hover:text-blue-700 flex items-center space-x-2">
//                 <User size={20} />
//                 <span>Profile</span>
//               </Link>

//               {/* <button
//                 onClick={() => { logout(); setMenuOpen(false); }}
//                 className="w-full bg-transparent border border-black text-black px-5 py-1 rounded-2xl hover:bg-red-500 hover:text-white"
//               >
//                 Logout
//               </button> */}
//             </>
//           ) : (
//             <Link to="/auth" onClick={() => setMenuOpen(false)}>
//               <button className="w-full bg-transparent border border-black text-black px-5 py-1 rounded-2xl hover:bg-neutral-400 hover:text-white">
//                 Register
//               </button>
//             </Link>
//           )}
//         </div>
//       )}
//     </header>
//   );
// }

// export default Header;
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, User } from 'lucide-react';  // <-- Import User icon
import { useAuth } from '../context/AuthContext';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate(); // ✅ Needed to redirect after logout

  const handleLogout = () => {
    logout();         // clear user
    navigate("/"); // go to login/register
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-black">CHEMNITZ</h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
          <Link to="/about-chemnitz" className="text-black hover:text-blue-700">Culture</Link>
          <Link to="/culture" className="text-black hover:text-blue-700">Map</Link>

          {user ? (
            <>
              {/* Dashboard Icon linking to dashboard */}
              <Link to="/dashboard" className="text-black hover:text-blue-700">
                <User size={24} />
              </Link>

              {/* ✅ Working logout button */}
              <button
                onClick={handleLogout}
                className="bg-transparent border border-black text-black px-5 py-1 rounded-2xl hover:bg-red-500 hover:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/auth">
              <button className="bg-transparent border border-black text-black px-5 py-1 rounded-2xl hover:bg-neutral-400 hover:text-white">
                Register
              </button>
            </Link>
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
          <Link to="/" onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-blue-600">Home</Link>
          <Link to="/about-chemnitz" onClick={() => setMenuOpen(false)} className="block text-black hover:text-blue-700">Culture</Link>
          <Link to="/culture" onClick={() => setMenuOpen(false)} className="block text-black hover:text-blue-700">Map</Link>

          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)} className=" text-black hover:text-blue-700 flex items-center space-x-2">
                <User size={20} />
                <span>Profile</span>
              </Link>

              {/* ✅ Working mobile logout */}
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="w-full bg-transparent border border-black text-black px-5 py-1 rounded-2xl hover:bg-red-500 hover:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/auth" onClick={() => setMenuOpen(false)}>
              <button className="w-full bg-transparent border border-black text-black px-5 py-1 rounded-2xl hover:bg-neutral-400 hover:text-white">
                Register
              </button>
            </Link>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
