const students = [
  { id: "s1", name: "Maria Gonzalez", email: "mgonzalez@college.edu", program: "Nursing", semester: 3, gpa: 2.1, riskScore: 87, riskLevel: "high", lmsLogins: 2, assignmentsLate: 4, assignmentsTotal: 8, lastActive: "5 days ago", trend: "declining", nudgeSent: false, advisorNote: "", factors: ["Low LMS engagement", "4 late assignments", "GPA dropped 0.6 this semester", "Missed 2 tutoring appointments"] },
  { id: "s2", name: "James Chen", email: "jchen@college.edu", program: "Computer Science", semester: 2, gpa: 3.4, riskScore: 32, riskLevel: "low", lmsLogins: 18, assignmentsLate: 1, assignmentsTotal: 10, lastActive: "2 hours ago", trend: "stable", nudgeSent: false, advisorNote: "", factors: ["Strong engagement", "Consistent attendance"] },
  { id: "s3", name: "Aisha Williams", email: "awilliams@college.edu", program: "Business Admin", semester: 4, gpa: 2.5, riskScore: 71, riskLevel: "medium", lmsLogins: 6, assignmentsLate: 3, assignmentsTotal: 9, lastActive: "3 days ago", trend: "declining", nudgeSent: true, advisorNote: "Working two jobs — may need schedule adjustment", factors: ["Declining login frequency", "3 late submissions", "Previously strong student", "Financial aid concern flagged"] },
  { id: "s4", name: "David Park", email: "dpark@college.edu", program: "Engineering", semester: 1, gpa: 1.8, riskScore: 92, riskLevel: "high", lmsLogins: 1, assignmentsLate: 6, assignmentsTotal: 7, lastActive: "8 days ago", trend: "declining", nudgeSent: false, advisorNote: "", factors: ["Near-zero LMS engagement", "6 of 7 assignments late", "No discussion participation", "First-generation student", "Did not attend orientation"] },
  { id: "s5", name: "Sarah Mitchell", email: "smitchell@college.edu", program: "Liberal Arts", semester: 2, gpa: 3.1, riskScore: 45, riskLevel: "medium", lmsLogins: 10, assignmentsLate: 2, assignmentsTotal: 8, lastActive: "1 day ago", trend: "stable", nudgeSent: false, advisorNote: "", factors: ["Moderate engagement", "2 late assignments in last 2 weeks", "Attendance dropped slightly"] },
  { id: "s6", name: "Tyler Brooks", email: "tbrooks@college.edu", program: "Criminal Justice", semester: 3, gpa: 3.7, riskScore: 12, riskLevel: "low", lmsLogins: 22, assignmentsLate: 0, assignmentsTotal: 10, lastActive: "1 hour ago", trend: "improving", nudgeSent: false, advisorNote: "", factors: ["Excellent engagement", "All assignments on time", "Active discussion participant"] },
  { id: "s7", name: "Emma Rodriguez", email: "erodriguez@college.edu", program: "Psychology", semester: 2, gpa: 2.3, riskScore: 78, riskLevel: "high", lmsLogins: 4, assignmentsLate: 5, assignmentsTotal: 9, lastActive: "4 days ago", trend: "declining", nudgeSent: true, advisorNote: "Referred to counseling services", factors: ["Sharp decline in engagement", "5 late assignments", "Stopped attending study groups", "Previously active student"] },
  { id: "s8", name: "Kevin Nguyen", email: "knguyen@college.edu", program: "Computer Science", semester: 4, gpa: 3.2, riskScore: 28, riskLevel: "low", lmsLogins: 20, assignmentsLate: 0, assignmentsTotal: 11, lastActive: "3 hours ago", trend: "stable", nudgeSent: false, advisorNote: "", factors: ["Consistent performance", "Strong attendance", "Peer tutor"] }
];

const advisors = [
  { id: "a1", name: "Dr. Lisa Thompson", email: "lthompson@college.edu", password: "advisor123", token: "advisor-token-1", role: "advisor", department: "Student Success Center" }
];

function getStudentById(id) { return students.find(s => s.id === id) || null; }

function toggleNudge(id) {
  const s = getStudentById(id);
  if (s) { s.nudgeSent = !s.nudgeSent; }
  return s;
}

function updateRiskNote(id, note) {
  const s = getStudentById(id);
  if (s) { s.advisorNote = note; }
  return s;
}

function loginUser(email, password, role) {
  if (role === "advisor") {
    const a = advisors.find(a => a.email === email && a.password === password);
    if (a) return { token: a.token, user: { name: a.name, role: a.role, department: a.department } };
  }
  return null;
}

function getAdvisorStudents() {
  return students.map(s => ({ id: s.id, name: s.name, program: s.program, gpa: s.gpa, riskScore: s.riskScore, riskLevel: s.riskLevel, lastActive: s.lastActive, trend: s.trend, nudgeSent: s.nudgeSent }));
}

function getDashboardStats() {
  const high = students.filter(s => s.riskLevel === "high").length;
  const medium = students.filter(s => s.riskLevel === "medium").length;
  const low = students.filter(s => s.riskLevel === "low").length;
  const avgGpa = (students.reduce((sum, s) => sum + s.gpa, 0) / students.length).toFixed(2);
  const declining = students.filter(s => s.trend === "declining").length;
  const nudged = students.filter(s => s.nudgeSent).length;
  return { totalStudents: students.length, highRisk: high, mediumRisk: medium, lowRisk: low, averageGpa: avgGpa, decliningStudents: declining, nudgesSent: nudged };
}

export { students, advisors, getStudentById, toggleNudge, updateRiskNote, loginUser, getAdvisorStudents, getDashboardStats };
