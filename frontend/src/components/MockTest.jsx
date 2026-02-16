// MockTest.jsx - Earthy Theme with Multiple Tests
import React, { useState, useEffect, useMemo, useRef } from "react";
import { Helmet } from "react-helmet";
import { BsClock, BsDownload, BsArrowLeft, BsCheckCircle } from "react-icons/bs";
import { Radar } from "react-chartjs-2";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

/* ================== QUIZ DATA ================== */

// Helper to create questions
const createQs = (category, items) => items.map((q, i) => ({ id: `${category}-${i}`, cat: category, q }));

const QUIZZES = [
  {
    id: "soft-skills-1",
    title: "Soft Skills Assessment",
    duration: 15 * 60,
    categories: ["Communication", "Teamwork", "Leadership", "Emotional Intelligence", "Adaptability", "Problem Solving", "Time Management", "Work Ethic"],
    questions: [
      ...createQs("Communication", [
        "I speak clearly and confidently in front of a group.",
        "I actively listen and ask clarifying questions.",
        "I adapt my language to the audience.",
        "I give constructive feedback without sounding harsh.",
        "I write concise, grammatically correct emails."
      ]),
      ...createQs("Teamwork", [
        "I share credit and celebrate teammates' wins.",
        "I volunteer for unpopular but necessary tasks.",
        "I resolve conflicts calmly and privately first.",
        "I ask for help when stuck instead of struggling.",
        "I document my work so others can onboard."
      ]),
      ...createQs("Leadership", [
         "I set measurable goals and communicate them.",
         "I delegate tasks based on strengths.",
         "I take responsibility for team failures.",
         "I mentor juniors even without authority.",
         "I run short daily stand-ups to keep aligned."
      ]),
      ...createQs("Emotional Intelligence", [
         "I recognise my own emotions before reacting.",
         "I can describe others' feelings accurately.",
         "I stay calm when receiving negative feedback.",
         "I use humour appropriately to reduce tension.",
         "I avoid decisions when emotionally charged."
      ]),
      ...createQs("Adaptability", [
         "I learn new tools quickly when needs change.",
         "I remain productive during uncertain requirements.",
         "I help teammates cope with change positively.",
         "I view failures as learning opportunities.",
         "I proactively upskill outside my comfort zone."
      ]),
      ...createQs("Problem Solving", [
        "I break down complex problems into smaller parts.",
        "I look for root causes rather than just symptoms.",
        "I brainstorm multiple solutions before choosing.",
        "I use data to support my proposed solutions.",
        "I remain objective when analyzing a problem."
      ]),
      ...createQs("Time Management", [
        "I prioritize tasks based on urgency/importance.",
        "I set realistic deadlines for myself.",
        "I minimize distractions to focus on deep work.",
        "I plan my day/week in advance.",
        "I am always punctual and prepared."
      ]),
      ...createQs("Work Ethic", [
        "I consistently meet or exceed expectations.",
        "I take initiative without being told.",
        "I maintain a positive attitude during challenges.",
        "I am reliable and deliver on promises.",
        "I seek continuous learning opportunities."
      ])
    ]
  },
  {
      id: "leadership-1",
      title: "Leadership Style Quiz",
      duration: 10 * 60,
      categories: ["Vision", "Delegation", "Motivation", "Decision Making", "Integrity"],
      questions: [
          ...createQs("Vision", [
              "I clearly articulate the long-term goals.",
              "I inspire others to see the 'big picture'.",
              "I anticipate future trends and challenges.",
              "I align daily tasks with strategic objectives.",
              "I encourage innovation and new ideas."
          ]),
          ...createQs("Delegation", [
              "I trust my team to complete tasks without micromanaging.",
              "I assign tasks based on individual strengths.",
              "I provide clear instructions and resources.",
              "I follow up to ensure progress without interference.",
              "I give credit to those who did the work."
          ]),
          ...createQs("Motivation", [
              "I recognize and reward good performance.",
              "I provide constructive feedback for growth.",
              "I create a positive and inclusive work environment.",
              "I listen to my team's concerns and suggestions.",
              "I celebrate small wins and milestones."
          ]),
           ...createQs("Decision Making", [
              "I make timely decisions even with incomplete info.",
              "I consult with key stakeholders before deciding.",
              "I am willing to change my mind with new data.",
              "I consider the long-term impact of my decisions.",
              "I take accountability for the outcomes."
          ]),
           ...createQs("Integrity", [
              "I lead by example and model desired behaviors.",
              "I am honest and transparent in my communication.",
              "I keep my promises and commitments.",
              "I treat everyone with respect and dignity.",
              "I admit my mistakes and learn from them."
          ])
      ]
  },
  {
      id: "comm-styles", 
      title: "Professional Communication",
      duration: 8 * 60,
      categories: ["Verbal", "Non-Verbal", "Listening", "Written", "Clarity"],
      questions: [
          ...createQs("Verbal", ["I speak with appropriate volume/tone.", "I avoid filler words (um, like).", "I articulate complex ideas simply.", "I verify understanding.", "I speak confidently."]),
          ...createQs("Non-Verbal", ["I maintain eye contact.", "I use open body language.", "I nod to show engagement.", "I avoid distracting fidgeting.", "I smile appropriately."]),
          ...createQs("Listening", ["I listen without interrupting.", "I paraphrase to confirm meaning.", "I empathize with the speaker.", "I ask open-ended questions.", "I respect silence."]),
          ...createQs("Written", ["My emails have clear subject lines.", "I use bullet points for readability.", "I proofread before sending.", "I adjust tone for the recipient.", "I answer all parts of a question."]),
          ...createQs("Clarity", ["I get straight to the point.", "I avoid unnecessary jargon.", "I define acronyms.", "I structure my thoughts logically.", "I summarize key takeaways."])
      ]
  },
  {
      id: "stress-mgmt",
      title: "Stress Management",
      duration: 10 * 60,
      categories: ["Resilience", "Coping", "Balance", "Support", "Mindset"],
      questions: [
           ...createQs("Resilience", ["I bounce back quickly from setbacks.", "I view stress as a challenge, not a threat.", "I maintain perspective in crisis.", "I focus on what I can control.", "I adapt to changing circumstances."]),
           ...createQs("Coping", ["I use breathing/relaxation techniques.", "I take breaks when feeling overwhelmed.", "I exercise to manage stress.", "I have healthy outlets for frustration.", "I recognize my stress triggers."]),
           ...createQs("Balance", ["I maintain boundaries between work/life.", "I prioritize sleep and nutrition.", "I make time for hobbies.", "I disconnect from tech regularly.", "I don't overcommit myself."]),
           ...createQs("Support", ["I ask for help when overwhelmed.", "I talk to friends/family about stress.", "I seek professional guidance if needed.", "I support colleagues under stress.", "I build a strong support network."]),
           ...createQs("Mindset", ["I practice gratitude regularly.", "I challenge negative self-talk.", "I visual success.", "I accept that I can't be perfect.", "I celebrate progress, not just perfection."])
      ]
  },
  {
    id: "tech-aptitude",
    title: "Technical Aptitude Basics",
    duration: 12 * 60,
    categories: ["Logic", "Data Analysis", "system Design", "Troubleshooting", "Learning"],
    questions: [
        ...createQs("Logic", ["I can identify patterns in data.", "I enjoy solving logical puzzles.", "I approach problems step-by-step.", "I verify assumptions before acting.", "I can detect fallacies in arguments."]),
        ...createQs("Data Analysis", ["I interpret charts/graphs correctly.", "I can spot outliers in datasets.", "I use data to drive decisions.", "I understand basic statistics.", "I verify data sources."]),
        ...createQs("system Design", ["I think about how components fit together.", "I anticipate bottlenecks.", "I consider scalability.", "I documentation for maintainability.", "I value simplicity in design."]),
        ...createQs("Troubleshooting", ["I isolate variables to find bugs.", "I read documentation before asking help.", "I check error logs first.", "I reproduce issues reliably.", "I document solutions for future."]),
        ...createQs("Learning", ["I enjoy learning new technologies.", "I build side projects to practice.", "I read technical blogs/docs.", "I share knowledge with others.", "I am not afraid to break things to learn."])
    ]
  },
   {
    id: "emotional-iq",
    title: "Emotional IQ Deep Dive",
    duration: 10 * 60,
    categories: ["Self-Awareness", "Self-Regulation", "Motivation", "Empathy", "Social Skills"],
    questions: [
        ...createQs("Self-Awareness", ["I know my emotional triggers.", "I understand how my mood affects others.", "I know my strengths and weaknesses.", "I am honest about my feelings.", "I reflect on my interactions."]),
        ...createQs("Self-Regulation", ["I control my impulses.", "I think before acting.", "I admit mistakes.", "I adapt to change.", "I remain open to new ideas."]),
        ...createQs("Motivation", ["I strive to improve.", "I commit to my goals.", "I seize opportunities.", "I remain optimistic.", "I am driven by achievement."]),
        ...createQs("Empathy", ["I sense others' feelings.", "I take an active interest in others.", "I understand different perspectives.", "I help others develop.", "I leverage diversity."]),
        ...createQs("Social Skills", ["I communicate effectively.", "I manage conflict.", "I inspire others.", "I build bonds.", "I collaborate well."])
    ]
  },
   {
      id: "creative-thinking",
      title: "Creative Thinking",
      duration: 10 * 60,
      categories: ["Fluency", "Flexibility", "Originality", "Elaboration", "Curiosity"],
      questions: [
           ...createQs("Fluency", ["I generate many ideas quickly.", "I brainstorm without judgment.", "I find multiple solutions to a problem.", "I express ideas easily.", "I connect unrelated concepts."]),
           ...createQs("Flexibility", ["I change perspective easily.", "I adapt ideas to new contexts.", "I see problems as opportunities.", "I try different approaches.", "I am open to constructive ambiguity."]),
           ...createQs("Originality", ["I create unique solutions.", "I challenge status quo.", "I take calculated risks.", "I combine ideas in new ways.", "I avoid cliché solutions."]),
           ...createQs("Elaboration", ["I add details to enrich ideas.", "I refine concepts into plans.", "I anticipate implementation.", "I verify feasibility.", "I communicate vision clearly."]),
           ...createQs("Curiosity", ["I ask 'what if' often.", "I explore topics outside my field.", "I observe the world closely.", "I question assumptions.", "I seek inspiration everywhere."])
      ]
  },
  {
      id: "financial-literacy",
      title: "Financial Literacy",
      duration: 10 * 60,
      categories: ["Budgeting", "Saving", "Investing", "Debt Management", "Risk Assessment"],
      questions: [
           ...createQs("Budgeting", ["I track my income and expenses monthly.", "I separate wants from needs.", "I have an emergency fund.", "I stick to my spending limits.", "I review my financial goals regularly."]),
           ...createQs("Saving", ["I save a portion of my income first.", "I have automatic saving transfers.", "I save for specific goals (vacation, home).", "I understand compound interest.", "I adjust my savings as income grows."]),
           ...createQs("Investing", ["I understand different asset classes.", "I diversify my investments.", "I invest for the long term.", "I research before investing.", "I understand the risk-return trade-off."]),
           ...createQs("Debt Management", ["I pay my credit card balance in full.", "I avoid high-interest purchases.", "I have a plan to pay off debts.", "I compare interest rates.", "I understand my credit score."]),
           ...createQs("Risk Assessment", ["I have necessary insurance coverage.", "I avoid scams and get-rich-quick schemes.", "I keep my financial data secure.", "I plan for unexpected expenses.", "I understand inflationary risks."])
      ]
  },
  {
      id: "digital-wellbeing",
      title: "Digital Wellbeing",
      duration: 8 * 60,
      categories: ["Screen Balance", "Focus", "Privacy", "Social Media", "Ergonomics"],
      questions: [
           ...createQs("Screen Balance", ["I take regular breaks from screens.", "I have screen-free zones (e.g., bedroom).", "I stop using devices before sleep.", "I track my screen time usage.", "I prioritize offline face-to-face interactions."]),
           ...createQs("Focus", ["I minimize notifications while working.", "I avoid multitasking with media.", "I use 'Do Not Disturb' modes.", "I am present in meetings.", "I can work deep without checking my phone."]),
           ...createQs("Privacy", ["I review my app permissions regularly.", "I use strong, unique passwords.", "I am careful about sharing location data.", "I understand digital footprint.", "I keep my software updated."]),
           ...createQs("Social Media", ["I curate my feed for positivity.", "I avoid doom-scrolling.", "I fact-check information before sharing.", "I am respectful in online comments.", "I don't let likes define my worth."]),
           ...createQs("Ergonomics", ["I maintain good posture at my desk.", "I position my monitor at eye level.", "I stretch regularly.", "I adjust screen brightness levels.", "I use blue light filters/glasses."])
      ]
  }
];

const options = ["Never", "Rarely", "Sometimes", "Often", "Always"];
const optionValues = [1, 2, 3, 4, 5];

/* ================== COMPONENTS ================== */

// LIST VIEW
const QuizList = ({ onSelect }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pb-20 px-4 md:px-0">
             {QUIZZES.map((quiz) => (
                 <div key={quiz.id} onClick={() => onSelect(quiz)} className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 hover:border-[#2563EB] cursor-pointer transition-all hover:translate-y-[-5px] shadow-lg group relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#2563EB]/5 rounded-full blur-[50px] pointer-events-none group-hover:bg-[#2563EB]/10 transition"></div>
                      <div className="relative z-10">
                          <h3 className="text-xl md:text-2xl font-black text-[#1E3A8A] mb-2">{quiz.title}</h3>
                          <div className="flex items-center gap-4 text-[10px] md:text-xs font-bold text-[#475569] uppercase tracking-widest mb-6">
                              <span className="flex items-center gap-1"><BsClock/> {Math.floor(quiz.duration / 60)} Mins</span>
                              <span>•</span>
                              <span>{quiz.questions.length} Questions</span>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-8">
                               {quiz.categories.slice(0,3).map(c => <span key={c} className="px-2 py-1 bg-[#F0F9FF] rounded border border-[#E2E8F0] text-[10px] text-[#1E3A8A]">{c}</span>)}
                               {quiz.categories.length > 3 && <span className="px-2 py-1 bg-[#F0F9FF] rounded border border-[#E2E8F0] text-[10px] text-[#1E3A8A]">+{quiz.categories.length - 3}</span>}
                          </div>

                          <div className="w-full py-3 bg-[#2563EB] text-[#F0F9FF] text-center font-black rounded-xl uppercase tracking-widest text-[10px] md:text-xs group-hover:bg-[#1D4ED8] transition">
                              Start Assessment
                          </div>
                      </div>
                 </div>
             ))}
        </div>
    );
};

// ACTIVE TEST VIEW
const ActiveTest = ({ quiz, onBack }) => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [seconds, setSeconds] = useState(quiz.duration);
  const cardRef = useRef(null);

  useEffect(() => {
    if (submitted || seconds <= 0) return;
    const t = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [seconds, submitted]);

  const handleAnswer = (id, val) => setAnswers((a) => ({ ...a, [id]: val }));

  const submitTest = () => {
    if (Object.keys(answers).length < quiz.questions.length) return alert("Please answer all questions.");
    setSubmitted(true);
  };

  const categoryScores = useMemo(() => {
    return quiz.categories.map((cat) => {
      const catQs = quiz.questions.filter((q) => q.cat === cat);
      const sum = catQs.reduce((acc, q) => acc + (answers[q.id] || 0), 0);
      return { cat, score: Math.round((sum / catQs.length) * 20) }; // → 0-100
    });
  }, [answers, quiz]);

  const totalScore = Math.round(
    categoryScores.reduce((acc, c) => acc + c.score, 0) / categoryScores.length
  );

  const downloadPDF = async () => {
    const canvas = await html2canvas(cardRef.current, { backgroundColor: "#F0F9FF" });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const w = 210;
    const h = (canvas.height * w) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, w, h);
    pdf.save(`${quiz.id}-Report.pdf`);
  };

  if (submitted) {
     return (
        <div className="max-w-5xl mx-auto animate-fade-in px-4 md:px-6">
             <button onClick={onBack} className="mb-4 md:mb-8 flex items-center gap-2 text-[#475569] hover:text-[#2563EB] font-bold text-xs md:text-sm uppercase tracking-widest">
                 <BsArrowLeft /> Back to Dashboard
             </button>

            <div ref={cardRef} className="p-6 md:p-10 rounded-[2rem] bg-[#FFFFFF] border border-[#E2E8F0] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#2563EB]/5 rounded-full blur-[80px] pointer-events-none"></div>

                <h2 className="text-2xl md:text-4xl font-black text-center mb-2 text-[#1E3A8A] tracking-tight">{quiz.title} Report</h2>
                <p className="text-center text-[#475569] mb-6 md:mb-10 font-medium text-xs md:text-sm">Generated on {new Date().toLocaleString()}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative z-10">
                <div className="bg-[#F0F9FF] p-6 md:p-8 rounded-2xl border border-[#E2E8F0]">
                    <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 text-[#1E3A8A]">Overall Score</h3>
                    <div className="text-5xl md:text-7xl font-black text-[#2563EB] mb-6 md:mb-8">{totalScore}<span className="text-2xl md:text-3xl text-[#475569]">/100</span></div>
                    <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-hide">
                    {categoryScores.map((c) => (
                        <div key={c.cat}>
                        <div className="flex justify-between text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#475569] mb-2">
                            <span>{c.cat}</span>
                            <span>{c.score}%</span>
                        </div>
                        <div className="w-full bg-[#0F172A] rounded-full h-3 border border-[#E2E8F0]">
                            <div className="h-full rounded-full bg-[#2563EB] transition-all duration-1000" style={{ width: `${c.score}%` }} />
                        </div>
                        </div>
                    ))}
                    </div>
                </div>

                <div className="bg-[#F0F9FF] p-6 md:p-8 rounded-2xl border border-[#E2E8F0] flex items-center justify-center min-h-[300px]">
                    <div className="w-full h-full relative">
                        <Radar
                        data={{
                            labels: categoryScores.map((c) => c.cat),
                            datasets: [
                            {
                                label: "Proficiency",
                                data: categoryScores.map((c) => c.score),
                                backgroundColor: "rgba(37, 99, 235, 0.2)",
                                borderColor: "#2563EB",
                                pointBackgroundColor: "#2563EB",
                                pointBorderColor: "#fff",
                            },
                            ],
                        }}
                        options={{ 
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: { 
                                r: { 
                                    beginAtZero: true, 
                                    max: 100,
                                    grid: { color: '#444' },
                                    pointLabels: { color: '#475569', font: { size: 10, weight: 'bold' } },
                                    ticks: { display: false, backdropColor: 'transparent' }
                                } 
                            },
                            plugins: { legend: { display: false } }
                        }}
                        />
                    </div>
                </div>
                </div>

                <div className="mt-8 text-[#475569] text-[10px] md:text-xs font-bold uppercase tracking-widest text-center">
                80-100 Excellent • 60-79 Good • 40-59 Average • Below 40 Needs Work
                </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-4 justify-center pb-20 px-4">
                <button onClick={downloadPDF} className="flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-3 rounded-full bg-[#2563EB] text-[#F0F9FF] font-black uppercase tracking-widest text-xs md:text-sm hover:bg-[#1D4ED8] transition-all shadow-lg w-full sm:w-auto">
                <BsDownload /> Download PDF
                </button>
                <button onClick={onBack} className="px-6 py-3 md:px-8 md:py-3 rounded-full bg-[#FFFFFF] text-[#475569] font-black uppercase tracking-widest text-xs md:text-sm hover:bg-[#E2E8F0] hover:text-[#1E3A8A] transition-all border border-[#E2E8F0] w-full sm:w-auto">
                   Take Another Test
                </button>
            </div>
        </div>
     );
  }

  return (
      <div className="max-w-5xl mx-auto animate-fade-in relative z-10 px-4 md:px-6">
         <div className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-12 gap-4 md:gap-6 sticky top-0 py-4 z-40 bg-[#F0F9FF]/90 backdrop-blur-md border-b border-[#FFFFFF]">
           <button onClick={onBack} className="absolute top-2 left-0 text-[#475569] text-[10px] font-bold uppercase hover:text-[#2563EB] md:hidden">Back</button>
           
           <div className="mt-4 md:mt-0 text-center md:text-left w-full md:w-auto">
               <h2 className="text-xl md:text-3xl lg:text-4xl font-black text-[#1E3A8A] tracking-tighter">{quiz.title}</h2>
               <p className="text-[#475569] text-xs md:text-sm font-medium mt-1">Answer honestly for best results.</p>
           </div>
           
           <div className="flex items-center gap-3 bg-[#FFFFFF] px-4 py-2 rounded-full border border-[#E2E8F0] shadow-lg shrink-0">
             <BsClock className={`text-lg md:text-xl ${seconds < 60 ? "text-[#2563EB] animate-pulse" : "text-[#475569]"}`} />
             <span className={`font-mono text-lg md:text-xl font-bold ${seconds < 60 ? "text-[#2563EB]" : "text-[#1E3A8A]"}`}>
               {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, "0")}
             </span>
           </div>
         </div>

         <div className="space-y-6 md:space-y-8 pb-24 md:pb-20">
           {quiz.questions.map((q, idx) => (
             <div key={q.id} className="p-5 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-[#FFFFFF] border border-[#E2E8F0] shadow-xl hover:border-[#2563EB] transition-all">
               <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
                 <span className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#F0F9FF] border border-[#E2E8F0] flex items-center justify-center text-[#2563EB] font-black text-xs md:text-sm shadow-inner mt-1">
                     {idx + 1}
                 </span>
                 <div className="flex-1 w-full">
                   <p className="mb-4 md:mb-6 text-base md:text-xl font-bold text-[#1E3A8A] leading-snug">{q.q}</p>
                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 md:gap-3">
                     {options.map((opt, i) => (
                       <label
                         key={opt}
                         className={`cursor-pointer rounded-xl border px-1 py-3 md:px-2 md:py-4 text-center text-[10px] md:text-xs font-bold uppercase tracking-wide transition-all flex items-center justify-center min-h-[40px] md:min-h-0 ${
                           answers[q.id] === optionValues[i]
                             ? "border-[#2563EB] bg-[#2563EB] text-[#F0F9FF] shadow-lg scale-105"
                             : "border-[#E2E8F0] bg-[#F0F9FF] text-[#475569] hover:border-[#475569] hover:bg-[#FFFFFF]"
                         }`}
                       >
                         <input
                           type="radio"
                           name={q.id}
                           value={optionValues[i]}
                           checked={answers[q.id] === optionValues[i]}
                           onChange={() => handleAnswer(q.id, optionValues[i])}
                           className="sr-only"
                         />
                         {opt}
                       </label>
                     ))}
                   </div>
                 </div>
               </div>
             </div>
           ))}
         </div>

         <div className="fixed bottom-4 md:bottom-8 left-0 w-full flex justify-center pointer-events-none z-50 px-4">
           <button
             onClick={submitTest}
             className="pointer-events-auto w-full md:w-auto px-8 md:px-12 py-3 md:py-4 rounded-full bg-[#2563EB] text-[#F0F9FF] font-black text-base md:text-lg uppercase tracking-widest shadow-2xl shadow-blue-500/30 hover:bg-[#1D4ED8] hover:-translate-y-1 transition-all active:scale-[0.98] border-4 border-[#F0F9FF]"
           >
             Complete Quiz
           </button>
         </div>
       </div>
  );
};

export default function MockTestSoftSkills() {
    const [activeQuiz, setActiveQuiz] = useState(null);

    return (
        <div className="min-h-screen bg-[#F0F9FF] text-[#1E3A8A] p-4 md:p-6 font-sans selection:bg-[#2563EB] selection:text-[#F0F9FF]">
             <Helmet>
                <title>Free Mock Tests & Placement Assessment | Soft Skills, Aptitude - EduMedia</title>
                <meta name="description" content="Take free mock tests for placement preparation. Assess your soft skills, aptitude, communication, and technical knowledge. Get instant analysis and improvement tips." />
                <meta name="keywords" content="mock test, placement quiz, soft skills assessment, aptitude test, free online test, interview preparation, career assessment" />
             </Helmet>
             {/* Background Ambience */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[20rem] md:w-[40rem] h-[20rem] md:h-[40rem] bg-[#2563EB]/5 rounded-full blur-[80px] md:blur-[100px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[20rem] md:w-[40rem] h-[20rem] md:h-[40rem] bg-[#475569]/5 rounded-full blur-[80px] md:blur-[100px]"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {!activeQuiz ? (
                    <>
                        <div className="text-center mb-10 md:mb-16 pt-6 md:pt-10">
                            <h1 className="text-4xl md:text-6xl font-black text-[#1E3A8A] tracking-tighter mb-4">Assessment <span className="text-[#2563EB]">Hub</span></h1>
                            <p className="text-[#475569] font-medium text-base md:text-lg max-w-2xl mx-auto px-2">Select a module to evaluate your professional aptitude and discover areas for growth.</p>
                        </div>
                        <QuizList onSelect={setActiveQuiz} />
                    </>
                ) : (
                    <ActiveTest quiz={activeQuiz} onBack={() => setActiveQuiz(null)} />
                )}
            </div>
        </div>
    );
}