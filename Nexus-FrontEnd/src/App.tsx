// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Test from "./pages/Test";


// function App() {

//   return (
//     <BrowserRouter>
//       <div className="App">
//         <Routes>
//           <Route path="/" element={<Test/>} />
//         </Routes>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;
// import React from 'react'
// import CulturalSiteList from './components/culturalSiteList'
// import Home from './pages/Home';
// import Header from './components/Header';

// function App() {
//   return (
//     <div>
//       <Header/>
//       <Home/>
//       <CulturalSiteList/>
//     </div>
//   )
// }

// export default App

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import CulturalSiteList from './components/culturalSiteList';
import AboutChemnitz from './pages/AboutChemnitz';
import MapPage from './pages/MapPage'; // You'll create this soon
import AuthPage from './pages/AuthPage';
import Dashboard from './components/Dashboard';
function App() {
  return (
    <Router>
        <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/culture" element={<CulturalSiteList />} />
        <Route path="/about-chemnitz" element={<AboutChemnitz />} />
        <Route path="/explore" element={<MapPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </Router>
  );
}

export default App;

