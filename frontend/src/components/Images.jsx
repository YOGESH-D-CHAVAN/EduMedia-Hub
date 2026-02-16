import React from "react";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img4.jpg";
import img3 from "../assets/img3.png";
import img4 from "../assets/img4.jpeg";

const AlternatingImageShowcase = () => {
  // Theme Palette
  const theme = {
    bg: "#F0F9FF", // Dark Grey
    highlight: "#2563EB", // Orange
    accent: "#475569", // Sage
    textPrimary: "#1E3A8A", // Pale Beige
    cardBg: "#FFFFFF", // Lighter Grey
  };

  const items = [
    {
      title: "Publish Blogs & Posts",
      description:
        "Cultivate knowledge by creating rich multimedia content. Share lecture notes, insights, and study materials to help the community grow.",
      image: img1,
      tags: ["Content Creation", "Rich Editor", "Multimedia"],
      link: "/new-post",
    },
    {
      title: "Practice Interview Qs",
      description:
        "Prepare for your next role with our curated database. Filter by subject, view clear answers, and track your readiness naturally.",
      image: img2,
      tags: ["Technical Skills", "System Design", "Practice"],
      link: "/interview-prep",
    },
    {
      title: "Resume Builder",
      description:
        "Craft a professional resume that stands out. Choose from organic templates and download in multiple formats.",
      image: img3,
      tags: ["Templates", "PDF Export", "Career Tools"],
      link: "/resume-builder",
    },
    {
      title: "Expert Discussions",
      description:
        "Engage with teachers and subject matter experts. Deepen understanding through meaningful conversation.",
      image: img4,
      tags: ["Mentorship", "Q&A", "Community"],
      link: "/discover",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#F0F9FF] text-[#1E3A8A] overflow-hidden font-sans selection:bg-[#2563EB] selection:text-[#F0F9FF] py-24">
      
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
      </div>

       {/* Organic Glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-20 -left-20 w-[40rem] h-[40rem] bg-[#2563EB]/10 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-40 -right-20 w-[40rem] h-[40rem] bg-[#475569]/10 rounded-full blur-[100px] animate-pulse-slow delay-1000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-24">
          <div className="inline-block px-4 py-1 rounded-full border border-[#E2E8F0] bg-[#FFFFFF] text-[#475569] text-xs font-bold uppercase tracking-widest mb-6 shadow-lg">
            Core Modules
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-[#1E3A8A] tracking-tighter mb-6 relative z-10">
            System <span className="text-[#2563EB] relative inline-block">
              Features
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#2563EB] opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                 <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="6" fill="none" />
              </svg>
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-[#475569] text-lg font-medium leading-relaxed">
            Essential tools designed to foster learning and development in a unified ecosystem.
          </p>
        </div>

        <div className="space-y-32">
          {items.map((item, index) => (
            <div
              key={index}
              className={`relative flex flex-col md:flex-row gap-16 items-center ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Image Container */}
              <div className="w-full md:w-1/2 relative group">
                {/* Decorative Frame */}
                <div className={`absolute inset-0 rounded-[2.5rem] border-2 border-[#E2E8F0] transform transition-transform duration-500 ${index % 2 === 0 ? 'rotate-3 group-hover:rotate-6' : '-rotate-3 group-hover:-rotate-6'}`}></div>
                
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-[#FFFFFF] border border-[#E2E8F0] group-hover:border-[#2563EB] transition-all duration-500">
                  <div className="absolute inset-0 bg-[#F0F9FF]/20 z-10 group-hover:opacity-0 transition-opacity duration-500"></div>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-[400px] object-cover filter grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  
                   {/* Badge */}
                   <div className="absolute top-6 left-6 z-20 bg-[#FFFFFF]/90 backdrop-blur border border-[#E2E8F0] px-4 py-2 rounded-full text-[#2563EB] font-bold text-xs uppercase tracking-widest shadow-lg">
                      Module 0{index + 1}
                   </div>
                </div>
              </div>

              {/* Text Content */}
              <div className="w-full md:w-1/2 space-y-8 relative">
                 <div className="absolute -left-8 top-0 w-1 h-24 bg-gradient-to-b from-[#2563EB] to-transparent rounded-full opacity-60 hidden md:block"></div>

                <h3 className="text-4xl font-black text-[#1E3A8A] tracking-tight leading-tight group-hover:text-[#2563EB] transition-colors">{item.title}</h3>
                
                <p className="text-[#475569] text-xl leading-relaxed font-medium font-sans border-l-2 md:border-none border-[#E2E8F0] pl-4 md:pl-0">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                  {item.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-5 py-2.5 bg-[#FFFFFF] text-[#1E3A8A] border border-[#E2E8F0] rounded-xl text-xs font-bold uppercase tracking-wider hover:border-[#2563EB] hover:text-[#2563EB] transition-all cursor-default shadow-sm hover:shadow-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlternatingImageShowcase;
