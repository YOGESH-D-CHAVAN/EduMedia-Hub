// StudentDashboard.jsx - Earthy Theme with Functional Backend Integration
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Heart, MessageSquare, X, ArrowRight, User, Image, FileText, Video, Plus, Loader, Send, Trash2 } from "lucide-react";

/* ---------- HELPER: ALPHABET AVATAR ---------- */
const AlphabetAvatar = ({ name, size = "w-12 h-12", fontSize = "text-xl" }) => {
  const firstLetter = name ? name.charAt(0).toUpperCase() : "?";
  
  // Earthy / Vibrant palette for avatars
  const colors = [
    "bg-[#FF7F11] text-[#262626]",
    "bg-[#ACBFA4] text-[#262626]",
    "bg-[#E2E8CE] text-[#262626]",
    "bg-[#666666] text-[#E2E8CE]",
    "bg-[#333333] text-[#FF7F11]",
  ];

  const colorIndex = firstLetter.charCodeAt(0) % colors.length;
  const colorClass = colors[colorIndex];

  return (
    <div className={`${size} ${colorClass} rounded-2xl flex items-center justify-center font-black border border-[#444444] shadow-inner transform hover:rotate-3 transition duration-300 shrink-0`}>
      <span className={fontSize}>{firstLetter}</span>
    </div>
  );
};

/* ---------- LIGHTBOX ---------- */
const LightBox = ({ src, type, onClose }) => {
  if (!src) return null;
  return (
    <div onClick={onClose} className="fixed inset-0 z-[100] bg-[#262626]/95 backdrop-blur-xl flex items-center justify-center p-6 animate-fade-in cursor-zoom-out">
      <div className="relative max-w-6xl w-full flex justify-center" onClick={e => e.stopPropagation()}>
         <button onClick={onClose} className="absolute -top-12 right-0 text-[#E2E8CE] hover:text-[#FF7F11] transition"><X className="w-8 h-8" /></button>
        {type === "image" && (
          <img src={src} alt="Preview" className="max-h-[85vh] rounded-[2rem] object-contain shadow-2xl border border-[#444444]" />
        )}
        {type === "video" && (
          <video src={src} controls autoPlay className="max-h-[85vh] rounded-[2rem] shadow-2xl border border-[#444444]" />
        )}
        {type === "pdf" && (
          <iframe src={src} className="w-full h-[85vh] rounded-[2rem] bg-white border border-[#444444]" title="PDF" />
        )}
      </div>
    </div>
  );
};

/* ---------- MEDIA STRIP ---------- */
const MediaStrip = ({ media = [] }) => {
  const [lightBox, setLightBox] = useState(null);
  
  // Logic to determine type if not provided
  const getType = (file) => {
      const url = file.url || file;
      if (/\.(jpg|jpeg|png|gif|webp)$/i.test(url)) return "image";
      if (/\.(mp4|webm|ogg)$/i.test(url)) return "video";
      if (/\.pdf$/i.test(url)) return "pdf";
      return "file";
  };

  return (
    <>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 auto-rows-[10rem] mb-6">
        {media.map((file, idx) => {
          const url = file.url?.startsWith("http") ? file.url : `http://localhost:5001/${file.url || file}`;
          const type = file.type || getType(file);
          
          return (
            <div key={idx} onClick={() => setLightBox({ url, type })} className="relative group cursor-pointer overflow-hidden rounded-[1.5rem] bg-[#262626] border border-[#444444] hover:border-[#FF7F11] transition-all duration-300 shadow-md">
               <div className="absolute inset-0 bg-[#000]/20 group-hover:bg-transparent transition-all z-10" />
               
              {type === "image" && <img src={url} className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700" />}
              {type === "video" && <video src={url} muted loop className="w-full h-full object-cover filter brightness-75 group-hover:brightness-100 transition" />}
              {type === "pdf" && (
                <div className="flex flex-col items-center justify-center h-full text-[#ACBFA4] group-hover:text-[#E2E8CE] transition">
                  <FileText className="w-12 h-12 mb-2" />
                  <span className="text-[10px] font-black uppercase tracking-widest">PDF Document</span>
                </div>
              )}
               
               {/* Icon Overlay */}
               <div className="absolute top-2 right-2 z-20 bg-[#333333]/80 p-2 rounded-full backdrop-blur-sm text-[#E2E8CE]">
                   {type === 'image' && <Image className="w-4 h-4" />}
                   {type === 'video' && <Video className="w-4 h-4" />}
                   {type === 'pdf' && <FileText className="w-4 h-4" />}
               </div>
            </div>
          );
        })}
      </div>
      <LightBox src={lightBox?.url} type={lightBox?.type} onClose={() => setLightBox(null)} />
    </>
  );
};

/* ---------- COMMENTS ---------- */
const CommentSection = ({ postId, comments = [], onAdd }) => {
  const [text, setText] = useState("");
  const [show, setShow] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
      e.preventDefault();
      if(!text.trim()) return;
      setIsSubmitting(true);
      await onAdd(postId, text);
      setText("");
      setIsSubmitting(false);
  };

  return (
    <div className="mt-8 pt-6 border-t border-[#444444]">
      <button onClick={() => setShow(!show)} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#666666] hover:text-[#FF7F11] transition mb-4">
        <MessageSquare className="w-4 h-4" /> {show ? "Hide Discussion" : `View Discussion (${comments.length})`}
      </button>

      {show && (
        <div className="space-y-6 animate-fade-in pl-4 border-l-2 border-[#333333]">
          {comments.map((c, i) => (
            <div key={i} className="flex gap-4 group">
               <div className="mt-1"><AlphabetAvatar name={c.user?.username} size="w-8 h-8" fontSize="text-xs" /></div>
               <div className="flex-1">
                   <div className="bg-[#262626] rounded-xl rounded-tl-none p-4 border border-[#333333] group-hover:border-[#444444] transition-colors">
                       <p className="font-black text-[10px] text-[#ACBFA4] uppercase tracking-widest mb-1">{c.user?.username || "Anonymous"}</p>
                       <p className="text-[#E2E8CE] text-sm leading-relaxed font-medium">{c.text}</p>
                   </div>
               </div>
            </div>
          ))}
          
          <form onSubmit={handleSubmit} className="flex gap-3 pt-4">
             <input 
                value={text} 
                onChange={e => setText(e.target.value)} 
                placeholder="Join the conversation..." 
                className="flex-1 bg-[#262626] border border-[#444444] rounded-xl px-5 py-3 text-sm text-[#E2E8CE] outline-none focus:border-[#FF7F11] placeholder-[#666666] transition shadow-inner font-medium"
             />
             <button disabled={!text.trim() || isSubmitting} className="bg-[#FF7F11] text-[#262626] px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-[#e06c09] transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center gap-2">
                 {isSubmitting ? <Loader className="w-4 h-4 animate-spin"/> : "Send"}
             </button>
          </form>
        </div>
      )}
    </div>
  );
};

/* ---------- CREATE POST MODAL ---------- */
const CreatePostModal = ({ isOpen, onClose, onPostCreated }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [media, setMedia] = useState(null);
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("content", content);
            formData.append("type", "GENERAL"); // Default type
            formData.append("audience", "public");
            if(media) {
                Array.from(media).forEach(file => {
                    formData.append("media", file);
                });
            }

            const token = localStorage.getItem("authToken");
            const res = await fetch("http://localhost:5001/api/v1/post", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });
            
            const data = await res.json();
            if(res.ok) {
                onPostCreated(data.post);
                setTitle("");
                setContent("");
                setMedia(null);
                onClose();
            } else {
                alert(data.message || "Failed to create post");
            }
        } catch (error) {
            console.error(error);
            alert("Error creating post");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#262626]/90 backdrop-blur-sm p-4 animate-fade-in">
             <div className="bg-[#333333] rounded-[2rem] p-8 w-full max-w-2xl border border-[#444444] shadow-2xl relative">
                  <button onClick={onClose} className="absolute top-6 right-6 text-[#ACBFA4] hover:text-[#FF7F11] transition"><X className="w-6 h-6"/></button>
                  <h2 className="text-2xl font-black text-[#E2E8CE] mb-6">Create New Post</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                          <input 
                              placeholder="Title" 
                              value={title} 
                              onChange={e => setTitle(e.target.value)} 
                              className="w-full bg-[#262626] border border-[#444444] rounded-xl px-5 py-3 text-[#E2E8CE] focus:border-[#FF7F11] outline-none font-bold"
                              required
                          />
                      </div>
                      <div>
                          <textarea 
                              placeholder="What's on your mind?" 
                              value={content} 
                              onChange={e => setContent(e.target.value)} 
                              rows={5}
                              className="w-full bg-[#262626] border border-[#444444] rounded-xl px-5 py-3 text-[#E2E8CE] focus:border-[#FF7F11] outline-none resize-none font-medium"
                              required
                          />
                      </div>
                      <div>
                          <label className="flex items-center gap-3 px-5 py-3 bg-[#262626] border border-[#444444] rounded-xl cursor-pointer hover:border-[#ACBFA4] transition group">
                              <Image className="w-5 h-5 text-[#ACBFA4] group-hover:text-[#FF7F11]" />
                              <span className="text-sm font-bold text-[#E2E8CE]">Attach Media (Images, Video, PDF)</span>
                              <input type="file" multiple onChange={e => setMedia(e.target.files)} className="hidden" />
                          </label>
                          {media && <p className="text-xs text-[#ACBFA4] mt-2 font-bold uppercase tracking-wide">{media.length} files selected</p>}
                      </div>
                      
                      <div className="flex justify-end gap-4 pt-4 border-t border-[#444444]">
                          <button type="button" onClick={onClose} className="px-6 py-3 rounded-xl text-[#ACBFA4] font-bold uppercase tracking-widest text-xs hover:text-[#E2E8CE] transition">Cancel</button>
                          <button disabled={loading} type="submit" className="px-8 py-3 bg-[#FF7F11] text-[#262626] rounded-xl font-black uppercase tracking-widest text-xs hover:bg-[#e06c09] transition shadow-lg flex items-center gap-2">
                              {loading ? <Loader className="w-4 h-4 animate-spin"/> : "Post Update"}
                          </button>
                      </div>
                  </form>
             </div>
        </div>
    );
};

/* ---------- MAIN DASHBOARD ---------- */
export default function StudentDashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const fetchPosts = async () => {
    try {
        const token = localStorage.getItem("authToken");
        const res = await fetch("http://localhost:5001/api/v1/feed", {
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if(res.ok) {
            setPosts(data.posts || []);
        }
    } catch (error) {
        console.error("Failed to fetch feed", error);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
     fetchPosts();
  }, []);

  const handlePostCreated = (newPost) => {
      setPosts([newPost, ...posts]);
  };

  const handleAddComment = async (postId, text) => {
      try {
          const token = localStorage.getItem("authToken");
          const res = await fetch(`http://localhost:5001/api/v1/${postId}/comment`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
              },
              body: JSON.stringify({ text })
          });
          const data = await res.json();
          if(res.ok) {
              setPosts(posts.map(p => {
                  if(p._id === postId) {
                      return { ...p, comments: [...p.comments, data.comment] };
                  }
                  return p;
              }));
          }
      } catch (error) {
          console.error("Error adding comment", error);
      }
  };
  
  const handleLike = async (postId) => {
      try {
          const token = localStorage.getItem("authToken");
          const res = await fetch(`http://localhost:5001/api/v1/${postId}/like`, {
              method: "POST",
              headers: { Authorization: `Bearer ${token}` }
          });
          if(res.ok) {
               // Update local state is tricky without returned updated post or user id check
               // Re-fetch or simplistic update? Simplistic update for now.
               fetchPosts(); 
          }
      } catch (error) {
          console.error("Error liking post", error);
      }
  };

  const handleDelete = async (postId) => {
    if(!window.confirm("Are you sure you want to delete this post?")) return;

    try {
        const token = localStorage.getItem("authToken");
        const res = await fetch(`http://localhost:5001/api/v1/post/${postId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        });
        
        const data = await res.json();
        
        if (res.ok) {
            setPosts(posts.filter(p => p._id !== postId));
        } else {
            alert(data.message || "Failed to delete post");
        }
    } catch (error) {
        console.error("Error deleting post:", error);
    }
  };

  return (

    <div className="relative overflow-hidden w-full">
        {/* Background Ambience */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
              <div className="absolute top-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-[#FF7F11]/5 rounded-full blur-[100px]"></div>
              <div className="absolute bottom-[-10%] left-[20%] w-[50rem] h-[50rem] bg-[#ACBFA4]/5 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
            {/* Header */}
            <header className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6 border-b border-[#444444] pb-8">
                <div>
                    <div className="inline-block px-4 py-1.5 rounded-full border border-[#444444] bg-[#333333] text-[#ACBFA4] font-bold text-xs uppercase tracking-widest mb-4 shadow-md">
                        Campus Feed
                    </div>
                    <h1 className="text-5xl font-black text-[#E2E8CE] tracking-tighter mb-2">Community <span className="text-[#FF7F11]">Pulse</span></h1>
                    <p className="text-[#ACBFA4] font-medium text-lg">See what's happening in your network.</p>
                </div>
                
                <div className="flex gap-4">
                    <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-3 px-8 py-4 bg-[#ACBFA4] text-[#262626] rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#9cafe4] transition hover:-translate-y-1 shadow-lg group">
                          <Plus className="w-4 h-4"/> Create Post
                    </button>
                    <Link to="/chat" className="flex items-center gap-3 px-8 py-4 bg-[#FF7F11] text-[#262626] rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#e06c09] transition hover:-translate-y-1 shadow-lg group">
                          Start Discussion <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </header>
            
            {/* Feed */}
            <div className="space-y-12 pb-20">
                {loading ? (
                    <div className="text-center py-20"><div className="animate-spin w-12 h-12 border-4 border-[#333333] border-t-[#FF7F11] rounded-full mx-auto"></div></div>
                ) : posts.length === 0 ? (
                    <div className="text-center py-20 border-2 border-dashed border-[#444444] rounded-[2rem]">
                        <p className="text-[#ACBFA4] font-bold text-lg">No posts yet. Be the first to share!</p>
                    </div>
                ) : posts.map(post => (
                    <article key={post._id} className="bg-[#333333] rounded-[2.5rem] p-8 md:p-10 border border-[#444444] shadow-2xl hover:border-[#FF7F11]/50 transition duration-500 group relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF7F11]/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-[#FF7F11]/10 transition-colors"></div>
                        
                        {/* Post Header */}
                        <div className="flex items-center gap-5 mb-8 relative z-10">
                            <AlphabetAvatar name={post.author?.username || "Unknown"} size="w-14 h-14" fontSize="text-2xl" />
                            <div>
                                <h3 className="text-xl font-bold text-[#E2E8CE] flex items-center gap-3">
                                    {post.author?.username || "Unknown"}
                                    {post.author?.role === 'teacher' && <span className="text-[10px] bg-[#ACBFA4] text-[#262626] px-2 py-0.5 rounded-md uppercase font-black tracking-wider">Faculty</span>}
                                </h3>
                                <p className="text-xs text-[#666666] font-bold uppercase tracking-widest mt-1">{post.type || "GENERAL"} • {new Date(post.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                        
                        {/* Content */}
                        <div className="mb-8 relative z-10">
                            {post.title && <h2 className="text-2xl font-black text-[#E2E8CE] mb-4 tracking-tight leading-tight">{post.title}</h2>}
                            <p className="text-[#ACBFA4] text-lg font-medium leading-relaxed whitespace-pre-wrap">{post.content}</p>
                        </div>
                        
                        {/* Media */}
                        {post.media?.length > 0 && <div className="relative z-10"><MediaStrip media={post.media} /></div>}
                        
                        {/* Actions */}
                        <div className="flex items-center gap-4 relative z-10 w-full justify-between">
                            <div className="flex gap-4">
                                <button onClick={() => handleLike(post._id)} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#262626] border border-[#444444] text-[#ACBFA4] font-bold text-xs uppercase tracking-widest hover:border-[#FF7F11] hover:text-[#FF7F11] transition group/btn">
                                    <Heart className="w-4 h-4 group-hover/btn:fill-current" /> {post.likes?.length || 0}
                                </button>
                            </div>
                            
                            <button onClick={() => handleDelete(post._id)} className="p-3 rounded-full bg-[#262626] border border-[#444444] text-[#666666] hover:text-red-500 hover:border-red-500 transition shadow-lg" title="Delete Post">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                        
                        {/* Comments */}
                        <div className="relative z-10">
                              <CommentSection postId={post._id} comments={post.comments} onAdd={handleAddComment} />
                        </div>
                    </article>
                ))}
            </div>
        </div>

        <CreatePostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onPostCreated={handlePostCreated} />
    </div>
  );
}
