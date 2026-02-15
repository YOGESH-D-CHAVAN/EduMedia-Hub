// Sidebar.jsx - Earthy Tone Update with Collapsible State
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight, Menu } from "lucide-react";

const SideBar = ({ isOpen = true, toggleSidebar }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const routes = [
    { label: "Interview Questions", path: "/interview-questions", icon: "💬", badge: "Hot" },
    { label: "Placement Guidance", path: "/placement-guidance", icon: "✨" },
    { label: "Resources", path: "/resources", icon: "📚" },
    { label: "Resume Builder", path: "/resume-builder", icon: "📝", badge: "New" },
    { label: "Mock Tests", path: "/mock-tests", icon: "📝" },
    { label: "Career Blogs", path: "/career-blogs", icon: "🌟" },
    { label: "Company Reviews", path: "/company-reviews", icon: "🏢" },
    { label: "Salary Insights", path: "/salary-insights", icon: "💰" },
    { label: "EduQ&A", path: "/EduQ&A", icon: "❓" },
  ];

  return (
    <>
      <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>
      
      {/* Mobile Header Toggle */}
      <div className="sm:hidden fixed top-0 left-0 w-full bg-[#262626] border-b border-[#333333] z-50 px-4 py-3 flex justify-between items-center shadow-md h-[74px]">
        <span className="text-lg font-bold text-[#E2E8CE] tracking-tight">
          Edu<span className="text-[#FF7F11]">Media</span>
        </span>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-[#ACBFA4] p-2 hover:text-[#E2E8CE]"
        >
          {mobileMenuOpen ? <ChevronRight /> : <Menu />}
        </button>
      </div>

      {/* Sidebar Container */}
      <aside className={`
        fixed left-0 top-[74px] h-[calc(100vh-74px)] bg-[#262626] border-r border-[#333333] z-40
        transition-all duration-300 ease-in-out flex flex-col shadow-2xl shadow-black/50
        ${mobileMenuOpen ? "translate-x-0 w-72" : "-translate-x-full w-72"} 
        sm:translate-x-0 sm:top-0 sm:h-screen ${isOpen ? "sm:w-72" : "sm:w-20"}
      `}>
          
        {/* Desktop Toggle Button */}
        <button 
            onClick={toggleSidebar}
            className="hidden sm:flex absolute -right-3 top-6 w-6 h-6 bg-[#333333] border border-[#444444] rounded-full items-center justify-center text-[#ACBFA4] hover:text-[#FF7F11] hover:border-[#FF7F11] transition-colors z-50 shadow-md"
        >
            {isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>

        {/* Logo Section (Desktop) */}
        <div className={`hidden sm:flex px-6 py-8 items-center gap-3 border-b border-[#333333]/50 ${!isOpen && "justify-center px-2"}`}>
          <div className="w-10 h-10 shrink-0 bg-[#FF7F11] rounded-full flex items-center justify-center text-[#262626] font-bold text-xl shadow-lg shadow-orange-500/20">
            E
          </div>
          <span className={`text-2xl font-extrabold text-[#E2E8CE] tracking-tight whitespace-nowrap overflow-hidden transition-all duration-300 ${isOpen ? "w-auto opacity-100" : "w-0 opacity-0"}`}>
            Edu<span className="text-[#FF7F11]">Media</span>
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto hide-scrollbar overflow-x-hidden">
          {isOpen && <p className="px-4 text-xs font-bold text-[#ACBFA4] uppercase tracking-widest mb-4 opacity-70 animate-fade-in">Menu</p>}
          
          {routes.map((route) => {
             const isActive = location.pathname === route.path;
             return (
              <Link
                key={route.label}
                to={route.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`group flex items-center gap-3 px-3 py-3.5 rounded-lg border transition-all duration-200 relative ${
                  isActive 
                    ? "bg-[#333333] border-[#FF7F11] text-[#FF7F11] shadow-md shadow-orange-900/10" 
                    : "bg-transparent border-transparent text-[#E2E8CE]/80 hover:bg-[#333333] hover:text-[#E2E8CE]"
                } ${!isOpen && "justify-center"}`}
              >
                <div className={`text-xl transition-transform duration-300 shrink-0 ${isActive ? 'scale-110' : 'group-hover:scale-110 grayscale group-hover:grayscale-0'}`}>
                  {route.icon}
                </div>
                
                <span className={`text-sm font-semibold tracking-wide whitespace-nowrap overflow-hidden transition-all duration-300 ${isOpen ? "w-auto opacity-100" : "w-0 opacity-0 absolute"}`}>
                    {route.label}
                </span>

                {route.badge && isOpen && (
                  <span className={`px-2 py-0.5 text-[10px] rounded font-bold uppercase tracking-wider ml-auto ${
                    isActive 
                      ? "bg-[#FF7F11]/10 text-[#FF7F11]" 
                      : "bg-[#ACBFA4]/20 text-[#ACBFA4]"
                  }`}>
                    {route.badge}
                  </span>
                )}
                
                {/* Tooltip for collapsed state */}
                {!isOpen && (
                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-1.5 bg-[#333333] text-[#E2E8CE] text-xs font-bold rounded shadow-xl border border-[#444444] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                        {route.label}
                    </div>
                )}
              </Link>
             );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className={`p-4 border-t border-[#333333] bg-[#222222] ${!isOpen && "flex justify-center"}`}>
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#ACBFA4] flex items-center justify-center text-[#262626] font-bold text-xs shrink-0">U</div>
              <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "w-auto opacity-100" : "w-0 opacity-0"}`}>
                 <p className="text-xs font-bold text-[#E2E8CE] whitespace-nowrap">Guest User</p>
                 <p className="text-[10px] text-[#ACBFA4] whitespace-nowrap">Basic Plan</p>
              </div>
           </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-30 sm:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default SideBar;