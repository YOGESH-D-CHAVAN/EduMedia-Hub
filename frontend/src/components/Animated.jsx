// HeroCursor.jsx - Earthy Theme
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function HeroCursor() {
  const spotlightRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(600px at ${clientX}px ${clientY}px, rgba(255, 127, 17, 0.15), transparent 80%)`;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#262626] overflow-hidden font-sans selection:bg-[#FF7F11] selection:text-[#262626]">
      {/* Cursor-tracking spotlight */}
      <div
        ref={spotlightRef}
        className="pointer-events-none fixed inset-0 z-0 transition duration-300"
      />

      {/* Gradient orb (subtle) */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#FF7F11]/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#ACBFA4]/10 rounded-full blur-[120px] animate-pulse delay-1000" />

      {/* Navbar (glass) */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12">
        <div className="text-2xl font-black text-[#E2E8CE] flex items-center gap-2 tracking-tight">
          <svg className="w-8 h-8 text-[#FF7F11]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          EduMedia <span className="text-[#FF7F11]">Tech</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-[#ACBFA4] font-bold text-sm tracking-wide">
          <a href="#features" className="hover:text-[#FF7F11] transition">Features</a>
          <a href="#pricing" className="hover:text-[#FF7F11] transition">Pricing</a>
          <a href="#docs" className="hover:text-[#FF7F11] transition">Docs</a>
          <Link
            to="/register"
            className="px-6 py-3 rounded-xl bg-[#FF7F11] text-[#262626] hover:bg-[#e06c09] transition uppercase tracking-widest text-xs font-black shadow-lg hover:-translate-y-1"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero content */}
      <main className="relative z-10 flex flex-col items-center justify-center px-6 pt-24 pb-32 text-center max-w-5xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-black text-[#E2E8CE] leading-tight tracking-tighter mb-8">
          Learn & Teach{" "}
          <span className="text-[#FF7F11] relative inline-block">
            Without Limits
            <svg className="absolute w-full h-4 -bottom-2 left-0 text-[#ACBFA4] opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
               <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
            </svg>
          </span>
        </h1>
        <p className="mt-8 max-w-3xl text-xl text-[#ACBFA4] font-medium leading-relaxed">
          Upload, share, and discover multimedia educational content secured by JWT and powered by
          Cloudinary & MongoDB—built for creators, students, and institutions.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-6">
          <Link
            to="/register"
            className="px-8 py-4 rounded-xl bg-[#FF7F11] text-[#262626] font-black uppercase tracking-widest text-sm hover:bg-[#e06c09] transition transform hover:scale-105 shadow-xl hover:shadow-orange-500/20"
          >
            Start for Free
          </Link>
          <button className="px-8 py-4 rounded-xl border border-[#444444] text-[#E2E8CE] font-bold uppercase tracking-widest text-sm hover:border-[#FF7F11] hover:text-[#FF7F11] transition bg-[#333333]">
            Explore Demo
          </button>
        </div>

        {/* Trusted by strip */}
        <div className="mt-24 w-full border-t border-[#444444] pt-12">
          <p className="text-[#666666] text-xs font-black uppercase tracking-widest mb-8">Trusted by educators at</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition duration-500">
            {["boAt", "Google", "Udemy", "Coursera", "Unacademy"].map((brand) => (
              <span key={brand} className="text-2xl font-black text-[#ACBFA4]">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}