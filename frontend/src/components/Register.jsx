// Register.jsx - Earthy Theme
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#262626] flex items-center justify-center p-6 font-sans selection:bg-[#FF7F11] selection:text-[#262626] overflow-hidden">
      
      {/* Organic Shapes Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-[#FF7F11]/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[35rem] h-[35rem] bg-[#ACBFA4]/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none animate-pulse-slow delay-1000"></div>

      <div className="w-full max-w-md bg-[#333333] rounded-[2rem] border border-[#444444] shadow-2xl relative z-10 animate-fade-in backdrop-blur-xl">
        
        <div className="p-10 border-b border-[#444444] text-center">
          <div className="w-16 h-16 bg-[#FF7F11] rounded-full mx-auto mb-6 flex items-center justify-center text-3xl font-black text-[#262626] shadow-lg shadow-orange-500/20">
            E
          </div>
          <h2 className="text-3xl font-black text-[#E2E8CE] tracking-tight mb-2">
            Join the <span className="text-[#FF7F11]">Community</span>
          </h2>
          <p className="text-[#ACBFA4] font-medium text-sm">
            Begin your journey with us today.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-6">
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#ACBFA4] uppercase tracking-widest ml-1">Full Name</label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="e.g. Jane Doe"
              className="w-full rounded-xl bg-[#262626] border border-[#444444] px-5 py-4 text-[#E2E8CE] placeholder-[#666666] focus:border-[#FF7F11] focus:ring-1 focus:ring-[#FF7F11] outline-none transition-all font-medium text-lg shadow-inner"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-[#ACBFA4] uppercase tracking-widest ml-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="jane@example.com"
              className="w-full rounded-xl bg-[#262626] border border-[#444444] px-5 py-4 text-[#E2E8CE] placeholder-[#666666] focus:border-[#FF7F11] focus:ring-1 focus:ring-[#FF7F11] outline-none transition-all font-medium text-lg shadow-inner"
            />
          </div>

          <div className="space-y-4 pt-2">
            <label className="text-xs font-bold text-[#ACBFA4] uppercase tracking-widest ml-1">Account Type</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setForm({ ...form, role: "student" })}
                className={`py-3 px-4 rounded-xl border-2 text-sm font-bold uppercase tracking-wide transition-all ${
                  form.role === "student"
                    ? "bg-[#FF7F11] border-[#FF7F11] text-[#262626] shadow-lg shadow-orange-500/20 transform scale-105"
                    : "bg-[#262626] border-[#444444] text-[#ACBFA4] hover:border-[#ACBFA4]"
                }`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => setForm({ ...form, role: "teacher" })}
                className={`py-3 px-4 rounded-xl border-2 text-sm font-bold uppercase tracking-wide transition-all ${
                  form.role === "teacher"
                    ? "bg-[#ACBFA4] border-[#ACBFA4] text-[#262626] shadow-lg shadow-green-900/10 transform scale-105"
                    : "bg-[#262626] border-[#444444] text-[#ACBFA4] hover:border-[#ACBFA4]"
                }`}
              >
                Teacher
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-[#ACBFA4] uppercase tracking-widest ml-1">Password</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full rounded-xl bg-[#262626] border border-[#444444] px-5 py-4 pr-12 text-[#E2E8CE] placeholder-[#666666] focus:border-[#FF7F11] focus:ring-1 focus:ring-[#FF7F11] outline-none transition-all font-medium text-lg shadow-inner"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute inset-y-0 right-0 px-4 text-[#ACBFA4] hover:text-[#FF7F11] text-xs font-bold uppercase tracking-wider transition-colors"
              >
                {showPass ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 py-4 rounded-xl bg-[#FF7F11] text-[#262626] font-black hover:bg-[#e06c09] transition-all shadow-xl shadow-orange-500/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-lg uppercase tracking-widest"
          >
            {loading ? (
              <span className="animate-pulse">Processing...</span>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="p-6 bg-[#262626] border-t border-[#444444] rounded-b-[2rem] text-center">
          <p className="text-sm text-[#ACBFA4] font-medium">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-[#FF7F11] hover:text-[#E2E8CE] hover:underline decoration-2 underline-offset-4 transition-all uppercase tracking-wide ml-1">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
