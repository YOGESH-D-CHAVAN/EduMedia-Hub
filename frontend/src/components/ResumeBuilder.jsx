// ResumeBuilder.jsx - Earthy Theme
import React, { useReducer, useRef, useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Download, Trash, Plus, Minus, Upload, Grip, Check, AlertCircle, Image as ImageIcon, Code, Eye, FileText, ArrowLeft } from "lucide-react";

// --- Initial Data ---
const initialResumeData = {
    personal: {
        name: 'ELARA VANCE',
        title: 'Senior Product Manager & Technical Lead',
        email: 'elara.vance@innovate.co',
        phone: '(555) 987-6543',
        linkedin: 'linkedin.com/in/elaravance',
        github: 'github.com/elaradev',
        website: 'elaravance.dev',
        location: 'Austin, TX',
        photo: null,
    },
    summary: 'Seasoned and results-driven Product Leader with 8+ years of experience steering cross-functional teams to deliver high-impact SaaS solutions that have generated over $50M in revenue. Expertise in product strategy, agile methodologies, and technical leadership.',
    skills: ['Product Strategy', 'Agile (Scrum/Kanban)', 'SQL', 'Python', 'JIRA', 'Figma', 'React', 'Node.js', 'Data Analytics', 'Team Leadership'],
    experience: [
        { id: 1, title: 'Senior Product Manager', company: 'NexusTech Solutions', location: 'Austin, TX', startDate: 'Jan 2021', endDate: 'Present', description: ['Led product strategy for a B2B SaaS platform serving 500k+ users, resulting in 40% YoY revenue growth', 'Managed a cross-functional team of 12 engineers, designers, and analysts using Agile methodology', 'Defined and executed product roadmap that reduced churn by 25% and increased NPS from 32 to 68'] },
        { id: 2, title: 'Product Manager', company: 'CloudFlow Inc', location: 'San Francisco, CA', startDate: 'Mar 2018', endDate: 'Dec 2020', description: ['Launched 3 major product features that increased user engagement by 60%', 'Conducted user research with 200+ customers to identify pain points and opportunities', 'Collaborated with engineering to reduce technical debt by 30% while maintaining feature velocity'] }
    ],
    projects: [
        { id: 1, title: 'AI-Powered Resume Grader', link: 'github.com/elaradev/resume-grader', year: '2023', description: ['Built full-stack React/Node.js application that provides real-time resume feedback using NLP', 'Implemented PDF parsing and analysis engine processing 1000+ documents daily', 'Achieved 95% accuracy in skill extraction and ATS compatibility scoring'] },
        { id: 2, title: 'Product Analytics Dashboard', link: 'github.com/elaradev/analytics-dash', year: '2022', description: ['Developed real-time analytics dashboard using D3.js and WebSockets', 'Reduced reporting time from 4 hours to 15 minutes for executive team', 'Implemented predictive analytics features that improved forecasting accuracy by 35%'] }
    ],
    education: [
        { id: 1, degree: 'Master of Business Administration (MBA)', institution: 'University of Texas at Austin', location: 'Austin, TX', year: '2019', details: 'Concentration: Technology Commercialization & AI Ethics. GPA: 3.8/4.0' },
        { id: 2, degree: 'Bachelor of Science in Computer Science', institution: 'Georgia Tech', location: 'Atlanta, GA', year: '2015', details: 'Minor: Cognitive Psychology. Dean\'s List (4 years), Summa Cum Laude' }
    ],
    certifications: [
        { id: 1, name: 'Certified ScrumMaster (CSM)', issuer: 'Scrum Alliance', year: '2022', details: 'Advanced agile methodologies and team facilitation' },
        { id: 2, name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', year: '2021', details: 'Cloud architecture and distributed systems design' }
    ],
    settings: {
        template: 'modern',
        primaryColor: '#1f2937', 
        fontSize: 'text-sm',
        showPhoto: false,
        showProjects: true,
        showCertifications: true,
        showSummary: true,
        showSkills: true,
    }
};

// --- Reducer ---
const reducer = (state, action) => {
    switch (action.type) {
        case 'LOAD_STATE': return action.payload;
        case 'UPDATE_FIELD':
            return {
                ...state,
                [action.section]: action.field ? { ...state[action.section], [action.field]: action.value } : action.value
            };
        case 'ADD_ITEM':
            return { ...state, [action.section]: [...state[action.section], { id: Date.now(), ...action.payload }] };
        case 'UPDATE_ITEM':
            return { ...state, [action.section]: state[action.section].map(item => item.id === action.id ? { ...item, ...action.payload } : item) };
        case 'REMOVE_ITEM':
            return { ...state, [action.section]: state[action.section].filter(item => item.id !== action.id) };
        case 'MOVE_ITEM':
            const items = [...state[action.section]];
            const [movedItem] = items.splice(action.fromIndex, 1);
            items.splice(action.toIndex, 0, movedItem);
            return { ...state, [action.section]: items };
        case 'UPDATE_BULLET_POINT':
            return { ...state, [action.section]: state[action.section].map(item => {
                if (item.id === action.id) {
                    const newDesc = [...item.description];
                    newDesc[action.index] = action.value;
                    return { ...item, description: newDesc };
                }
                return item;
            })};
        case 'ADD_BULLET_POINT':
            return { ...state, [action.section]: state[action.section].map(item => item.id === action.id ? { ...item, description: [...item.description, ''] } : item) };
        case 'REMOVE_BULLET_POINT':
            return { ...state, [action.section]: state[action.section].map(item => item.id === action.id ? { ...item, description: item.description.filter((_, i) => i !== action.index) } : item) };
        case 'ADD_SKILL':
            return { ...state, skills: [...state.skills, action.payload] };
        case 'REMOVE_SKILL':
            return { ...state, skills: state.skills.filter((_, i) => i !== action.index) };
        case 'UPDATE_SKILL':
            const newSkills = [...state.skills];
            newSkills[action.index] = action.payload;
            return { ...state, skills: newSkills };
        case 'UPDATE_SETTINGS':
            return { ...state, settings: { ...state.settings, ...action.payload } };
        default: return state;
    }
};

// --- Utility: Resume Score ---
const calculateResumeScore = (data) => {
    let score = 0;
    if (data.personal.name.length > 3) score += 10;
    if (data.personal.email.length > 5) score += 10;
    if (data.summary.length > 50) score += 15;
    if (data.skills.length >= 5) score += 15;
    if (data.experience.length > 0) score += 20;
    if (data.education.length > 0) score += 10;
    if (data.experience.some(exp => exp.description.length >= 2)) score += 10;
    if (data.personal.photo) score += 5;
    if (data.projects.length > 0) score += 5;
    return Math.min(score, 100);
};

// --- Preview Components ---
// Minimalist, Modern, Classic Templates (Simplified for brevity but styled)
const ModernHeader = ({ personal, settings }) => (
    <div className={`pb-6 mb-6 border-b-2 border-[#1f2937]`}>
        <div className="flex items-center gap-6">
             {settings.showPhoto && personal.photo && (
                <img src={personal.photo} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-[#e5e7eb]" />
            )}
            <div className="flex-1">
                <h1 className="font-extrabold text-4xl mb-1 text-[#111827] uppercase tracking-tight">{personal.name}</h1>
                <p className="text-xl text-[#4b5563] font-medium mb-3">{personal.title}</p>
                <div className="text-sm text-[#6b7280] flex flex-wrap gap-4 font-medium">
                    <span>{personal.phone}</span>
                    <span>•</span>
                    <span>{personal.email}</span>
                    {personal.location && <><span>•</span><span>{personal.location}</span></>}
                    {personal.linkedin && <><span>•</span><span>{personal.linkedin}</span></>}
                </div>
            </div>
        </div>
    </div>
);

const ClassicHeader = ({ personal, settings }) => (
    <div className="text-center mb-8 pb-6 border-b border-[#d1d5db]">
        <h1 className="font-serif text-3xl mb-2 text-[#111827] tracking-wide">{personal.name}</h1>
        <p className="text-md text-[#4b5563] mb-2 italic">{personal.title}</p>
        <div className="text-sm text-[#6b7280] font-serif flex flex-wrap justify-center gap-3">
             <span>{personal.email}</span> | <span>{personal.phone}</span> | <span>{personal.location}</span>
        </div>
    </div>
);

const CreativeHeader = ({ personal, settings }) => (
    <div className="bg-[#111827] text-[#ffffff] p-8 -mx-12 -mt-12 mb-8 flex items-center justify-between">
        <div>
            <h1 className="font-bold text-5xl mb-2 tracking-tighter">{personal.name && personal.name.split(' ')[0]} <span className="text-[#2563EB]">{personal.name && personal.name.split(' ').slice(1).join(' ')}</span></h1>
            <p className="text-xl text-[#9ca3af]">{personal.title}</p>
        </div>
        <div className="text-right text-sm text-[#9ca3af] space-y-1">
             <div className="font-mono">{personal.email}</div>
             <div className="font-mono">{personal.phone}</div>
             <div className="font-mono">{personal.website}</div>
        </div>
    </div>
);



const Section = ({ title, children }) => (
    <div className="mb-8">
        <h2 className="text-sm font-black border-b-2 border-[#1f2937] pb-2 mb-4 uppercase tracking-widest text-[#1f2937]">
            {title}
        </h2>
        {children}
    </div>
);

const DetailEntry = ({ item }) => (
    <div className="mb-6 text-left group">
        <div className="flex justify-between items-baseline mb-1">
            <h3 className="font-bold text-lg text-[#111827]">{item.title || item.degree || item.name}</h3>
            <span className="text-sm text-[#6b7280] font-medium whitespace-nowrap">{item.year || `${item.startDate} - ${item.endDate}`}</span>
        </div>
        <div className="text-sm text-[#4b5563] font-medium mb-2 italic">
            {item.company || item.institution || item.issuer} {item.location && `— ${item.location}`}
        </div>
         {item.link && <div className="text-xs text-[#2563eb] mb-2 font-mono">{item.link}</div>}
        {item.description && (
            <ul className="list-disc ml-4 text-sm text-[#374151] space-y-1.5 leading-relaxed marker:text-[#9ca3af]">
                {item.description.map((pt, i) => pt && <li key={i}>{pt}</li>)}
            </ul>
        )}
    </div>
);

const ResumePreview = React.forwardRef(({ data }, ref) => {
    const { settings } = data;
    return (
        <div 
            ref={ref} 
            id="resume-content" 
            className="bg-[#ffffff] p-12 shadow-2xl w-[210mm] min-h-[297mm] mx-auto text-[#000000] text-sm leading-relaxed"
        >
            {settings.template === 'modern' && <ModernHeader personal={data.personal} settings={settings} />}
            {settings.template === 'classic' && <ClassicHeader personal={data.personal} settings={settings} />}
            {settings.template === 'creative' && <CreativeHeader personal={data.personal} settings={settings} />}
            
            {settings.showSummary && data.summary && (
                <Section title="Summary">
                    <p className="text-[#374151] leading-relaxed font-medium">{data.summary}</p>
                </Section>
            )}
            
            {settings.showSkills && data.skills.length > 0 && (
                <Section title="Skills">
                    <div className="flex flex-wrap gap-2">
                        {data.skills.map((skill, i) => (
                            <span key={i} className="px-3 py-1 text-xs font-bold rounded bg-[#f3f4f6] text-[#1f2937] border border-[#e5e7eb]">
                                {skill}
                            </span>
                        ))}
                    </div>
                </Section>
            )}
            
            {data.experience.length > 0 && (
                <Section title="Experience">
                    {data.experience.map(exp => <DetailEntry key={exp.id} item={exp} />)}
                </Section>
            )}

            {data.education.length > 0 && (
                <Section title="Education">
                    {data.education.map(edu => <DetailEntry key={edu.id} item={edu} />)}
                </Section>
            )}
            
            {settings.showProjects && data.projects.length > 0 && (
                <Section title="Projects">
                    {data.projects.map(proj => <DetailEntry key={proj.id} item={proj} />)}
                </Section>
            )}
        </div>
    );
});

// --- Editor Components ---
const InputField = ({ label, value, onChange, placeholder }) => (
    <div className="mb-4">
        <label className="block text-xs font-black text-[#64748B] uppercase tracking-widest mb-2">{label}</label>
        <input 
            className="w-full bg-[#FFFFFF] text-[#1E3A8A] p-3 rounded-xl border border-[#E2E8F0] focus:border-[#2563EB] outline-none transition font-medium placeholder-[#64748B]"
            value={value || ''} 
            onChange={onChange}
            placeholder={placeholder}
        />
    </div>
);

const TextAreaField = ({ label, value, onChange, rows = 4, placeholder }) => (
    <div className="mb-4">
        <label className="block text-xs font-black text-[#64748B] uppercase tracking-widest mb-2">{label}</label>
        <textarea 
            rows={rows}
            className="w-full bg-[#FFFFFF] text-[#1E3A8A] p-3 rounded-xl border border-[#E2E8F0] focus:border-[#2563EB] outline-none transition resize-none font-medium placeholder-[#64748B]"
            value={value || ''} 
            onChange={onChange}
            placeholder={placeholder}
        />
    </div>
);

const CollapsibleSection = ({ title, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className="bg-[#FFFFFF] rounded-[1.5rem] border border-[#E2E8F0] overflow-hidden mb-4">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 py-4 flex justify-between items-center hover:bg-[#F0F9FF] transition font-bold text-[#1E3A8A]"
            >
                <span className="uppercase tracking-wide text-sm">{title}</span>
                <span className={`transform transition ${isOpen ? 'rotate-180' : ''} text-[#2563EB]`}>▼</span>
            </button>
            {isOpen && <div className="px-6 py-6 border-t border-[#E2E8F0] bg-[#F0F9FF]">{children}</div>}
        </div>
    );
};

// --- Main App ---
const ResumeBuilder = () => {
    const [data, dispatch] = useReducer(reducer, initialResumeData);
    const [activeTab, setActiveTab] = useState('personal');
    const previewRef = useRef(null);
    const fileInputRef = useRef(null);
    
    // Auto-save
    useEffect(() => {
        const saved = localStorage.getItem('resumeBuilderData');
        if (saved) dispatch({ type: 'LOAD_STATE', payload: JSON.parse(saved) });
    }, []);
    
    useEffect(() => {
        localStorage.setItem('resumeBuilderData', JSON.stringify(data));
    }, [data]);

    const downloadPDF = async () => {
        const element = previewRef.current;
        if (!element) {
            alert("Preview element not found");
            return;
        }

        try {
            // Use html2canvas with better settings
            const canvas = await html2canvas(element, { 
                scale: 2, // Higher resolution
                useCORS: true, // Handle cross-origin images (Cloudinary)
                logging: false,
                windowWidth: element.scrollWidth, // Ensure full width is captured
                windowHeight: element.scrollHeight
            });

            const imgData = canvas.toDataURL("image/png");
            
            // Calculate A4 dimensions
            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            
            const imgProperties = pdf.getImageProperties(imgData);
            const imgRatio = imgProperties.width / imgProperties.height;
            
            // Calculate height of image in PDF based on width
            const pdfImgHeight = pdfWidth / imgRatio;

            // If content is roughly 1 page (allow small overflow), fit to page. 
            // Otherwise, we might need a different strategy, but for now let's use the full height 
            // or split (splitting is complex with just an image).
            // Let's render as is. If it's taller than A4, we should probably add a new page or let it spill (but jsPDF A4 is fixed).
            // For a resume, often we want it to fit A4. 
            
            // Strategy: Create a PDF that fits the content exactly to avoid cutting off text.
            // Standard A4 is 210mm x 297mm.
            
            let finalPdf;
            if (pdfImgHeight > pdfHeight) {
                 // Content is longer than A4, create a custom-sized single page PDF
                 finalPdf = new jsPDF("p", "mm", [pdfWidth, pdfImgHeight]);
                 finalPdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfImgHeight);
            } else {
                 // Content fits in A4
                 finalPdf = pdf;
                 finalPdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfImgHeight);
            }

            finalPdf.save(`${data.personal.name.replace(/\s/g, '_')}_Resume.pdf`);

        } catch (error) {
            console.error("PDF generation failed", error);
            alert("Failed to generate PDF. Please try again.");
        }
    };

    const score = useMemo(() => calculateResumeScore(data), [data]);

    // --- New Unique Features ---
    const handleGithubImport = async () => {
        const username = prompt("Enter your GitHub username to auto-fill details:");
        if (!username) return;

        try {
            const userRes = await fetch(`https://api.github.com/users/${username}`);
            const userJson = await userRes.json();
            
            if (userJson.message === "Not Found") {
                alert("User not found!");
                return;
            }

            const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`);
            const reposJson = await reposRes.json();

            // Construct new state
            const newData = {
                ...data,
                personal: {
                    ...data.personal,
                    name: userJson.name || username,
                    location: userJson.location || data.personal.location,
                    website: userJson.blog || data.personal.website,
                    github: `github.com/${username}`,
                    photo: userJson.avatar_url,
                    title: userJson.bio || "Software Engineer", 
                },
                projects: reposJson.map(repo => ({
                    id: repo.id,
                    title: repo.name,
                    link: repo.html_url.replace('https://', ''),
                    year: new Date(repo.updated_at).getFullYear().toString(),
                    description: [repo.description || "Open source contribution.", `Star count: ${repo.stargazers_count}`, `Language: ${repo.language || 'N/A'}`]
                })),
                skills: [...new Set([...data.skills, ...reposJson.map(r => r.language).filter(Boolean)])]
            };
            
            dispatch({ type: 'LOAD_STATE', payload: newData });
            alert("Imported data from GitHub!");
        } catch (e) {
            console.error(e);
            alert("Failed to fetch GitHub data.");
        }
    };

    const aiPolish = (text) => {
        const replacements = {
            "worked on": "engineered",
            "made": "developed",
            "helped": "facilitated",
            "used": "utilized",
            "fixed": "resolved",
            "saw": "identified",
            "changed": "transformed",
            "led": "spearheaded",
            "managed": "orchestrated",
        };
        let newText = text;
        Object.keys(replacements).forEach(key => {
            const regex = new RegExp(`\\b${key}\\b`, "gi");
            newText = newText.replace(regex, replacements[key]);
        });
        return newText;
    };

    return (
        <div className="min-h-screen bg-[#F0F9FF] text-[#1E3A8A] font-sans selection:bg-[#2563EB] selection:text-[#F0F9FF] p-4 md:p-6 lg:p-10 relative">
            
            {/* Background Ambience */}
            <Helmet>
                <title>Free AI Resume Builder | Create ATS-Friendly CVs - EduMedia</title>
                <meta name="description" content="Build a professional, ATS-friendly resume in minutes with EduMedia's free AI Resume Builder. Choose from modern templates and download as PDF." />
                <meta name="keywords" content="resume builder, free cv maker, ai resume, ats friendly resume, curriculum vitae, resume templates, job application" />
            </Helmet>
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
                 <div className="absolute top-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-[#2563EB]/5 rounded-full blur-[100px]"></div>
                 <div className="absolute bottom-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-[#475569]/5 rounded-full blur-[100px]"></div>
            </div>

            {/* Header */}
            <div className="max-w-[1920px] mx-auto mb-6 md:mb-10 relative z-10 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
                <div>
                     <div className="flex items-center gap-3 mb-2 md:mb-4">
                        <Link to={localStorage.getItem("userRole") === "teacher" ? "/teacher" : "/student"} className="p-2 bg-[#FFFFFF] rounded-full text-[#475569] hover:text-[#2563EB] hover:bg-[#E2E8F0] transition border border-[#E2E8F0]">
                            <ArrowLeft className="w-4 h-4" />
                        </Link>
                        <div className="inline-block px-4 py-1.5 rounded-full border border-[#E2E8F0] bg-[#FFFFFF] text-[#475569] font-bold text-[10px] md:text-xs uppercase tracking-widest shadow-md">
                            Beta v2.0
                        </div>
                     </div>
                    <h1 className="text-3xl md:text-4xl font-black text-[#1E3A8A] tracking-tighter">Resume <span className="text-[#2563EB]">Architect</span></h1>
                    <p className="text-[#475569] font-medium mt-1 text-sm md:text-base">Build professional, ATS-friendly resumes in minutes.</p>
                </div>

                <div className="flex flex-col md:flex-row w-full xl:w-auto items-start md:items-center gap-4 bg-[#FFFFFF] p-4 md:p-2 rounded-2xl border border-[#E2E8F0] shadow-xl">
                      <div className="flex flex-wrap gap-2 w-full md:w-auto">
                        <button onClick={handleGithubImport} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-[#F0F9FF] border border-[#E2E8F0] text-[#1E3A8A] rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-[#FFFFFF] hover:text-[#2563EB] transition">
                            <Code className="w-4 h-4" /> <span className="hidden sm:inline">Import GitHub</span><span className="sm:hidden">GitHub</span>
                        </button>
                        <div className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#F0F9FF] border border-[#E2E8F0]">
                            <span className="text-[#64748B] text-[10px] md:text-xs font-black uppercase tracking-widest">Score</span>
                            <span className={`text-lg md:text-xl font-black ${score >= 80 ? 'text-[#2563EB]' : 'text-[#475569]'}`}>{score}</span>
                        </div>
                      </div>
                    
                     {/* Theme Selector */}
                     <div className="w-full md:w-auto mb-2 md:mb-0 bg-[#FFFFFF] md:bg-transparent rounded-xl border md:border-none border-[#E2E8F0] p-3 md:p-0 flex items-center justify-between gap-3">
                        <span className="text-[10px] md:text-xs font-black uppercase text-[#475569] tracking-widest whitespace-nowrap">Layout Style</span>
                        <div className="flex gap-2 overflow-x-auto no-scrollbar">
                             {['modern', 'classic', 'creative'].map(t => (
                                 <button 
                                    key={t} 
                                    onClick={() => dispatch({ type: 'UPDATE_SETTINGS', payload: { template: t } })}
                                    className={`px-3 py-1 rounded-lg text-[10px] md:text-xs font-bold uppercase whitespace-nowrap ${data.settings.template === t ? 'bg-[#2563EB] text-[#F0F9FF]' : 'bg-[#F0F9FF] text-[#64748B]'}`}
                                >
                                    {t}
                                 </button>
                             ))}
                        </div>
                     </div>
                     <button onClick={downloadPDF} className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-[#2563EB] text-[#F0F9FF] rounded-xl font-black uppercase tracking-widest text-xs hover:bg-[#1D4ED8] transition active:scale-95 shadow-md">
                        <Download className="w-4 h-4" /> <span className="hidden sm:inline">Export PDF</span><span className="sm:hidden">Download</span>
                     </button>
                </div>
            </div>

            <div className="max-w-[1920px] mx-auto grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-10 relative z-10">
                {/* Editor Column */}
                <div className="space-y-6 order-2 xl:order-1">
                    
                    {/* Navigation Tabs */}
                    <div className="sticky top-[74px] md:top-0 z-20 bg-[#F0F9FF]/95 backdrop-blur-md py-4 border-b border-[#E2E8F0] mb-6 flex overflow-x-auto gap-2 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
                        {['personal', 'summary', 'experience', 'education', 'skills', 'projects'].map(tab => (
                            <button 
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 md:px-6 py-2 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap border shrink-0 ${
                                    activeTab === tab 
                                    ? 'bg-[#1E3A8A] text-[#F0F9FF] border-[#1E3A8A]' 
                                    : 'bg-[#FFFFFF] text-[#475569] border-[#E2E8F0] hover:bg-[#E2E8F0] hover:text-[#1E3A8A]'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Forms */}
                     <div className="pb-20 max-h-[60vh] xl:max-h-[calc(100vh-200px)] overflow-y-auto pr-0 md:pr-4 custom-scrollbar">
                    {activeTab === 'personal' && (
                        <div className="bg-[#FFFFFF] p-6 md:p-8 rounded-[2rem] border border-[#E2E8F0] shadow-xl">
                            <h2 className="text-lg md:text-xl font-black mb-6 text-[#1E3A8A] flex items-center gap-3"> <span className="w-2 h-8 bg-[#2563EB] rounded-full"></span> Personal Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField label="Full Name" value={data.personal.name} onChange={(e) => dispatch({ type: 'UPDATE_FIELD', section: 'personal', field: 'name', value: e.target.value })} />
                                <InputField label="Job Title" value={data.personal.title} onChange={(e) => dispatch({ type: 'UPDATE_FIELD', section: 'personal', field: 'title', value: e.target.value })} />
                                <InputField label="Email" value={data.personal.email} onChange={(e) => dispatch({ type: 'UPDATE_FIELD', section: 'personal', field: 'email', value: e.target.value })} />
                                <InputField label="Phone" value={data.personal.phone} onChange={(e) => dispatch({ type: 'UPDATE_FIELD', section: 'personal', field: 'phone', value: e.target.value })} />
                                <InputField label="Location" value={data.personal.location} onChange={(e) => dispatch({ type: 'UPDATE_FIELD', section: 'personal', field: 'location', value: e.target.value })} />
                                <InputField label="LinkedIn" value={data.personal.linkedin} onChange={(e) => dispatch({ type: 'UPDATE_FIELD', section: 'personal', field: 'linkedin', value: e.target.value })} />
                            </div>
                            
                             <div className="mt-6 pt-6 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-start sm:items-center gap-6">
                                <div className="w-20 h-20 rounded-full bg-[#F0F9FF] flex items-center justify-center border border-[#E2E8F0] overflow-hidden shrink-0">
                                    {data.personal.photo ? <img src={data.personal.photo} className="w-full h-full object-cover" /> : <ImageIcon className="text-[#64748B]" />}
                                </div>
                                <div className="flex flex-col items-start gap-2">
                                     <button onClick={() => fileInputRef.current.click()} className="text-xs font-black uppercase tracking-widest text-[#2563EB] hover:underline bg-[#F0F9FF] px-4 py-2 rounded-lg border border-[#E2E8F0]">
                                        Upload Photo
                                    </button>
                                     <span className="text-[10px] text-[#64748B]">Recommended: Square JPG/PNG, max 2MB</span>
                                </div>
                                <input ref={fileInputRef} type="file" hidden accept="image/*" onChange={(e) => {
                                    if(e.target.files[0]) {
                                        const reader = new FileReader();
                                        reader.onload = (ev) => dispatch({ type: 'UPDATE_FIELD', section: 'personal', field: 'photo', value: ev.target.result });
                                        reader.readAsDataURL(e.target.files[0]);
                                    }
                                }}/>
                            </div>
                        </div>
                    )}

                    {activeTab === 'summary' && (
                        <div className="bg-[#FFFFFF] p-6 md:p-8 rounded-[2rem] border border-[#E2E8F0] shadow-xl">
                            <h2 className="text-lg md:text-xl font-black mb-6 text-[#1E3A8A] flex items-center gap-3"> <span className="w-2 h-8 bg-[#2563EB] rounded-full"></span> Executive Summary</h2>
                             <div className="relative">
                                 <TextAreaField label="Bio" value={data.summary} onChange={(e) => dispatch({ type: 'UPDATE_FIELD', section: 'summary', value: e.target.value })} placeholder="Summarize your professional journey..." rows={6} />
                                 <button onClick={() => dispatch({ type: 'UPDATE_FIELD', section: 'summary', value: aiPolish(data.summary) })} className="absolute top-0 right-0 text-[10px] bg-[#2563EB] text-[#F0F9FF] font-black uppercase tracking-widest px-2 py-1 rounded-md hover:scale-105 transition flex items-center gap-1">
                                    ✨ AI Polish
                                 </button>
                             </div>
                        </div>
                    )}

                    {activeTab === 'experience' && (
                        <div>
                             <h2 className="text-lg md:text-xl font-black mb-6 text-[#1E3A8A] flex items-center gap-3"> <span className="w-2 h-8 bg-[#2563EB] rounded-full"></span> Work History</h2>
                            {data.experience.map((item, idx) => (
                                <CollapsibleSection key={item.id} title={`${item.title} at ${item.company}`} defaultOpen={idx===0}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <InputField label="Role" value={item.title} onChange={(e) => dispatch({ type: 'UPDATE_ITEM', section: 'experience', id: item.id, payload: { title: e.target.value } })} />
                                        <InputField label="Company" value={item.company} onChange={(e) => dispatch({ type: 'UPDATE_ITEM', section: 'experience', id: item.id, payload: { company: e.target.value } })} />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                         <InputField label="Dates" value={item.startDate} onChange={(e) => dispatch({ type: 'UPDATE_ITEM', section: 'experience', id: item.id, payload: { startDate: e.target.value } })} />
                                         <InputField label="Location" value={item.location} onChange={(e) => dispatch({ type: 'UPDATE_ITEM', section: 'experience', id: item.id, payload: { location: e.target.value } })} />
                                    </div>
                                    <div className="mt-4">
                                        <label className="block text-xs font-black text-[#64748B] uppercase tracking-widest mb-2">Key Achievements</label>
                                        {item.description.map((pt, i) => (
                                            <div key={i} className="flex gap-2 mb-2 relative group">
                                                <input className="flex-1 bg-[#FFFFFF] border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm text-[#1E3A8A] focus:border-[#2563EB] outline-none pr-8 min-w-0" value={pt} onChange={(e) => dispatch({ type: 'UPDATE_BULLET_POINT', section: 'experience', id: item.id, index: i, value: e.target.value })} />
                                                <button onClick={() => dispatch({ type: 'UPDATE_BULLET_POINT', section: 'experience', id: item.id, index: i, value: aiPolish(pt) })} className="absolute right-12 top-1/2 -translate-y-1/2 text-[#2563EB] hover:text-[#1D4ED8] opacity-0 group-hover:opacity-100 transition" title="Auto-Improve">✨</button>
                                                <button onClick={() => dispatch({ type: 'REMOVE_BULLET_POINT', section: 'experience', id: item.id, index: i })} className="text-[#64748B] hover:text-[#2563EB] shrink-0"><Trash className="w-4 h-4" /></button>
                                            </div>
                                        ))}
                                        <button onClick={() => dispatch({ type: 'ADD_BULLET_POINT', section: 'experience', id: item.id })} className="mt-2 text-xs font-bold uppercase tracking-wide text-[#2563EB] flex items-center gap-1">+ Add Point</button>
                                    </div>
                                </CollapsibleSection>
                            ))}
                            <button onClick={() => dispatch({ type: 'ADD_ITEM', section: 'experience', payload: { title: 'New Role', company: 'Company', description: [''] } })} className="w-full py-4 rounded-xl border border-dashed border-[#E2E8F0] text-[#475569] font-bold uppercase tracking-widest hover:border-[#2563EB] hover:text-[#2563EB] transition flex items-center justify-center gap-2">
                                <Plus className="w-4 h-4" /> Add Position
                            </button>
                        </div>
                    )}

                    {activeTab === 'skills' && (
                        <div className="bg-[#FFFFFF] p-6 md:p-8 rounded-[2rem] border border-[#E2E8F0] shadow-xl">
                            <h2 className="text-lg md:text-xl font-black mb-6 text-[#1E3A8A] flex items-center gap-3"> <span className="w-2 h-8 bg-[#2563EB] rounded-full"></span> Skill Set</h2>
                            <div className="flex flex-wrap gap-3 mb-6">
                                {data.skills.map((skill, i) => (
                                    <div key={i} className="bg-[#F0F9FF] border border-[#E2E8F0] px-3 py-2 rounded-xl flex items-center gap-2 group">
                                        <input 
                                            value={skill} 
                                            onChange={(e) => dispatch({ type: 'UPDATE_SKILL', index: i, payload: e.target.value })}
                                            className="bg-transparent text-[#1E3A8A] font-bold text-sm w-24 md:w-auto outline-none"
                                        />
                                        <button onClick={() => dispatch({ type: 'REMOVE_SKILL', index: i })} className="text-[#64748B] group-hover:text-[#2563EB]"><Minus className="w-3 h-3" /></button>
                                    </div>
                                ))}
                            </div>
                            <button onClick={() => dispatch({ type: 'ADD_SKILL', payload: 'New Skill' })} className="text-xs font-black uppercase tracking-widest text-[#2563EB] flex items-center gap-2 hover:bg-[#F0F9FF] px-4 py-2 rounded-lg w-fit transition">
                                <Plus className="w-4 h-4" /> Add Skill
                            </button>
                        </div>
                    )}
                    </div>
                </div>

                {/* Preview Column - Order 1 on mobile, 2 on desktop? No, Keep preview side-by-side or below? 
                    On mobile, we might want preview below or toggle-able. 
                    Let's stack it below (order-1) so user sees it, then forms below, or forms first? 
                    Forms first (order-2 -> forms) makes sense so they can edit. 
                    Actually, usually editor on left/top, preview right/bottom. 
                    Let's keep Preview second (below on mobile).
                */}
                <div className="order-1 xl:order-2 bg-[#1a1a1a] rounded-[2.5rem] border border-[#FFFFFF] shadow-inner flex flex-col items-center relative overflow-hidden min-h-[450px] md:min-h-[600px] xl:min-h-[800px]">
                    <div className="absolute top-4 right-6 text-[#64748B] font-bold text-xs uppercase tracking-widest flex items-center gap-2 z-10">
                        <Eye className="w-4 h-4" /> Live Preview
                    </div>
                    
                    <div className="w-full h-full overflow-x-auto overflow-y-hidden pt-12 pb-8 flex justify-center items-start scrollbar-hide">
                         <div className="relative shadow-2xl origin-top transition-all duration-300
                            scale-[0.4] w-[210mm] h-[450px] mb-[-670px]
                            sm:scale-[0.55] sm:h-[620px] sm:mb-[-500px]
                            md:scale-[0.65] md:h-[730px] md:mb-[-400px]
                            lg:scale-[0.75] lg:h-[840px] lg:mb-[-280px]
                            xl:scale-[0.8] xl:h-[900px] xl:mb-[-220px]
                        ">
                             <ResumePreview ref={previewRef} data={data} />
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #444; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #2563EB; }
                .no-scrollbar::-webkit-scrollbar { display: none; }
            `}</style>
        </div>
    );
};

export default ResumeBuilder;