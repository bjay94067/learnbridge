import React, { useState } from 'react';
import './StudentChat.css';
export default function StudentChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const send = async () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    const q = input; setInput(''); setLoading(true);
    try {
      const res = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ question: q }) });
      const data = await res.json();
      if (data.answer) setMessages(prev => [...prev, { role: 'bot', text: data.answer }]);
      else setMessages(prev => [...prev, { role: 'bot', text: data.error || 'Sorry, something went wrong.' }]);
    } catch { setMessages(prev => [...prev, { role: 'bot', text: 'Connection error. Please try again.' }]); }
    finally { setLoading(false); }
  };
  return (
    <div className="chat-page">
      <div className="chat-container">
        <div className="chat-head"><h2>🎓 Student Support Chat</h2><p>Ask about financial aid, tutoring, registration, counseling, or deadlines</p></div>
        <div className="chat-msgs">
          {messages.length === 0 && <div className="chat-empty"><p className="empty-t">How can we help you today?</p><div className="sugg-row">
            <button onClick={()=>setInput('How do I apply for financial aid?')}>Financial Aid</button>
            <button onClick={()=>setInput('Where can I find tutoring help?')}>Tutoring</button>
            <button onClick={()=>setInput('What are the registration deadlines?')}>Deadlines</button>
            <button onClick={()=>setInput('I need counseling support')}>Counseling</button>
          </div></div>}
          {messages.map((m,i) => <div key={i} className={`msg ${m.role}`}><div className="msg-bubble">{m.text}</div></div>)}
          {loading && <div className="msg bot"><div className="msg-bubble typing"><span className="dot"/><span className="dot"/><span className="dot"/></div></div>}
        </div>
        <div className="chat-input"><input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Ask a question..." /><button onClick={send} disabled={!input.trim()}>Send</button></div>
      </div>
    </div>);
}
