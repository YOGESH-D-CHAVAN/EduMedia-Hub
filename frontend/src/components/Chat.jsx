// Chat.jsx - Earthy Theme
import { useEffect, useState, useRef } from "react";
import socket from "../socket";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [groups, setGroups] = useState([{ id: "global", name: "Community Hall" }]);
  const [activeRoom, setActiveRoom] = useState("global");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const scrollRef = useRef(null);
  
  const [userId] = useState(() => "user_" + Math.floor(Math.random() * 9999));

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/v1/rooms");
        const data = await response.json();
        if (data && data.length > 0) {
          setGroups(data);
        }
      } catch (err) {
        console.error("Error fetching rooms:", err);
      }
    };
    fetchRooms();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket.emit("joinRoom", activeRoom);
    setMessages([]); 
    
    socket.on("loadMessages", (history) => {
      setMessages(history);
    });

    return () => {
      socket.off("loadMessages");
    };
  }, [activeRoom]);

  useEffect(() => {
    const onReceiveMessage = (msg) => {
      if (msg.roomId === activeRoom) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    socket.on("receiveMessage", onReceiveMessage);
    return () => socket.off("receiveMessage", onReceiveMessage);
  }, [activeRoom]);

  const createGroup = async () => {
    if (!newGroupName.trim()) return;

    try {
      const response = await fetch("http://localhost:5001/api/v1/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newGroupName }),
      });
      
      const savedRoom = await response.json();
      
      setGroups((prev) => [...prev, savedRoom]);
      setActiveRoom(savedRoom.id);
      setNewGroupName("");
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error creating room:", err);
      alert("Failed to create room.");
    }
  };

  const sendMessage = () => {
    if (!message.trim()) return;

    const payload = {
      roomId: activeRoom,
      senderId: userId,
      user: "User-" + userId.slice(-3),
      text: message,
    };

    socket.emit("sendMessage", payload);
    setMessage("");
  };

  return (
    <div className="flex h-screen w-full bg-[#262626] text-[#E2E8CE] overflow-hidden font-sans selection:bg-[#FF7F11] selection:text-[#262626]">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#333333] border-r border-[#444444] flex flex-col shrink-0 relative z-20">
        <div className="p-6 border-b border-[#444444] flex justify-between items-center bg-[#262626]">
          <h2 className="font-bold text-[#ACBFA4] text-xs tracking-widest uppercase">Discussion Rooms</h2>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="p-2 bg-[#333333] hover:bg-[#FF7F11] hover:text-[#262626] rounded-lg transition-all shadow-md group"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"></path></svg>
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
          {groups.map((group) => (
            <button
              key={group.id}
              onClick={() => setActiveRoom(group.id)}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 border ${
                activeRoom === group.id 
                ? "bg-[#FF7F11] border-[#FF7F11] text-[#262626] font-bold shadow-lg shadow-orange-900/10" 
                : "bg-transparent border-transparent hover:bg-[#262626] text-[#ACBFA4] hover:text-[#E2E8CE]"
              }`}
            >
              <span className="opacity-50">#</span>
              <span className="truncate text-sm tracking-wide">{group.name}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* CHAT MAIN CONTENT */}
      <main className="flex-1 flex flex-col bg-[#262626] relative z-10">
        
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#ACBFA4 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        </div>

        <header className="bg-[#333333]/90 backdrop-blur-md px-8 py-5 border-b border-[#444444] flex items-center justify-between z-10 shadow-sm">
          <div>
            <h2 className="font-black text-xl text-[#E2E8CE] tracking-tight"># {groups.find(g => g.id === activeRoom)?.name || "Chat"}</h2>
            <p className="text-[10px] text-[#ACBFA4] font-bold uppercase mt-1 tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#FF7F11] rounded-full animate-pulse"></span>
              Live Connection
            </p>
          </div>
        </header>

        {/* MESSAGES BOX */}
        <div className="flex-1 overflow-y-auto px-6 md:px-20 py-8 flex flex-col gap-6 custom-scrollbar relative z-0">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full opacity-30 text-center">
              <div className="w-16 h-16 rounded-full bg-[#333333] flex items-center justify-center mb-4">
                 <svg className="w-8 h-8 text-[#ACBFA4]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
              </div>
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#ACBFA4]">Quiet Room</p>
            </div>
          )}
          
          {messages.map((msg, index) => {
            const isMe = msg.senderId === userId;
            return (
              <div key={msg._id || index} className={`flex w-full ${isMe ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] md:max-w-[60%] px-6 py-4 rounded-2xl relative shadow-md transition-all ${
                  isMe ? "bg-[#FF7F11] text-[#262626] rounded-tr-none" : "bg-[#333333] text-[#E2E8CE] rounded-tl-none border border-[#444444]"
                }`}>
                  {!isMe && <span className="text-[10px] font-black text-[#ACBFA4] uppercase mb-2 block tracking-wider">{msg.user}</span>}
                  <p className="text-[15px] leading-relaxed break-words font-medium">{msg.text}</p>
                  <span className={`text-[9px] block text-right mt-2 font-bold uppercase tracking-widest ${isMe ? "text-[#262626]/60" : "text-[#666666]"}`}>
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            );
          })}
          <div ref={scrollRef} />
        </div>

        {/* INPUT FOOTER */}
        <footer className="p-6 bg-[#333333] border-t border-[#444444]">
          <div className="flex items-center gap-4 max-w-5xl mx-auto">
            <div className="flex-1 bg-[#262626] border border-[#444444] rounded-2xl px-5 py-2 focus-within:border-[#FF7F11] transition-all shadow-inner">
              <input
                type="text"
                placeholder={`Message #${groups.find(g => g.id === activeRoom)?.name || 'room'}...`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="w-full bg-transparent py-3 text-sm outline-none placeholder-[#666666] text-[#E2E8CE] font-medium"
              />
            </div>
            <button 
              onClick={sendMessage}
              className="bg-[#FF7F11] hover:bg-[#e06c09] text-[#262626] p-4 rounded-2xl transition-all active:scale-95 shadow-lg shadow-orange-500/10"
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path></svg>
            </button>
          </div>
        </footer>
      </main>

      {/* CREATE GROUP MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#262626]/90 backdrop-blur-sm px-4">
          <div className="bg-[#333333] p-8 rounded-[2rem] border border-[#444444] w-full max-w-md shadow-2xl relative">
            <h3 className="text-2xl font-black text-[#E2E8CE] mb-2 tracking-tight">Create Channel</h3>
            <p className="text-[#ACBFA4] text-sm mb-8 font-medium">Start a new discussion topic.</p>
            <input 
              autoFocus
              className="w-full bg-[#262626] border border-[#444444] rounded-xl px-5 py-4 text-sm outline-none focus:border-[#FF7F11] transition-all text-[#E2E8CE] mb-8 shadow-inner font-bold placeholder-[#666666]"
              placeholder="e.g. System Design"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
            />
            <div className="flex justify-end gap-4 font-bold uppercase tracking-widest text-xs">
              <button onClick={() => setIsModalOpen(false)} className="px-6 py-3 text-[#ACBFA4] hover:text-[#E2E8CE]">Cancel</button>
              <button onClick={createGroup} className="px-8 py-3 bg-[#FF7F11] text-[#262626] rounded-xl hover:bg-[#e06c09] shadow-lg shadow-orange-500/20">Create</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #444; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #555; }
      `}</style>
    </div>
  );
};

export default Chat;