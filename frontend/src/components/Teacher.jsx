// Teacher.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SideBar from "../Sidebar";

const API_BASE_URL = "http://localhost:5001";

/* ---------- ICONS ---------- */
const HeartIcon = ({ className }) => (
  // Simple Heart
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const CommentIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
  </svg>
);

/* ---------- LIGHTBOX ---------- */
const LightBox = ({ src, type, onClose }) => {
  if (!src) return null;
  return (
    <div onClick={onClose} className="fixed inset-0 z-[100] bg-[#262626]/90 backdrop-blur-xl flex items-center justify-center p-6 animate-fade-in">
      <div className="relative max-w-6xl w-full flex justify-center border border-[#333333] rounded-3xl bg-[#262626] p-4 shadow-2xl">
        {type === "image" && <img src={src} alt="Preview" className="max-h-[85vh] rounded-2xl object-contain" />}
        {type === "video" && <video src={src} controls autoPlay className="max-h-[85vh] rounded-2xl" />}
        {type === "pdf" && <iframe src={src} className="w-full h-[85vh] rounded-2xl bg-[#E2E8CE]" title="PDF" />}
      </div>
    </div>
  );
};

/* ---------- MEDIA STRIP ---------- */
const MediaStrip = ({ media = [] }) => {
  const [lightBox, setLightBox] = useState(null);
  if (!media.length) return null;

  return (
    <>
      <div className={`grid gap-3 mb-4 ${media.length === 1 ? 'grid-cols-1' : 'grid-cols-2 md:grid-cols-3'}`}>
        {media.slice(0, 3).map((item, idx) => {
          const url = item.url.startsWith("http") ? item.url : `${API_BASE_URL}${item.url}`;
          const type = item.type;
          
          return (
            <div
              key={idx}
              onClick={() => setLightBox({ url, type })}
              className="relative group cursor-pointer overflow-hidden rounded-2xl bg-[#333333] border border-[#444444] hover:border-[#FF7F11] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-500/10"
            >
              {type === "image" && <img src={url} alt="Post media" className="w-full h-40 object-cover opacity-90 group-hover:opacity-100 transition-opacity" />}
              {type === "video" && <video src={url} muted loop autoPlay className="w-full h-40 object-cover opacity-90 group-hover:opacity-100 transition-opacity" />}
              {type === "pdf" && (
                <div className="flex flex-col items-center justify-center h-40 bg-[#333333] text-[#ACBFA4] group-hover:text-[#E2E8CE]">
                  <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">📄</span>
                  <span className="text-xs font-bold uppercase tracking-wider">PDF Document</span>
                </div>
              )}
            </div>
          );
        })}
        {media.length > 3 && (
          <div className="flex items-center justify-center bg-[#333333] border border-[#444444] rounded-2xl text-[#ACBFA4] font-bold text-lg hover:bg-[#444444] hover:text-[#E2E8CE] transition cursor-pointer">
            +{media.length - 3}
          </div>
        )}
      </div>
      {lightBox && <LightBox {...lightBox} onClose={() => setLightBox(null)} />}
    </>
  );
};

/* ---------- COMMENTS SECTION ---------- */
const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [show, setShow] = useState(false);

  const handlePost = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setComments([...comments, { text, user: { username: "You" } }]); 
    setText("");
  };

  return (
    <div className="mt-6 border-t border-[#333333] pt-4">
      <button onClick={() => setShow(!show)} className="flex items-center gap-2 text-sm font-bold text-[#ACBFA4] hover:text-[#FF7F11] transition-colors uppercase tracking-wider">
        <CommentIcon /> {show ? "Hide Comments" : `Comments (${comments.length})`}
      </button>
      {show && (
        <div className="mt-4 space-y-4 animate-fade-in pl-4 border-l-2 border-[#333333]">
          {comments.map((c, i) => (
            <div key={i} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-[#333333] border border-[#444444] flex-shrink-0" />
              <div className="bg-[#333333] rounded-2xl rounded-tl-none px-4 py-3 border border-[#444444]">
                <p className="font-bold text-xs text-[#FF7F11] mb-1 uppercase tracking-wide">{c.user?.username || "Anonymous"}</p>
                <p className="text-sm text-[#E2E8CE] leading-relaxed">{c.text}</p>
              </div>
            </div>
          ))}
          
          <form onSubmit={handlePost} className="flex gap-3 mt-4">
            <input 
              type="text" value={text} onChange={(e) => setText(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 bg-[#333333] border border-[#444444] rounded-full px-5 py-3 text-sm text-[#E2E8CE] placeholder-[#666666] outline-none focus:border-[#FF7F11] focus:ring-1 focus:ring-[#FF7F11] transition-all shadow-inner"
            />
            <button className="bg-[#FF7F11] hover:bg-[#e06c09] px-6 py-2 rounded-full text-sm font-bold text-[#262626] shadow-lg shadow-orange-500/20 active:scale-95 transition-all uppercase tracking-wide">
              Post
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

/* ---------- SKELETON CARD ---------- */
const SkeletonCard = () => (
  <div className="w-full bg-[#333333] rounded-3xl p-8 animate-pulse border border-[#444444]">
    <div className="flex items-center gap-4 mb-6">
      <div className="w-14 h-14 bg-[#444444] rounded-full" />
      <div className="flex-1 space-y-3">
        <div className="h-4 bg-[#444444] rounded w-1/3" />
        <div className="h-3 bg-[#444444] rounded w-1/4" />
      </div>
    </div>
    <div className="h-40 bg-[#444444] rounded-2xl w-full" />
  </div>
);

/* ---------- MAIN COMPONENT ---------- */
export default function Teacher() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/feed`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
      });
      if (!response.ok) throw new Error("Failed to fetch posts");
      const data = await response.json();
      if (data.success) {
        setPosts(data.posts.map(p => ({ ...p, likes: p.likes || [], liked: false })));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleLike = (id) => {
    setPosts(posts.map(p => p._id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes.slice(0,-1) : [...p.likes, "me"] } : p));
  };

  return (
    <div className="flex min-h-screen bg-[#262626] text-[#E2E8CE] font-sans">
      <SideBar />
      
      <main className="flex-1 sm:ml-72 transition-all duration-300 p-4 sm:p-8">
        <div className="max-w-4xl mx-auto mt-16 sm:mt-8">
          
          <header className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 pb-6 border-b border-[#333333]">
            <div>
              <h1 className="text-4xl font-black text-[#E2E8CE] tracking-tight mb-2">
                Community <span className="text-[#FF7F11]">Feed</span>
              </h1>
              <p className="text-[#ACBFA4] text-lg font-medium">Discover insights, resources, and updates.</p>
            </div>
            <div className="flex gap-4">
              <Link to="/teacher-post" className="bg-[#FF7F11] hover:bg-[#e06c09] text-[#262626] px-8 py-3 rounded-full font-bold shadow-xl shadow-orange-500/20 hover:-translate-y-1 transition-all uppercase tracking-wide text-sm flex items-center gap-2">
                <span>+</span> Create Post
              </Link>
              <Link to="/chat" className="bg-[#333333] text-[#ACBFA4] border border-[#ACBFA4]/30 px-8 py-3 rounded-full font-bold hover:bg-[#ACBFA4] hover:text-[#262626] transition-all uppercase tracking-wide text-sm shadow-md">
                Join Chat
              </Link>
            </div>
          </header>

          {loading ? (
            <div className="space-y-8">
              {[1, 2].map((n) => <SkeletonCard key={n} />)}
            </div>
          ) : error ? (
             <div className="bg-[#FF7F11]/10 border border-[#FF7F11]/50 text-[#FF7F11] p-6 rounded-2xl text-center font-bold uppercase tracking-wide">
               Error: {error}
             </div>
          ) : (
            <div className="space-y-10">
              {posts.map((post) => (
                <article key={post._id} className="bg-[#262626] border border-[#333333] rounded-[2rem] p-8 hover:border-[#FF7F11]/50 transition-all duration-500 shadow-2xl shadow-black/20 group animate-fade-in relative overflow-hidden">
                  
                  {/* Subtle Background Art */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF7F11]/5 rounded-full blur-[60px] pointer-events-none"></div>

                  <div className="flex items-center gap-4 mb-6 relative z-10">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FF7F11] to-[#ACBFA4] p-[2px] shadow-lg">
                       <div className="w-full h-full rounded-full bg-[#262626] flex items-center justify-center font-black text-xl text-[#E2E8CE]">
                         {post.author?.username?.charAt(0) || "U"}
                       </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-[#E2E8CE] text-lg group-hover:text-[#FF7F11] transition-colors">{post.author?.username || "Anonymous User"}</h3>
                      <div className="flex items-center gap-2 mt-1">
                         <span className="px-2 py-0.5 rounded bg-[#ACBFA4]/20 text-[#ACBFA4] text-[10px] font-bold uppercase tracking-wider border border-[#ACBFA4]/20">{post.type}</span>
                         <span className="text-xs text-[#666666] font-medium">• Just now</span>
                      </div>
                    </div>
                  </div>

                  <h2 className="text-2xl font-black mb-4 text-[#F8FAFC] tracking-tight leading-snug">{post.title}</h2>
                  <p className="text-[#ACBFA4] mb-8 leading-relaxed text-lg font-light">{post.content}</p>

                  {post.media.length > 0 && <MediaStrip media={post.media} />}

                  <div className="flex items-center gap-4 pt-6 mt-2 border-t border-[#333333] relative z-10">
                    <button 
                      onClick={() => handleLike(post._id)}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border ${
                        post.liked 
                          ? 'bg-[#FF7F11] border-[#FF7F11] text-[#262626] shadow-lg shadow-orange-500/30' 
                          : 'bg-[#333333] border-[#444444] text-[#ACBFA4] hover:border-[#ACBFA4] hover:text-[#E2E8CE]'
                      }`}
                    >
                      <HeartIcon className={`w-5 h-5 transition-transform duration-300 ${post.liked ? 'fill-current scale-110' : ''}`} /> 
                      <span className="uppercase tracking-wide">{post.likes.length} Likes</span>
                    </button>
                    <span className="text-[#666666] text-xs font-bold uppercase tracking-widest flex-1 text-right">ID: {post._id.substring(0,8)}</span>
                  </div>

                  <Comments postId={post._id} />
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}