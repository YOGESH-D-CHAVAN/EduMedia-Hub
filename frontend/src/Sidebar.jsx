// Sidebar.jsx - Earthy Tone Update with Collapsible State
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight, Menu, LogOut } from "lucide-react";

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
      <div className="sm:hidden fixed top-0 left-0 w-full bg-[#F0F9FF] border-b border-[#FFFFFF] z-50 px-4 py-3 flex justify-between items-center shadow-md h-[74px]">
        <span className="text-lg font-bold text-[#1E3A8A] tracking-tight">
          Edu<span className="text-[#2563EB]">Media</span>
        </span>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-[#475569] p-2 hover:text-[#1E3A8A]"
        >
          {mobileMenuOpen ? <ChevronRight /> : <Menu />}
        </button>
      </div>

      {/* Sidebar Container */}
      <aside className={`
        fixed left-0 top-0 h-screen bg-[#F0F9FF] border-r border-[#FFFFFF] z-50
        transition-all duration-300 ease-in-out flex flex-col shadow-2xl shadow-black/50
        pt-[74px] sm:pt-0
        ${mobileMenuOpen ? "translate-x-0 w-72" : "-translate-x-full w-72"} 
        sm:translate-x-0 ${isOpen ? "sm:w-72" : "sm:w-20"}
      `}>
          
        {/* Desktop Toggle Button */}
        <button 
            onClick={toggleSidebar}
            className="hidden sm:flex absolute -right-3 top-6 w-6 h-6 bg-[#FFFFFF] border border-[#E2E8F0] rounded-full items-center justify-center text-[#475569] hover:text-[#2563EB] hover:border-[#2563EB] transition-colors z-50 shadow-md"
        >
            {isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>

        {/* Logo Section (Desktop) */}
        <div className={`hidden sm:flex px-6 py-8 items-center gap-3 border-b border-[#FFFFFF]/50 ${!isOpen && "justify-center px-2"}`}>
          <div className="w-10 h-10 shrink-0 bg-[#2563EB] rounded-full flex items-center justify-center text-[#F0F9FF] font-bold text-xl shadow-lg shadow-blue-500/20">
            E
          </div>
          <span className={`text-2xl font-extrabold text-[#1E3A8A] tracking-tight whitespace-nowrap overflow-hidden transition-all duration-300 ${isOpen ? "w-auto opacity-100" : "w-0 opacity-0"}`}>
            Edu<span className="text-[#2563EB]">Media</span>
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto hide-scrollbar overflow-x-hidden">
          {isOpen && <p className="px-4 text-xs font-bold text-[#475569] uppercase tracking-widest mb-4 opacity-70 animate-fade-in">Menu</p>}
          
          {routes.map((route) => {
             const isActive = location.pathname === route.path;
             return (
              <Link
                key={route.label}
                to={route.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`group flex items-center gap-3 px-3 py-3.5 rounded-lg border transition-all duration-200 relative ${
                  isActive 
                    ? "bg-[#FFFFFF] border-[#2563EB] text-[#2563EB] shadow-md shadow-blue-900/10" 
                    : "bg-transparent border-transparent text-[#1E3A8A]/80 hover:bg-[#FFFFFF] hover:text-[#1E3A8A]"
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
                      ? "bg-[#2563EB]/10 text-[#2563EB]" 
                      : "bg-[#475569]/20 text-[#475569]"
                  }`}>
                    {route.badge}
                  </span>
                )}
                
                {/* Tooltip for collapsed state */}
                {!isOpen && (
                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-1.5 bg-[#FFFFFF] text-[#1E3A8A] text-xs font-bold rounded shadow-xl border border-[#E2E8F0] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                        {route.label}
                    </div>
                )}
              </Link>
             );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className={`p-4 border-t border-[#FFFFFF] bg-[#222222] ${!isOpen && "flex justify-center"}`}>
           <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#475569] flex items-center justify-center text-[#F0F9FF] font-bold text-xs shrink-0">U</div>
              <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "w-auto opacity-100" : "w-0 opacity-0"}`}>
                 <p className="text-xs font-bold text-[#1E3A8A] whitespace-nowrap">Guest User</p>
                 <p className="text-[10px] text-[#475569] whitespace-nowrap">Basic Plan</p>
              </div>
           </div>
           
           <button 
             onClick={() => {
               localStorage.removeItem("authToken");
               window.location.href = "/";
             }}
             className={`flex items-center gap-3 w-full px-2 py-2 rounded hover:bg-[#FFFFFF] text-[#475569] hover:text-[#2563EB] transition-colors ${!isOpen && "justify-center"}`}
             title="Logout"
           >
              <LogOut size={16} />
              <span className={`text-xs font-bold uppercase tracking-widest transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}>Logout</span>
           </button>
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