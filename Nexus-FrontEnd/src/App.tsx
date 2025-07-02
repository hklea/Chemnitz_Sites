import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import CulturalSiteList from './components/culturalSiteList';
import AboutChemnitz from './pages/AboutChemnitz';
import MapPage from './pages/MapPage'; // You'll create this soon
import AuthPage from './pages/AuthPage';
import Dashboard from './components/Dashboard';
import Footer from './pages/Footer';
import ScrollTop from './components/ScrollTop';
function App() {
  return (
    <Router>
      <ScrollTop/>
        <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/culture" element={<CulturalSiteList />} />
        <Route path="/about-chemnitz" element={<AboutChemnitz />} />
        <Route path="/explore" element={<MapPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
  
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;

