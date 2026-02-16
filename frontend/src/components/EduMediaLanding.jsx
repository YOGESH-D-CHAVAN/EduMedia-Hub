// EduMediaLanding.jsx - Earthy Theme with Expanded Content
import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ArrowRight, CheckCircle, Users, BookOpen, Trophy, Globe, MessageCircle, Github, Linkedin, Mail } from "lucide-react";
import eduImage from '../assets/edu.jpg';

export default function EduMediaLandingPro() {
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
    <>
      <Helmet>
        <title>EduMedia - Top Study Platform for Students & Teachers | Free Mock Tests</title>
        <meta name="description" content="EduMedia: Your ultimate study companion. Join for free mock tests, interview preparation, resume building, and a thriving student-teacher community. Excel in your career today!" />
        <meta name="keywords" content="study platform, free education, mock tests, resume builder, interview prep, student community, teacher jobs, career growth, online learning, india education" />
      </Helmet>
      <div className="relative min-h-screen bg-[#F0F9FF] overflow-hidden font-sans selection:bg-[#2563EB] selection:text-[#F0F9FF]">
        
        {/* Cursor Spotlight */}
        <div
          ref={spotlightRef}
          className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
          style={{ background: "transparent" }}
        />

        {/* Textured Background */}
        <div className="absolute inset-0 z-0 opacity-[0.03]" 
             style={{ backgroundImage: 'linear-gradient(#1E3A8A 1px, transparent 1px), linear-gradient(90deg, #1E3A8A 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>

        {/* Organic Blobs */}
        <div className="absolute -top-40 -left-60 w-[50rem] h-[50rem] bg-[#2563EB]/10 rounded-full blur-[150px] mix-blend-screen animate-pulse-slow max-w-full pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80rem] h-[80rem] bg-[#F0F9FF] rounded-full blur-3xl z-10 opacity-80 max-w-full pointer-events-none"></div>
        <div className="absolute -bottom-40 -right-60 w-[50rem] h-[50rem] bg-[#475569]/10 rounded-full blur-[150px] mix-blend-screen animate-pulse-slow delay-2000 max-w-full pointer-events-none"></div>

        {/* Hero Section */}
        <main className="relative z-20 flex flex-col items-center justify-center px-6 pt-32 pb-24 text-center">
          
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-[#E2E8F0] bg-[#FFFFFF]/80 text-[#475569] font-bold uppercase tracking-widest text-xs mb-8 animate-fade-in backdrop-blur-md shadow-lg">
            <span className="w-2 h-2 rounded-full bg-[#2563EB] shadow-[0_0_8px_#2563EB]"></span>
            System Live: v3.0 Organic
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-[#1E3A8A] leading-[0.9] tracking-tighter mb-8 max-w-6xl shadow-black drop-shadow-2xl">
            Design. Build. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#475569] italic pr-2">
              Cultivate.
            </span>
          </h1>
          
          <p className="mt-6 max-w-3xl text-xl text-[#475569] leading-relaxed mx-auto font-medium">
            A harmonious ecosystem for <strong className="text-[#1E3A8A]">knowledge sharing</strong> and <strong className="text-[#1E3A8A]">career growth</strong>. 
            Rooted in community, scaling naturally.
          </p>

          <div className="mt-16 flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
            <Link
              to="/register"
              className="px-10 py-5 rounded-full bg-[#2563EB] text-[#F0F9FF] font-black text-lg hover:bg-[#1D4ED8] transition-all shadow-xl shadow-blue-500/20 hover:-translate-y-1 w-full sm:w-auto uppercase tracking-widest flex items-center justify-center gap-2 group"
            >
              Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/feutures"
              className="px-10 py-5 rounded-full border-2 border-[#E2E8F0] bg-[#F0F9FF]/50 text-[#1E3A8A] font-bold text-lg hover:bg-[#475569] hover:text-[#F0F9FF] hover:border-[#475569] transition-all w-full sm:w-auto uppercase tracking-widest backdrop-blur-sm"
            >
              Learn More
            </Link>
          </div>
        </main>

        {/* Stats Section */}
        <section className="relative z-20 container mx-auto px-6 py-20 border-t border-[#FFFFFF]">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "Active Learners", value: "10k+", icon: Users },
                { label: "Resources Shared", value: "50k+", icon: BookOpen },
                { label: "Partner Companies", value: "120+", icon: Globe },
                { label: "Career Placements", value: "95%", icon: Trophy }
              ].map((stat, i) => (
                <div key={i} className="text-center p-6 bg-[#FFFFFF] rounded-[2rem] border border-[#E2E8F0] hover:border-[#2563EB] transition-all group">
                   <div className="w-12 h-12 bg-[#F0F9FF] rounded-full mx-auto mb-4 flex items-center justify-center text-[#475569] group-hover:text-[#2563EB] group-hover:scale-110 transition">
                      <stat.icon className="w-6 h-6" />
                   </div>
                   <h3 className="text-4xl font-black text-[#1E3A8A] mb-1">{stat.value}</h3>
                   <p className="text-xs font-bold text-[#64748B] uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
           </div>
        </section>

        {/* Features Grid */}
        <section className="relative z-20 container mx-auto px-6 py-32 border-t border-[#FFFFFF]">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-[#1E3A8A] tracking-tight mb-4">
              Cultivated Features
            </h2>
            <p className="text-[#475569] font-medium text-lg max-w-2xl mx-auto">Tools designed to help your potential bloom.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Card 1 */}
            <div className="group bg-[#FFFFFF] rounded-[2.5rem] p-10 border border-[#E2E8F0] hover:border-[#2563EB] transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 relative overflow-hidden flex flex-col justify-between h-full">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#2563EB]/5 rounded-full blur-3xl group-hover:bg-[#2563EB]/10 transition-colors"></div>
              
              <div>
                <div className="w-16 h-16 bg-[#F0F9FF] rounded-2xl flex items-center justify-center border border-[#E2E8F0] mb-8 shadow-inner group-hover:scale-110 transition-transform duration-500">
                   <svg className="w-8 h-8 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                </div>
                <h3 className="text-2xl font-black text-[#1E3A8A] mb-4 group-hover:text-[#2563EB] transition-colors">Resource Garden</h3>
                <p className="text-[#475569] text-base leading-relaxed mb-6 font-medium">Cultivate your skills with curated learning paths, rich documentation, and interactive modules.</p>
              </div>
              
              <ul className="space-y-3 text-[#1E3A8A] text-sm font-bold tracking-wide">
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]"></span> Courseware Library</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]"></span> Skill Assessment</li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="group bg-[#FFFFFF] rounded-[2.5rem] p-10 border border-[#E2E8F0] hover:border-[#475569] transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/10 relative overflow-hidden flex flex-col justify-between h-full">
               <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#475569]/5 rounded-full blur-3xl group-hover:bg-[#475569]/10 transition-colors"></div>

              <div>
                <div className="w-16 h-16 bg-[#F0F9FF] rounded-2xl flex items-center justify-center border border-[#E2E8F0] mb-8 shadow-inner group-hover:scale-110 transition-transform duration-500">
                    <svg className="w-8 h-8 text-[#475569]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                </div>
                <h3 className="text-2xl font-black text-[#1E3A8A] mb-4 group-hover:text-[#475569] transition-colors">Community Roots</h3>
                <p className="text-[#475569] text-base leading-relaxed mb-6 font-medium">Connect with mentors and peers. foster relationships that help you grow professionally.</p>
              </div>

              <ul className="space-y-3 text-[#1E3A8A] text-sm font-bold tracking-wide">
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#475569]"></span> Mentorship Programs</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#475569]"></span> Peer Reviews</li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="group bg-[#FFFFFF] rounded-[2.5rem] p-10 border border-[#E2E8F0] hover:border-[#1E3A8A] transition-all duration-500 hover:shadow-2xl hover:shadow-beige-500/10 relative overflow-hidden flex flex-col justify-between h-full">
               <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#1E3A8A]/5 rounded-full blur-3xl group-hover:bg-[#1E3A8A]/10 transition-colors"></div>

              <div>
                <div className="w-16 h-16 bg-[#F0F9FF] rounded-2xl flex items-center justify-center border border-[#E2E8F0] mb-8 shadow-inner group-hover:scale-110 transition-transform duration-500">
                    <svg className="w-8 h-8 text-[#1E3A8A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                </div>
                <h3 className="text-2xl font-black text-[#1E3A8A] mb-4 group-hover:text-[#1E3A8A] transition-colors">Growth Analytics</h3>
                <p className="text-[#475569] text-base leading-relaxed mb-6 font-medium">Track your progress with organic metrics that focus on sustainable career development.</p>
              </div>

              <ul className="space-y-3 text-[#1E3A8A] text-sm font-bold tracking-wide">
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#1E3A8A]"></span> Career Mapping</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#1E3A8A]"></span> Industry Insights</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Developer Section */}
        <section className="relative z-20 container mx-auto px-6 py-20 border-t border-[#FFFFFF]"> 
            <div className="flex flex-col md:flex-row items-center gap-12 bg-[#FFFFFF] rounded-[3rem] p-10 md:p-16 border border-[#E2E8F0] shadow-2xl overflow-hidden relative">
               <div className="absolute top-0 right-0 w-80 h-80 bg-[#2563EB]/10 rounded-full blur-[100px] pointer-events-none"></div>
               
               <div className="md:w-1/3 relative z-10">
                  <div className="relative w-64 h-64 mx-auto rounded-full border-4 border-[#2563EB]/50 shadow-2xl overflow-hidden group">
                     <div className="absolute inset-0 bg-[#2563EB]/10 z-10 group-hover:opacity-0 transition-opacity duration-500"></div>
                     <img 
                        src={eduImage} 
                        alt="Developer" 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                        onError={(e) => { e.target.src = "https://placehold.co/400x400/333333/E2E8CE?text=Dev"; }}
                     />
                  </div>
               </div>
               
               <div className="md:w-2/3 text-center md:text-left relative z-10">
                  <div className="inline-block px-4 py-1.5 rounded-full border border-[#E2E8F0] bg-[#F0F9FF] text-[#475569] font-bold text-xs uppercase tracking-widest mb-6">
                     Meet the Creator
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-[#1E3A8A] tracking-tight mb-6">
                     Yogesh <span className="text-[#2563EB]">Chavan</span>
                  </h2>
                  <p className="text-xl text-[#475569] leading-relaxed mb-8 font-medium">
                     Full Stack Developer passionate about merging clean architecture with organic design. Building tools that empower the next generation of learners.
                  </p>
                  
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                     <a href="https://github.com/Yogesh100-design" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#F0F9FF] text-[#1E3A8A] border border-[#E2E8F0] hover:border-[#2563EB] hover:text-[#2563EB] font-bold uppercase tracking-widest text-xs transition-all hover:-translate-y-1">
                        <Github className="w-4 h-4" /> Github
                     </a>
                     <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#F0F9FF] text-[#1E3A8A] border border-[#E2E8F0] hover:border-[#0077b5] hover:text-[#0077b5] font-bold uppercase tracking-widest text-xs transition-all hover:-translate-y-1">
                        <Linkedin className="w-4 h-4" /> LinkedIn
                     </a>
                     <Link to="/profile" className="px-8 py-3 rounded-full bg-[#2563EB] text-[#F0F9FF] font-black uppercase tracking-widest text-xs hover:bg-[#1D4ED8] transition-all shadow-lg hover:-translate-y-1">
                        View Portfolio
                     </Link>
                  </div>
               </div>
            </div>
        </section>

        {/* FAQ Section (Expanded Content) */}
        <section className="relative z-20 container mx-auto px-6 py-20 border-t border-[#FFFFFF]">
           <h2 className="text-4xl font-black text-[#1E3A8A] text-center mb-16 tracking-tight">Common <span className="text-[#2563EB]">Queries</span></h2>
           <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                  { q: "Is EduMedia free for students?", a: "Yes, our core learning resources and community features are completely free for verified students." },
                  { q: "How do I become a mentor?", a: "Experienced professionals can apply through our 'Teach' program. We verify credentials to ensure quality guidance." },
                  { q: "Can I share my own content?", a: "Absolutely! We encourage peer-to-peer learning. You can upload blogs, videos, and notes." },
                  { q: "Is my data secure?", a: "We use industry-standard encryption and privacy practices. Your data is yours." }
              ].map((item, i) => (
                  <div key={i} className="bg-[#F0F9FF] p-8 rounded-[2rem] border border-[#E2E8F0] hover:border-[#475569] transition group">
                      <h4 className="text-xl font-bold text-[#1E3A8A] mb-3 group-hover:text-[#475569] transition-colors">{item.q}</h4>
                      <p className="text-[#475569] font-medium leading-relaxed">{item.a}</p>
                  </div>
              ))}
           </div>
        </section>


      </div>
    </>
  );
}