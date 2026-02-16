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

    try {
        const res = await fetch("http://localhost:5001/api/v1/users/registerUser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: form.fullName, // Map fullName to username
                email: form.email.trim(),
                password: form.password,
                role: form.role
            })
        });

        const data = await res.json();
        
        if (res.ok) {
            alert("Registration successful! Please login.");
            navigate("/login");
        } else {
            alert(data.message || "Registration failed");
        }
    } catch (error) {
        console.error("Registration error:", error);
        alert("An error occurred during registration. Please try again.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F9FF] flex items-center justify-center p-6 font-sans selection:bg-[#2563EB] selection:text-[#F0F9FF] overflow-hidden">
      
      {/* Organic Shapes Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-[#2563EB]/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[35rem] h-[35rem] bg-[#475569]/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none animate-pulse-slow delay-1000"></div>

      <div className="w-full max-w-md bg-[#FFFFFF] rounded-[2rem] border border-[#E2E8F0] shadow-2xl relative z-10 animate-fade-in backdrop-blur-xl">
        
        <div className="p-10 border-b border-[#E2E8F0] text-center">
          <div className="w-16 h-16 bg-[#2563EB] rounded-full mx-auto mb-6 flex items-center justify-center text-3xl font-black text-[#F0F9FF] shadow-lg shadow-blue-500/20">
            E
          </div>
          <h2 className="text-3xl font-black text-[#1E3A8A] tracking-tight mb-2">
            Join the <span className="text-[#2563EB]">Community</span>
          </h2>
          <p className="text-[#475569] font-medium text-sm">
            Begin your journey with us today.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-6">
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#475569] uppercase tracking-widest ml-1">Full Name</label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="e.g. Jane Doe"
              className="w-full rounded-xl bg-[#F0F9FF] border border-[#E2E8F0] px-5 py-4 text-[#1E3A8A] placeholder-[#64748B] focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] outline-none transition-all font-medium text-lg shadow-inner"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-[#475569] uppercase tracking-widest ml-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="jane@example.com"
              className="w-full rounded-xl bg-[#F0F9FF] border border-[#E2E8F0] px-5 py-4 text-[#1E3A8A] placeholder-[#64748B] focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] outline-none transition-all font-medium text-lg shadow-inner"
            />
          </div>

          <div className="space-y-4 pt-2">
            <label className="text-xs font-bold text-[#475569] uppercase tracking-widest ml-1">Account Type</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setForm({ ...form, role: "student" })}
                className={`py-3 px-4 rounded-xl border-2 text-sm font-bold uppercase tracking-wide transition-all ${
                  form.role === "student"
                    ? "bg-[#2563EB] border-[#2563EB] text-[#F0F9FF] shadow-lg shadow-blue-500/20 transform scale-105"
                    : "bg-[#F0F9FF] border-[#E2E8F0] text-[#475569] hover:border-[#475569]"
                }`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => setForm({ ...form, role: "teacher" })}
                className={`py-3 px-4 rounded-xl border-2 text-sm font-bold uppercase tracking-wide transition-all ${
                  form.role === "teacher"
                    ? "bg-[#475569] border-[#475569] text-[#F0F9FF] shadow-lg shadow-green-900/10 transform scale-105"
                    : "bg-[#F0F9FF] border-[#E2E8F0] text-[#475569] hover:border-[#475569]"
                }`}
              >
                Teacher
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-[#475569] uppercase tracking-widest ml-1">Password</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full rounded-xl bg-[#F0F9FF] border border-[#E2E8F0] px-5 py-4 pr-12 text-[#1E3A8A] placeholder-[#64748B] focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] outline-none transition-all font-medium text-lg shadow-inner"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute inset-y-0 right-0 px-4 text-[#475569] hover:text-[#2563EB] text-xs font-bold uppercase tracking-wider transition-colors"
              >
                {showPass ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 py-4 rounded-xl bg-[#2563EB] text-[#F0F9FF] font-black hover:bg-[#1D4ED8] transition-all shadow-xl shadow-blue-500/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-lg uppercase tracking-widest"
          >
            {loading ? (
              <span className="animate-pulse">Processing...</span>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="p-6 bg-[#F0F9FF] border-t border-[#E2E8F0] rounded-b-[2rem] text-center">
          <p className="text-sm text-[#475569] font-medium">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-[#2563EB] hover:text-[#1E3A8A] hover:underline decoration-2 underline-offset-4 transition-all uppercase tracking-wide ml-1">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
