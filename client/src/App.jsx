import React,{useState} from "react";
import {Routes,Route,Navigate} from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import StudentDetail from "./pages/StudentDetail";
import Chat from "./pages/Chat";
import "./App.css";
export default function App(){
  const[user,setUser]=useState(null);
  if(!user)return <Login onLogin={setUser}/>;
  return(<div className="app"><Navbar user={user} onLogout={()=>setUser(null)}/><div className="main-content"><Routes><Route path="/" element={<Dashboard/>}/><Route path="/students" element={<Students/>}/><Route path="/students/:id" element={<StudentDetail/>}/><Route path="/chat" element={<Chat user={user}/>}/><Route path="*" element={<Navigate to="/"/>}/></Routes></div></div>);
}
