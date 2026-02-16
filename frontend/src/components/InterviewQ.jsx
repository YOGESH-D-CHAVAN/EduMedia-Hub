// InterviewQ.jsx - Earthy Theme
import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { Search } from "lucide-react";

const initialQuestions = [
  // 🌐 Web Development
  { text: "Explain event delegation in JavaScript.", field: "Web Development", answer: "Event delegation attaches a listener to a parent element instead of many children, handling events via bubbling." },
  { text: "How does React's Virtual DOM work?", field: "Web Development", answer: "React uses a lightweight virtual DOM and updates only the changed parts after diffing with the previous version." },
  { text: "What is debounce vs throttle?", field: "Web Development", answer: "Debounce delays execution until action stops; throttle executes at fixed intervals." },
  { text: "What is a closure?", field: "Web Development", answer: "A closure allows a function to access its lexical scope even after the outer function executes." },

  // 📊 Data Science
  { text: "Explain the Bias-Variance trade-off.", field: "Data Science", answer: "Bias is underfitting; variance is overfitting. The goal is balancing both." },
  { text: "What is PCA?", field: "Data Science", answer: "PCA reduces dimensionality by transforming correlated features into principal components." },
  { text: "What is cross-validation?", field: "Data Science", answer: "Repeatedly splits data into train-test to evaluate model stability." },

  // 💻 Software Engineering
  { text: "What are the four pillars of OOP?", field: "Software Engineering", answer: "Abstraction, Encapsulation, Inheritance, Polymorphism." },
  { text: "What is SOLID?", field: "Software Engineering", answer: "Five principles for maintainable software design." },

  // 🗄️ Database Systems
  { text: "Explain normalization (1NF, 2NF, 3NF).", field: "Database Systems", answer: "Normalization reduces redundancy using structured rules." },
  { text: "What are ACID properties?", field: "Database Systems", answer: "Atomicity, Consistency, Isolation, Durability ensure reliable transactions." },

  // ☁️ Cloud Computing
  { text: "IaaS vs PaaS vs SaaS?", field: "Cloud Computing", answer: "Different service levels offering infra, platform, or software." },
  { text: "What is serverless computing?", field: "Cloud Computing", answer: "Running code without managing servers using managed services." },

  // 🔐 Cybersecurity
  { text: "Symmetric vs asymmetric encryption?", field: "Cybersecurity", answer: "Symmetric uses one key; asymmetric uses public/private key pair." },
  { text: "What is hashing?", field: "Cybersecurity", answer: "Hashing converts data into a fixed-size irreversible value." },

  // ⚙️ Operating Systems
  { text: "Process vs thread?", field: "Operating Systems", answer: "Processes have separate memory; threads share memory." },
  { text: "What is deadlock?", field: "Operating Systems", answer: "A cycle where processes wait on each other indefinitely." },

  // 🤖 AI/ML
  { text: "What is reinforcement learning?", field: "AI/ML", answer: "Learning through rewards and punishments in an environment." },
  { text: "What is gradient descent?", field: "AI/ML", answer: "An optimization algorithm that updates parameters in the direction of negative gradient." },

  // ⚡ DevOps
  { text: "What is CI/CD?", field: "DevOps", answer: "CI merges code frequently; CD deploys code automatically." },
  { text: "Blue-green deployment?", field: "DevOps", answer: "Two environments run in parallel to reduce downtime." },

  // 📱 Mobile Development
  { text: "React Native vs Flutter?", field: "Mobile Development", answer: "React Native uses JS/React; Flutter uses Dart with custom UI engine." },

  // 🏗️ System Design
  { text: "Design a URL shortener.", field: "System Design", answer: "Use hashing, database mapping, and redirection service." },
  { text: "What is load balancing?", field: "System Design", answer: "Distributes traffic across multiple servers." },

  // 🧮 Aptitude
  { text: "Permutation vs combination?", field: "Aptitude", answer: "In permutations order matters; in combinations it doesn’t." },

  // 🎯 Machine Learning Engineering (NEW)
  { text: "How do you deploy a model using Docker?", field: "Machine Learning Engineering", answer: "Containerize model, expose API, push image, deploy to Kubernetes or cloud." },
  { text: "Explain A/B testing in ML.", field: "Machine Learning Engineering", answer: "Run two model versions simultaneously and compare metrics." },
  { text: "What is feature drift?", field: "Machine Learning Engineering", answer: "Change in data distribution over time, detected using statistical tests." },
  { text: "What is model monitoring?", field: "Machine Learning Engineering", answer: "Tracking drift, latency, accuracy, data quality in production." },

  // 🎨 Frontend Engineering (NEW)
  { text: "How do you optimize Core Web Vitals?", field: "Frontend Engineering", answer: "Optimize LCP, FID, CLS via image optimization and JS reduction." },
  { text: "Explain hydration mismatch.", field: "Frontend Engineering", answer: "Client and server DOM mismatch due to dynamic values." },
  { text: "What are React Server Components?", field: "Frontend Engineering", answer: "Components rendered on server to reduce bundle size." },
  { text: "What is a reconciliation algorithm?", field: "Frontend Engineering", answer: "React's diffing technique for updating UI efficiently." },

  // 🔧 Backend Engineering (NEW)
  { text: "How to design a rate limiter?", field: "Backend Engineering", answer: "Use token bucket or Redis-based counters to limit requests." },
  { text: "Eventual vs strong consistency?", field: "Backend Engineering", answer: "Immediate vs eventual synchronization across nodes." },
  { text: "Explain Circuit Breaker pattern.", field: "Backend Engineering", answer: "Prevents cascading failures by failing fast when service is down." },
  { text: "What is gRPC?", field: "Backend Engineering", answer: "A fast RPC framework using protocol buffers." },

  // 🌐 Full Stack Development (NEW)
  { text: "How do you handle authentication in MERN?", field: "Full Stack Development", answer: "Using JWT, cookies, middleware, and protected routes." },
  { text: "Implement WebSocket chat?", field: "Full Stack Development", answer: "Use Socket.io, rooms, events, and server state." },
  { text: "Best way to handle file uploads?", field: "Full Stack Development", answer: "Multipart, cloud storage, signed URLs, virus scan." },
  { text: "What is SSR vs CSR?", field: "Full Stack Development", answer: "Server-side rendering vs client-side rendering." },

  // 📊 Data Engineering (NEW)
  { text: "ETL vs ELT?", field: "Data Engineering", answer: "ETL transforms first; ELT transforms after loading." },
  { text: "How do you build a pipeline with Airflow?", field: "Data Engineering", answer: "Define DAGs, tasks, scheduling, retries." },
  { text: "What is data partitioning?", field: "Data Engineering", answer: "Splitting data for performance and parallelism." },
  { text: "What is a data lake?", field: "Data Engineering", answer: "Stores raw structured and unstructured data." },

  // 🔍 Site Reliability Engineering (NEW)
  { text: "What are SLAs, SLIs, SLOs?", field: "Site Reliability Engineering", answer: "SLIs = metrics, SLOs = targets, SLAs = contracts." },
  { text: "Explain incident response.", field: "Site Reliability Engineering", answer: "Detect → alert → fix → postmortem." },
  { text: "What is chaos engineering?", field: "Site Reliability Engineering", answer: "Inject failures to test system resilience." },
  { text: "What is error budget?", field: "Site Reliability Engineering", answer: "Allowed downtime based on SLOs." },

  // 🧪 Quality Assurance / Testing (NEW)
  { text: "What is the testing pyramid?", field: "Quality Assurance / Testing", answer: "Most unit tests, fewer integration, fewest E2E tests." },
  { text: "TDD vs BDD?", field: "Quality Assurance / Testing", answer: "TDD writes tests first; BDD uses human-readable scenarios." },
  { text: "How do you test async code?", field: "Quality Assurance / Testing", answer: "Using async/await, mocks, and wait utilities." },
  { text: "What is regression testing?", field: "Quality Assurance / Testing", answer: "Testing existing features after changes." },

  // ⛓️ Blockchain Development (NEW)
  { text: "How do smart contracts work?", field: "Blockchain Development", answer: "Self-executing programs on blockchain with set conditions." },
  { text: "PoW vs PoS?", field: "Blockchain Development", answer: "PoW uses computation; PoS uses staking." },
  { text: "What is DeFi?", field: "Blockchain Development", answer: "Decentralized finance using smart contracts." },
  { text: "What is a blockchain oracle?", field: "Blockchain Development", answer: "External data provider to smart contracts." },

  // 🔌 Embedded Systems (NEW)
  { text: "What is an RTOS?", field: "Embedded Systems", answer: "A real-time OS ensuring deterministic execution." },
  { text: "Explain memory-mapped I/O.", field: "Embedded Systems", answer: "Devices accessed via memory addresses." },
  { text: "How to reduce power in IoT?", field: "Embedded Systems", answer: "Use sleep cycles, reduce radio use, optimize code." },
  { text: "What is a watchdog timer?", field: "Embedded Systems", answer: "Resets the system if software freezes." },

  // 🎮 Game Development (NEW)
  { text: "Explain the game loop.", field: "Game Development", answer: "Loop running input → update → render cycles." },
  { text: "What is Level of Detail (LOD)?", field: "Game Development", answer: "Lower detail models used when objects are far to improve performance." },
  { text: "How do physics engines work?", field: "Game Development", answer: "Simulate collisions and motion using math models." },
  { text: "What is a sprite?", field: "Game Development", answer: "A 2D image used in games for characters and objects." }
];

const allFields = ["All Fields", ...new Set(initialQuestions.map(q => q.field))];

const InterviewQuestions = () => {
  const [selectedField, setSelectedField] = useState(allFields[0]);
  const [questions] = useState(initialQuestions);
  const [visible, setVisible] = useState([]);
  const [openAnswerIndex, setOpenAnswerIndex] = useState(null);
  const scrollRef = useRef(null);
  const [search, setSearch] = useState("");

  const toggleAnswer = (index) => {
    setOpenAnswerIndex(openAnswerIndex === index ? null : index);
  };

  const filteredQuestions = useMemo(() => {
    let q = questions;
    if (selectedField !== "All Fields") {
        q = q.filter(item => item.field === selectedField);
    }
    if (search) {
        q = q.filter(item => item.text.toLowerCase().includes(search.toLowerCase()) || item.answer.toLowerCase().includes(search.toLowerCase()));
    }
    return q;
  }, [selectedField, questions, search]);

  useEffect(() => {
    setVisible([]);
    setOpenAnswerIndex(null);
    filteredQuestions.forEach((_, i) => {
      setTimeout(() => {
        setVisible((v) => [...v, i]);
      }, i * 50);
    });
    return () => setVisible([]);
  }, [filteredQuestions]);

  const scrollLeft = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  }, []);

  const scrollRight = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="h-screen overflow-y-auto bg-[#262626] text-[#E2E8CE] font-sans scrollbar-hide selection:bg-[#FF7F11] selection:text-[#262626]">
      
      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
         <div className="absolute top-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-[#FF7F11]/5 rounded-full blur-[100px]"></div>
         <div className="absolute bottom-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-[#ACBFA4]/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 pb-32 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1.5 rounded-full border border-[#444444] bg-[#333333] text-[#ACBFA4] font-bold text-xs uppercase tracking-widest mb-6 shadow-md">
             Career Forge
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-6 text-[#E2E8CE] tracking-tighter">
            Interview <span className="text-[#FF7F11]">Prep</span>
          </h2>
          <p className="text-[#ACBFA4] text-lg font-medium max-w-2xl mx-auto mb-8">
             Master the technical interview with our curated collection of questions across {allFields.length - 1} domains.
          </p>

          <div className="max-w-md mx-auto relative mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#ACBFA4]" />
              <input 
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 placeholder="Search questions..."
                 className="w-full bg-[#333333] border border-[#444444] rounded-full pl-12 pr-6 py-4 text-[#E2E8CE] placeholder-[#666666] font-bold outline-none focus:border-[#FF7F11] shadow-xl transition-all"
              />
          </div>

          <div className="flex justify-center gap-4 text-xs font-bold uppercase tracking-widest text-[#666666]">
            <span className="px-4 py-2 bg-[#333333] rounded-lg border border-[#444444]">
              <span className="text-[#FF7F11]">{questions.length}</span> Questions
            </span>
            <span className="px-4 py-2 bg-[#333333] rounded-lg border border-[#444444]">
              <span className="text-[#ACBFA4]">{allFields.length - 1}</span> Topics
            </span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="sticky top-0 z-30 py-4 bg-[#262626]/90 backdrop-blur-md border-b border-[#333333] mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={scrollLeft}
              className="flex-shrink-0 p-3 rounded-full bg-[#333333] hover:bg-[#FF7F11] hover:text-[#262626] transition-all border border-[#444444] shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>

            <div 
              ref={scrollRef}
              className="flex-1 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-2"
            >
              <div className="flex gap-3 w-max sm:w-auto min-w-full sm:justify-center">
                {allFields.map((field) => (
                  <button
                    key={field}
                    onClick={() => setSelectedField(field)}
                    className={`snap-start px-6 py-3 text-xs font-black uppercase tracking-wider rounded-full whitespace-nowrap transition-all transform border shrink-0
                      ${selectedField === field
                        ? "bg-[#FF7F11] border-[#FF7F11] text-[#262626] scale-105 shadow-xl shadow-orange-500/20"
                        : "bg-[#333333] border-[#444444] text-[#ACBFA4] hover:bg-[#444444] hover:text-[#E2E8CE]"
                      }`}
                  >
                    {field}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={scrollRight}
              className="flex-shrink-0 p-3 rounded-full bg-[#333333] hover:bg-[#FF7F11] hover:text-[#262626] transition-all border border-[#444444] shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {filteredQuestions.map((q, i) => {
            const isAnswerOpen = openAnswerIndex === i;
            return (
              <div
                key={`${q.field}-${i}`}
                className={`
                  relative overflow-hidden rounded-[2rem] bg-[#333333] border border-[#444444] 
                  transition-all duration-500 ease-out p-8
                  ${visible.includes(i) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                  ${isAnswerOpen 
                    ? "ring-2 ring-[#FF7F11] shadow-2xl shadow-orange-500/10" 
                    : "hover:shadow-xl hover:border-[#FF7F11]/50 hover:-translate-y-1"
                  }
                `}
                onClick={() => toggleAnswer(i)}
              >
                {/* Field Badge */}
                <span className="inline-block px-3 py-1 bg-[#262626] rounded-lg border border-[#444444] text-[10px] font-black uppercase tracking-widest text-[#ACBFA4] mb-4">
                    {q.field}
                </span>

                {/* Question */}
                <h3 className="text-xl font-bold text-[#E2E8CE] leading-snug mb-4">
                  {q.text}
                </h3>

                {/* Answer Accordion */}
                <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isAnswerOpen ? "max-h-96 opacity-100 mt-6" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="pt-6 border-t border-[#444444]">
                      <div className="text-[#FF7F11] font-black text-xs uppercase tracking-widest mb-2">Answer</div>
                      <p className="text-[#ACBFA4] font-medium leading-relaxed">
                        {q.answer}
                      </p>
                    </div>
                  </div>

                {/* Expand Button */}
                <button 
                    className="w-full mt-6 py-3 rounded-xl bg-[#262626] text-[#E2E8CE] font-bold text-xs uppercase tracking-widest hover:bg-[#FF7F11] hover:text-[#262626] transition-all flex items-center justify-center gap-2 group border border-[#444444]"
                >
                    {isAnswerOpen ? "Hide Answer" : "Reveal Answer"}
                    <svg className={`w-4 h-4 transition-transform duration-300 ${isAnswerOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredQuestions.length === 0 && (
          <div className="text-center py-32 opacity-50">
            <div className="w-24 h-24 rounded-full bg-[#333333] mx-auto mb-6 flex items-center justify-center border border-[#444444]">
                 <Search className="w-10 h-10 text-[#ACBFA4]" />
            </div>
            <h3 className="text-2xl font-black text-[#E2E8CE]">No Questions Found</h3>
            <p className="text-[#ACBFA4]">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default InterviewQuestions;