// SignIn.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function SignIn() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "student",
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:5001/api/v1/users/loginUser",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
          credentials: "include", 
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      const token = data.data?.accessToken;
      const role = data.data?.user?.role;

      if (!token || !role) {
        throw new Error("Invalid server response");
      }

      localStorage.setItem("authToken", token);
      localStorage.setItem("userRole", role);
      window.dispatchEvent(new Event("authStatusChange"));

      if (role === "student") navigate("/student");
      else if (role === "teacher") navigate("/teacher");
      else if (role === "admin") navigate("/admin");
      else navigate("/unauthorized");
    } catch (err) {
      alert("⚠️ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#262626] text-[#E2E8CE] flex items-center justify-center min-h-screen px-6 py-12 font-sans selection:bg-[#FF7F11] selection:text-[#262626]">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-[#FF7F11]/5 rounded-full blur-[100px]" />
         <div className="absolute bottom-[-10%] left-[-10%] w-[35rem] h-[35rem] bg-[#ACBFA4]/5 rounded-full blur-[80px]" />
      </div>

      <div className="w-full max-w-md bg-[#333333] rounded-[2rem] p-10 border border-[#444444] shadow-2xl relative z-10 animate-fade-in">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="w-16 h-16 bg-[#262626] rounded-2xl mx-auto mb-6 flex items-center justify-center border border-[#444444] shadow-inner">
             <div className="w-8 h-8 rounded-full bg-[#FF7F11]" />
          </div>
          <h2 className="text-3xl font-black text-[#E2E8CE] tracking-tight">
            Welcome <span className="text-[#FF7F11]">Back</span>
          </h2>
          <p className="mt-2 text-sm text-[#ACBFA4] font-medium">
            Sign in to access your dashboard.
          </p>
        </div>

        {/* GOOGLE LOGIN BUTTON */}
        <div className="flex justify-center mb-6">
          <div className="overflow-hidden rounded-lg bg-white p-0.5">
            <GoogleLogin
              onSuccess={(response) => {
                const user = jwtDecode(response.credential);
                localStorage.setItem("googleUser", JSON.stringify(user));
                localStorage.setItem("authToken", response.credential);
                localStorage.setItem("userRole", "student"); 
                window.dispatchEvent(new Event("authStatusChange"));
                navigate("/student");
              }}
              onError={() => {
                alert("Google Login Failed");
              }}
              theme="filled_black"
              shape="pill"
            />
          </div>
        </div>

        <div className="relative mb-8 text-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#444444]"></div></div>
            <div className="relative text-xs uppercase font-bold text-[#666666] bg-[#333333] px-3 inline-block tracking-widest">Or continue with</div>
        </div>

        {/* Normal Email/Password Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-[#ACBFA4] uppercase tracking-widest mb-2 pl-1">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full rounded-xl bg-[#262626] border border-[#444444] px-5 py-4 text-[#E2E8CE] placeholder-[#666666] focus:border-[#FF7F11] focus:ring-1 focus:ring-[#FF7F11] outline-none transition-all font-medium shadow-inner"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-[#ACBFA4] uppercase tracking-widest mb-2 pl-1">
              Secret Key
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPass ? "text" : "password"}
                autoComplete="current-password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full rounded-xl bg-[#262626] border border-[#444444] px-5 py-4 pr-12 text-[#E2E8CE] placeholder-[#666666] focus:border-[#FF7F11] focus:ring-1 focus:ring-[#FF7F11] outline-none transition-all font-medium shadow-inner"
              />
              <button
                type="button"
                onClick={() => setShowPass((s) => !s)}
                className="absolute inset-y-0 right-0 px-4 flex items-center text-[#ACBFA4] hover:text-[#FF7F11] transition text-xs font-bold uppercase tracking-wider"
              >
                {showPass ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Role Selection */}
          <div className="bg-[#262626] rounded-xl p-1.5 border border-[#444444] flex gap-2">
              <button
                type="button"
                onClick={() => setForm({ ...form, role: "student" })}
                className={`flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${
                  form.role === "student"
                    ? "bg-[#FF7F11] text-[#262626] shadow-md"
                    : "text-[#666666] hover:text-[#E2E8CE]"
                }`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => setForm({ ...form, role: "teacher" })}
                className={`flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${
                  form.role === "teacher"
                    ? "bg-[#ACBFA4] text-[#262626] shadow-md"
                    : "text-[#666666] hover:text-[#E2E8CE]"
                }`}
              >
                Teacher
              </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-[#FF7F11] hover:bg-[#e06c09] text-[#262626] font-black text-lg shadow-xl shadow-orange-500/20 active:scale-[0.98] transition-all uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Verifying..." : "Authenticate"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-[#666666] font-bold uppercase tracking-widest">
          New here?{" "}
          <a
            href="/register"
            className="text-[#FF7F11] hover:text-[#E2E8CE] transition-colors underline decoration-2 underline-offset-4"
          >
            Create Account
          </a>
        </p>
      </div>
    </div>
  );
}
