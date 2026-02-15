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
        spotlightRef.current.style.background = `radial-gradient(600px at ${clientX}px ${clientY}px, rgba(255, 127, 17, 0.15), transparent 80%)`;
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
      <div className="relative min-h-screen bg-[#262626] overflow-hidden font-sans selection:bg-[#FF7F11] selection:text-[#262626]">
        
        {/* Cursor Spotlight */}
        <div
          ref={spotlightRef}
          className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
          style={{ background: "transparent" }}
        />

        {/* Textured Background */}
        <div className="absolute inset-0 z-0 opacity-[0.03]" 
             style={{ backgroundImage: 'linear-gradient(#E2E8CE 1px, transparent 1px), linear-gradient(90deg, #E2E8CE 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>

        {/* Organic Blobs */}
        <div className="absolute -top-40 -left-60 w-[50rem] h-[50rem] bg-[#FF7F11]/10 rounded-full blur-[150px] mix-blend-screen animate-pulse-slow max-w-full pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80rem] h-[80rem] bg-[#262626] rounded-full blur-3xl z-10 opacity-80 max-w-full pointer-events-none"></div>
        <div className="absolute -bottom-40 -right-60 w-[50rem] h-[50rem] bg-[#ACBFA4]/10 rounded-full blur-[150px] mix-blend-screen animate-pulse-slow delay-2000 max-w-full pointer-events-none"></div>

        {/* Hero Section */}
        <main className="relative z-20 flex flex-col items-center justify-center px-6 pt-32 pb-24 text-center">
          
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-[#444444] bg-[#333333]/80 text-[#ACBFA4] font-bold uppercase tracking-widest text-xs mb-8 animate-fade-in backdrop-blur-md shadow-lg">
            <span className="w-2 h-2 rounded-full bg-[#FF7F11] shadow-[0_0_8px_#FF7F11]"></span>
            System Live: v3.0 Organic
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-[#E2E8CE] leading-[0.9] tracking-tighter mb-8 max-w-6xl shadow-black drop-shadow-2xl">
            Design. Build. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7F11] to-[#ACBFA4] italic pr-2">
              Cultivate.
            </span>
          </h1>
          
          <p className="mt-6 max-w-3xl text-xl text-[#ACBFA4] leading-relaxed mx-auto font-medium">
            A harmonious ecosystem for <strong className="text-[#E2E8CE]">knowledge sharing</strong> and <strong className="text-[#E2E8CE]">career growth</strong>. 
            Rooted in community, scaling naturally.
          </p>

          <div className="mt-16 flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
            <Link
              to="/register"
              className="px-10 py-5 rounded-full bg-[#FF7F11] text-[#262626] font-black text-lg hover:bg-[#e06c09] transition-all shadow-xl shadow-orange-500/20 hover:-translate-y-1 w-full sm:w-auto uppercase tracking-widest flex items-center justify-center gap-2 group"
            >
              Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/feutures"
              className="px-10 py-5 rounded-full border-2 border-[#444444] bg-[#262626]/50 text-[#E2E8CE] font-bold text-lg hover:bg-[#ACBFA4] hover:text-[#262626] hover:border-[#ACBFA4] transition-all w-full sm:w-auto uppercase tracking-widest backdrop-blur-sm"
            >
              Learn More
            </Link>
          </div>
        </main>

        {/* Stats Section */}
        <section className="relative z-20 container mx-auto px-6 py-20 border-t border-[#333333]">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "Active Learners", value: "10k+", icon: Users },
                { label: "Resources Shared", value: "50k+", icon: BookOpen },
                { label: "Partner Companies", value: "120+", icon: Globe },
                { label: "Career Placements", value: "95%", icon: Trophy }
              ].map((stat, i) => (
                <div key={i} className="text-center p-6 bg-[#333333] rounded-[2rem] border border-[#444444] hover:border-[#FF7F11] transition-all group">
                   <div className="w-12 h-12 bg-[#262626] rounded-full mx-auto mb-4 flex items-center justify-center text-[#ACBFA4] group-hover:text-[#FF7F11] group-hover:scale-110 transition">
                      <stat.icon className="w-6 h-6" />
                   </div>
                   <h3 className="text-4xl font-black text-[#E2E8CE] mb-1">{stat.value}</h3>
                   <p className="text-xs font-bold text-[#666666] uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
           </div>
        </section>

        {/* Features Grid */}
        <section className="relative z-20 container mx-auto px-6 py-32 border-t border-[#333333]">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-[#E2E8CE] tracking-tight mb-4">
              Cultivated Features
            </h2>
            <p className="text-[#ACBFA4] font-medium text-lg max-w-2xl mx-auto">Tools designed to help your potential bloom.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Card 1 */}
            <div className="group bg-[#333333] rounded-[2.5rem] p-10 border border-[#444444] hover:border-[#FF7F11] transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/10 relative overflow-hidden flex flex-col justify-between h-full">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#FF7F11]/5 rounded-full blur-3xl group-hover:bg-[#FF7F11]/10 transition-colors"></div>
              
              <div>
                <div className="w-16 h-16 bg-[#262626] rounded-2xl flex items-center justify-center border border-[#444444] mb-8 shadow-inner group-hover:scale-110 transition-transform duration-500">
                   <svg className="w-8 h-8 text-[#FF7F11]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                </div>
                <h3 className="text-2xl font-black text-[#E2E8CE] mb-4 group-hover:text-[#FF7F11] transition-colors">Resource Garden</h3>
                <p className="text-[#ACBFA4] text-base leading-relaxed mb-6 font-medium">Cultivate your skills with curated learning paths, rich documentation, and interactive modules.</p>
              </div>
              
              <ul className="space-y-3 text-[#E2E8CE] text-sm font-bold tracking-wide">
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#FF7F11]"></span> Courseware Library</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#FF7F11]"></span> Skill Assessment</li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="group bg-[#333333] rounded-[2.5rem] p-10 border border-[#444444] hover:border-[#ACBFA4] transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/10 relative overflow-hidden flex flex-col justify-between h-full">
               <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#ACBFA4]/5 rounded-full blur-3xl group-hover:bg-[#ACBFA4]/10 transition-colors"></div>

              <div>
                <div className="w-16 h-16 bg-[#262626] rounded-2xl flex items-center justify-center border border-[#444444] mb-8 shadow-inner group-hover:scale-110 transition-transform duration-500">
                    <svg className="w-8 h-8 text-[#ACBFA4]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                </div>
                <h3 className="text-2xl font-black text-[#E2E8CE] mb-4 group-hover:text-[#ACBFA4] transition-colors">Community Roots</h3>
                <p className="text-[#ACBFA4] text-base leading-relaxed mb-6 font-medium">Connect with mentors and peers. foster relationships that help you grow professionally.</p>
              </div>

              <ul className="space-y-3 text-[#E2E8CE] text-sm font-bold tracking-wide">
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#ACBFA4]"></span> Mentorship Programs</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#ACBFA4]"></span> Peer Reviews</li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="group bg-[#333333] rounded-[2.5rem] p-10 border border-[#444444] hover:border-[#E2E8CE] transition-all duration-500 hover:shadow-2xl hover:shadow-beige-500/10 relative overflow-hidden flex flex-col justify-between h-full">
               <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#E2E8CE]/5 rounded-full blur-3xl group-hover:bg-[#E2E8CE]/10 transition-colors"></div>

              <div>
                <div className="w-16 h-16 bg-[#262626] rounded-2xl flex items-center justify-center border border-[#444444] mb-8 shadow-inner group-hover:scale-110 transition-transform duration-500">
                    <svg className="w-8 h-8 text-[#E2E8CE]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                </div>
                <h3 className="text-2xl font-black text-[#E2E8CE] mb-4 group-hover:text-[#E2E8CE] transition-colors">Growth Analytics</h3>
                <p className="text-[#ACBFA4] text-base leading-relaxed mb-6 font-medium">Track your progress with organic metrics that focus on sustainable career development.</p>
              </div>

              <ul className="space-y-3 text-[#E2E8CE] text-sm font-bold tracking-wide">
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#E2E8CE]"></span> Career Mapping</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#E2E8CE]"></span> Industry Insights</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Developer Section */}
        <section className="relative z-20 container mx-auto px-6 py-20 border-t border-[#333333]"> 
            <div className="flex flex-col md:flex-row items-center gap-12 bg-[#333333] rounded-[3rem] p-10 md:p-16 border border-[#444444] shadow-2xl overflow-hidden relative">
               <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF7F11]/10 rounded-full blur-[100px] pointer-events-none"></div>
               
               <div className="md:w-1/3 relative z-10">
                  <div className="relative w-64 h-64 mx-auto rounded-full border-4 border-[#FF7F11]/50 shadow-2xl overflow-hidden group">
                     <div className="absolute inset-0 bg-[#FF7F11]/10 z-10 group-hover:opacity-0 transition-opacity duration-500"></div>
                     <img 
                        src={eduImage} 
                        alt="Developer" 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                        onError={(e) => { e.target.src = "https://placehold.co/400x400/333333/E2E8CE?text=Dev"; }}
                     />
                  </div>
               </div>
               
               <div className="md:w-2/3 text-center md:text-left relative z-10">
                  <div className="inline-block px-4 py-1.5 rounded-full border border-[#444444] bg-[#262626] text-[#ACBFA4] font-bold text-xs uppercase tracking-widest mb-6">
                     Meet the Creator
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-[#E2E8CE] tracking-tight mb-6">
                     Yogesh <span className="text-[#FF7F11]">Chavan</span>
                  </h2>
                  <p className="text-xl text-[#ACBFA4] leading-relaxed mb-8 font-medium">
                     Full Stack Developer passionate about merging clean architecture with organic design. Building tools that empower the next generation of learners.
                  </p>
                  
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                     <a href="https://github.com/Yogesh100-design" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#262626] text-[#E2E8CE] border border-[#444444] hover:border-[#FF7F11] hover:text-[#FF7F11] font-bold uppercase tracking-widest text-xs transition-all hover:-translate-y-1">
                        <Github className="w-4 h-4" /> Github
                     </a>
                     <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#262626] text-[#E2E8CE] border border-[#444444] hover:border-[#0077b5] hover:text-[#0077b5] font-bold uppercase tracking-widest text-xs transition-all hover:-translate-y-1">
                        <Linkedin className="w-4 h-4" /> LinkedIn
                     </a>
                     <Link to="/profile" className="px-8 py-3 rounded-full bg-[#FF7F11] text-[#262626] font-black uppercase tracking-widest text-xs hover:bg-[#e06c09] transition-all shadow-lg hover:-translate-y-1">
                        View Portfolio
                     </Link>
                  </div>
               </div>
            </div>
        </section>

        {/* FAQ Section (Expanded Content) */}
        <section className="relative z-20 container mx-auto px-6 py-20 border-t border-[#333333]">
           <h2 className="text-4xl font-black text-[#E2E8CE] text-center mb-16 tracking-tight">Common <span className="text-[#FF7F11]">Queries</span></h2>
           <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                  { q: "Is EduMedia free for students?", a: "Yes, our core learning resources and community features are completely free for verified students." },
                  { q: "How do I become a mentor?", a: "Experienced professionals can apply through our 'Teach' program. We verify credentials to ensure quality guidance." },
                  { q: "Can I share my own content?", a: "Absolutely! We encourage peer-to-peer learning. You can upload blogs, videos, and notes." },
                  { q: "Is my data secure?", a: "We use industry-standard encryption and privacy practices. Your data is yours." }
              ].map((item, i) => (
                  <div key={i} className="bg-[#262626] p-8 rounded-[2rem] border border-[#444444] hover:border-[#ACBFA4] transition group">
                      <h4 className="text-xl font-bold text-[#E2E8CE] mb-3 group-hover:text-[#ACBFA4] transition-colors">{item.q}</h4>
                      <p className="text-[#ACBFA4] font-medium leading-relaxed">{item.a}</p>
                  </div>
              ))}
           </div>
        </section>

        <footer className="py-12 bg-[#222222] border-t border-[#333333] text-center">
             <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-[#FF7F11] flex items-center justify-center font-bold text-[#262626]">E</div>
                <span className="text-xl font-black text-[#E2E8CE] tracking-tight">Edu<span className="text-[#FF7F11]">Media</span></span>
             </div>
            <p className="text-[#ACBFA4] text-xs font-bold uppercase tracking-widest opacity-60">© 2024 Organic Systems. All rights cultivated.</p>
        </footer>
      </div>
    </>
  );
}