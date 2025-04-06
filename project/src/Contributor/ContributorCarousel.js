import React, { useState, useEffect } from "react";
import "./ContributorCarousel.css";
import SliderImg1 from './images/SliderImg1.jpg'
import SliderImg2 from './images/SliderImg2.jpg'
import SliderImg3 from './images/SliderImg3.jpg'
import SliderImg4 from './images/SliderImg4.jpg'
import SliderImg5 from './images/SliderImg5.jpg'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Arrow Icons

const images = [
  SliderImg1, // Image 1
  SliderImg2, // Image 2
  SliderImg3, // Image 3
  SliderImg4,
  SliderImg5 // Image 4
];

const ContributorCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Handle manual navigation
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="carousel-container">
      <div className="carousel">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index + 1}`}
            className={`carousel-image ${index === currentIndex ? "active" : ""}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button className="carousel-btn left" onClick={prevSlide}>
        <FaChevronLeft />
      </button>
      <button className="carousel-btn right" onClick={nextSlide}>
        <FaChevronRight />
      </button>
    </div>
  );
};

export default ContributorCarousel;
