// CarrerBlogWrite.jsx - Earthy Theme
import React, { useState, useEffect } from "react";
import { Upload, Eye, EyeOff, Save, Loader, User, CheckCircle, AlertTriangle, Info } from "lucide-react";

// --- Message Toast ---
const MessageToast = ({ message, type }) => {
  if (!message) return null;

  const baseClasses = "fixed bottom-5 right-5 p-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 transition-transform duration-300 transform animate-fade-in border border-[#ACBFA4]/20 font-medium";
  let styleClasses = "";
  let Icon = Info;

  switch (type) {
    case 'success':
      styleClasses = "bg-[#333333] text-[#ACBFA4] border-[#ACBFA4]";
      Icon = CheckCircle;
      break;
    case 'error':
      styleClasses = "bg-[#450a0a] text-[#FF7F11] border-[#FF7F11]";
      Icon = AlertTriangle;
      break;
    case 'info':
    default:
      styleClasses = "bg-[#262626] text-[#E2E8CE] border-[#E2E8CE]";
      Icon = Info;
      break;
  }

  return (
    <div className={`${baseClasses} ${styleClasses}`}>
      <Icon className="w-5 h-5" />
      <span className="font-sans text-sm tracking-wide">{message}</span>
    </div>
  );
};

export default function BlogWriter() {
  const [title, setTitle] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [tags, setTags] = useState("");
  const [cover, setCover] = useState("");
  const [preview, setPreview] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [localUserId] = useState(localStorage.getItem('localUserId') || crypto.randomUUID());

  useEffect(() => {
    if (!localStorage.getItem('localUserId')) localStorage.setItem('localUserId', localUserId);
  }, [localUserId]);

  useEffect(() => {
    const raw = localStorage.getItem(`blog-draft-${localUserId}`);
    if (raw) {
      try {
        const d = JSON.parse(raw);
        setTitle(d.title || "");
        setMarkdown(d.markdown || "");
        setTags(d.tags || "");
        setCover(d.cover || "");
        setMessage({ type: 'info', text: 'Draft loaded automatically.' });
      } catch (e) {
        console.error(e);
      }
    }
    setTimeout(() => setMessage(null), 3000);
  }, [localUserId]);

  useEffect(() => {
    if (!title.trim() && !markdown.trim()) return;

    const t = setInterval(() => {
      const payload = { title, markdown, tags, cover, last_saved: new Date().toISOString() };
      try {
        localStorage.setItem(`blog-draft-${localUserId}`, JSON.stringify(payload));
        setSaved(true);
      } catch (e) {
        console.error(e);
      } finally {
        setIsSaving(false);
        setTimeout(() => setSaved(false), 1500);
      }
    }, 5000);

    return () => clearInterval(t);
  }, [title, markdown, tags, cover, localUserId]);

  const uploadCover = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setCover(ev.target.result);
    reader.readAsDataURL(file);
  };

  const renderMD = (md) =>
    md
      .replace(/^### (.*$)/gim, "<h3 class='text-xl font-bold mt-6 mb-3 text-[#FF7F11] font-serif'>$1</h3>")
      .replace(/^## (.*$)/gim, "<h2 class='text-2xl font-black mt-8 mb-4 text-[#E2E8CE] border-b border-[#ACBFA4]/20 pb-2 font-serif'>$1</h2>")
      .replace(/^# (.*$)/gim, "<h1 class='text-4xl font-black mb-6 text-[#E2E8CE] tracking-tight font-serif'>$1</h1>")
      .replace(/\*\*(.+)\*\*/g, "<strong class='font-bold text-[#FF7F11]'>$1</strong>")
      .replace(/\*(.+)\*/g, "<em class='italic text-[#ACBFA4] font-serif'>$1</em>")
      .replace(/!\[([^\]]+)\]\(([^)]+)\)/g, "<img alt='$1' src='$2' class='rounded-2xl my-8 max-w-full border border-[#444444] shadow-xl' onerror=\"this.onerror=null;this.src='https://placehold.co/600x400?text=Image+Error'\" />")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "<a href='$2' target='_blank' class='text-[#ACBFA4] hover:text-[#FF7F11] underline decoration-[#FF7F11] underline-offset-4 transition-colors'>$1</a>")
      .replace(/\`(.+)\`/g, "<code class='bg-[#333333] text-[#FF7F11] px-1.5 py-0.5 rounded text-sm font-mono border border-[#444444]'>$1</code>")
      .replace(/```(\w+)?\n([\s\S]+?)\n```/g, "<pre class='bg-[#1a1a1a] text-[#E2E8CE] p-6 rounded-2xl overflow-auto my-8 border border-[#333333] shadow-inner font-mono text-sm leading-relaxed'><code class='language-$1'>$2</code></pre>")
      .replace(/^- (.+)$/gim, "<li class='ml-6 list-disc text-[#E2E8CE]/80 my-2 marker:text-[#FF7F11]'>$1</li>")
      .replace(/^\d+\. (.+)$/gim, "<li class='ml-6 list-decimal text-[#E2E8CE]/80 my-2 marker:text-[#FF7F11] font-bold'>$1</li>")
      .replace(/\n/g, "<br />");

  const publish = async () => {
    if (!title.trim() || !markdown.trim()) {
      setMessage({ type: 'error', text: "Please fill in content before publishing." });
      return setTimeout(() => setMessage(null), 3000);
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("markdown", markdown);
    formData.append("author", `User-${localUserId.substring(0, 4)}`);
    formData.append("tags", tags);

    if (cover && cover.startsWith("data:")) {
      const res = await fetch(cover);
      const blob = await res.blob();
      formData.append("cover", blob, "cover.jpg");
    }

    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch("http://localhost:5001/api/v1/createblog", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to publish blog");

      setMessage({ type: 'success', text: "Published successfully!" });
      setTitle(""); setMarkdown(""); setTags(""); setCover("");
      localStorage.removeItem(`blog-draft-${localUserId}`);
      
      // Dispatch event to update blog list
      window.dispatchEvent(new Event('blogUpdated'));
      
      // Redirect after a short delay to see the success message
      setTimeout(() => {
          window.location.href = "/career-blogs";
      }, 1500);

    } catch (e) {
      console.error(e);
      setMessage({ type: 'error', text: e.message || "Publish failed." });
    } finally {
      if(!saved) setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#262626] text-[#E2E8CE] py-10 px-6 font-sans selection:bg-[#FF7F11] selection:text-[#262626]">
      
      <header className="max-w-7xl mx-auto mb-10 flex justify-between items-end border-b border-[#333333] pb-6 animate-fade-in">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-[#E2E8CE]">
            Story<span className="text-[#FF7F11]">teller</span>
          </h1>
          <p className="text-[#ACBFA4] font-medium text-sm mt-2">Craft your narrative.</p>
        </div>

        <div className="flex items-center gap-6">
           <span className={`text-xs font-bold uppercase tracking-widest flex items-center gap-2 ${saved ? 'text-[#10B981]' : 'text-[#64748B]'}`}>
              {isSaving ? <Loader className="w-4 h-4 animate-spin text-[#FF7F11]"/> : <Save className="w-4 h-4"/>}
              {isSaving ? "Saving..." : (saved ? "Saved" : "Unsaved")}
            </span>
            <div className="h-6 w-px bg-[#444444]"></div>
            <button
              onClick={publish}
              className="px-8 py-3 rounded-full bg-[#FF7F11] text-[#262626] font-black text-sm uppercase tracking-widest shadow-xl shadow-orange-500/20 hover:bg-[#e06c09] hover:-translate-y-1 transition-all"
            >
              Publish
            </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 h-[calc(100vh-200px)]">
        {/* Left - Editor */}
        <div className="flex flex-col gap-6 h-full">
          
          <div className="bg-[#333333] rounded-3xl p-6 border border-[#444444] space-y-6 shadow-2xl relative overflow-hidden">
             
            <div>
              <label className="block text-xs font-black text-[#ACBFA4] uppercase tracking-widest mb-2">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="The Art of Storytelling..."
                className="w-full px-4 py-3 rounded-xl bg-[#262626] border border-[#444444] text-[#E2E8CE] placeholder-[#666666] focus:border-[#FF7F11] focus:ring-1 focus:ring-[#FF7F11] outline-none transition-all font-serif font-bold text-2xl shadow-inner"
              />
            </div>
            
            <div>
              <label className="block text-xs font-black text-[#ACBFA4] uppercase tracking-widest mb-2">Cover Image</label>
              <label className="flex items-center gap-4 cursor-pointer bg-[#262626] hover:bg-[#222] p-4 rounded-xl border-2 border-dashed border-[#444444] hover:border-[#FF7F11] transition-all group shadow-inner">
                <div className="p-2 bg-[#333333] rounded-full group-hover:scale-110 transition-transform">
                   <Upload className="w-5 h-5 text-[#FF7F11]" />
                </div>
                <span className="text-[#64748B] text-sm group-hover:text-[#E2E8CE] font-bold uppercase tracking-wide">{cover ? "Replace Image" : "Upload Cover"}</span>
                <input type="file" accept="image/*" onChange={uploadCover} className="hidden" />
              </label>
            </div>
            {cover && <img src={cover} alt="cover" className="w-full h-40 object-cover rounded-xl border border-[#444444] shadow-lg" />}
            
            <div>
               <label className="block text-xs font-black text-[#ACBFA4] uppercase tracking-widest mb-2">Tags (comma separated)</label>
               <input
                 value={tags}
                 onChange={(e) => setTags(e.target.value)}
                 placeholder="tech, design, future..."
                 className="w-full px-4 py-3 rounded-xl bg-[#262626] border border-[#444444] text-[#E2E8CE] placeholder-[#666666] focus:border-[#FF7F11] focus:ring-1 focus:ring-[#FF7F11] outline-none transition-all font-medium text-sm shadow-inner"
               />
            </div>
          </div>

          <div className="flex-1 bg-[#333333] rounded-3xl border border-[#444444] p-1 shadow-2xl flex flex-col relative group">
            <div className="absolute top-4 right-4 z-10 opacity-50 group-hover:opacity-100 transition-opacity">
               <span className="bg-[#262626] text-[#ACBFA4] text-[10px] font-black tracking-widest px-3 py-1 rounded-full border border-[#444444]">MARKDOWN</span>
            </div>
            <textarea
              id="md-editor"
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder="# Introduction..."
              className="w-full h-full p-8 rounded-[1.4rem] bg-[#333333] text-[#E2E8CE] placeholder-[#555555] outline-none font-mono text-sm leading-relaxed resize-none scrollbar-hide"
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              onClick={() => setPreview((p) => !p)}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#262626] border border-[#444444] text-[#E2E8CE] hover:text-[#FF7F11] hover:border-[#FF7F11] transition-all text-xs font-black uppercase tracking-widest shadow-lg"
            >
              {preview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />} {preview ? "Exit Preview" : "Enter Preview"}
            </button>
          </div>
        </div>

        {/* Right - Preview */}
        <div className={`h-full overflow-y-auto rounded-3xl bg-[#262626] border border-[#333333] p-10 shadow-inner transition-all duration-500 transform ${preview ? 'opacity-100 translate-x-0' : 'opacity-30 grayscale translate-x-4 blur-sm'}`}>
          {preview ? (
            <article className="prose prose-invert prose-lg max-w-none">
              {cover && <div className="relative mb-10"><div className="absolute inset-0 bg-gradient-to-t from-[#262626] to-transparent z-10 bottom-0 h-20"></div><img src={cover} alt="cover" className="w-full h-64 object-cover rounded-2xl shadow-2xl border border-[#333333]" /></div>}
              <h1 className="text-5xl font-black mb-6 text-[#E2E8CE] tracking-tight font-serif leading-tight">{title || "Untitled Draft"}</h1>
              <p className="text-xs text-[#ACBFA4] font-bold uppercase tracking-widest mb-10 border-b border-[#333333] pb-6 flex items-center gap-2">
                <User className="w-4 h-4 text-[#FF7F11]"/> Written by You • {new Date().toLocaleDateString()}
              </p>
              <div dangerouslySetInnerHTML={{ __html: renderMD(markdown) }} className="font-serif text-[#E2E8CE]/90 leading-loose" />
            </article>
          ) : (
            <div className="text-[#444444] grid place-items-center h-full border-4 border-dashed border-[#333333] rounded-2xl">
              <div className="text-center">
                <div className="mx-auto w-24 h-24 rounded-full bg-[#333333] flex items-center justify-center mb-6">
                   <Eye className="text-5xl opacity-20" />
                </div>
                <h3 className="text-2xl font-black font-serif opacity-50">Preview Mode</h3>
                <p className="text-sm mt-3 font-medium uppercase tracking-widest opacity-40">Focus on writing</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {message && <MessageToast message={message.text} type={message.type} />}
    </div>
  );
}
