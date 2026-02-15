// TeacherLoginDashboard.jsx (Post Creation)
import React, { useState } from "react";
import { Upload, X, CheckCircle, AlertTriangle } from "lucide-react";

const API_BASE_URL = "http://localhost:5001";

/* ---------- NOTIFICATIONS ---------- */
const SuccessNotification = ({ message, onClose }) => (
  <div
    onClick={onClose}
    className="fixed inset-0 z-50 bg-[#262626]/80 backdrop-blur-md flex items-start justify-center p-8 animate-fade-in"
  >
    <div className="mt-20 bg-[#333333] border border-[#ACBFA4] rounded-2xl p-6 shadow-2xl shadow-orange-500/10 w-full max-w-md animate-slide-in-down font-sans">
      <div className="flex items-center justify-between">
        {/* Success Icon */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#10B981]/10 flex items-center justify-center text-[#10B981]">
            <CheckCircle className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-[#E2E8CE] tracking-tight">Success!</h3>
        </div>
        <button className="text-[#64748B] hover:text-[#E2E8CE] transition">
          <X className="w-5 h-5" />
        </button>
      </div>
      <p className="mt-3 text-[#ACBFA4] font-medium leading-relaxed">{message}</p>
    </div>
  </div>
);

export default function TeacherPost() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    type: "Announcement",
    audience: "All Students",
    tags: "",
  });
  const [mediaFiles, setMediaFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + mediaFiles.length > 5) {
      setError("Asset limit exceeded (Max 5).");
      return;
    }
    setMediaFiles([...mediaFiles, ...files]);
    setError(null);
  };

  const removeFile = (index) => {
    setMediaFiles(mediaFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("content", formData.content);
      data.append("type", formData.type);
      data.append("audience", formData.audience);
      data.append("tags", formData.tags);

      for (let i = 0; i < mediaFiles.length; i++) {
        data.append("media", mediaFiles[i]);
      }

      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("Please log in to post.");

      const res = await fetch(`${API_BASE_URL}/api/v1/post`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to publish.");

      setMessage("Content successfully distributed.");
      setFormData({
        title: "",
        content: "",
        type: "Announcement",
        audience: "All Students",
        tags: "",
      });
      setMediaFiles([]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#262626] text-[#E2E8CE] font-sans flex items-center justify-center p-6">
      
      {message && <SuccessNotification message={message} onClose={() => setMessage(null)} />}

      <div className="w-full max-w-4xl bg-[#333333] rounded-3xl shadow-2xl border border-[#444444] p-10 sm:p-12 animate-fade-in relative overflow-hidden">
        
        {/* Subtle pattern */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF7F11]/5 rounded-full blur-[80px] pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>
        
        <header className="relative z-10 mb-10 pb-6 border-b border-[#444444]">
          <h1 className="text-4xl font-black text-[#E2E8CE] tracking-tight mb-2">
            Create <span className="text-[#FF7F11]">New Post</span>
          </h1>
          <p className="text-[#ACBFA4] font-medium text-lg">
            Update your community with fresh content.
          </p>
        </header>

        {error && (
          <div className="bg-[#450a0a] border border-[#7f1d1d] text-[#fca5a5] px-6 py-4 rounded-xl mb-8 font-bold flex items-center gap-3 shadow-lg">
            <AlertTriangle className="w-5 h-5" />
            <span>ERROR: {error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-[#ACBFA4] uppercase tracking-widest mb-3">
                Headline
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Ex: Mid-Term Project Brief"
                required
                className="w-full px-5 py-4 rounded-xl bg-[#262626] border border-[#444444] text-[#E2E8CE] placeholder-[#666666] focus:border-[#FF7F11] focus:ring-1 focus:ring-[#FF7F11] outline-none transition-all font-bold text-lg shadow-inner"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-xs font-bold text-[#ACBFA4] uppercase tracking-widest mb-3">Topic Tags</label>
              <input
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="Ex: #design, #urgent"
                className="w-full px-5 py-4 rounded-xl bg-[#262626] border border-[#444444] text-[#E2E8CE] placeholder-[#666666] focus:border-[#FF7F11] outline-none font-medium text-lg shadow-inner"
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-xs font-bold text-[#ACBFA4] uppercase tracking-widest mb-3">
              Description / Body
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="What's on your mind?"
              rows="6"
              required
              className="w-full px-5 py-4 rounded-xl bg-[#262626] border border-[#444444] text-[#E2E8CE] placeholder-[#666666] focus:border-[#FF7F11] focus:ring-1 focus:ring-[#FF7F11] outline-none transition-all text-base leading-relaxed resize-none shadow-inner"
            />
          </div>

          {/* Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-xs font-bold text-[#ACBFA4] uppercase tracking-widest mb-3">Format</label>
              <div className="relative">
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-xl bg-[#262626] border border-[#444444] text-[#E2E8CE] focus:border-[#FF7F11] outline-none cursor-pointer appearance-none font-bold"
                >
                  <option>Announcement</option>
                  <option>Resource</option>
                  <option>Question</option>
                  <option>Activity</option>
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-[#ACBFA4]">▼</div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#ACBFA4] uppercase tracking-widest mb-3">Distribution</label>
              <div className="relative">
                <select
                  name="audience"
                  value={formData.audience}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-xl bg-[#262626] border border-[#444444] text-[#E2E8CE] focus:border-[#FF7F11] outline-none cursor-pointer appearance-none font-bold"
                >
                  <option>All Students</option>
                  <option>CS Dept</option>
                  <option>EE Dept</option>
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-[#ACBFA4]">▼</div>
              </div>
            </div>
          </div>

          {/* File Upload Area */}
          <div
            className="border-2 border-dashed border-[#444444] bg-[#262626]/50 hover:bg-[#262626] hover:border-[#FF7F11] transition-all p-10 rounded-2xl flex flex-col items-center justify-center cursor-pointer group shadow-inner"
            onClick={() => document.getElementById("fileInput").click()}
          >
            <div className="bg-[#333333] p-4 rounded-full mb-4 group-hover:scale-110 transition-transform shadow-xl shadow-orange-500/10">
              <Upload className="w-8 h-8 text-[#FF7F11]" />
            </div>
            <label className="text-lg font-bold text-[#CBFA4] group-hover:text-[#E2E8CE] cursor-pointer transition-colors">
              Drop Assets Here
            </label>
            <p className="text-sm text-[#666666] mt-2 font-medium bg-[#262626] px-3 py-1 rounded-full border border-[#333333]">Max 5 Files (JPG, MP4, PDF)</p>
            <input
              id="fileInput"
              type="file"
              multiple
              accept="image/*,video/*,application/pdf"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {/* File Preview Chips */}
          {mediaFiles.length > 0 && (
            <div className="flex flex-wrap gap-3 p-4 bg-[#262626] rounded-xl border border-[#444444]">
              {mediaFiles.map((file, idx) => (
                <div key={idx} className="bg-[#333333] border border-[#555555] pl-3 pr-2 py-1.5 rounded-lg text-xs font-bold text-[#ACBFA4] flex items-center gap-2 shadow-sm">
                  <span className="truncate max-w-[120px]">{file.name}</span>
                  <button onClick={() => removeFile(idx)} className="text-[#64748B] hover:text-[#FF7F11] bg-[#262626] rounded-full p-0.5 transition-colors">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Submit Action */}
          <button
            type="submit"
            disabled={loading || !formData.title || !formData.content}
            className="w-full py-5 rounded-2xl bg-[#FF7F11] hover:bg-[#e06c09] text-[#262626] font-black text-xl shadow-xl shadow-orange-500/20 active:translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 uppercase tracking-widest"
          >
            {loading ? (
              <span className="animate-pulse">Broadcasting...</span>
            ) : (
              "Publish Content"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
