import React from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/images/dance.jpg";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-screen h-screen flex items-center justify-start overflow-hidden">
      {/* Gradient Background (blue → pink) */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-pink-500"></div>

      {/* Image Overlay (on top of gradient) */}
      <img
        src={bgImage}
        alt="Background overlay"
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      />

      {/* Content */}
    { /* <div className="relative z-10 max-w-xl text-white p-10 md:p-20">*/}
    <div className="relative z-10 flex flex-col justify-center items-center text-center text-white px-8">
        <h1 className="text-5xl font-bold mb-4">
          Welcome to BeatMotion
        </h1>
        <p className="text-lg mb-6 leading-relaxed">
          Experience dance like never before — powered by AI and rhythm.
        </p>
        <button
          onClick={() => navigate("/home")}
          className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:bg-blue-100 transition duration-300"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
