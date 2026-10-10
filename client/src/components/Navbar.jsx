import React from "react";
import {NavLink} from "react-router-dom";
import "./Navbar.css";
export default function Navbar({user,onLogout}){
  return(<nav className="navbar"><div className="nav-brand"><span className="nav-icon">🎓</span><span className="nav-title">LearnBridge</span></div><div className="nav-links"><NavLink to="/" end className={({isActive})=>isActive?"nav-link active":"nav-link"}>Dashboard</NavLink><NavLink to="/students" className={({isActive})=>isActive?"nav-link active":"nav-link"}>Students</NavLink><NavLink to="/chat" className={({isActive})=>isActive?"nav-link active":"nav-link"}>AI Advisor</NavLink></div><div className="nav-user"><span className="nav-name">{user.name}</span><button className="logout-btn" onClick={onLogout}>Logout</button></div></nav>);
}
