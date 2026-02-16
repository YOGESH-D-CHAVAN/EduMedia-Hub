// Features.jsx
import React from "react";

export default function Features() {
  const features = [
    {
      title: "JWT-Secured Auth",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      description: "Full security with access + refresh tokens.",
    },
    {
      title: "Role-Based Access",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      description: "Tailored permissions for Students, Teachers & Admins.",
    },
    {
      title: "Rich Content",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      ),
      description: "Upload videos, PDFs, and docs instantly.",
    },
    {
      title: "Cloudinary + MongoDB",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
      description: "Scalable storage for high-performance media.",
    },
    {
      title: "Responsive Design",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      description: "Seamless interface across all devices.",
    },
    {
      title: "Smart Search",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      description: "Find materials instantly with filters.",
    },
  ];

  return (
    <section id="features" className="bg-[#F0F9FF] py-24 font-sans selection:bg-[#2563EB] selection:text-[#F0F9FF] overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-[#2563EB]/5 rounded-full blur-[100px] pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-[#475569]/5 rounded-full blur-[100px] pointer-events-none transform -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Heading */}
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-1.5 rounded-full border border-[#E2E8F0] bg-[#FFFFFF] text-[#475569] font-bold text-xs uppercase tracking-widest mb-6 shadow-md">
             Power Features
          </div>
          <h2 className="text-5xl font-black text-[#1E3A8A] tracking-tighter mb-6 relative inline-block">
            Everything you need.
             <svg className="absolute w-full h-3 -bottom-2 left-0 text-[#2563EB] opacity-80" viewBox="0 0 100 10" preserveAspectRatio="none">
                 <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
          </h2>
          <p className="mt-8 max-w-2xl mx-auto text-[#475569] text-xl font-medium leading-relaxed">
            EduMedia Tech combines security, speed, and simplicity so you can focus on what matters—<strong className="text-[#2563EB]">education</strong>.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group rounded-[2rem] bg-[#FFFFFF] border border-[#E2E8F0] p-8 hover:border-[#2563EB] hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#2563EB]/5 rounded-full blur-[50px] group-hover:bg-[#2563EB]/10 transition-colors pointer-events-none"></div>

              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[#F0F9FF] text-[#2563EB] mb-6 border border-[#E2E8F0] shadow-inner group-hover:scale-110 transition-transform duration-500">
                {f.icon}
              </div>
              <h3 className="text-2xl font-black text-[#1E3A8A] mb-3 group-hover:text-[#2563EB] transition-colors tracking-tight">{f.title}</h3>
              <p className="text-[#475569] font-medium leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-24 text-center">
          <a
            href="/register"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-[#2563EB] text-[#F0F9FF] font-black uppercase tracking-widest text-sm hover:bg-[#1D4ED8] transition-all shadow-xl shadow-blue-500/20 hover:-translate-y-1"
          >
            Start For Free
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}