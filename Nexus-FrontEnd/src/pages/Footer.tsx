import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-gray-400 py-6 mt-12">
      <div className="container mx-auto px-6 text-center text-sm">
        <p>© {new Date().getFullYear()} Created by Klea Haxhiu</p>
        <p className="mt-1">A project showcasing cultural and interesting locations in Chemnitz</p>
      </div>
    </footer>
  );
};

export default Footer;
