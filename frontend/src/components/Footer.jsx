// Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="mt-auto bg-[#F0F9FF] text-[#475569] border-t border-[#FFFFFF] relative overflow-hidden font-sans">
      {/* Subtle Gradient Glow for background depth */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#2563EB]/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Only EduMedia on the right side */}
        <div className="flex justify-center md:justify-end items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#2563EB] flex items-center justify-center font-bold text-[#F0F9FF]">E</div>
          <h4 className="text-2xl font-black text-[#1E3A8A] tracking-tight">
            EDU<span className="text-[#2563EB]">MEDIA</span>
          </h4>
        </div>
      </div>
    </footer>
  );
}