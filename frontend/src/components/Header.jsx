// Header.jsx - Orange Theme Update
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "unset";
    return () => (document.body.style.overflow = "unset");
  }, [mobileMenuOpen]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    navigate("/");
  };

  const navLinks = [];

  return (
    <header className="sticky top-0 z-50 bg-[#262626]/95 backdrop-blur-lg border-b border-[#333333] font-['Inter'] shadow-2xl shadow-black/40">
      <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl sm:text-2xl font-extrabold text-[#E2E8CE] hover:text-[#FF7F11] transition tracking-tight"
          aria-label="EduMedia Homepage"
        >
          <svg
            className="w-7 h-7 sm:w-8 sm:h-8 text-[#FF7F11]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M13 10V3L4 14h7v7l9-11h-7z" // Lightning bolt or similar dynamic shape
            />
          </svg>
          EduMEDIA
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-[#ACBFA4] hover:text-[#E2E8CE] transition py-2 font-medium text-sm tracking-wide uppercase"
            >
              {link.label}
            </Link>
          ))}

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="px-6 py-2 rounded-full bg-[#FF7F11] text-[#262626] font-bold hover:bg-[#e06c09] hover:text-white transition shadow-lg shadow-orange-500/20 text-sm tracking-wide uppercase"
            >
              Log Out
            </button>
          ) : (
            <Link to="/login">
              <button className="px-6 py-2 rounded-full border border-[#ACBFA4] bg-transparent text-[#ACBFA4] font-bold hover:bg-[#ACBFA4] hover:text-[#262626] transition shadow-sm text-sm tracking-wide uppercase">
                Sign In
              </button>
            </Link>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden relative z-50 text-[#E2E8CE] hover:text-[#FF7F11] transition p-2"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          {mobileMenuOpen ? (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          )}
        </button>

        {/* Mobile Menu Panel */}
        <nav
          className={`absolute top-0 left-0 w-full h-screen bg-[#262626] border-t border-[#333333] transform transition-transform duration-300 ease-out ${
            mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="flex flex-col h-full px-6 pb-8 pt-24 text-center">
             {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-bold text-[#E2E8CE] hover:text-[#FF7F11] py-4 border-b border-[#333333] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="mt-8 flex flex-col gap-4">
                  {isLoggedIn ? (
                    <button onClick={handleLogout} className="w-full py-4 rounded bg-[#FF7F11] text-[#262626] font-bold text-lg uppercase">
                        Disconnect
                    </button>
                  ) : (
                     <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full py-4 rounded border border-[#ACBFA4] text-[#ACBFA4] font-bold text-lg uppercase hover:bg-[#ACBFA4] hover:text-[#262626]">
                        Sign In
                     </Link>
                  )}
              </div>
          </div>
        </nav>
      </div>
    </header>
  );
}