import React, { useEffect, useState } from 'react';
import Culture from './Culture';
import RecentReview from '../components/RecentReviews';

import img1 from '../assets/homeimg/chemnitz3.jpg';
import img2 from '../assets/homeimg/chemnitz2.jpg';
import img3 from '../assets/homeimg/chemnitz1.jpg';
import img5 from '../assets/homeimg/chemnitz5.jpg';
import img6 from '../assets/homeimg/chemnitz6.jpg';
import img7 from '../assets/homeimg/chemnitz7.jpg';
import img8 from '../assets/homeimg/chemnitz8.webp';
import img9 from '../assets/homeimg/chemnitz4.jpg';
import img10 from '../assets/schlossberg.webp';

const images = [img1, img3, img2, img5, img6, img7, img8, img9, img10];

const Home: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* Full-screen Carousel */}
      <div className="relative w-full h-[calc(100vh-100px)] min-h-[500px] overflow-hidden">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index + 1}`}
            loading="lazy"
            className={`absolute top-0 left-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        <div className="absolute inset-0 bg-black bg-opacity-60 z-10" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 sm:px-8 z-20">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-2 sm:mb-4 leading-tight">
            IT'S TIME TO
          </h1>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold mb-4 sm:mb-6 leading-tight">
            VISIT CHEMNITZ!
          </h2>
          <p className="text-base sm:text-lg md:text-2xl max-w-xl sm:max-w-2xl">
            Create new adventures, experiences, and unforgettable moments.
          </p>
        </div>
      </div>

      {/* Culture Preview Section */}
      <section className="w-full bg-white py-12 px-4 sm:px-6 lg:px-12">
        <Culture />
        <br></br>
        <br></br>
        
        <RecentReview/>
      </section>

    </div>
  );
};

export default Home;
