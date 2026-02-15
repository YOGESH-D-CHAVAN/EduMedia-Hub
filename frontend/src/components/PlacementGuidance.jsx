// PlacementGuidance.jsx - Earthy Theme
import React, { useState, useEffect } from "react";
import { Zap, BookOpen, MessageSquare, Code, Users, Map, X } from 'lucide-react'; 

const guidanceCards = [
  {
    title: "Resume Building",
    description: "Craft a standout resume that passes ATS filters and impresses recruiters.",
    icon: BookOpen,
    color: "#ff8c00",
    action: "Redirecting to Resume Builder...",
    link: "https://novoresume.com/resume-builder" 
  },
  {
    title: "Interview Prep",
    description: "Practice mock interviews, common questions, and body-language tips.",
    icon: MessageSquare,
    color: "#a3b18a",
    action: "Launching Interview Simulator...",
    link: "https://www.pramp.com"
  },
  {
    title: "Aptitude & Logic",
    description: "Sharpen quantitative, logical, and verbal skills with timed quizzes.",
    icon: Zap,
    color: "#d4a373", 
    action: "Starting Aptitude Quiz...",
    link: "https://www.indiabix.com/aptitude/questions-and-answers/"
  },
  {
    title: "Coding Practice",
    description: "Solve top interview problems and optimize time complexity.",
    icon: Code,
    color: "#ff7f11",
    action: "Opening Coding Environment...",
    link: "https://leetcode.com"
  },
  {
    title: "Group Discussion",
    description: "Master GD etiquette, current affairs, and effective communication skills.",
    icon: Users,
    color: "#acbfa4",
    action: "Joining Group Discussion Session...",
    link: "https://gdtopics.com"
  },
  {
    title: "Career Mapping",
    description: "Discover roles that fit your skills and set a clear professional roadmap.",
    icon: Map,
    color: "#e2e8ce",
    action: "Accessing Career Explorer...",
    link: "https://www.careerexplorer.com/careers/"
  },
];

const Notification = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-[#333333] text-[#E2E8CE] px-8 py-4 rounded-full shadow-2xl flex items-center gap-4 animate-slide-down border border-[#444444]">
        <div className="w-8 h-8 rounded-full bg-[#ACFA4] flex items-center justify-center text-[#262626]">
           <Zap className="w-4 h-4 text-[#FF7F11]" fill="currentColor" />
        </div>
        <span className="font-bold text-sm uppercase tracking-wide">{message}</span>
        <button onClick={onClose} className="text-[#666666] hover:text-[#FF7F11] transition">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const DetailModal = ({ card, onClose, triggerNotification }) => {
  if (!card) return null;

  const DetailIcon = card.icon;
  const mockDetails = {
    "Resume Building": "This comprehensive guide provides step-by-step templates, keyword optimization tips, and a powerful list of action verbs to create an ATS-friendly resume. Focus on quantifiable achievements and tailoring your content for specific job descriptions.",
    "Interview Prep": "Access a massive library of behavioral, technical, and system design interview questions. Includes video tutorials on confident body language, handling stress, and effective salary negotiation tactics.",
    "Aptitude & Logic": "Practice hundreds of mock tests covering quantitative aptitude, logical reasoning, and verbal ability, all timed to simulate real exam conditions. Get real-time scoring and detailed solution analysis to track your improvement.",
    "Coding Practice": "A curated, structured learning path of Data Structures and Algorithms problems categorized by complexity (Easy, Medium, Hard). Supports popular languages (Python, Java, C++) and features an integrated debugger.",
    "Group Discussion": "Learn key strategies for contributing effectively in a Group Discussion. Topics cover current affairs, business ethics, and social issues, with tips on leadership, active listening, and conflict resolution.",
    "Career Mapping": "An interactive tool to match your skills, interests, and academic background with potential career tracks (e.g., Software Engineer, Data Scientist, Product Manager). Includes required skill checklists and personalized learning roadmaps.",
  };

  const buttonText = card.title.includes('Quiz') || card.title.includes('Solve') || card.title.includes('Join') ? 'Start Now' : 'Open Resource';
  
  const handlePrimaryAction = () => {
    onClose(); 
    triggerNotification(card.action);
    if (card.link) window.open(card.link, "_blank");
  };

  return (
    <div className="fixed inset-0 bg-[#262626]/90 z-50 flex items-center justify-center p-6 backdrop-blur-sm transition-opacity duration-300 animate-fade-in" onClick={onClose}>
      <div 
        className="bg-[#333333] rounded-[2.5rem] shadow-2xl w-full max-w-2xl transform transition-all duration-300 overflow-hidden border border-[#444444] animate-zoom-in relative" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF7F11]/5 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="p-10 border-b border-[#444444] flex items-center gap-6 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-[#262626] border border-[#444444] flex items-center justify-center text-[#FF7F11] shadow-inner">
             <DetailIcon className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-black text-[#E2E8CE] tracking-tight">{card.title}</h2>
        </div>
        
        <div className="p-10 relative z-10">
          <p className="text-[#ACBFA4] mb-8 leading-relaxed font-medium text-lg">
            {mockDetails[card.title] || "Detailed information unavailable."}
          </p>
          
          <p className="font-bold text-[#E2E8CE] text-xs uppercase tracking-widest mb-4">Action Required:</p>
          
          <div className="p-5 bg-[#262626] rounded-xl text-sm text-[#ACBFA4] border border-[#444444] font-mono shadow-inner">
            {`> ${card.action}`}
          </div>
        </div>
        
        <div className="p-8 flex justify-between bg-[#262626] border-t border-[#444444] relative z-10">
          <button
            onClick={onClose}
            className="text-[#666666] font-bold px-6 py-3 rounded-xl border border-[#444444] hover:bg-[#333333] hover:text-[#E2E8CE] transition uppercase tracking-widest text-xs"
          >
            Cancel
          </button>
          <button
            onClick={handlePrimaryAction} 
            className="text-[#262626] bg-[#FF7F11] px-8 py-3 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-[#e06c09] transition shadow-lg hover:-translate-y-1 active:scale-[0.98]"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

const PlacementGuide = () => {
  const [notification, setNotification] = useState('');
  const [selectedCard, setSelectedCard] = useState(null); 

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(''), 3000); 
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div className="min-h-screen bg-[#262626] py-20 px-6 font-sans relative selection:bg-[#FF7F11] selection:text-[#262626]">
       
       {/* Ambient Backgound */}
       <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[50rem] h-[50rem] bg-[#FF7F11]/5 rounded-full blur-[120px]"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-[#ACBFA4]/5 rounded-full blur-[100px]"></div>
      </div>

      <style jsx global>{`
        @keyframes slide-down {
          0% { transform: translate(-50%, -100%); opacity: 0; }
          100% { transform: translate(-50%, 0); opacity: 1; }
        }
        .animate-slide-down { animation: slide-down 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.4s ease-out forwards; }
        @keyframes zoom-in { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-zoom-in { animation: zoom-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
      
      <Notification message={notification} onClose={() => setNotification('')} />
      <DetailModal card={selectedCard} onClose={() => setSelectedCard(null)} triggerNotification={setNotification} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <div className="inline-block px-4 py-1.5 rounded-full border border-[#444444] bg-[#333333] text-[#ACBFA4] font-bold text-xs uppercase tracking-widest mb-6 shadow-md">
             Career Launchpad
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-[#E2E8CE] tracking-tighter mb-8 drop-shadow-xl">
            PLACEMENT <span className="text-[#FF7F11] relative inline-block">
              ACCELERATOR
              <svg className="absolute w-full h-3 -bottom-2 left-0 text-[#ACBFA4] opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
                 <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span>
          </h1>
          <p className="text-xl text-[#ACBFA4] max-w-3xl mx-auto font-medium leading-relaxed">
            Your structured roadmap to cracking top-tier tech roles.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {guidanceCards.map((card, index) => (
              <div
                key={index}
                onClick={() => setSelectedCard(card)}
                className="group bg-[#333333] rounded-[2rem] border border-[#444444] p-8 hover:border-[#FF7F11] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/10 cursor-pointer relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF7F11]/5 rounded-full blur-[60px] group-hover:bg-[#FF7F11]/10 transition-colors pointer-events-none"></div>

                <div className="w-16 h-16 rounded-2xl bg-[#262626] border border-[#444444] flex items-center justify-center text-[#FF7F11] mb-8 shadow-inner group-hover:scale-110 transition-transform duration-500">
                  <card.icon className="w-8 h-8" />
                </div>
                
                <h3 className="text-2xl font-black text-[#E2E8CE] mb-4 tracking-tight group-hover:text-[#FF7F11] transition-colors">
                  {card.title}
                </h3>
                
                <p className="text-[#ACBFA4] text-lg font-medium leading-relaxed mb-8">
                  {card.description}
                </p>
                
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#666666] group-hover:text-[#FF7F11] transition-colors">
                  <span>Explore Module</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>
              </div>
          ))}
        </div>

        <div className="mt-24 text-center border-t border-[#444444] pt-12">
          <p className="text-[#666666] font-bold text-sm uppercase tracking-widest">
            Expert guidance provided by <span className="text-[#E2E8CE]">EduMedia Tech</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlacementGuide;
