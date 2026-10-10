import React,{useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {api} from "../api";
import "./Students.css";
export default function Students(){
  const[students,setStudents]=useState([]);
  const[filter,setFilter]=useState("all");
  const[loading,setLoading]=useState(true);
  const navigate=useNavigate();
  useEffect(()=>{api.students().then(d=>setStudents(d.students)).catch(console.error).finally(()=>setLoading(false))},[]);
  const filtered=filter==="all"?students:students.filter(s=>s.riskLevel===filter);
  const sorted=[...filtered].sort((a,b)=>b.riskScore-a.riskScore);
  if(loading)return <div className="loading">Loading students...</div>;
  return(<div className="students-page"><h1 className="page-title">Student Risk Monitor</h1><p className="page-sub">Click any student to view detailed engagement analytics</p><div className="filter-bar"><button className={filter==="all"?"filter-btn active":"filter-btn"} onClick={()=>setFilter("all")}>All ({students.length})</button><button className={filter==="high"?"filter-btn high active":"filter-btn high"} onClick={()=>setFilter("high")}>High Risk</button><button className={filter==="medium"?"filter-btn medium active":"filter-btn medium"} onClick={()=>setFilter("medium")}>Medium Risk</button><button className={filter==="low"?"filter-btn low active":"filter-btn low"} onClick={()=>setFilter("low")}>Low Risk</button></div><div className="student-list">{sorted.map(s=>(<div key={s.id} className={"student-row "+s.riskLevel} onClick={()=>navigate("/students/"+s.id)}><div className="sr-left"><div className="sr-name">{s.name}{s.nudgeSent&&<span className="nudge-badge">Nudged</span>}</div><div className="sr-meta">{s.program} · GPA {s.gpa} · Last active {s.lastActive}</div></div><div className="sr-right"><div className={"risk-score "+s.riskLevel}>{s.riskScore}</div><div className={"risk-label "+s.riskLevel}>{s.riskLevel} risk</div><div className={"trend "+s.trend}>{s.trend==="declining"?"↓":"→"} {s.trend}</div></div></div>))}</div></div>);
}
