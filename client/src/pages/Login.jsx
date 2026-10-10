import React,{useState} from "react";
import {api,setToken} from "../api";
import "./Login.css";
export default function Login({onLogin}){
  const[email,setEmail]=useState("lthompson@college.edu");
  const[password,setPassword]=useState("advisor123");
  const[error,setError]=useState("");
  const[loading,setLoading]=useState(false);
  const handleSubmit=async(e)=>{
    e.preventDefault();setError("");setLoading(true);
    try{const res=await api.login(email,password,"advisor");setToken(res.token);onLogin(res.user);}
    catch(err){setError(err.message);}
    finally{setLoading(false);}
  };
  return(<div className="login-page"><div className="login-card"><div className="login-header"><span className="login-icon">🎓</span><h1>LearnBridge</h1><p>AI-Powered Student Retention Platform</p></div><form onSubmit={handleSubmit}><div className="form-group"><label>Email</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="advisor@college.edu"/></div><div className="form-group"><label>Password</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter password"/></div>{error&&<div className="login-error">{error}</div>}<button type="submit" className="login-btn" disabled={loading}>{loading?"Signing in...":"Sign In as Advisor"}</button></form><div className="login-hint">Demo: lthompson@college.edu / advisor123</div></div></div>);
}
