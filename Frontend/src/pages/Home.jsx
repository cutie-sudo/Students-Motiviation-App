import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "tailwindcss/tailwind.css";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    "https://media.istockphoto.com/id/1363276581/photo/smart-young-students-studying-in-university-with-diverse-multiethnic-classmates-scholars.webp?a=1&b=1&s=612x612&w=0&k=20&c=oOR5Gs81fddma8PPBPH8tJIyDjEckdWBVTSQ0Gxj97k=",
    "https://media.istockphoto.com/id/657142888/photo/young-females-students-learning-computer-programming.webp?a=1&b=1&s=612x612&w=0&k=20&c=hzaSrDhFY3_PUe3pcLthMdPvzZjE1jqiCQHPswOpEAQ=",
    "https://media.istockphoto.com/id/1487286434/photo/portrait-of-young-smiling-female-programmer-sitting-on-her-desk-with-computers-in-an-it-office.webp?a=1&b=1&s=612x612&w=0&k=20&c=OksoMm-rm6lTLt5JqKn-78dGpHJJurPFc6VdeuPbGBU=",
    "https://images.unsplash.com/photo-1565687981296-535f09db714e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNvZnR3YXJlJTIwZW5naW5lZXJpbmclMjBzdHVkZW50c3xlbnwwfHwwfHx8MA%3D%3D=",
    "https://images.unsplash.com/photo-1592303637753-ce1e6b8a0ffb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNvZnR3YXJlJTIwZW5naW5lZXJpbmclMjBzdHVkZW50cyUyMHdob2xlJTIwY2xhc3N8ZW58MHx8MHx8fDA%3D"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="w-full h-full overflow-y-auto bg-gray-50">
      <section className="h-screen flex flex-col items-center justify-center text-center bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-6">
        <h1 className="text-6xl font-bold mb-4 animate-fade-in">Welcome to TechElevate</h1>
        <p className="text-2xl max-w-3xl mb-8 animate-fade-in">
          Empowering learners with technology and innovation. Explore our community and learn something new every day.
        </p>
        <Link
          to="/signup"
          className="bg-white text-blue-600 px-8 py-4 rounded-xl shadow-lg hover:bg-gray-200 transition-transform transform hover:scale-105 animate-fade-in"
        >
          Get Started
        </Link>
      </section>

      <section className="h-screen flex flex-col items-center justify-center text-center px-6 bg-white">
        <h2 className="text-5xl font-semibold mb-6">About Us</h2>
        <p className="text-xl max-w-3xl text-gray-700">
          At TechElevate, we believe every student has the potential to succeed—all they need is the right mindset, support, and tools.
        </p>
      </section>

      <section className="h-screen flex flex-col items-center justify-center text-center px-6 bg-gray-50">
        <h2 className="text-5xl font-semibold mb-6">Our Mission</h2>
        <p className="text-xl max-w-3xl text-gray-700">
          "We aim to help students stay motivated, organized, and productive through innovative goal tracking, personalized reminders, and encouragement."
        </p>
      </section>

      <section className="h-screen flex flex-col items-center justify-center px-6 bg-white">
        <h2 className="text-5xl font-semibold mb-6">Our Community</h2>
        <p className="text-xl max-w-3xl text-gray-700 text-center">
          Join our community of learners, mentors, and educators. Share your knowledge, ask questions, and connect with like-minded individuals.
        </p>
        <div className="relative w-full max-w-7xl h-[500px]">
          <img
            src={slides[currentSlide]}
            alt="Slide"
            className="w-full h-full object-contain rounded-2xl shadow-lg transition-transform duration-1000 ease-in-out"
          />
          <button
            onClick={() => setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-gray-700 p-3 rounded-full shadow-md hover:bg-gray-200"
          >
            ❮
          </button>
          <button
            onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-gray-700 p-3 rounded-full shadow-md hover:bg-gray-200"
          >
            ❯
          </button>
        </div>
      </section>

            {/* Meet Our Team */}
            <section className="h-screen flex flex-col items-center justify-center text-center px-6 bg-gray-100">
        <h2 className="text-4xl font-semibold">Meet Our Team</h2>
        <div className="flex justify-center mt-6 gap-8">
          <div className="text-center border-2 border-gray-300 p-4 rounded-lg">
            <img className="w-24 h-24 rounded-full mx-auto" src="../images/adan.webp" alt="Adan" />
            <p className="font-bold mt-2 text-xl">Adan Abdullahi</p>
          </div>
          <div className="text-center border-2 border-gray-300 p-4 rounded-lg">
            <img className="w-24 h-24 rounded-full mx-auto" src="../images/faith.webp" alt="Faith" />
            <p className="font-bold mt-2 text-xl">Faith Nguli</p>
          </div>
          <div className="text-center border-2 border-gray-300 p-4 rounded-lg">
            <img className="w-24 h-24 rounded-full mx-auto" src="../images/me.webp" alt="Abdirizak" />
            <p className="font-bold mt-2 text-xl">Abdurizak Abubakar</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
