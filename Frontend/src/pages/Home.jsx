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
    <div className="font-sans">
      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center text-center bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in">Welcome to TechElevate</h1>
        <p className="text-lg md:text-2xl max-w-3xl mb-8 animate-fade-in">
          Empowering learners with technology and innovation. Explore our community and learn something new every day.
          <br />
          Join us today and start exploring the world of tech and innovation.
        </p>
        <Link
          to="/signup"
          className="bg-white text-blue-600 px-10 py-4 rounded-xl shadow-lg hover:bg-gray-200 transition-transform transform hover:scale-105 font-medium"
        >
          Get Started
        </Link>
      </section>

      {/* About Us Section */}
      <section className="py-16 px-6 bg-white text-gray-800">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-semibold mb-8 text-center">About Us</h2>
          <p className="text-base md:text-xl leading-relaxed max-w-4xl mx-auto">
            At TechElevate, we believe every student has the potential to succeed—all they need is the right mindset, support, and tools.
            Founded by a group of educators and tech enthusiasts who saw a gap in the digital learning space, we were inspired by the vision to empower students with practical tools to track their progress, stay motivated, and achieve their goals.
            We are dedicated to blending technology with innovative educational practices to make learning more accessible, engaging, and rewarding for all students.
          </p>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 px-6 bg-white text-gray-800">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-semibold mb-8 text-center">Our Mission</h2>
          <p className="text-base md:text-xl leading-relaxed max-w-4xl mx-auto">
            Our mission is to help students stay motivated, organized, and productive through innovative goal tracking, personalized reminders, and continuous encouragement.
            We provide the tools needed for academic and personal success, fostering a culture of continuous growth and learning.
          </p>
        </div>
      </section>

      {/* Our Community Section */}
      <section className="py-16 px-6 bg-white text-gray-800">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-semibold mb-8 text-center">Our Community</h2>
          <p className="text-base md:text-xl leading-relaxed max-w-4xl mx-auto mb-12 text-center">
            Join our vibrant community of learners, mentors, and educators. Share knowledge, ask questions, and connect with like-minded individuals in an engaging and supportive environment.
            Together, we create a space for innovation, growth, and shared success.
          </p>
          <div className="relative w-full max-w-5xl h-[400px] mx-auto rounded-2xl overflow-hidden shadow-lg bg-gray-100 flex items-center justify-center">
            <img
              src={slides[currentSlide]}
              alt="Slide"
              className="max-w-full max-h-full object-contain transition-transform duration-1000 ease-in-out"
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
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="py-16 px-6 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow hover:shadow-lg transition-shadow duration-300 text-center">
              <img className="w-28 h-28 rounded-full mx-auto mb-4 object-cover" src="https://backend-student-motivation-app-2.onrender.com/static/images/adan.jpeg" alt="Adan" />
              <h3 className="font-semibold text-xl mb-2">Adan Abdullahi</h3>
              <p className="text-gray-600 text-sm">
                A visionary leader focused on integrating tech innovations into educational strategies.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow hover:shadow-lg transition-shadow duration-300 text-center">
              <img className="w-28 h-28 rounded-full mx-auto mb-4 object-cover" src="https://backend-student-motivation-app-2.onrender.com/static/faith.jpeg" alt="Faith" />
              <h3 className="font-semibold text-xl mb-2">Faith Nguli</h3>
              <p className="text-gray-600 text-sm">
                Passionate about creating engaging learning experiences and fostering community connections.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow hover:shadow-lg transition-shadow duration-300 text-center">
              <img className="w-28 h-28 rounded-full mx-auto mb-4 object-cover" src="https://backend-student-motivation-app-2.onrender.com/static/me.jpeg" alt="Abdurizak" />
              <h3 className="font-semibold text-xl mb-2">Abdurizak Abubakar</h3>
              <p className="text-gray-600 text-sm">
                Dedicated to leveraging data-driven insights for personalized education and growth.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
