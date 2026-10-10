import React,{useState,useEffect,useRef} from "react";
import {api} from "../api";
import "./Chat.css";
export default function Chat({user}){
  const[messages,setMessages]=useState([]);
  const[input,setInput]=useState("");
  const[suggestions,setSuggestions]=useState([]);
  const[loading,setLoading]=useState(false);
  const bottomRef=useRef(null);
  useEffect(()=>{api.chatSuggestions().then(d=>setSuggestions(d.suggestions)).catch(console.error)},[]);
  useEffect(()=>{bottomRef.current?.scrollIntoView({behavior:"smooth"})},[messages]);
  const sendMessage=async(text)=>{
    const q=text||input;if(!q.trim())return;
    setMessages(prev=>[...prev,{role:"user",text:q}]);setInput("");setLoading(true);
    try{const res=await api.chat(q);setMessages(prev=>[...prev,{role:"assistant",text:res.answer,category:res.category}]);}
    catch(err){setMessages(prev=>[...prev,{role:"assistant",text:"Sorry, I encountered an error. Please try again.",category:"Error"}]);}
    finally{setLoading(false);}
  };
  return(<div className="chat-page"><div className="chat-container"><div className="chat-header"><h2>AI Retention Advisor</h2><p>Ask questions about student risk, outreach priorities, and support recommendations</p></div><div className="chat-messages">{messages.length===0&&(<div className="chat-empty"><p className="ce-title">How can I help with student retention today?</p><div className="ce-suggestions">{suggestions.map((s,i)=>(<button key={i} onClick={()=>sendMessage(s)}>{s}</button>))}</div></div>)}{messages.map((m,i)=>(<div key={i} className={"chat-msg "+m.role}>{m.category&&<div className="msg-category">{m.category}</div>}<div className="msg-text">{m.text}</div></div>))}{loading&&<div className="chat-msg assistant"><div className="msg-text typing"><span className="dot"/><span className="dot"/><span className="dot"/></div></div>}<div ref={bottomRef}/></div><div className="chat-input"><input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendMessage()} placeholder="Ask about student risk, outreach, or resources..."/><button onClick={()=>sendMessage()} disabled={!input.trim()||loading}>Send</button></div></div></div>);
}
