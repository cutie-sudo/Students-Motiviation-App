import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "tailwindcss/tailwind.css";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    "image1.jpg", // Replace with actual image paths
    "image2.jpg",
    "image3.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // Auto-slide every 5 seconds
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="w-full h-screen overflow-y-auto scroll-snap">
      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center text-center bg-[#71d5f1] text-white px-6">
        <h1 className="text-5xl font-bold">Welcome to TechElevate</h1>
        <p className="text-xl mt-4 max-w-2xl">
          Empowering learners with technology and innovation. Explore our community and learn something new every day.
        </p>
        <Link to="/signup" className="mt-6 bg-white text-blue-600 px-6 py-3 rounded-lg shadow-lg hover:bg-gray-200 transition">
          Get Started
        </Link>
      </section>

      {/* About Us Section */}
      <section className="h-screen flex flex-col items-center justify-center text-center px-6 bg-gray-100">
        <h2 className="text-4xl font-semibold">About Us</h2>
        <p className="text-lg max-w-2xl mt-4">
          At TechElevate, we believe every student has the potential to succeed—all they need is the right mindset, support, and tools.
        </p>
      </section>
      
      {/* Our Mission */}
      <section className="h-screen flex flex-col items-center justify-center text-center px-6 bg-white">
        <h2 className="text-4xl font-semibold">Our Mission</h2>
        <p className="text-lg max-w-2xl mt-4">
          "We aim to help students stay motivated, organized, and productive through innovative goal tracking, personalized reminders, and encouragement."
        </p>
      </section>

      {/* Slideshow Section */}
      <section className="h-screen flex items-center justify-center bg-black">
        <img src={slides[currentSlide]} alt="Slide" className="h-3/4 w-auto rounded-lg shadow-lg transition-all duration-500" />
      </section>

      {/* Meet Our Team */}
      <section className="h-screen flex flex-col items-center justify-center text-center px-6 bg-gray-100">
        <h2 className="text-4xl font-semibold">Meet Our Team</h2>
        <div className="flex justify-center mt-6 gap-8">
          <div className="text-center border-2 border-gray-300 p-4 rounded-lg">
            <img className="w-24 h-24 rounded-full mx-auto" src="https://via.placeholder.com/100" alt="Adam" />
            <p className="font-bold mt-2 text-xl">Adam Abdullahi</p>
          </div>
          <div className="text-center border-2 border-gray-300 p-4 rounded-lg">
            <img className="w-24 h-24 rounded-full mx-auto" src="https://via.placeholder.com/100" alt="Faith" />
            <p className="font-bold mt-2 text-xl">Faith Nguli</p>
          </div>
          <div className="text-center border-2 border-gray-300 p-4 rounded-lg">
            <img className="w-24 h-24 rounded-full mx-auto" src="https://via.placeholder.com/100" alt="Abdirizak" />
            <p className="font-bold mt-2 text-xl">Abdirizak Abubakar</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;