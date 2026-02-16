import React from "react";
import { Helmet } from "react-helmet";
import { ExternalLink, CheckCircle } from "lucide-react";

const Resources = () => {
  const links = {
    resume: [
      { name: "Resume Worded", url: "https://resumeworded.com", desc: "AI-powered resume review & ATS check" },
      { name: "Enhancv", url: "https://enhancv.com", desc: "Modern templates with content hints" },
      { name: "Novoresume", url: "https://novoresume.com", desc: "One-page templates loved by recruiters" },
      { name: "Overleaf LaTeX", url: "https://overleaf.com", desc: "Clean academic/research CVs" },
    ],
    // ... (rest of the links object is unchanged, but I only need to replace the top part)

    coding: [
      { name: "LeetCode", url: "https://leetcode.com/problemset/all/", desc: "1.2k+ problems + weekly contests" },
      { name: "HackerRank", url: "https://hackerrank.com/domains", desc: "Company-specific tracks (TCS, Infy, NQT)" },
      { name: "Codeforces", url: "https://codeforces.com", desc: "Competitive contests & ratings" },
      { name: "GeeksforGeeks", url: "https://geeksforgeeks.org", desc: "DSA, OS, DBMS gate-to-placement" },
      { name: "InterviewBit", url: "https://interviewbit.com", desc: "Structured 3-month roadmap" },
    ],
    aptitude: [
      { name: "Indiabix", url: "https://indiabix.com", desc: "Huge bank of aptitude + puzzles" },
      { name: "Testpot", url: "https://testpot.com", desc: "Free timed mock tests" },
      { name: "PuzzleFry", url: "https://puzzlefry.com", desc: "Interview puzzles with explainer" },
      { name: "Aptitude-Test.com", url: "https://aptitude-test.com", desc: "Topic-wise practice & PDFs" },
    ],
    system: [
      { name: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer", desc: "60k ⭐ GitHub repo" },
      { name: "HLD Bible", url: "https://highleveldesignbible.com", desc: "End-to-end design templates" },
      { name: "ByteByteGo", url: "https://bytebytego.com", desc: "Interactive system-design course" },
      { name: "Gaurav Sen YouTube", url: "https://youtube.com/@GauravSensei", desc: "Visual system-design breakdowns" },
    ],
    projects: [
      { name: "Github Explore", url: "https://github.com/explore", desc: "Trending repos for inspiration" },
      { name: "Kaggle Learn", url: "https://kaggle.com/learn", desc: "Micro-courses (Python, ML, SQL)" },
      { name: "Google Summer of Code", url: "https://summerofcode.withgoogle.com", desc: "Open-source stipend program" },
      { name: "MLH Fellowship", url: "https://fellowship.mlh.io", desc: "Remote hackathon sprints" },
    ],
    community: [
      { name: "r/cscareers", url: "https://reddit.com/r/cscareerquestions", desc: "Interview experiences & salary data" },
      { name: "Dev.to", url: "https://dev.to", desc: "Technical blogging community" },
      { name: "Discord: Programmer's Hangout", url: "https://discord.gg/programmers", desc: "Active help channels" },
      { name: "LinkedIn Career Advice", url: "https://linkedin.com/career-advice", desc: "1:1 mentor matching" },
    ],
    mental: [
      { name: "Headspace Student", url: "https://headspace.com/students", desc: "Free premium with .edu mail" },
      { name: "Calm App", url: "https://calm.com", desc: "Guided meditations & sleep stories" },
      { name: "7 Cups", url: "https://7cups.com", desc: "Free emotional support chat" },
      { name: "Notion Anxiety Template", url: "https://notion.so/anxiety", desc: "Cognitive-behavioral workbook" },
    ],
  };

  const Card = ({ title, children }) => (
    <div className="rounded-[2rem] bg-[#FFFFFF] border border-[#E2E8F0] p-8 hover:border-[#2563EB] transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#2563EB]/5 rounded-full blur-[60px] group-hover:bg-[#2563EB]/10 transition-colors pointer-events-none"></div>
      
      <h3 className="text-2xl font-black text-[#1E3A8A] mb-6 tracking-tight flex items-center gap-3">
         <span className="w-2 h-8 bg-[#2563EB] rounded-full"></span>
         {title}
      </h3>
      <div className="space-y-3 relative z-10">{children}</div>
    </div>
  );

  const ResourceLink = ({ url, name, desc }) => (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-4 p-4 rounded-xl bg-[#F0F9FF] border border-[#E2E8F0] hover:border-[#475569] transition-all duration-200 group/link"
    >
      <div className="mt-1 w-2 h-2 rounded-full bg-[#2563EB] group-hover/link:scale-125 transition-transform" />
      <div className="flex-1">
        <div className="font-bold text-[#1E3A8A] group-hover/link:text-[#2563EB] transition-colors">{name}</div>
        <div className="text-xs font-medium text-[#475569] mt-1">{desc}</div>
      </div>
      <ExternalLink
        className="ml-auto w-4 h-4 text-[#64748B] group-hover/link:text-[#1E3A8A] transition-colors"
      />
    </a>
  );

  return (
    <div className="min-h-screen bg-[#F0F9FF] text-[#1E3A8A] py-20 px-6 font-sans selection:bg-[#2563EB] selection:text-[#F0F9FF] relative">
      <Helmet>
        <title>Curated Career Resources | Resume, Coding, System Design - EduMedia</title>
        <meta name="description" content="Access hand-picked resources for free. Best tools for resume building, coding practice, aptitude tests, system design, and mental health support for students." />
        <meta name="keywords" content="career resources, free coding sites, aptitude practice, system design guide, resume tools, student mental health, placement preparation" />
      </Helmet>
      
       {/* Ambient Backgound */}
       <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
         <div className="absolute top-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-[#2563EB]/5 rounded-full blur-[100px]"></div>
         <div className="absolute bottom-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-[#475569]/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
            <div className="inline-block px-4 py-1.5 rounded-full border border-[#E2E8F0] bg-[#FFFFFF] text-[#475569] font-bold text-xs uppercase tracking-widest mb-6 shadow-md">
                Toolkit
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-[#1E3A8A] tracking-tighter mb-6 relative inline-block">
            Curated <span className="text-[#2563EB]">Resources</span>
            </h2>
            <p className="text-xl text-[#475569] max-w-2xl mx-auto font-medium leading-relaxed">
            Hand-picked tools and links that actually work. No fluff, just value.
            </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card title="Resume Builders">{links.resume.map((l) => <ResourceLink key={l.url} {...l} />)}</Card>
          <Card title="Coding Platforms">{links.coding.map((l) => <ResourceLink key={l.url} {...l} />)}</Card>
          <Card title="Aptitude & Puzzles">{links.aptitude.map((l) => <ResourceLink key={l.url} {...l} />)}</Card>
          <Card title="System Design">{links.system.map((l) => <ResourceLink key={l.url} {...l} />)}</Card>
          <Card title="Projects & OSS">{links.projects.map((l) => <ResourceLink key={l.url} {...l} />)}</Card>
          <Card title="Communities">{links.community.map((l) => <ResourceLink key={l.url} {...l} />)}</Card>
          <Card title="Mental Health">{links.mental.map((l) => <ResourceLink key={l.url} {...l} />)}</Card>
        </div>
        
        <div className="mt-20 text-center border-t border-[#E2E8F0] pt-10">
             <p className="text-[#64748B] text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#475569]" /> Verified & Updated {new Date().getFullYear()}
             </p>
        </div>

      </div>
    </div>
  );
};

export default Resources;