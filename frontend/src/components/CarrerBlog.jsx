// CarrerBlog.jsx - Earthy Theme
import React, { useEffect, useState } from "react";
import {
  Search,
  Bookmark,
  Share2,
  Calendar,
  Clock,
  User,
  AlertTriangle,
  CheckCircle,
  Info,
  Loader,
  ChevronUp,
  ChevronDown,
  Eye
} from "lucide-react";

// Mock Data
const MOCK_BLOGS = [
  {
    _id: "1",
    title: "Eco-Friendly Tech: The Future of Green Computing",
    author: "Dr. Evelyn Reed",
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
    readTime: 8,
    cover: "https://placehold.co/600x400/262626/ACBFA4?text=Green+Computing",
    markdown:
      "Sustainability in technology is no longer optional. From energy-efficient algorithms to biodegradable hardware, the industry is shifting towards a closer relationship with our environment. This article explores how developers can optimize code for lower carbon footprints and why companies are investing heavily in renewable data centers.",
  },
  {
    _id: "2",
    title: "Organic Design Principles in UI/UX",
    author: "Markus Chen",
    date: new Date(Date.now() - 86400000 * 5).toISOString(),
    readTime: 5,
    cover: "https://placehold.co/600x400/333333/E2E8CE?text=Organic+UI",
    markdown:
      "Moving away from rigid grids and sharp corners, modern interface design is embracing fluidity and natural imperfections. Learn how soft shadows, earthy palettes, and biological patterns can create more calming and accessible user experiences.",
  },
  {
    _id: "3",
    title: "The Resilience of Distributed Systems",
    author: "Sophia Lee",
    date: new Date(Date.now() - 86400000 * 10).toISOString(),
    readTime: 4,
    cover: "https://placehold.co/600x400/262626/FF7F11?text=Resilience",
    markdown:
      "Just as nature adapts to survive, distributed software systems must be built for resilience. We discuss chaos engineering, self-healing architectures, and redundancy strategies inspired by biological ecosystems.",
  },
];

/* ---------- Toast ---------- */
const MessageToast = ({ message, type }) => {
  if (!message) return null;
  const base =
    "fixed bottom-5 right-5 p-4 rounded-xl bg-[#333333] border border-[#ACBFA4] shadow-2xl z-50 flex items-center gap-3 transition-opacity duration-300 font-medium text-sm";
  const map = {
    success: { cls: "text-[#ACBFA4] border-[#ACBFA4]", Icon: CheckCircle },
    error: { cls: "text-[#FF7F11] border-[#FF7F11]", Icon: AlertTriangle },
    info: { cls: "text-[#E2E8CE] border-[#E2E8CE]", Icon: Info },
  };
  const { cls, Icon } = map[type] || map.info;
  return (
    <div className={`${base} ${cls}`}>
      <Icon className="w-5 h-5" />
      <span>{message}</span>
    </div>
  );
};

export default function CareerBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  /* ---- expanded cards ---- */
  const [expanded, setExpanded] = useState(new Set());
  const toggleExpand = (_id) => {
    const n = new Set(expanded);
    if (n.has(_id)) n.delete(_id); else n.add(_id);
    setExpanded(n);
  };

  /* ---- fetch ---- */
  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      setError(null);
      let fetchedData = [];

      try {
        const token = localStorage.getItem("authToken");
        const res = await fetch("http://localhost:5001/api/v1/getallblog", {
            headers: { Authorization: `Bearer ${token}` },
        });

        const apiData = await res.json();
        if (res.ok && Array.isArray(apiData.blogs)) {
          fetchedData = apiData.blogs;
        } else {
             // Fallback if API fails or empty?
             // fetchedData = MOCK_BLOGS; 
             // Actually, if API works but returns empty, we show empty.
        }
      } catch (e) {
        console.error("Fetch error:", e);
        // fetch failed completely
        setError("Failed to load blogs.");
      } finally {
        setBlogs(fetchedData.map((b) => ({ ...b, isBookmarked: false })));
        setIsLoading(false);
      }
    };
    
    load();
    
    const handleUpdate = () => load();
    window.addEventListener('blogUpdated', handleUpdate);
    return () => window.removeEventListener('blogUpdated', handleUpdate);
  }, []);

  /* ---- Handlers ---- */
  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 3000);
  };

  const bookmark = (_id) => {
    setBlogs((prev) => {
      const blog = prev.find((b) => b._id === _id);
      const isNow = !blog?.isBookmarked;
      showToast("success", isNow ? "Saved to collection." : "Removed from collection.");
      return prev.map((b) => (b._id === _id ? { ...b, isBookmarked: isNow } : b));
    });
  };

  const share = (_id) => {
    const url = `${window.location.origin}/blog/${_id}`;
    navigator.clipboard.writeText(url);
    showToast("info", "Link copied to clipboard.");
  };

  const renderContent = () => {
    if (isLoading)
      return (
        <div className="text-center py-24">
          <Loader className="mx-auto w-10 h-10 text-[#FF7F11] animate-spin mb-4" />
          <p className="text-[#ACBFA4] font-medium tracking-wide">Gathering resources...</p>
        </div>
      );
    if (error)
      return (
        <div className="text-center py-20 text-[#FF7F11] bg-[#333333]/50 rounded-2xl border border-[#FF7F11]/20 p-8 mx-auto max-w-lg">
          <AlertTriangle className="mx-auto w-12 h-12 mb-4" />
          <p className="font-bold text-lg">Connection Error</p>
          <p className="text-sm opacity-80 mt-2">{error}</p>
        </div>
      );

    const filtered = blogs.filter(
      (b) =>
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.author.toLowerCase().includes(search.toLowerCase())
    );

    if (filtered.length === 0)
      return (
        <div className="text-center py-20 text-[#666666]">
          <Search className="mx-auto w-16 h-16 mb-4 opacity-20" />
          <p className="text-xl font-bold">No results found.</p>
          <p className="text-sm mt-2">Try adjusting your search terms.</p>
        </div>
      );

    return (
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((blog) => {
          const open = expanded.has(blog._id);
          const formattedDate = new Date(blog.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });

          const coverUrl = blog.cover || "https://placehold.co/600x400/333333/E2E8CE?text=EduMedia";

          return (
            <article
              key={blog._id}
              className={`flex flex-col rounded-[2rem] bg-[#333333] border border-[#444444] overflow-hidden shadow-2xl shadow-black/30 transition-all duration-500 hover:border-[#FF7F11]/50 group ${
                open ? "ring-1 ring-[#FF7F11] scale-[1.01]" : ""
              }`}
            >
              <div className="h-56 overflow-hidden relative bg-[#262626]">
                <div className="absolute inset-0 bg-[#FF7F11]/10 mix-blend-overlay z-10 pointer-events-none" />
                <img
                  src={coverUrl}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />
              </div>

              <div className="p-8 flex flex-col flex-1 justify-between relative">
                <div>
                  <h3 className="text-2xl font-black text-[#E2E8CE] mb-4 leading-tight group-hover:text-[#FF7F11] transition-colors cursor-pointer" onClick={() => toggleExpand(blog._id)}>
                    {blog.title}
                  </h3>

                  <div className="flex items-center justify-between text-xs text-[#ACBFA4] font-bold uppercase tracking-widest mb-6 pb-6 border-b border-[#444444]">
                    <span className="flex items-center gap-2">
                      <User className="w-4 h-4 text-[#FF7F11]" /> {blog.author}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#FF7F11]" /> {blog.readTime} min
                    </span>
                  </div>

                  <div
                    className={`text-[#E2E8CE]/80 text-base leading-loose transition-all duration-500 ease-in-out overflow-hidden relative ${
                      open ? "max-h-[1000px] opacity-100" : "max-h-24 opacity-80"
                    }`}
                  >
                     {!open && <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#333333] to-transparent pointer-events-none" />}
                    <p className="whitespace-pre-wrap font-serif">{blog.markdown}</p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#444444] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => bookmark(blog._id)}
                      className={`p-3 rounded-full transition-all duration-300 border ${
                        blog.isBookmarked
                          ? "bg-[#FF7F11] border-[#FF7F11] text-[#262626]"
                          : "bg-transparent border-[#555555] text-[#ACBFA4] hover:border-[#E2E8CE] hover:text-[#E2E8CE]"
                      }`}
                    >
                      <Bookmark className="w-5 h-5" fill={blog.isBookmarked ? "currentColor" : "none"} />
                    </button>
                    <button
                      onClick={() => share(blog._id)}
                      className="p-3 rounded-full bg-transparent border border-[#555555] text-[#ACBFA4] hover:text-[#E2E8CE] hover:border-[#E2E8CE] transition-all"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>

                  <button
                    onClick={() => toggleExpand(blog._id)}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#262626] border border-[#444444] text-[#E2E8CE] text-xs font-bold uppercase tracking-widest hover:bg-[#FF7F11] hover:text-[#262626] hover:border-[#FF7F11] transition-all"
                  >
                    {open ? (
                      <>
                        Close <ChevronUp className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        Read <ChevronDown className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#262626] text-[#E2E8CE] py-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 border-b border-[#333333] pb-10">
          <div className="text-center md:text-left md:flex-1">
            <h2 className="text-5xl md:text-6xl font-black text-[#E2E8CE] tracking-tighter mb-4">
              Explore <span className="text-[#FF7F11]">Ideas</span>
            </h2>
            <p className="text-[#ACBFA4] text-lg font-medium max-w-xl">
              Curated perspectives on technology, design, and sustainable growth.
            </p>
          </div>

          <a
            href="/career-blogs-write"
            className="flex items-center gap-2 px-8 py-4 rounded-full bg-[#FF7F11] text-[#262626] font-black hover:bg-[#e06c09] shadow-xl shadow-orange-500/20 hover:-translate-y-1 transition-all uppercase tracking-wide text-sm mt-8 md:mt-0"
          >
            Start Writing
          </a>
        </div>

        {/* Search */}
        <div className="relative mb-20 max-w-2xl mx-auto">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#ACBFA4] w-6 h-6" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by keyword or author..."
            className="w-full pl-16 pr-8 py-5 rounded-full bg-[#333333] border border-[#444444] text-[#E2E8CE] placeholder-[#666666] font-medium text-lg focus:outline-none focus:border-[#FF7F11] focus:ring-1 focus:ring-[#FF7F11] transition-all shadow-xl"
          />
        </div>

        {renderContent()}
      </div>

      {toast && <MessageToast message={toast.text} type={toast.type} />}
    </div>
  );
}
