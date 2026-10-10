import React,{useState,useEffect} from "react";
import {api} from "../api";
import "./Dashboard.css";
export default function Dashboard(){
  const[stats,setStats]=useState(null);
  const[loading,setLoading]=useState(true);
  useEffect(()=>{api.dashboard().then(setStats).catch(console.error).finally(()=>setLoading(false))},[]);
  if(loading)return <div className="loading">Loading dashboard...</div>;
  if(!stats)return <div className="loading">Failed to load dashboard</div>;
  return(<div className="dashboard"><h1 className="page-title">Retention Dashboard</h1><p className="page-sub">Overview of student risk and engagement metrics</p><div className="stat-grid"><div className="stat-card total"><div className="stat-number">{stats.totalStudents}</div><div className="stat-label">Total Students</div></div><div className="stat-card high"><div className="stat-number">{stats.highRisk}</div><div className="stat-label">High Risk</div></div><div className="stat-card medium"><div className="stat-number">{stats.mediumRisk}</div><div className="stat-label">Medium Risk</div></div><div className="stat-card low"><div className="stat-number">{stats.lowRisk}</div><div className="stat-label">Low Risk</div></div><div className="stat-card gpa"><div className="stat-number">{stats.averageGpa}</div><div className="stat-label">Average GPA</div></div><div className="stat-card declining"><div className="stat-number">{stats.decliningStudents}</div><div className="stat-label">Declining Trend</div></div></div></div>);
}
