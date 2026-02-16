// Teacher.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


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
    <div onClick={onClose} className="fixed inset-0 z-[100] bg-[#F0F9FF]/90 backdrop-blur-xl flex items-center justify-center p-6 animate-fade-in">
      <div className="relative max-w-6xl w-full flex justify-center border border-[#FFFFFF] rounded-3xl bg-[#F0F9FF] p-4 shadow-2xl">
        {type === "image" && <img src={src} alt="Preview" className="max-h-[85vh] rounded-2xl object-contain" />}
        {type === "video" && <video src={src} controls autoPlay className="max-h-[85vh] rounded-2xl" />}
        {type === "pdf" && <iframe src={src} className="w-full h-[85vh] rounded-2xl bg-[#1E3A8A]" title="PDF" />}
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
              className="relative group cursor-pointer overflow-hidden rounded-2xl bg-[#FFFFFF] border border-[#E2E8F0] hover:border-[#2563EB] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10"
            >
              {type === "image" && <img src={url} alt="Post media" className="w-full h-150 object-cover opacity-90 group-hover:opacity-100 transition-opacity" />}
              {type === "video" && <video src={url} muted loop autoPlay className="w-full h-150 object-cover opacity-90 group-hover:opacity-100 transition-opacity" />}
              {type === "pdf" && (
                <div className="flex flex-col items-center justify-center h-40 bg-[#FFFFFF] text-[#475569] group-hover:text-[#1E3A8A]">
                  <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">📄</span>
                  <span className="text-xs font-bold uppercase tracking-wider">PDF Document</span>
                </div>
              )}
            </div>
          );
        })}
        {media.length > 3 && (
          <div className="flex items-center justify-center bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl text-[#475569] font-bold text-lg hover:bg-[#E2E8F0] hover:text-[#1E3A8A] transition cursor-pointer">
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
    <div className="mt-6 border-t border-[#FFFFFF] pt-4">
      <button onClick={() => setShow(!show)} className="flex items-center gap-2 text-sm font-bold text-[#475569] hover:text-[#2563EB] transition-colors uppercase tracking-wider">
        <CommentIcon /> {show ? "Hide Comments" : `Comments (${comments.length})`}
      </button>
      {show && (
        <div className="mt-4 space-y-4 animate-fade-in pl-4 border-l-2 border-[#FFFFFF]">
          {comments.map((c, i) => (
            <div key={i} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-[#FFFFFF] border border-[#E2E8F0] flex-shrink-0" />
              <div className="bg-[#FFFFFF] rounded-2xl rounded-tl-none px-4 py-3 border border-[#E2E8F0]">
                <p className="font-bold text-xs text-[#2563EB] mb-1 uppercase tracking-wide">{c.user?.username || "Anonymous"}</p>
                <p className="text-sm text-[#1E3A8A] leading-relaxed">{c.text}</p>
              </div>
            </div>
          ))}
          
          <form onSubmit={handlePost} className="flex gap-3 mt-4">
            <input 
              type="text" value={text} onChange={(e) => setText(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 bg-[#FFFFFF] border border-[#E2E8F0] rounded-full px-5 py-3 text-sm text-[#1E3A8A] placeholder-[#64748B] outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all shadow-inner"
            />
            <button className="bg-[#2563EB] hover:bg-[#1D4ED8] px-6 py-2 rounded-full text-sm font-bold text-[#F0F9FF] shadow-lg shadow-blue-500/20 active:scale-95 transition-all uppercase tracking-wide">
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
  <div className="w-full bg-[#FFFFFF] rounded-3xl p-8 animate-pulse border border-[#E2E8F0]">
    <div className="flex items-center gap-4 mb-6">
      <div className="w-14 h-14 bg-[#E2E8F0] rounded-full" />
      <div className="flex-1 space-y-3">
        <div className="h-4 bg-[#E2E8F0] rounded w-1/3" />
        <div className="h-3 bg-[#E2E8F0] rounded w-1/4" />
      </div>
    </div>
    <div className="h-40 bg-[#E2E8F0] rounded-2xl w-full" />
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

        <div className="max-w-4xl mx-auto mt-0">
          
          <header className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 pb-6 border-b border-[#FFFFFF]">
            <div>
              <h1 className="text-4xl font-black text-[#1E3A8A] tracking-tight mb-2">
                Community <span className="text-[#2563EB]">Feed</span>
              </h1>
              <p className="text-[#475569] text-lg font-medium">Discover insights, resources, and updates.</p>
            </div>
            <div className="flex gap-4">
              <Link to="/teacher-post" className="bg-[#2563EB] hover:bg-[#1D4ED8] text-[#F0F9FF] px-8 py-3 rounded-full font-bold shadow-xl shadow-blue-500/20 hover:-translate-y-1 transition-all uppercase tracking-wide text-sm flex items-center gap-2">
                <span>+</span> Create Post
              </Link>
              <Link to="/chat" className="bg-[#FFFFFF] text-[#475569] border border-[#475569]/30 px-8 py-3 rounded-full font-bold hover:bg-[#475569] hover:text-[#F0F9FF] transition-all uppercase tracking-wide text-sm shadow-md">
                Join Chat
              </Link>
            </div>
          </header>

          {loading ? (
            <div className="space-y-8">
              {[1, 2].map((n) => <SkeletonCard key={n} />)}
            </div>
          ) : error ? (
             <div className="bg-[#2563EB]/10 border border-[#2563EB]/50 text-[#2563EB] p-6 rounded-2xl text-center font-bold uppercase tracking-wide">
               Error: {error}
             </div>
          ) : (
            <div className="space-y-10">
              {posts.map((post) => (
                <article key={post._id} className="bg-[#F0F9FF] border border-[#FFFFFF] rounded-[2rem] p-8 hover:border-[#2563EB]/50 transition-all duration-500 shadow-2xl shadow-black/20 group animate-fade-in relative overflow-hidden">
                  
                  {/* Subtle Background Art */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#2563EB]/5 rounded-full blur-[60px] pointer-events-none"></div>

                  <div className="flex items-center gap-4 mb-6 relative z-10">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#2563EB] to-[#475569] p-[2px] shadow-lg">
                       <div className="w-full h-full rounded-full bg-[#F0F9FF] flex items-center justify-center font-black text-xl text-[#1E3A8A]">
                         {post.author?.username?.charAt(0) || "U"}
                       </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1E3A8A] text-lg group-hover:text-[#2563EB] transition-colors">{post.author?.username || "Anonymous User"}</h3>
                      <div className="flex items-center gap-2 mt-1">
                         <span className="px-2 py-0.5 rounded bg-[#475569]/20 text-[#475569] text-[10px] font-bold uppercase tracking-wider border border-[#475569]/20">{post.type}</span>
                         <span className="text-xs text-[#64748B] font-medium">• Just now</span>
                      </div>
                    </div>
                  </div>

                  <h2 className="text-2xl font-black mb-4 text-[#F8FAFC] tracking-tight leading-snug">{post.title}</h2>
                  <p className="text-[#475569] mb-8 leading-relaxed text-lg font-light">{post.content}</p>

                  {post.media.length > 0 && <MediaStrip media={post.media} />}

                  <div className="flex items-center gap-4 pt-6 mt-2 border-t border-[#FFFFFF] relative z-10">
                    <button 
                      onClick={() => handleLike(post._id)}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border ${
                        post.liked 
                          ? 'bg-[#2563EB] border-[#2563EB] text-[#F0F9FF] shadow-lg shadow-blue-500/30' 
                          : 'bg-[#FFFFFF] border-[#E2E8F0] text-[#475569] hover:border-[#475569] hover:text-[#1E3A8A]'
                      }`}
                    >
                      <HeartIcon className={`w-5 h-5 transition-transform duration-300 ${post.liked ? 'fill-current scale-110' : ''}`} /> 
                      <span className="uppercase tracking-wide">{post.likes.length} Likes</span>
                    </button>
                    <span className="text-[#64748B] text-xs font-bold uppercase tracking-widest flex-1 text-right">ID: {post._id.substring(0,8)}</span>
                  </div>

                  <Comments postId={post._id} />
                </article>
              ))}
            </div>
          )}
        </div>
  );
}