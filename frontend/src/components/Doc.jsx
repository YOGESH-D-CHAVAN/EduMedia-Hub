// Docs.jsx - Earthy Theme
import React, { useState } from "react";
import { Search, ChevronRight } from "lucide-react";

export default function Docs() {
  const [search, setSearch] = useState("");

  const sections = [
    {
      title: "Getting Started",
      items: [
        { label: "Introduction", anchor: "#intro" },
        { label: "Quick start", anchor: "#quickstart" },
        { label: "Authentication", anchor: "#auth" },
      ],
    },
    {
      title: "Guides",
      items: [
        { label: "Uploading content", anchor: "#upload" },
        { label: "Managing roles", anchor: "#roles" },
        { label: "Cloudinary setup", anchor: "#cloudinary" },
      ],
    },
    {
      title: "API Reference",
      items: [
        { label: "Users", anchor: "#api-users" },
        { label: "Content", anchor: "#api-content" },
        { label: "Errors", anchor: "#api-errors" },
      ],
    },
  ];

  const filtered = sections.map((s) => ({
    ...s,
    items: s.items.filter((i) =>
      i.label.toLowerCase().includes(search.toLowerCase())
    ),
  }));

  return (
    <div className="min-h-screen bg-[#262626] text-[#E2E8CE] flex font-sans selection:bg-[#FF7F11] selection:text-[#262626]">
      
      {/* Sidebar */}
      <aside className="w-72 bg-[#333333] border-r border-[#444444] p-8 hidden md:block sticky top-0 h-screen overflow-y-auto">
        <div className="mb-10">
          <h2 className="text-2xl font-black text-[#E2E8CE] tracking-tight mb-6">docs<span className="text-[#FF7F11]">.tech</span></h2>
          <div className="relative">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#ACBFA4]" />
             <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Find anything..."
                className="w-full bg-[#262626] border border-[#444444] rounded-xl pl-10 pr-4 py-3 text-sm text-[#E2E8CE] placeholder-[#666666] focus:border-[#FF7F11] outline-none font-bold transition-all shadow-inner"
             />
          </div>
        </div>

        <nav className="space-y-8">
          {filtered.map((s) => (
            <div key={s.title}>
              <h3 className="text-[10px] font-black text-[#ACBFA4] uppercase tracking-widest mb-4 pl-2 opacity-70">
                {s.title}
              </h3>
              <ul className="space-y-1">
                {s.items.map((i) => (
                  <li key={i.anchor}>
                    <a
                      href={i.anchor}
                      className="group flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-bold text-[#E2E8CE]/80 hover:bg-[#262626] hover:text-[#FF7F11] transition-all border border-transparent hover:border-[#444444]"
                    >
                      {i.label}
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#FF7F11]" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 px-8 md:px-16 py-12 max-w-5xl mx-auto overflow-y-auto">
        <article className="prose prose-invert prose-lg max-w-none">
          <h1 id="intro" className="text-5xl font-black mb-6 text-[#E2E8CE] tracking-tighter">Introduction</h1>
          <p className="text-xl text-[#ACBFA4] leading-relaxed mb-10 font-medium">
            EduMedia Tech is a modern ed-tech platform that lets teachers upload rich educational
            content and students access it securely. Built with <strong className="text-[#FF7F11]">JWT authentication</strong>, <strong className="text-[#FF7F11]">Cloudinary storage</strong>, and <strong className="text-[#FF7F11]">MongoDB metadata</strong>, it scales from solo tutors to entire institutions.
          </p>

          <hr className="border-[#444444] my-12" />

          <h2 id="quickstart" className="text-3xl font-black text-[#E2E8CE] mb-6 tracking-tight">Quick start</h2>
          <ol className="list-decimal pl-6 space-y-4 text-[#E2E8CE] font-medium marker:text-[#FF7F11] marker:font-black">
            <li>
              <a href="/register" className="text-[#FF7F11] hover:underline decoration-2 underline-offset-4">
                Create an account
              </a>{" "}
              (Student or Teacher).
            </li>
            <li>Confirm your email—JWT tokens are issued automatically.</li>
            <li>
              Drag-and-drop files ≤ 100 MB; they’re streamed to Cloudinary and metadata saved in
              MongoDB.
            </li>
            <li>Share links or embed content in your LMS.</li>
          </ol>

          <h2 id="auth" className="text-3xl font-black text-[#E2E8CE] mt-16 mb-6 tracking-tight">Authentication</h2>
          <p className="text-[#ACBFA4] mb-6">
            We use short-lived <code className="bg-[#333333] border border-[#444444] px-1.5 py-0.5 rounded text-[#FF7F11] font-mono text-sm">access_token</code> (15 min) and long-lived{" "}
            <code className="bg-[#333333] border border-[#444444] px-1.5 py-0.5 rounded text-[#FF7F11] font-mono text-sm">refresh_token</code> (7 days). Include the access token in the{" "}
            <code className="bg-[#333333] border border-[#444444] px-1.5 py-0.5 rounded text-[#FF7F11] font-mono text-sm">Authorization: Bearer &lt;token&gt;</code> header for every API call.
          </p>
          
          <div className="rounded-2xl bg-[#1a1a1a] border border-[#333333] overflow-hidden shadow-2xl mb-12">
             <div className="bg-[#262626] px-4 py-2 border-b border-[#333333] flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF7F11]"></div>
                <div className="w-3 h-3 rounded-full bg-[#ACBFA4]"></div>
                <div className="w-3 h-3 rounded-full bg-[#333333] border border-[#444444]"></div>
             </div>
             <pre className="p-6 overflow-x-auto text-sm font-mono text-[#ACBFA4] leading-relaxed">
{`POST /api/auth/login
{
  "email": "ada@example.com",
  "password": "••••••••"
}

// 200 OK
{
  "access_token":  "eyJhbGc...",
  "refresh_token": "eyJhbGc...",
  "user": { "id": "60b...", "role": "teacher" }
}`}
             </pre>
          </div>

          <h2 id="upload" className="text-3xl font-black text-[#E2E8CE] mt-16 mb-6 tracking-tight">Uploading content</h2>
          <p className="text-[#ACBFA4] mb-6">
            Multipart request to <code className="bg-[#333333] border border-[#444444] px-1.5 py-0.5 rounded text-[#FF7F11] font-mono text-sm">/api/content</code>. Cloudinary responds with a secure HTTPS
            URL and public_id; we store both plus your metadata.
          </p>
           <div className="rounded-2xl bg-[#1a1a1a] border border-[#333333] overflow-hidden shadow-2xl mb-12">
             <div className="bg-[#262626] px-4 py-2 border-b border-[#333333] flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF7F11]"></div>
                <div className="w-3 h-3 rounded-full bg-[#ACBFA4]"></div>
             </div>
             <pre className="p-6 overflow-x-auto text-sm font-mono text-[#ACBFA4] leading-relaxed">
{`curl -X POST https://api.edumediatech.com/v1/content \\
  -H "Authorization: Bearer <token>" \\
  -F "type=video" \\
  -F "title=Calculus 101" \\
  -F "file=@lecture.mp4"`}
             </pre>
          </div>

          <h2 id="roles" className="text-3xl font-black text-[#E2E8CE] mt-16 mb-6 tracking-tight">Managing roles</h2>
          <ul className="grid md:grid-cols-3 gap-6 list-none pl-0">
            {[
               { role: 'Student', desc: 'View, bookmark, comment.' },
               { role: 'Teacher', desc: 'Upload, edit, delete own content, analytics.' },
               { role: 'Admin', desc: 'Full CRUD on users & content, reports.' }
            ].map(r => (
               <li key={r.role} className="bg-[#333333] p-6 rounded-2xl border border-[#444444] hover:border-[#FF7F11] transition-all">
                  <strong className="block text-[#FF7F11] font-black text-xl mb-2">{r.role}</strong>
                  <span className="text-[#ACBFA4] text-sm font-medium">{r.desc}</span>
               </li>
            ))}
          </ul>

          <h2 id="cloudinary" className="text-3xl font-black text-[#E2E8CE] mt-16 mb-6 tracking-tight">Cloudinary setup</h2>
          <p className="text-[#ACBFA4] mb-6">
            Create a free Cloudinary account, copy your cloud name, API key & secret into the <code className="bg-[#333333] border border-[#444444] px-1.5 py-0.5 rounded text-[#FF7F11] font-mono text-sm">.env</code> file.
          </p>

          <h2 id="api-users" className="text-3xl font-black text-[#E2E8CE] mt-16 mb-6 tracking-tight">API Reference</h2>
          
          <div className="overflow-hidden rounded-2xl border border-[#444444] shadow-xl">
             <table className="min-w-full divide-y divide-[#444444] text-sm">
               <thead className="bg-[#333333]">
                 <tr>
                   <th className="py-4 px-6 text-left font-black text-[#ACBFA4] uppercase tracking-widest text-xs">Method</th>
                   <th className="py-4 px-6 text-left font-black text-[#ACBFA4] uppercase tracking-widest text-xs">Endpoint</th>
                   <th className="py-4 px-6 text-left font-black text-[#ACBFA4] uppercase tracking-widest text-xs">Description</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-[#444444] bg-[#262626]">
                 {[
                    { m: 'GET', e: '/api/users/me', d: 'Current user profile' },
                    { m: 'PATCH', e: '/api/users/:id', d: 'Update profile (name, avatar)' },
                    { m: 'GET', e: '/api/content', d: 'List (paginated, searchable)' },
                    { m: 'POST', e: '/api/content', d: 'Upload new asset' },
                    { m: 'DELETE', e: '/api/content/:id', d: 'Remove asset' }
                 ].map((row, i) => (
                    <tr key={i} className="hover:bg-[#333333] transition-colors">
                       <td className="py-4 px-6 font-mono font-bold text-[#FF7F11]">{row.m}</td>
                       <td className="py-4 px-6 font-mono text-[#E2E8CE]">{row.e}</td>
                       <td className="py-4 px-6 text-[#ACBFA4] font-medium">{row.d}</td>
                    </tr>
                 ))}
               </tbody>
             </table>
          </div>

          <h2 id="api-errors" className="text-3xl font-black text-[#E2E8CE] mt-16 mb-6 tracking-tight">Error codes</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
             {[
                { c: '400', m: 'Bad Request' },
                { c: '401', m: 'Unauthorized' },
                { c: '403', m: 'Forbidden' },
                { c: '404', m: 'Not Found' },
                { c: '413', m: 'Payload Too Large' },
                { c: '429', m: 'Rate Limited' }
             ].map(e => (
               <div key={e.c} className="flex items-center gap-3 p-4 rounded-xl bg-[#333333] border border-[#444444]">
                  <span className="font-mono font-bold text-[#FF7F11]">{e.c}</span>
                  <span className="text-[#ACBFA4] text-sm font-bold uppercase tracking-wide">{e.m}</span>
               </div>
             ))}
          </div>

          <p className="mt-20 pt-10 border-t border-[#444444] text-xs font-bold uppercase tracking-widest text-[#666666] text-center">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </article>
      </main>
    </div>
  );
}