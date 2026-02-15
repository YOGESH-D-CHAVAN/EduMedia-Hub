// CompanyReview.jsx - Earthy Theme with Functional Backend Integration
import React, { useState, useMemo, useCallback, useEffect } from "react";
import { BsStar, BsStarFill, BsPlus, BsFilter, BsSortDown, BsSortUp } from "react-icons/bs";
import { Loader } from "lucide-react";

const CompanyReview = () => {
    // ---- Dummy data (Fallback) ----
    const initialReviews = [
        {
            _id: 1,
            company: "Google",
            logo: "https://logo.clearbit.com/google.com",
            role: "Software Engineer",
            location: "Mountain View, CA",
            overall: 5, workLife: 5, culture: 5, salary: 5, benefits: 5,
            recommend: true,
            pros: "Great perks, smart colleagues, impactful projects, excellent career mobility.",
            cons: "Can be overwhelming for juniors, bureaucratic approval processes.",
            interview: "2 phone screens → 5 on-sites (coding, system design) → offer",
            date: "2025-06-20",
        },
        {
            _id: 2,
            company: "Amazon",
            logo: "https://logo.clearbit.com/amazon.com",
            role: "SDE-1",
            location: "Seattle, WA",
            overall: 4, workLife: 3, culture: 4, salary: 5, benefits: 4,
            recommend: true,
            pros: "High ownership, fast promotions, stock upside, exposure to massive scale systems.",
            cons: "On-call load, frugal culture, stack ranking can be stressful.",
            interview: "OA → phone → 4 on-site (LP focus) → offer",
            date: "2025-06-18",
        },
    ];

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [sortBy, setSortBy] = useState("date"); 
    const [sortOrder, setSortOrder] = useState("desc");
    const [filterRecommend, setFilterRecommend] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const [form, setForm] = useState({
        company: "", logo: "", role: "", location: "",
        overall: 0, workLife: 0, culture: 0, salary: 0, benefits: 0,
        recommend: true, pros: "", cons: "", interview: "",
    });

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await fetch("http://localhost:5001/api/v1/company-reviews");
                const data = await res.json();
                if (res.ok && Array.isArray(data.data)) {
                    setReviews(data.data.length > 0 ? data.data : initialReviews);
                } else {
                    setReviews(initialReviews);
                }
            } catch (error) {
                console.error("Failed to fetch reviews:", error);
                setReviews(initialReviews);
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, []);

    const StarRating = ({ value, setValue, readonly = false, size = "text-xl" }) => (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
                <button
                    key={i}
                    type="button"
                    onClick={() => !readonly && setValue(i)}
                    className={`${size} ${i <= value ? "text-[#FF7F11]" : "text-[#444444]"} ${!readonly && "hover:scale-110 transition"} transition`}
                    disabled={readonly}
                >
                    {i <= value ? <BsStarFill /> : <BsStar />}
                </button>
            ))}
        </div>
    );

    const filteredAndSortedReviews = useMemo(() => {
        let sorted = [...reviews];

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            sorted = sorted.filter(r =>
                r.company.toLowerCase().includes(query) ||
                r.role.toLowerCase().includes(query) ||
                r.location.toLowerCase().includes(query) ||
                r.pros.toLowerCase().includes(query)
            );
        }

        if (filterRecommend !== "all") {
            const rec = filterRecommend === "yes";
            sorted = sorted.filter(r => r.recommend === rec);
        }

        sorted.sort((a, b) => {
            let comparison = 0;
            // Use createdAt or date depending on data source (mock vs api)
            const dateA = new Date(a.createdAt || a.date);
            const dateB = new Date(b.createdAt || b.date);
            
            if (sortBy === "overall") {
                comparison = a.overall - b.overall;
            } else if (sortBy === "date") {
                comparison = dateA - dateB;
            }
            return sortOrder === "asc" ? comparison : comparison * -1;
        });

        return sorted;
    }, [reviews, sortBy, sortOrder, filterRecommend, searchQuery]);

    const summary = useMemo(() => {
        if (reviews.length === 0) return null;
        const categories = ["overall", "workLife", "culture", "salary", "benefits"];
        const totals = {};
        let recommendedCount = 0;

        categories.forEach(cat => totals[cat] = 0);
        reviews.forEach(r => {
            categories.forEach(cat => totals[cat] += r[cat]);
            if (r.recommend) recommendedCount++;
        });

        const averages = {};
        categories.forEach(cat => averages[cat] = (totals[cat] / reviews.length).toFixed(1));

        return {
            ...averages,
            totalReviews: reviews.length,
            recommendationRate: ((recommendedCount / reviews.length) * 100).toFixed(0) + "%"
        };
    }, [reviews]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.overall === 0) {
            alert("Please provide an overall rating.");
            return;
        }
        setSubmitting(true);
        
        try {
            const token = localStorage.getItem("authToken");
            const res = await fetch("http://localhost:5001/api/v1/company-reviews", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            
            if (res.ok) {
                setReviews([data.data, ...reviews]);
                setShowForm(false);
                setForm({
                    company: "", logo: "", role: "", location: "",
                    overall: 0, workLife: 0, culture: 0, salary: 0, benefits: 0,
                    recommend: true, pros: "", cons: "", interview: "",
                });
            } else {
                alert(data.message || "Failed to submit review.");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleSortChange = (newSortBy) => {
        if (sortBy === newSortBy) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortBy(newSortBy);
            setSortOrder("desc");
        }
    };

    const SortIcon = useCallback((field) => {
        if (sortBy !== field) return <BsSortDown className="w-4 h-4 text-[#666666]" />;
        return sortOrder === "desc" 
            ? <BsSortDown className="w-4 h-4 text-[#FF7F11]" />
            : <BsSortUp className="w-4 h-4 text-[#FF7F11]" />;
    }, [sortBy, sortOrder]);

    const inputClasses = "w-full px-5 py-3 rounded-xl bg-[#262626] border border-[#444444] text-[#E2E8CE] placeholder-[#666666] focus:outline-none focus:ring-1 focus:ring-[#FF7F11] font-bold shadow-inner";

    return (
        <div className="min-h-screen bg-[#262626] text-[#E2E8CE] py-16 px-6 font-sans selection:bg-[#FF7F11] selection:text-[#262626]">
            
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16 border-b border-[#333333] pb-8">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-black text-[#E2E8CE] tracking-tight mb-2">
                             Company <span className="text-[#FF7F11]">Reviews</span>
                        </h2>
                        <p className="text-[#ACBFA4] font-medium text-lg">Real employee insights. Unfiltered.</p>
                    </div>
                    <button
                        onClick={() => setShowForm((s) => !s)}
                        className="flex items-center gap-2 px-8 py-3 rounded-full bg-[#FF7F11] text-[#262626] font-black uppercase tracking-widest text-sm hover:bg-[#e06c09] transition-all shadow-lg shadow-orange-500/20 active:translate-y-0.5"
                    >
                        <BsPlus className="text-xl" /> {showForm ? "Close Form" : "Add Review"}
                    </button>
                </div>

                {/* Summary Card */}
                {summary && (
                    <div className="bg-[#333333] border border-[#444444] rounded-[2rem] p-8 mb-12 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#ACBFA4]/5 rounded-full blur-[80px] pointer-events-none"></div>
                        <h3 className="text-xs font-bold text-[#ACBFA4] uppercase tracking-widest mb-6 border-b border-[#444444] pb-2">Market Overview</h3>
                        <div className="grid grid-cols-2 md:grid-cols-6 gap-6 relative z-10">
                            {Object.entries(summary).filter(([key]) => key !== 'totalReviews' && key !== 'recommendationRate').map(([key, value]) => (
                                <div key={key} className="text-center p-4 rounded-2xl bg-[#262626] border border-[#444444] shadow-md">
                                    <div className="text-[#666666] text-xs font-bold uppercase mb-2">
                                        {key === 'workLife' ? "Work/Life" : key}
                                    </div>
                                    <div className="text-4xl font-black text-[#E2E8CE]">
                                        {value}
                                    </div>
                                </div>
                            ))}
                            <div className="text-center p-4 rounded-2xl bg-[#262626] border border-[#444444] shadow-md">
                                <div className="text-[#666666] text-xs font-bold uppercase mb-2">Approval</div>
                                <div className="text-4xl font-black text-[#FF7F11]">{summary.recommendationRate}</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Form */}
                {showForm && (
                     <div className="p-10 rounded-[2rem] bg-[#333333] border border-[#444444] shadow-2xl mb-12 animate-fade-in relative z-20">
                        <h3 className="text-2xl font-black mb-8 text-[#E2E8CE] tracking-tight">Submit Feedback</h3>
                        <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
                            <input name="company" value={form.company} onChange={handleChange} placeholder="Company Name" required className={inputClasses} />
                            <input name="role" value={form.role} onChange={handleChange} placeholder="Role Title" required className={inputClasses} />
                            <input name="location" value={form.location} onChange={handleChange} placeholder="Location" required className={inputClasses} />
                            <input name="logo" value={form.logo} onChange={handleChange} placeholder="Logo URL (Optional)" className={inputClasses} />

                            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-5 gap-4 bg-[#262626] p-6 rounded-2xl border border-[#444444]">
                                {["overall", "workLife", "culture", "salary", "benefits"].map((cat) => (
                                    <div key={cat} className="text-center">
                                        <label className="block text-xs font-bold text-[#ACBFA4] uppercase mb-2">{cat}</label>
                                        <div className="flex justify-center"><StarRating value={form[cat]} setValue={(v) => setForm((f) => ({ ...f, [cat]: v }))} /></div>
                                    </div>
                                ))}
                            </div>

                            <textarea name="pros" value={form.pros} onChange={handleChange} placeholder="Pros..." required className={`${inputClasses} md:col-span-2 resize-none h-24`} />
                            <textarea name="cons" value={form.cons} onChange={handleChange} placeholder="Cons..." required className={`${inputClasses} md:col-span-2 resize-none h-24`} />
                            
                            <div className="md:col-span-2 flex items-center gap-4 bg-[#262626] p-4 rounded-xl border border-[#444444] w-fit">
                                <input id="rec" type="checkbox" name="recommend" checked={form.recommend} onChange={handleChange} className="w-5 h-5 accent-[#FF7F11] cursor-pointer" />
                                <label htmlFor="rec" className="text-sm font-bold text-[#E2E8CE] cursor-pointer uppercase tracking-wide">Recommend to a friend?</label>
                            </div>

                            <button disabled={submitting} type="submit" className="md:col-span-2 py-4 rounded-xl bg-[#FF7F11] text-[#262626] font-black text-lg uppercase tracking-widest hover:bg-[#e06c09] transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2">
                                {submitting ? <Loader className="w-5 h-5 animate-spin"/> : "Publish Review"}
                            </button>
                        </form>
                    </div>
                )}

                {/* Controls */}
                <div className="flex flex-wrap gap-4 items-center mb-10 p-6 rounded-2xl bg-[#333333] border border-[#444444]">
                    <BsFilter className="text-[#FF7F11] text-xl" />
                    <input 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search reviews..."
                        className="bg-[#262626] border border-[#444444] rounded-xl px-4 py-2 text-[#E2E8CE] font-bold text-sm focus:outline-none focus:border-[#FF7F11] flex-grow shadow-inner"
                    />
                     <select
                        value={filterRecommend}
                        onChange={(e) => setFilterRecommend(e.target.value)}
                        className="bg-[#262626] border border-[#444444] rounded-xl px-4 py-2 text-[#ACBFA4] font-bold text-sm focus:outline-none cursor-pointer"
                    >
                        <option value="all">All Status</option>
                        <option value="yes">Recommended</option>
                        <option value="no">Not Recommended</option>
                    </select>
                </div>

                {/* List */}
                <div className="grid gap-8">
                    {loading ? (
                         <div className="text-center py-20"><div className="animate-spin w-12 h-12 border-4 border-[#333333] border-t-[#FF7F11] rounded-full mx-auto"></div></div>
                    ) : (
                    filteredAndSortedReviews.map((r) => (
                        <div key={r._id || r.id} className="group bg-[#333333] border border-[#444444] rounded-[2.5rem] p-8 hover:border-[#FF7F11] transition-all duration-500 shadow-xl relative overflow-hidden">
                            <div className="flex flex-wrap justify-between items-start gap-6 mb-8 relative z-10">
                                <div className="flex items-center gap-6">
                                     <div className="w-20 h-20 bg-white rounded-2xl p-2 flex items-center justify-center shadow-lg">
                                        <img src={r.logo} alt={r.company} className="max-w-full max-h-full object-contain" onError={(e) => { e.target.onerror=null; e.target.style.display='none'}} />
                                     </div>
                                     <div>
                                         <h3 className="text-3xl font-black text-[#E2E8CE] group-hover:text-[#FF7F11] transition-colors">{r.company}</h3>
                                         <p className="text-[#ACBFA4] font-medium text-lg">{r.role}</p>
                                         <p className="text-[#666666] text-sm font-bold uppercase tracking-wide mt-1">{r.location}</p>
                                     </div>
                                </div>
                                <div className="text-right bg-[#262626] px-6 py-4 rounded-2xl border border-[#444444]">
                                    <div className="text-5xl font-black text-[#FF7F11]">{r.overall}</div>
                                    <div className="text-[10px] font-bold text-[#ACBFA4] uppercase tracking-widest mt-1">Overall</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 relative z-10">
                                <div className="bg-[#262626] p-6 rounded-2xl border border-[#444444]">
                                    <span className="text-[#FF7F11] font-black uppercase text-xs tracking-widest block mb-2">Pros</span>
                                    <p className="text-[#E2E8CE] leading-relaxed font-medium">{r.pros}</p>
                                </div>
                                <div className="bg-[#262626] p-6 rounded-2xl border border-[#444444]">
                                    <span className="text-[#ACBFA4] font-black uppercase text-xs tracking-widest block mb-2">Cons</span>
                                    <p className="text-[#E2E8CE]/80 leading-relaxed font-medium">{r.cons}</p>
                                </div>
                            </div>

                            <div className="border-t border-[#444444] pt-6 flex justify-between items-center relative z-10">
                                <div className="flex items-center gap-2">
                                    <div className={`w-3 h-3 rounded-full ${r.recommend ? 'bg-[#FF7F11]' : 'bg-[#666666]'}`} />
                                    <span className="text-xs font-bold uppercase tracking-widest text-[#ACBFA4]">
                                        {r.recommend ? "Recommended" : "Not Recommended"}
                                    </span>
                                </div>
                                <span className="text-[10px] font-bold text-[#666666] uppercase tracking-widest">{new Date(r.createdAt || r.date).toLocaleDateString()}</span>
                            </div>
                        </div>
                    )))}
                </div>
            </div>
        </div>
    );
}

export default CompanyReview;
