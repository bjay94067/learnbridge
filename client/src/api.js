const students = [
  { id: "s1", name: "Maria Gonzalez", email: "mgonzalez@college.edu", program: "Nursing", semester: 3, gpa: 2.1, riskScore: 87, riskLevel: "high", lmsLogins: 2, assignmentsLate: 4, assignmentsTotal: 8, lastActive: "5 days ago", trend: "declining", nudgeSent: false, advisorNote: "", factors: ["Low LMS engagement", "4 late assignments", "GPA dropped 0.6 this semester", "Missed 2 tutoring appointments"] },
  { id: "s2", name: "James Chen", email: "jchen@college.edu", program: "Computer Science", semester: 2, gpa: 3.4, riskScore: 32, riskLevel: "low", lmsLogins: 18, assignmentsLate: 1, assignmentsTotal: 10, lastActive: "2 hours ago", trend: "stable", nudgeSent: false, advisorNote: "", factors: ["Strong engagement", "Consistent attendance"] },
  { id: "s3", name: "Aisha Williams", email: "awilliams@college.edu", program: "Business Admin", semester: 4, gpa: 2.5, riskScore: 71, riskLevel: "medium", lmsLogins: 6, assignmentsLate: 3, assignmentsTotal: 9, lastActive: "3 days ago", trend: "declining", nudgeSent: true, advisorNote: "Working two jobs", factors: ["Declining login frequency", "3 late submissions", "Previously strong student", "Financial aid concern flagged"] },
  { id: "s4", name: "David Park", email: "dpark@college.edu", program: "Engineering", semester: 1, gpa: 1.8, riskScore: 92, riskLevel: "high", lmsLogins: 1, assignmentsLate: 6, assignmentsTotal: 7, lastActive: "8 days ago", trend: "declining", nudgeSent: false, advisorNote: "", factors: ["Near-zero LMS engagement", "6 of 7 assignments late", "No discussion participation", "First-generation student", "Did not attend orientation"] },
  { id: "s5", name: "Sarah Mitchell", email: "smitchell@college.edu", program: "Liberal Arts", semester: 2, gpa: 3.1, riskScore: 45, riskLevel: "medium", lmsLogins: 10, assignmentsLate: 2, assignmentsTotal: 8, lastActive: "1 day ago", trend: "stable", nudgeSent: false, advisorNote: "", factors: ["Moderate engagement", "2 late assignments in last 2 weeks"] },
  { id: "s6", name: "Tyler Brooks", email: "tbrooks@college.edu", program: "Criminal Justice", semester: 3, gpa: 3.7, riskScore: 12, riskLevel: "low", lmsLogins: 22, assignmentsLate: 0, assignmentsTotal: 10, lastActive: "1 hour ago", trend: "improving", nudgeSent: false, advisorNote: "", factors: ["Excellent engagement", "All assignments on time"] },
  { id: "s7", name: "Emma Rodriguez", email: "erodriguez@college.edu", program: "Psychology", semester: 2, gpa: 2.3, riskScore: 78, riskLevel: "high", lmsLogins: 4, assignmentsLate: 5, assignmentsTotal: 9, lastActive: "4 days ago", trend: "declining", nudgeSent: true, advisorNote: "Referred to counseling", factors: ["Sharp decline in engagement", "5 late assignments", "Stopped attending study groups"] },
  { id: "s8", name: "Kevin Nguyen", email: "knguyen@college.edu", program: "Computer Science", semester: 4, gpa: 3.2, riskScore: 28, riskLevel: "low", lmsLogins: 20, assignmentsLate: 0, assignmentsTotal: 11, lastActive: "3 hours ago", trend: "stable", nudgeSent: false, advisorNote: "", factors: ["Consistent performance", "Strong attendance", "Peer tutor"] }
];

const RESPONSES = {
  risk: { answer: "Based on current analytics, David Park (Engineering, risk 92) and Maria Gonzalez (Nursing, risk 87) show the highest risk. David has near-zero LMS engagement with 6 of 7 assignments late. Maria's GPA dropped 0.6 this semester with only 2 LMS logins. Emma Rodriguez (Psychology, risk 78) is also concerning. Immediate outreach to David and Maria is recommended.", category: "Risk Assessment" },
  factors: { answer: "Analysis of declining students reveals three common factors. First, LMS login frequency drops before assignment problems appear. Second, students with external pressures show sudden decline rather than gradual deterioration. Third, first-generation students who miss orientation show persistently low engagement from the start.", category: "Pattern Analysis" },
  prioritize: { answer: "Recommended priority this week: Priority 1 — David Park (risk 92, last active 8 days ago, no nudge sent). Priority 2 — Maria Gonzalez (risk 87, last active 5 days ago). Priority 3 — Emma Rodriguez (risk 78, verify counseling follow-through). Priority 4 — Aisha Williams (risk 71, schedule adjustment needed). Other students are stable.", category: "Outreach Planning" },
  resources: { answer: "For David Park: mandatory advising appointment, orientation makeup, peer mentor assignment. For Maria Gonzalez: academic tutoring, time management workshop. For Aisha Williams: financial aid office referral, schedule adjustment consultation. For Emma Rodriguez: follow up on counseling referral, connect with peer support group.", category: "Resource Matching" },
  default: { answer: "I can help you analyze student engagement, identify at-risk students, prioritize outreach, and recommend resources. Try asking about risk levels, common factors, outreach priorities, or support recommendations.", category: "General" }
};

function getResponse(q) {
  const l = q.toLowerCase();
  if (l.includes("risk") || l.includes("drop") || l.includes("danger")) return RESPONSES.risk;
  if (l.includes("factor") || l.includes("pattern") || l.includes("why")) return RESPONSES.factors;
  if (l.includes("priorit") || l.includes("outreach") || l.includes("week")) return RESPONSES.prioritize;
  if (l.includes("resource") || l.includes("support") || l.includes("recommend")) return RESPONSES.resources;
  return RESPONSES.default;
}

let token = "";
export function setToken(t) { token = t; }
export function getToken() { return token; }

export const api = {
  login: (email, password, role) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "lthompson@college.edu" && password === "advisor123") {
          resolve({ token: "advisor-token-1", user: { name: "Dr. Lisa Thompson", role: "advisor", department: "Student Success Center" } });
        } else { reject(new Error("Invalid credentials")); }
      }, 500);
    });
  },
  dashboard: () => {
    const high = students.filter(s => s.riskLevel === "high").length;
    const medium = students.filter(s => s.riskLevel === "medium").length;
    const low = students.filter(s => s.riskLevel === "low").length;
    const avgGpa = (students.reduce((sum, s) => sum + s.gpa, 0) / students.length).toFixed(2);
    const declining = students.filter(s => s.trend === "declining").length;
    const nudged = students.filter(s => s.nudgeSent).length;
    return Promise.resolve({ totalStudents: students.length, highRisk: high, mediumRisk: medium, lowRisk: low, averageGpa: avgGpa, decliningStudents: declining, nudgesSent: nudged });
  },
  students: () => Promise.resolve({ students: students.map(s => ({ id: s.id, name: s.name, program: s.program, gpa: s.gpa, riskScore: s.riskScore, riskLevel: s.riskLevel, lastActive: s.lastActive, trend: s.trend, nudgeSent: s.nudgeSent })) }),
  student: (id) => {
    const s = students.find(st => st.id === id);
    return s ? Promise.resolve({ student: s }) : Promise.reject(new Error("Student not found"));
  },
  nudge: (id) => {
    const s = students.find(st => st.id === id);
    if (s) { s.nudgeSent = !s.nudgeSent; return Promise.resolve({ student: s }); }
    return Promise.reject(new Error("Student not found"));
  },
  addNote: (id, note) => {
    const s = students.find(st => st.id === id);
    if (s) { s.advisorNote = note; return Promise.resolve({ student: s }); }
    return Promise.reject(new Error("Student not found"));
  },
  chatSuggestions: () => Promise.resolve({ suggestions: ["Which students are most at risk?", "What are common factors for declining students?", "How should I prioritize outreach this week?", "What resources should I recommend?"] }),
  chat: (question) => {
    return new Promise((resolve) => {
      setTimeout(() => { resolve(getResponse(question)); }, 800);
    });
  }
};