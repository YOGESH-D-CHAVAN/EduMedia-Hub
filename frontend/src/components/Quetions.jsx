// Quetions.jsx - Earthy Theme
import React, { useEffect, useState } from "react";
import { Search, Plus, Trash2 } from "lucide-react";
import { jwtDecode } from "jwt-decode";

/* ---------------------------------- Answer Submission Interface (AnswerBox) ---------------------------------- */
function AnswerBox({ questionId, onAnswer }) {
  const [answer, setAnswer] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleReply = () => {
    if (!answer.trim()) return;
    onAnswer(questionId, answer);
    setAnswer("");
    setShowForm(false);
  };

  if (!showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        className="w-full mt-6 py-3 rounded-xl bg-[#262626] border border-[#444444] text-[#E2E8CE] font-bold text-xs uppercase tracking-widest hover:bg-[#FF7F11] hover:text-[#262626] transition-all flex items-center justify-center gap-2 group shadow-sm"
      >
        <Plus className="w-4 h-4 text-[#FF7F11] group-hover:text-[#262626] transition-colors" />
        Contribute Answer
      </button>
    );
  }

  return (
    <div className="mt-6 pt-6 border-t border-[#444444] flex flex-col gap-4 animate-fade-in">
      <h4 className="text-xs font-black text-[#ACBFA4] uppercase tracking-widest mb-2">Your Insight</h4>
      <div className="flex gap-4 items-start">
        <textarea
          className="flex-1 rounded-xl bg-[#262626] border border-[#444444] text-[#E2E8CE] px-5 py-4 placeholder-[#666666] font-medium outline-none focus:border-[#FF7F11] shadow-inner resize-none h-24"
          placeholder="Share your knowledge here..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleReply()}
        />
        <div className="flex flex-col gap-2">
            <button
            onClick={handleReply}
            className="px-6 py-3 bg-[#FF7F11] text-[#262626] rounded-xl font-black uppercase tracking-widest text-xs hover:bg-[#e06c09] transition shadow-lg active:scale-95 h-full"
            disabled={!answer.trim()}
            >
            Post
            </button>
            <button
                onClick={() => {
                setShowForm(false);
                setAnswer("");
                }}
                className="px-6 py-2 text-[#666666] hover:text-[#E2E8CE] font-bold text-xs uppercase tracking-wider transition"
            >
                Cancel
            </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- Question Card ---------------------------------- */
function QuestionCard({ question, onAnswer, onDelete, currentUserId }) {
  // Check if current user is the author
  const isAuthor = currentUserId && question.author && question.author._id === currentUserId;

  return (
    <div className="bg-[#333333] rounded-[2rem] shadow-xl border border-[#444444] p-8 hover:border-[#FF7F11] transition-all duration-300 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF7F11]/5 rounded-full blur-[60px] group-hover:bg-[#FF7F11]/10 transition-colors pointer-events-none"></div>

      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className="flex-1 pr-4">
             <h3 className="text-xl font-bold text-[#E2E8CE] leading-snug">{question.question}</h3>
             <div className="flex items-center gap-2 mt-2">
                {question.author && (
                    <span className="text-[10px] uppercase font-bold text-[#ACBFA4] tracking-widest bg-[#262626] px-2 py-1 rounded border border-[#444444]">
                        {question.author.username || "Anonymous"}
                    </span>
                )}
             </div>
        </div>
        <div className="flex flex-col items-end gap-2">
            <span className="flex-shrink-0 px-3 py-1 bg-[#262626] border border-[#444444] text-[#FF7F11] rounded-lg text-xs font-black uppercase tracking-widest shadow-inner">
            {question.answers.length} Replies
            </span>
            {isAuthor && (
                <button
                    onClick={() => onDelete(question._id)}
                    className="p-2 text-[#666666] hover:text-red-500 transition-colors"
                    title="Delete Question"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            )}
        </div>
      </div>

      <div className="mt-8 space-y-4 border-t border-[#444444] pt-6 relative z-10">
        <h3 className="text-[10px] font-black text-[#666666] uppercase tracking-widest mb-4">Community Solutions</h3>

        {question.answers.length > 0 ? (
          question.answers.map((a, idx) => (
            <div
              key={idx}
              className="bg-[#262626] rounded-xl p-5 border-l-4 border-[#FF7F11] shadow-md"
            >
              <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold text-[#ACBFA4] uppercase tracking-wide">
                      {a.author?.username || "Contributor"}
                  </span>
                  <span className="text-[10px] text-[#666666]">{new Date(a.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="text-[#E2E8CE] font-medium leading-relaxed text-sm">{a.text}</p>
            </div>
          ))
        ) : (
          <div className="text-center py-6 bg-[#262626]/50 rounded-xl border border-[#444444] border-dashed">
             <p className="text-[#666666] font-bold text-xs uppercase tracking-wide">No responses yet. Be the first!</p>
          </div>
        )}
      </div>

      <AnswerBox questionId={question._id} onAnswer={onAnswer} />
    </div>
  );
}

/* ---------------------------------- MAIN Q&A BOARD ---------------------------------- */
export default function QandABoard() {
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);

  const API_BASE_URL = "http://localhost:5001/api/qna";

  const fetchQuestions = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/getQuestions`);
      const data = await res.json();
      setQuestions(data.questions || []);
    } catch (err) {
      console.error("Error retrieving questions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
        try {
            const decoded = jwtDecode(token);
            setCurrentUserId(decoded.userId);
        } catch (e) {
            console.error("Invalid token", e);
        }
    }
    fetchQuestions();
  }, []);

  const addQuestion = async () => {
    if (!questionText.trim()) return;

    try {
      const token = localStorage.getItem("authToken");  
      const res = await fetch(API_BASE_URL, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({ question: questionText }),
      });

      const data = await res.json();
      if(res.ok) {
          setQuestions([data.question, ...questions]);
          setQuestionText("");
      } else {
          alert(data.message || "Failed to post question");
      }
    } catch (err) {
      console.error("Error submitting question:", err);
    }
  };
  
  const handleDelete = async (id) => {
    if(!window.confirm("Delete this discussion?")) return;
    try {
        const token = localStorage.getItem("authToken");
        const res = await fetch(`${API_BASE_URL}/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if(res.ok) {
            setQuestions(prev => prev.filter(q => q._id !== id));
        } else {
            alert(data.message || "Failed to delete.");
        }
    } catch (e) {
        console.error(e);
    }
  };

  const addAnswer = async (qId, answerText) => {
    try {
      const res = await fetch(`${API_BASE_URL}/${qId}/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: answerText }),
      });

      const updated = await res.json();
      setQuestions((prev) =>
        prev.map((q) => (q._id === qId ? updated.question : q))
      );
    } catch (err) {
      console.error("Error submitting answer:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#262626] text-[#E2E8CE] py-20 px-8 font-sans selection:bg-[#FF7F11] selection:text-[#262626] relative">
      
      {/* Ambient Backgound */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
         <div className="absolute top-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-[#FF7F11]/5 rounded-full blur-[100px]"></div>
         <div className="absolute bottom-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-[#ACBFA4]/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">

        {/* HEADER */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full border border-[#444444] bg-[#333333] text-[#ACBFA4] font-bold text-xs uppercase tracking-widest mb-6 shadow-md">
             Knowledge Base
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 text-[#E2E8CE] tracking-tighter drop-shadow-xl">
            Tech <span className="text-[#FF7F11]">Repository</span>
          </h1>
          <p className="text-xl text-[#ACBFA4] max-w-2xl mx-auto font-medium">
            Ask questions. Share knowledge. Grow together.
          </p>
        </div>

        {/* ASK QUESTION */}
        <div className="bg-[#333333] rounded-[2.5rem] p-10 mb-20 border border-[#444444] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#ACBFA4]/5 rounded-full blur-[80px] pointer-events-none"></div>

          <label className="text-2xl font-black text-[#E2E8CE] mb-6 block tracking-tight relative z-10">
            Submit a Query
          </label>

          <div className="relative z-10">
            <textarea
                className="w-full bg-[#262626] text-[#E2E8CE] p-6 rounded-2xl border border-[#444444] placeholder-[#666666] font-medium outline-none focus:border-[#FF7F11] shadow-inner transition-all resize-none h-40 mb-6"
                placeholder="What technical challenge are you facing today?"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
            />

            <div className="flex justify-end">
                <button
                onClick={addQuestion}
                className="px-10 py-4 bg-[#FF7F11] text-[#262626] rounded-full font-black uppercase tracking-widest text-sm hover:bg-[#e06c09] transition shadow-lg active:scale-95 hover:-translate-y-1"
                disabled={!questionText.trim()}
                >
                Publish Question
                </button>
            </div>
          </div>
        </div>

        {/* QUESTIONS LIST */}
        <div className="flex items-center gap-4 mb-10 border-b border-[#444444] pb-4">
            <h2 className="text-3xl font-black text-[#E2E8CE] tracking-tight">
            Latest <span className="text-[#FF7F11]">Discussions</span>
            </h2>
            <div className="flex-1 h-px bg-[#444444]"></div>
             <div className="text-[#666666] font-bold text-xs uppercase tracking-widest">
                {questions.length} Topics
            </div>
        </div>

        <div className="space-y-8">
          {loading && (
            <div className="text-center p-20">
                <div className="w-12 h-12 border-4 border-[#333333] border-t-[#FF7F11] rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-[#ACBFA4] font-bold text-xs uppercase tracking-widest">Loading Repository...</p>
            </div>
          )}

          {!loading && questions.length === 0 && (
            <div className="text-center p-20 bg-[#333333] rounded-[2rem] border border-[#444444] border-dashed">
              <div className="w-20 h-20 bg-[#262626] rounded-full mx-auto mb-6 flex items-center justify-center border border-[#444444]">
                   <Search className="w-8 h-8 text-[#ACBFA4]" />
              </div>
              <p className="text-[#E2E8CE] text-xl font-bold mb-2">No discussions found.</p>
              <p className="text-[#666666] font-medium">Be the first to start a conversation!</p>
            </div>
          )}

          {!loading &&
            questions.map((q) => (
              <QuestionCard key={q._id} question={q} onAnswer={addAnswer} onDelete={handleDelete} currentUserId={currentUserId} />
            ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
}
