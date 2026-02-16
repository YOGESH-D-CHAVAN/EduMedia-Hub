// Profile.jsx - Earthy Theme
import React, { useState, useEffect } from "react";
import { User, Mail, Globe, Github, Linkedin, Camera, Edit2, Check, X, MapPin, Calendar, BookOpen, Award, Briefcase } from "lucide-react";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  const [profile, setProfile] = useState({
    name: "Alex Carter",
    email: "alex@example.com",
    bio: "Computer Science student passionate about web development and AI.",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    website: "https://alexcarter.dev",
    github: "https://github.com/alexcarter",
    linkedin: "https://linkedin.com/in/alexcarter",
    avatar: "https://i.pravatar.cc/150?u=alex",
    coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    dateOfBirth: "2000-03-15",
    gender: "Male",
    university: "Stanford University",
    major: "Computer Science",
    graduationYear: "2024",
    gpa: "3.8",
    interests: ["Web Development", "Machine Learning", "Blockchain", "UI/UX Design"],
    skills: ["React", "JavaScript", "Python", "Node.js", "MongoDB", "Tailwind CSS"],
    languages: ["English (Native)", "Spanish (Intermediate)", "French (Basic)"],
    achievements: [
      { title: "Dean's List", year: "2023", icon: "🏆" },
      { title: "Hackathon Winner", year: "2022", icon: "🥇" },
      { title: "Certified React Developer", year: "2023", icon: "📜" }
    ],
    stats: {
      coursesCompleted: 12,
      assignmentsSubmitted: 45,
      averageGrade: "A-",
      studyStreak: 7,
      totalPoints: 1420,
      rank: "Top 10%"
    }
  });

  const [editedProfile, setEditedProfile] = useState(profile);
  const [skillsInput, setSkillsInput] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        setEditedProfile(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSkillAdd = () => {
    if (skillsInput && !editedProfile.skills.includes(skillsInput)) {
      setEditedProfile(prev => ({ ...prev, skills: [...prev.skills, skillsInput] }));
      setSkillsInput("");
    }
  };

  const handleSkillRemove = (skill) => {
    setEditedProfile(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));
  };

  const handleSave = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setProfile(editedProfile);
    setIsEditing(false);
    setLoading(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
    setAvatarPreview(null);
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "education", label: "Education", icon: BookOpen },
    { id: "skills", label: "Skills", icon: Briefcase }, // Replaced Tools with Briefcase for broader meaning or check lucide icons
    { id: "achievements", label: "Achievements", icon: Award }
  ];

  return (
    <div className="w-full text-[#1E3A8A] font-sans selection:bg-[#2563EB] selection:text-[#F0F9FF] relative pb-20">
      
       {/* Ambient Backgound */}
       <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
         <div className="absolute top-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-[#2563EB]/5 rounded-full blur-[100px]"></div>
         <div className="absolute bottom-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-[#475569]/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        
        {/* Cover Image */}
        <div className="relative h-64 md:h-80 rounded-b-[3rem] overflow-hidden mb-8 group border-b border-x border-[#E2E8F0] shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-t from-[#F0F9FF] to-transparent z-10 opactiy-80" />
          <img
            src={profile.coverImage}
            alt="Cover"
            className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700 opacity-60"
          />
          {isEditing && (
            <label className="absolute bottom-6 right-6 z-20 cursor-pointer bg-[#FFFFFF] hover:bg-[#2563EB] text-[#1E3A8A] hover:text-[#F0F9FF] px-4 py-2 rounded-xl transition-all shadow-lg flex items-center gap-2 font-bold text-xs uppercase tracking-widest border border-[#E2E8F0]">
              <Camera className="w-4 h-4" /> Change Cover
              <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) { const reader = new FileReader(); reader.onloadend = () => setEditedProfile(prev => ({ ...prev, coverImage: reader.result })); reader.readAsDataURL(file); }
              }} />
            </label>
          )}
        </div>

        {/* Profile Header */}
        <div className="relative -mt-24 mb-12 px-6">
          <div className="flex flex-col md:flex-row items-end gap-8">
            {/* Avatar */}
            <div className="relative group">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[#F0F9FF] shadow-2xl overflow-hidden bg-[#FFFFFF] relative z-20">
                    <img src={avatarPreview || profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                </div>
                {isEditing && (
                    <label className="absolute bottom-2 right-2 z-30 bg-[#2563EB] text-[#F0F9FF] p-3 rounded-full cursor-pointer hover:bg-[#1D4ED8] transition shadow-lg">
                        <Camera className="w-4 h-4" />
                        <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                    </label>
                )}
            </div>

            {/* Info */}
            <div className="flex-1 pb-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    {isEditing ? (
                        <div className="space-y-2">
                             <input name="name" value={editedProfile.name} onChange={handleInputChange} className="text-3xl font-black bg-[#FFFFFF] border border-[#E2E8F0] rounded-lg px-3 py-1 outline-none focus:border-[#2563EB] w-full" />
                             <input name="title" value={editedProfile.bio} onChange={handleInputChange} className="text-[#475569] bg-[#FFFFFF] border border-[#E2E8F0] rounded-lg px-3 py-1 outline-none focus:border-[#2563EB] w-full text-sm" />
                        </div>
                    ) : (
                        <>
                            <h1 className="text-4xl font-black text-[#1E3A8A] tracking-tight mb-1">{profile.name}</h1>
                            <p className="text-[#475569] font-medium text-lg max-w-2xl">{profile.bio}</p>
                        </>
                    )}
                  </div>
                  
                  <div className="flex gap-3">
                    {isEditing ? (
                        <>
                         <button onClick={handleSave} disabled={loading} className="px-6 py-3 bg-[#2563EB] text-[#F0F9FF] rounded-xl font-black uppercase tracking-widest text-xs hover:bg-[#1D4ED8] transition shadow-lg flex items-center gap-2">
                            {loading ? "Saving..." : <><Check className="w-4 h-4" /> Save</>}
                         </button>
                         <button onClick={handleCancel} className="px-6 py-3 bg-[#FFFFFF] text-[#1E3A8A] rounded-xl font-black uppercase tracking-widest text-xs hover:bg-[#E2E8F0] border border-[#E2E8F0] transition shadow-lg flex items-center gap-2">
                            <X className="w-4 h-4" /> Cancel
                         </button>
                        </>
                    ) : (
                         <button onClick={() => setIsEditing(true)} className="px-6 py-3 bg-[#FFFFFF] text-[#1E3A8A] rounded-xl font-black uppercase tracking-widest text-xs hover:bg-[#2563EB] hover:text-[#F0F9FF] border border-[#E2E8F0] transition shadow-lg flex items-center gap-2 group">
                            <Edit2 className="w-4 h-4 group-hover:text-[#F0F9FF]" /> Edit Profile
                         </button>
                    )}
                  </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-10 border-b border-[#E2E8F0] pb-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-t-xl font-bold uppercase tracking-widest text-xs transition-all flex items-center gap-2 border-t border-x border-transparent ${
                activeTab === tab.id
                  ? "bg-[#FFFFFF] text-[#2563EB] border-[#E2E8F0] border-b-[#FFFFFF] translate-y-[1px]"
                  : "text-[#64748B] hover:text-[#475569]"
              }`}
            >
              <tab.icon className="w-4 h-4" /> {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-[#FFFFFF] rounded-b-[2rem] rounded-tr-[2rem] p-8 md:p-12 border border-[#E2E8F0] shadow-2xl min-h-[400px]">
             
             {/* OVERVIEW */}
             {activeTab === "overview" && (
                 <div className="grid md:grid-cols-2 gap-12">
                     <div>
                         <h3 className="text-xl font-black text-[#1E3A8A] mb-6 flex items-center gap-3">
                             <span className="w-2 h-8 bg-[#2563EB] rounded-full"></span> Contact Info
                         </h3>
                         <div className="space-y-4">
                             {[
                                 { icon: Mail, label: "Email", name: "email", val: profile.email },
                                 { icon: Globe, label: "Website", name: "website", val: profile.website },
                                 { icon: Github, label: "Github", name: "github", val: profile.github },
                                 { icon: Linkedin, label: "LinkedIn", name: "linkedin", val: profile.linkedin },
                                 { icon: MapPin, label: "Location", name: "location", val: profile.location },
                             ].map((item, i) => (
                                 <div key={i} className="flex items-center gap-4 p-4 bg-[#F0F9FF] rounded-xl border border-[#E2E8F0]">
                                     <div className="w-10 h-10 rounded-full bg-[#FFFFFF] flex items-center justify-center text-[#2563EB]">
                                         <item.icon className="w-5 h-5" />
                                     </div>
                                     <div className="flex-1">
                                         <p className="text-[#64748B] text-[10px] font-black uppercase tracking-widest">{item.label}</p>
                                         {isEditing ? (
                                             <input name={item.name} value={editedProfile[item.name]} onChange={handleInputChange} className="w-full bg-transparent text-[#1E3A8A] font-bold outline-none border-b border-[#E2E8F0] focus:border-[#2563EB]" />
                                         ) : (
                                             <p className="text-[#1E3A8A] font-bold text-sm truncate">{item.val}</p>
                                         )}
                                     </div>
                                 </div>
                             ))}
                         </div>
                     </div>

                     <div>
                         <h3 className="text-xl font-black text-[#1E3A8A] mb-6 flex items-center gap-3">
                             <span className="w-2 h-8 bg-[#475569] rounded-full"></span> Personal Stats
                         </h3>
                         <div className="grid grid-cols-2 gap-4">
                             {Object.entries(profile.stats).map(([key, val], i) => (
                                 <div key={i} className="p-6 bg-[#F0F9FF] rounded-[1.5rem] border border-[#E2E8F0] hover:border-[#2563EB] transition duration-300">
                                     <p className="text-[#1E3A8A] text-2xl font-black mb-1">{val}</p>
                                     <p className="text-[#64748B] text-[10px] uppercase tracking-widest font-bold">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                                 </div>
                             ))}
                         </div>
                     </div>
                 </div>
             )}

             {/* EDUCATION */}
             {activeTab === "education" && (
                 <div className="max-w-3xl">
                     <h3 className="text-xl font-black text-[#1E3A8A] mb-8 flex items-center gap-3">
                         <span className="w-2 h-8 bg-[#2563EB] rounded-full"></span> Academic Background
                     </h3>
                     <div className="space-y-6">
                         {[
                             { label: "University", name: "university" },
                             { label: "Major", name: "major" },
                             { label: "Graduation Year", name: "graduationYear" },
                             { label: "GPA", name: "gpa" },
                         ].map((field, i) => (
                             <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-[#F0F9FF] rounded-2xl border border-[#E2E8F0] hover:border-[#475569] transition">
                                 <span className="text-[#475569] font-bold uppercase tracking-widest text-xs mb-2 md:mb-0 w-48">{field.label}</span>
                                 {isEditing ? (
                                     <input name={field.name} value={editedProfile[field.name]} onChange={handleInputChange} className="flex-1 bg-[#FFFFFF] text-[#1E3A8A] font-bold p-3 rounded-lg border border-[#E2E8F0] focus:border-[#2563EB] outline-none" />
                                 ) : (
                                     <span className="text-[#1E3A8A] font-black text-lg">{profile[field.name]}</span>
                                 )}
                             </div>
                         ))}
                     </div>
                 </div>
             )}

             {/* SKILLS */}
             {activeTab === "skills" && (
                 <div>
                     <h3 className="text-xl font-black text-[#1E3A8A] mb-8 flex items-center gap-3">
                         <span className="w-2 h-8 bg-[#2563EB] rounded-full"></span> Technical Expertise
                     </h3>
                     <div className="flex flex-wrap gap-3">
                         {editedProfile.skills.map(skill => (
                             <div key={skill} className="bg-[#F0F9FF] text-[#1E3A8A] px-6 py-3 rounded-xl border border-[#E2E8F0] flex items-center gap-3 shadow-md hover:border-[#2563EB] transition group">
                                 <span className="font-bold text-sm tracking-wide">{skill}</span>
                                 {isEditing && <button onClick={() => handleSkillRemove(skill)} className="text-[#64748B] hover:text-[#2563EB]"><X className="w-3 h-3" /></button>}
                             </div>
                         ))}
                         {isEditing && (
                             <div className="flex items-center gap-2">
                                 <input 
                                     value={skillsInput} 
                                     onChange={(e) => setSkillsInput(e.target.value)} 
                                     className="bg-[#F0F9FF] text-[#1E3A8A] px-4 py-3 rounded-xl border border-[#E2E8F0] outline-none focus:border-[#2563EB] w-48 font-bold text-sm" 
                                     placeholder="Add skill..." 
                                 />
                                 <button onClick={handleSkillAdd} className="bg-[#2563EB] text-[#F0F9FF] p-3 rounded-xl hover:bg-[#1D4ED8] transition"><Check className="w-4 h-4" /></button>
                             </div>
                         )}
                     </div>
                 </div>
             )}

             {/* ACHIEVEMENTS */}
             {activeTab === "achievements" && (
                 <div className="grid md:grid-cols-2 gap-6">
                     {profile.achievements.map((a, i) => (
                         <div key={i} className="p-8 bg-[#F0F9FF] rounded-[2rem] border border-[#E2E8F0] hover:border-[#2563EB] transition duration-300 relative overflow-hidden group">
                             <div className="absolute top-0 right-0 w-32 h-32 bg-[#2563EB]/5 rounded-full blur-[60px] group-hover:bg-[#2563EB]/10 transition-colors pointer-events-none"></div>
                             <div className="text-4xl mb-4 transform group-hover:scale-110 transition duration-500">{a.icon}</div>
                             <h4 className="text-xl font-black text-[#1E3A8A] mb-2">{a.title}</h4>
                             <p className="text-[#475569] font-bold text-xs uppercase tracking-widest">{a.year}</p>
                         </div>
                     ))}
                 </div>
             )}

        </div>
      </div>
    </div>
  );
}
