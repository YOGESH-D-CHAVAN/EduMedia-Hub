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
    <div className="min-h-screen bg-[#F0F9FF] text-[#1E3A8A] flex font-sans selection:bg-[#2563EB] selection:text-[#F0F9FF]">
      
      {/* Sidebar */}
      <aside className="w-72 bg-[#FFFFFF] border-r border-[#E2E8F0] p-8 hidden md:block sticky top-0 h-screen overflow-y-auto">
        <div className="mb-10">
          <h2 className="text-2xl font-black text-[#1E3A8A] tracking-tight mb-6">docs<span className="text-[#2563EB]">.tech</span></h2>
          <div className="relative">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#475569]" />
             <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Find anything..."
                className="w-full bg-[#F0F9FF] border border-[#E2E8F0] rounded-xl pl-10 pr-4 py-3 text-sm text-[#1E3A8A] placeholder-[#64748B] focus:border-[#2563EB] outline-none font-bold transition-all shadow-inner"
             />
          </div>
        </div>

        <nav className="space-y-8">
          {filtered.map((s) => (
            <div key={s.title}>
              <h3 className="text-[10px] font-black text-[#475569] uppercase tracking-widest mb-4 pl-2 opacity-70">
                {s.title}
              </h3>
              <ul className="space-y-1">
                {s.items.map((i) => (
                  <li key={i.anchor}>
                    <a
                      href={i.anchor}
                      className="group flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-bold text-[#1E3A8A]/80 hover:bg-[#F0F9FF] hover:text-[#2563EB] transition-all border border-transparent hover:border-[#E2E8F0]"
                    >
                      {i.label}
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#2563EB]" />
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
          <h1 id="intro" className="text-5xl font-black mb-6 text-[#1E3A8A] tracking-tighter">Introduction</h1>
          <p className="text-xl text-[#475569] leading-relaxed mb-10 font-medium">
            EduMedia Tech is a modern ed-tech platform that lets teachers upload rich educational
            content and students access it securely. Built with <strong className="text-[#2563EB]">JWT authentication</strong>, <strong className="text-[#2563EB]">Cloudinary storage</strong>, and <strong className="text-[#2563EB]">MongoDB metadata</strong>, it scales from solo tutors to entire institutions.
          </p>

          <hr className="border-[#E2E8F0] my-12" />

          <h2 id="quickstart" className="text-3xl font-black text-[#1E3A8A] mb-6 tracking-tight">Quick start</h2>
          <ol className="list-decimal pl-6 space-y-4 text-[#1E3A8A] font-medium marker:text-[#2563EB] marker:font-black">
            <li>
              <a href="/register" className="text-[#2563EB] hover:underline decoration-2 underline-offset-4">
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

          <h2 id="auth" className="text-3xl font-black text-[#1E3A8A] mt-16 mb-6 tracking-tight">Authentication</h2>
          <p className="text-[#475569] mb-6">
            We use short-lived <code className="bg-[#FFFFFF] border border-[#E2E8F0] px-1.5 py-0.5 rounded text-[#2563EB] font-mono text-sm">access_token</code> (15 min) and long-lived{" "}
            <code className="bg-[#FFFFFF] border border-[#E2E8F0] px-1.5 py-0.5 rounded text-[#2563EB] font-mono text-sm">refresh_token</code> (7 days). Include the access token in the{" "}
            <code className="bg-[#FFFFFF] border border-[#E2E8F0] px-1.5 py-0.5 rounded text-[#2563EB] font-mono text-sm">Authorization: Bearer &lt;token&gt;</code> header for every API call.
          </p>
          
          <div className="rounded-2xl bg-[#1a1a1a] border border-[#FFFFFF] overflow-hidden shadow-2xl mb-12">
             <div className="bg-[#F0F9FF] px-4 py-2 border-b border-[#FFFFFF] flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#2563EB]"></div>
                <div className="w-3 h-3 rounded-full bg-[#475569]"></div>
                <div className="w-3 h-3 rounded-full bg-[#FFFFFF] border border-[#E2E8F0]"></div>
             </div>
             <pre className="p-6 overflow-x-auto text-sm font-mono text-[#475569] leading-relaxed">
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

          <h2 id="upload" className="text-3xl font-black text-[#1E3A8A] mt-16 mb-6 tracking-tight">Uploading content</h2>
          <p className="text-[#475569] mb-6">
            Multipart request to <code className="bg-[#FFFFFF] border border-[#E2E8F0] px-1.5 py-0.5 rounded text-[#2563EB] font-mono text-sm">/api/content</code>. Cloudinary responds with a secure HTTPS
            URL and public_id; we store both plus your metadata.
          </p>
           <div className="rounded-2xl bg-[#1a1a1a] border border-[#FFFFFF] overflow-hidden shadow-2xl mb-12">
             <div className="bg-[#F0F9FF] px-4 py-2 border-b border-[#FFFFFF] flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#2563EB]"></div>
                <div className="w-3 h-3 rounded-full bg-[#475569]"></div>
             </div>
             <pre className="p-6 overflow-x-auto text-sm font-mono text-[#475569] leading-relaxed">
{`curl -X POST https://api.edumediatech.com/v1/content \\
  -H "Authorization: Bearer <token>" \\
  -F "type=video" \\
  -F "title=Calculus 101" \\
  -F "file=@lecture.mp4"`}
             </pre>
          </div>

          <h2 id="roles" className="text-3xl font-black text-[#1E3A8A] mt-16 mb-6 tracking-tight">Managing roles</h2>
          <ul className="grid md:grid-cols-3 gap-6 list-none pl-0">
            {[
               { role: 'Student', desc: 'View, bookmark, comment.' },
               { role: 'Teacher', desc: 'Upload, edit, delete own content, analytics.' },
               { role: 'Admin', desc: 'Full CRUD on users & content, reports.' }
            ].map(r => (
               <li key={r.role} className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E2E8F0] hover:border-[#2563EB] transition-all">
                  <strong className="block text-[#2563EB] font-black text-xl mb-2">{r.role}</strong>
                  <span className="text-[#475569] text-sm font-medium">{r.desc}</span>
               </li>
            ))}
          </ul>

          <h2 id="cloudinary" className="text-3xl font-black text-[#1E3A8A] mt-16 mb-6 tracking-tight">Cloudinary setup</h2>
          <p className="text-[#475569] mb-6">
            Create a free Cloudinary account, copy your cloud name, API key & secret into the <code className="bg-[#FFFFFF] border border-[#E2E8F0] px-1.5 py-0.5 rounded text-[#2563EB] font-mono text-sm">.env</code> file.
          </p>

          <h2 id="api-users" className="text-3xl font-black text-[#1E3A8A] mt-16 mb-6 tracking-tight">API Reference</h2>
          
          <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] shadow-xl">
             <table className="min-w-full divide-y divide-[#E2E8F0] text-sm">
               <thead className="bg-[#FFFFFF]">
                 <tr>
                   <th className="py-4 px-6 text-left font-black text-[#475569] uppercase tracking-widest text-xs">Method</th>
                   <th className="py-4 px-6 text-left font-black text-[#475569] uppercase tracking-widest text-xs">Endpoint</th>
                   <th className="py-4 px-6 text-left font-black text-[#475569] uppercase tracking-widest text-xs">Description</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-[#E2E8F0] bg-[#F0F9FF]">
                 {[
                    { m: 'GET', e: '/api/users/me', d: 'Current user profile' },
                    { m: 'PATCH', e: '/api/users/:id', d: 'Update profile (name, avatar)' },
                    { m: 'GET', e: '/api/content', d: 'List (paginated, searchable)' },
                    { m: 'POST', e: '/api/content', d: 'Upload new asset' },
                    { m: 'DELETE', e: '/api/content/:id', d: 'Remove asset' }
                 ].map((row, i) => (
                    <tr key={i} className="hover:bg-[#FFFFFF] transition-colors">
                       <td className="py-4 px-6 font-mono font-bold text-[#2563EB]">{row.m}</td>
                       <td className="py-4 px-6 font-mono text-[#1E3A8A]">{row.e}</td>
                       <td className="py-4 px-6 text-[#475569] font-medium">{row.d}</td>
                    </tr>
                 ))}
               </tbody>
             </table>
          </div>

          <h2 id="api-errors" className="text-3xl font-black text-[#1E3A8A] mt-16 mb-6 tracking-tight">Error codes</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
             {[
                { c: '400', m: 'Bad Request' },
                { c: '401', m: 'Unauthorized' },
                { c: '403', m: 'Forbidden' },
                { c: '404', m: 'Not Found' },
                { c: '413', m: 'Payload Too Large' },
                { c: '429', m: 'Rate Limited' }
             ].map(e => (
               <div key={e.c} className="flex items-center gap-3 p-4 rounded-xl bg-[#FFFFFF] border border-[#E2E8F0]">
                  <span className="font-mono font-bold text-[#2563EB]">{e.c}</span>
                  <span className="text-[#475569] text-sm font-bold uppercase tracking-wide">{e.m}</span>
               </div>
             ))}
          </div>

          <p className="mt-20 pt-10 border-t border-[#E2E8F0] text-xs font-bold uppercase tracking-widest text-[#64748B] text-center">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </article>
      </main>
    </div>
  );
}