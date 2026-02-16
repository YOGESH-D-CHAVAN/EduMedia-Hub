// HeroCursor.jsx - Earthy Theme
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function HeroCursor() {
  const spotlightRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(600px at ${clientX}px ${clientY}px, rgba(37, 99, 235, 0.15), transparent 80%)`;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#F0F9FF] overflow-hidden font-sans selection:bg-[#2563EB] selection:text-[#F0F9FF]">
      {/* Cursor-tracking spotlight */}
      <div
        ref={spotlightRef}
        className="pointer-events-none fixed inset-0 z-0 transition duration-300"
      />

      {/* Gradient orb (subtle) */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#2563EB]/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#475569]/10 rounded-full blur-[120px] animate-pulse delay-1000" />

      {/* Navbar (glass) */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12">
        <div className="text-2xl font-black text-[#1E3A8A] flex items-center gap-2 tracking-tight">
          <svg className="w-8 h-8 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          EduMedia <span className="text-[#2563EB]">Tech</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-[#475569] font-bold text-sm tracking-wide">
          <a href="#features" className="hover:text-[#2563EB] transition">Features</a>
          <a href="#pricing" className="hover:text-[#2563EB] transition">Pricing</a>
          <a href="#docs" className="hover:text-[#2563EB] transition">Docs</a>
          <Link
            to="/register"
            className="px-6 py-3 rounded-xl bg-[#2563EB] text-[#F0F9FF] hover:bg-[#1D4ED8] transition uppercase tracking-widest text-xs font-black shadow-lg hover:-translate-y-1"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero content */}
      <main className="relative z-10 flex flex-col items-center justify-center px-6 pt-24 pb-32 text-center max-w-5xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-black text-[#1E3A8A] leading-tight tracking-tighter mb-8">
          Learn & Teach{" "}
          <span className="text-[#2563EB] relative inline-block">
            Without Limits
            <svg className="absolute w-full h-4 -bottom-2 left-0 text-[#475569] opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
               <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
            </svg>
          </span>
        </h1>
        <p className="mt-8 max-w-3xl text-xl text-[#475569] font-medium leading-relaxed">
          Upload, share, and discover multimedia educational content secured by JWT and powered by
          Cloudinary & MongoDB—built for creators, students, and institutions.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-6">
          <Link
            to="/register"
            className="px-8 py-4 rounded-xl bg-[#2563EB] text-[#F0F9FF] font-black uppercase tracking-widest text-sm hover:bg-[#1D4ED8] transition transform hover:scale-105 shadow-xl hover:shadow-blue-500/20"
          >
            Start for Free
          </Link>
          <button className="px-8 py-4 rounded-xl border border-[#E2E8F0] text-[#1E3A8A] font-bold uppercase tracking-widest text-sm hover:border-[#2563EB] hover:text-[#2563EB] transition bg-[#FFFFFF]">
            Explore Demo
          </button>
        </div>

        {/* Trusted by strip */}
        <div className="mt-24 w-full border-t border-[#E2E8F0] pt-12">
          <p className="text-[#64748B] text-xs font-black uppercase tracking-widest mb-8">Trusted by educators at</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition duration-500">
            {["boAt", "Google", "Udemy", "Coursera", "Unacademy"].map((brand) => (
              <span key={brand} className="text-2xl font-black text-[#475569]">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}