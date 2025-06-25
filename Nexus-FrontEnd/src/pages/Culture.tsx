import React from 'react';
import { Link } from 'react-router-dom';

const CulturePreview: React.FC = () => {
  return (
    <section className="bg-white py-12 px-6 text-center">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">Discover Chemnitz Culture</h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
        From vibrant street art to historic architecture, Chemnitz is a city where tradition meets creativity.
        Named European Capital of Culture 2025, it’s full of stories waiting to be discovered.
      </p>
      <Link
        to="/about-chemnitz"
        className="inline-block bg-blue-700 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition"
      >
        Read More
      </Link>
    </section>
  );
};

export default CulturePreview;
