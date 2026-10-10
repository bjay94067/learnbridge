import React,{useState,useEffect} from "react";
import {useParams,useNavigate} from "react-router-dom";
import {api} from "../api";
import "./StudentDetail.css";
export default function StudentDetail(){
  const{id}=useParams();
  const navigate=useNavigate();
  const[student,setStudent]=useState(null);
  const[note,setNote]=useState("");
  const[loading,setLoading]=useState(true);
  const[saving,setSaving]=useState(false);
  useEffect(()=>{api.student(id).then(d=>{setStudent(d.student);setNote(d.student.advisorNote||"")}).catch(console.error).finally(()=>setLoading(false))},[id]);
  const handleNudge=async()=>{const res=await api.nudge(id);setStudent(res.student)};
  const handleSaveNote=async()=>{if(!note.trim())return;setSaving(true);const res=await api.addNote(id,note);setStudent(res.student);setSaving(false)};
  if(loading)return <div className="loading">Loading student...</div>;
  if(!student)return <div className="loading">Student not found</div>;
  return(<div className="detail-page"><button className="back-btn" onClick={()=>navigate("/students")}>← Back to Students</button><div className="detail-header"><div className="dh-left"><h1>{student.name}</h1><p className="dh-meta">{student.program} · Semester {student.semester} · {student.email}</p></div><div className="dh-right"><div className={"detail-risk "+student.riskLevel}><div className="dr-score">{student.riskScore}</div><div className="dr-label">{student.riskLevel} risk</div></div></div></div><div className="detail-grid"><div className="detail-card"><h3>Engagement Metrics</h3><div className="metric-row"><span>GPA</span><strong>{student.gpa}</strong></div><div className="metric-row"><span>LMS Logins (this week)</span><strong>{student.lmsLogins}</strong></div><div className="metric-row"><span>Late Assignments</span><strong>{student.assignmentsLate} / {student.assignmentsTotal}</strong></div><div className="metric-row"><span>Last Active</span><strong>{student.lastActive}</strong></div><div className="metric-row"><span>Trend</span><strong className={"trend-val "+student.trend}>{student.trend}</strong></div></div><div className="detail-card"><h3>Risk Factors</h3><ul className="factor-list">{student.factors.map((f,i)=>(<li key={i}>{f}</li>))}</ul></div><div className="detail-card"><h3>Advisor Actions</h3><div className="nudge-section"><button className={student.nudgeSent?"nudge-btn sent":"nudge-btn"} onClick={handleNudge}>{student.nudgeSent?"✓ Nudge Sent":"Send Nudge Notification"}</button><p className="nudge-hint">{student.nudgeSent?"Student has been notified":"Send an automated check-in message to the student"}</p></div><div className="note-section"><label>Advisor Notes</label><textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="Add notes about this student..."/><button className="save-note-btn" onClick={handleSaveNote} disabled={saving}>{saving?"Saving...":"Save Note"}</button></div></div></div></div>);
}
