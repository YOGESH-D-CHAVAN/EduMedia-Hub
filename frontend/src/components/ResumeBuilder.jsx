// ResumeBuilder.jsx - Earthy Theme
import React, { useReducer, useRef, useState, useEffect, useMemo } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Download, Trash, Plus, Minus, Upload, Grip, Check, AlertCircle, Image as ImageIcon, Code, Eye, FileText } from "lucide-react";

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
    <div className={`pb-6 mb-6 border-b-2 border-gray-800`}>
        <div className="flex items-center gap-6">
             {settings.showPhoto && personal.photo && (
                <img src={personal.photo} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-gray-200" />
            )}
            <div className="flex-1">
                <h1 className="font-extrabold text-4xl mb-1 text-gray-900 uppercase tracking-tight">{personal.name}</h1>
                <p className="text-xl text-gray-600 font-medium mb-3">{personal.title}</p>
                <div className="text-sm text-gray-500 flex flex-wrap gap-4 font-medium">
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

const Section = ({ title, children }) => (
    <div className="mb-8">
        <h2 className="text-sm font-black border-b-2 border-gray-800 pb-2 mb-4 uppercase tracking-widest text-gray-800">
            {title}
        </h2>
        {children}
    </div>
);

const DetailEntry = ({ item }) => (
    <div className="mb-6 text-left group">
        <div className="flex justify-between items-baseline mb-1">
            <h3 className="font-bold text-lg text-gray-900">{item.title || item.degree || item.name}</h3>
            <span className="text-sm text-gray-500 font-medium whitespace-nowrap">{item.year || `${item.startDate} - ${item.endDate}`}</span>
        </div>
        <div className="text-sm text-gray-600 font-medium mb-2 italic">
            {item.company || item.institution || item.issuer} {item.location && `— ${item.location}`}
        </div>
         {item.link && <div className="text-xs text-blue-600 mb-2 font-mono">{item.link}</div>}
        {item.description && (
            <ul className="list-disc ml-4 text-sm text-gray-700 space-y-1.5 leading-relaxed marker:text-gray-400">
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
            className="bg-white p-12 shadow-2xl w-[210mm] min-h-[297mm] mx-auto text-black text-sm leading-relaxed"
        >
            <ModernHeader personal={data.personal} settings={settings} />
            
            {settings.showSummary && data.summary && (
                <Section title="Summary">
                    <p className="text-gray-700 leading-relaxed font-medium">{data.summary}</p>
                </Section>
            )}
            
            {settings.showSkills && data.skills.length > 0 && (
                <Section title="Skills">
                    <div className="flex flex-wrap gap-2">
                        {data.skills.map((skill, i) => (
                            <span key={i} className="px-3 py-1 text-xs font-bold rounded bg-gray-100 text-gray-800 border border-gray-200">
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
        <label className="block text-xs font-black text-[#666666] uppercase tracking-widest mb-2">{label}</label>
        <input 
            className="w-full bg-[#333333] text-[#E2E8CE] p-3 rounded-xl border border-[#444444] focus:border-[#FF7F11] outline-none transition font-medium placeholder-[#666666]"
            value={value || ''} 
            onChange={onChange}
            placeholder={placeholder}
        />
    </div>
);

const TextAreaField = ({ label, value, onChange, rows = 4, placeholder }) => (
    <div className="mb-4">
        <label className="block text-xs font-black text-[#666666] uppercase tracking-widest mb-2">{label}</label>
        <textarea 
            rows={rows}
            className="w-full bg-[#333333] text-[#E2E8CE] p-3 rounded-xl border border-[#444444] focus:border-[#FF7F11] outline-none transition resize-none font-medium placeholder-[#666666]"
            value={value || ''} 
            onChange={onChange}
            placeholder={placeholder}
        />
    </div>
);

const CollapsibleSection = ({ title, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className="bg-[#333333] rounded-[1.5rem] border border-[#444444] overflow-hidden mb-4">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 py-4 flex justify-between items-center hover:bg-[#262626] transition font-bold text-[#E2E8CE]"
            >
                <span className="uppercase tracking-wide text-sm">{title}</span>
                <span className={`transform transition ${isOpen ? 'rotate-180' : ''} text-[#FF7F11]`}>▼</span>
            </button>
            {isOpen && <div className="px-6 py-6 border-t border-[#444444] bg-[#262626]">{children}</div>}
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
        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${data.personal.name.replace(/\s/g, '_')}_Resume.pdf`);
    };

    const score = useMemo(() => calculateResumeScore(data), [data]);

    return (
        <div className="min-h-screen bg-[#262626] text-[#E2E8CE] font-sans selection:bg-[#FF7F11] selection:text-[#262626] p-6 lg:p-10 relative">
            
            {/* Background Ambience */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
                 <div className="absolute top-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-[#FF7F11]/5 rounded-full blur-[100px]"></div>
                 <div className="absolute bottom-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-[#ACBFA4]/5 rounded-full blur-[100px]"></div>
            </div>

            {/* Header */}
            <div className="max-w-[1920px] mx-auto mb-10 relative z-10 flex flex-col lg:flex-row justify-between items-center gap-6">
                <div>
                     <div className="inline-block px-4 py-1.5 rounded-full border border-[#444444] bg-[#333333] text-[#ACBFA4] font-bold text-xs uppercase tracking-widest mb-4 shadow-md">
                        Beta v2.0
                    </div>
                    <h1 className="text-4xl font-black text-[#E2E8CE] tracking-tighter">Resume <span className="text-[#FF7F11]">Architect</span></h1>
                    <p className="text-[#ACBFA4] font-medium mt-1">Build professional, ATS-friendly resumes in minutes.</p>
                </div>

                <div className="flex items-center gap-4 bg-[#333333] p-2 rounded-2xl border border-[#444444] shadow-xl">
                     <div className="px-6 py-2 rounded-xl bg-[#262626] border border-[#444444]">
                        <span className="text-[#666666] text-xs font-black uppercase tracking-widest mr-2">Score</span>
                        <span className={`text-xl font-black ${score >= 80 ? 'text-[#FF7F11]' : 'text-[#ACBFA4]'}`}>{score}</span>
                     </div>
                     <button onClick={downloadPDF} className="flex items-center gap-2 px-6 py-3 bg-[#FF7F11] text-[#262626] rounded-xl font-black uppercase tracking-widest text-xs hover:bg-[#e06c09] transition active:scale-95 shadow-md">
                        <Download className="w-4 h-4" /> Export PDF
                     </button>
                </div>
            </div>

            <div className="max-w-[1920px] mx-auto grid grid-cols-1 xl:grid-cols-2 gap-10 relative z-10">
                {/* Editor Column */}
                <div className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto pr-4 custom-scrollbar">
                    
                    {/* Navigation Tabs */}
                    <div className="sticky top-0 z-20 bg-[#262626]/90 backdrop-blur-md py-4 border-b border-[#444444] mb-6 flex overflow-x-auto gap-2 no-scrollbar">
                        {['personal', 'summary', 'experience', 'education', 'skills', 'projects'].map(tab => (
                            <button 
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap border ${
                                    activeTab === tab 
                                    ? 'bg-[#E2E8CE] text-[#262626] border-[#E2E8CE]' 
                                    : 'bg-[#333333] text-[#ACBFA4] border-[#444444] hover:bg-[#444444] hover:text-[#E2E8CE]'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Forms */}
                     <div className="pb-20">
                    {activeTab === 'personal' && (
                        <div className="bg-[#333333] p-8 rounded-[2rem] border border-[#444444] shadow-xl">
                            <h2 className="text-xl font-black mb-6 text-[#E2E8CE] flex items-center gap-3"> <span className="w-2 h-8 bg-[#FF7F11] rounded-full"></span> Personal Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField label="Full Name" value={data.personal.name} onChange={(e) => dispatch({ type: 'UPDATE_FIELD', section: 'personal', field: 'name', value: e.target.value })} />
                                <InputField label="Job Title" value={data.personal.title} onChange={(e) => dispatch({ type: 'UPDATE_FIELD', section: 'personal', field: 'title', value: e.target.value })} />
                                <InputField label="Email" value={data.personal.email} onChange={(e) => dispatch({ type: 'UPDATE_FIELD', section: 'personal', field: 'email', value: e.target.value })} />
                                <InputField label="Phone" value={data.personal.phone} onChange={(e) => dispatch({ type: 'UPDATE_FIELD', section: 'personal', field: 'phone', value: e.target.value })} />
                                <InputField label="Location" value={data.personal.location} onChange={(e) => dispatch({ type: 'UPDATE_FIELD', section: 'personal', field: 'location', value: e.target.value })} />
                                <InputField label="LinkedIn" value={data.personal.linkedin} onChange={(e) => dispatch({ type: 'UPDATE_FIELD', section: 'personal', field: 'linkedin', value: e.target.value })} />
                            </div>
                            
                             <div className="mt-6 pt-6 border-t border-[#444444] flex items-center gap-6">
                                <div className="w-20 h-20 rounded-full bg-[#262626] flex items-center justify-center border border-[#444444] overflow-hidden">
                                    {data.personal.photo ? <img src={data.personal.photo} className="w-full h-full object-cover" /> : <ImageIcon className="text-[#666666]" />}
                                </div>
                                <button onClick={() => fileInputRef.current.click()} className="text-xs font-black uppercase tracking-widest text-[#FF7F11] hover:underline">
                                    Upload Photo
                                </button>
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
                        <div className="bg-[#333333] p-8 rounded-[2rem] border border-[#444444] shadow-xl">
                             <h2 className="text-xl font-black mb-6 text-[#E2E8CE] flex items-center gap-3"> <span className="w-2 h-8 bg-[#FF7F11] rounded-full"></span> Executive Summary</h2>
                             <TextAreaField label="Bio" value={data.summary} onChange={(e) => dispatch({ type: 'UPDATE_FIELD', section: 'summary', value: e.target.value })} placeholder="Summarize your professional journey..." rows={6} />
                        </div>
                    )}

                    {activeTab === 'experience' && (
                        <div>
                             <h2 className="text-xl font-black mb-6 text-[#E2E8CE] flex items-center gap-3"> <span className="w-2 h-8 bg-[#FF7F11] rounded-full"></span> Work History</h2>
                            {data.experience.map((item, idx) => (
                                <CollapsibleSection key={item.id} title={`${item.title} at ${item.company}`} defaultOpen={idx===0}>
                                    <div className="grid grid-cols-2 gap-4">
                                        <InputField label="Role" value={item.title} onChange={(e) => dispatch({ type: 'UPDATE_ITEM', section: 'experience', id: item.id, payload: { title: e.target.value } })} />
                                        <InputField label="Company" value={item.company} onChange={(e) => dispatch({ type: 'UPDATE_ITEM', section: 'experience', id: item.id, payload: { company: e.target.value } })} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                         <InputField label="Dates" value={item.startDate} onChange={(e) => dispatch({ type: 'UPDATE_ITEM', section: 'experience', id: item.id, payload: { startDate: e.target.value } })} />
                                         <InputField label="Location" value={item.location} onChange={(e) => dispatch({ type: 'UPDATE_ITEM', section: 'experience', id: item.id, payload: { location: e.target.value } })} />
                                    </div>
                                    <div className="mt-4">
                                        <label className="block text-xs font-black text-[#666666] uppercase tracking-widest mb-2">Key Achievements</label>
                                        {item.description.map((pt, i) => (
                                            <div key={i} className="flex gap-2 mb-2">
                                                <input className="flex-1 bg-[#333333] border border-[#444444] rounded-lg px-3 py-2 text-sm text-[#E2E8CE] focus:border-[#FF7F11] outline-none" value={pt} onChange={(e) => dispatch({ type: 'UPDATE_BULLET_POINT', section: 'experience', id: item.id, index: i, value: e.target.value })} />
                                                <button onClick={() => dispatch({ type: 'REMOVE_BULLET_POINT', section: 'experience', id: item.id, index: i })} className="text-[#666666] hover:text-[#FF7F11]"><Trash className="w-4 h-4" /></button>
                                            </div>
                                        ))}
                                        <button onClick={() => dispatch({ type: 'ADD_BULLET_POINT', section: 'experience', id: item.id })} className="mt-2 text-xs font-bold uppercase tracking-wide text-[#FF7F11] flex items-center gap-1">+ Add Point</button>
                                    </div>
                                </CollapsibleSection>
                            ))}
                            <button onClick={() => dispatch({ type: 'ADD_ITEM', section: 'experience', payload: { title: 'New Role', company: 'Company', description: [''] } })} className="w-full py-4 rounded-xl border border-dashed border-[#444444] text-[#ACBFA4] font-bold uppercase tracking-widest hover:border-[#FF7F11] hover:text-[#FF7F11] transition flex items-center justify-center gap-2">
                                <Plus className="w-4 h-4" /> Add Position
                            </button>
                        </div>
                    )}

                    {activeTab === 'skills' && (
                        <div className="bg-[#333333] p-8 rounded-[2rem] border border-[#444444] shadow-xl">
                            <h2 className="text-xl font-black mb-6 text-[#E2E8CE] flex items-center gap-3"> <span className="w-2 h-8 bg-[#FF7F11] rounded-full"></span> Skill Set</h2>
                            <div className="flex flex-wrap gap-3 mb-6">
                                {data.skills.map((skill, i) => (
                                    <div key={i} className="bg-[#262626] border border-[#444444] px-4 py-2 rounded-xl flex items-center gap-2 group">
                                        <input 
                                            value={skill} 
                                            onChange={(e) => dispatch({ type: 'UPDATE_SKILL', index: i, payload: e.target.value })}
                                            className="bg-transparent text-[#E2E8CE] font-bold text-sm w-full outline-none"
                                        />
                                        <button onClick={() => dispatch({ type: 'REMOVE_SKILL', index: i })} className="text-[#666666] group-hover:text-[#FF7F11]"><Minus className="w-3 h-3" /></button>
                                    </div>
                                ))}
                            </div>
                            <button onClick={() => dispatch({ type: 'ADD_SKILL', payload: 'New Skill' })} className="text-xs font-black uppercase tracking-widest text-[#FF7F11] flex items-center gap-2 hover:bg-[#262626] px-4 py-2 rounded-lg w-fit transition">
                                <Plus className="w-4 h-4" /> Add Skill
                            </button>
                        </div>
                    )}
                    </div>
                </div>

                {/* Preview Column */}
                <div className="bg-[#1a1a1a] p-8 rounded-[2.5rem] border border-[#333333] shadow-inner flex flex-col items-center justify-center overflow-hidden relative">
                    <div className="absolute top-4 right-6 text-[#666666] font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                        <Eye className="w-4 h-4" /> Live Preview
                    </div>
                    <div className="scale-[0.55] sm:scale-[0.65] lg:scale-[0.75] xl:scale-[0.8] origin-top shadow-2xl transition-transform duration-500 hover:scale-[0.85]">
                         <ResumePreview ref={previewRef} data={data} />
                    </div>
                </div>
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #444; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #FF7F11; }
                .no-scrollbar::-webkit-scrollbar { display: none; }
            `}</style>
        </div>
    );
};

export default ResumeBuilder;