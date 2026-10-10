import express from "express";
import cors from "cors";
import path from "path";
import { students, advisors, getStudentById, toggleNudge, updateRiskNote, loginUser, getAdvisorStudents, getDashboardStats } from "./store.js";
import { generateChatResponse, SUGGESTIONS } from "./ai.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(import.meta.dirname, "..", "client", "dist")));

function auth(req, res, next) {
  const token = (req.headers.authorization || "").replace("Bearer ", "");
  const user = advisors.find(a => a.token === token) || (token === "student-token" ? { role: "student", id: "s1" } : null);
  if (!user) return res.status(401).json({ error: "Unauthorized" });
  req.user = user;
  next();
}

app.post("/api/login", (req, res) => {
  const { email, password, role } = req.body || {};
  const result = loginUser(email, password, role);
  if (!result) return res.status(401).json({ error: "Invalid credentials" });
  res.json(result);
});

app.get("/api/dashboard", auth, (req, res) => {
  res.json(getDashboardStats());
});

app.get("/api/students", auth, (req, res) => {
  res.json({ students: getAdvisorStudents() });
});

app.get("/api/students/:id", auth, (req, res) => {
  const s = getStudentById(req.params.id);
  if (!s) return res.status(404).json({ error: "Student not found" });
  res.json({ student: s });
});

app.post("/api/students/:id/nudge", auth, (req, res) => {
  const s = toggleNudge(req.params.id);
  if (!s) return res.status(404).json({ error: "Student not found" });
  res.json({ student: s });
});

app.post("/api/students/:id/note", auth, (req, res) => {
  const note = String(req.body?.note || "").trim();
  if (!note) return res.status(400).json({ error: "Note is required" });
  const s = updateRiskNote(req.params.id, note);
  if (!s) return res.status(404).json({ error: "Student not found" });
  res.json({ student: s });
});

app.get("/api/chat/suggestions", auth, (req, res) => {
  res.json({ suggestions: SUGGESTIONS });
});

app.post("/api/chat", auth, (req, res) => {
  const question = String(req.body?.question || "").trim();
  if (question.length < 3) return res.status(400).json({ error: "Please ask a specific question." });
  const response = generateChatResponse(question);
  res.json(response);
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "LearnBridge" });
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(import.meta.dirname, "..", "client", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`LearnBridge API on http://localhost:${PORT}`);
});
