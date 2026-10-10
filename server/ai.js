const SUGGESTIONS = [
  "Which students are most at risk of dropping out?",
  "What are the common factors for declining students?",
  "How should I prioritize my outreach this week?",
  "What support resources should I recommend for at-risk students?"
];

const RESPONSES = {
  risk: {
    answer: "Based on current engagement analytics, David Park (Engineering, Semester 1) and Maria Gonzalez (Nursing, Semester 3) show the highest risk scores at 92 and 87 respectively. David has near-zero LMS engagement with 6 of 7 assignments late and no discussion participation. As a first-generation student who missed orientation, he likely lacks the institutional knowledge that continuing students take for granted. Maria's GPA dropped 0.6 this semester with only 2 LMS logins recorded. Emma Rodriguez (Psychology) at 78 is also concerning given her sharp decline from previously active engagement. Immediate outreach to David and Maria is recommended, with a follow-up check on Emma's counseling referral status.",
    category: "Risk Assessment"
  },
  factors: {
    answer: "Analysis of the 4 declining students reveals three common contributing factors. First, LMS login frequency drops significantly before assignment submission problems appear — login decline is the earliest detectable warning signal, typically preceding late assignments by 1-2 weeks. Second, students experiencing external pressures (employment, financial concerns) show a pattern of maintaining initial performance before a sudden decline rather than gradual deterioration. Aisha Williams exemplifies this pattern — previously strong performance followed by rapid decline correlating with increased work hours. Third, first-generation students like David Park who miss early orientation and onboarding activities show persistently low engagement from the start, suggesting the issue is navigational rather than motivational.",
    category: "Pattern Analysis"
  },
  prioritize: {
    answer: "Recommended outreach priority for this week based on risk scores, trend trajectory, and time since last activity: Priority 1 — David Park (risk: 92, last active 8 days ago, no nudge sent, first-generation student needing immediate navigational support). Priority 2 — Maria Gonzalez (risk: 87, last active 5 days ago, no nudge sent, significant GPA decline). Priority 3 — Emma Rodriguez (risk: 78, nudge previously sent, verify counseling follow-through and check current engagement). Priority 4 — Aisha Williams (risk: 71, nudge sent, schedule adjustment discussion needed). Students James Chen, Tyler Brooks, Kevin Nguyen, and Sarah Mitchell are stable or improving and do not require immediate intervention this week.",
    category: "Outreach Planning"
  },
  resources: {
    answer: "Based on individual student risk factors, here are targeted resource recommendations. For David Park: mandatory advising appointment, campus orientation makeup session, peer mentor assignment, and tutoring center introduction — his issues are navigational and institutional, not academic ability. For Maria Gonzalez: academic tutoring for nursing coursework, time management workshop, and a check-in about external factors affecting attendance. For Aisha Williams: financial aid office referral to explore work-study alternatives, schedule adjustment consultation to reduce course load if needed, and flexible deadline arrangements with instructors. For Emma Rodriguez: follow up on counseling services referral, connect with peer support group, and consider reduced course load for the remainder of the semester if mental health concerns persist.",
    category: "Resource Matching"
  },
  default: {
    answer: "I can help you analyze student engagement patterns, identify at-risk students, prioritize outreach, and recommend support resources. Try asking about specific students, risk factors, outreach priorities, or resource recommendations. I analyze LMS login frequency, assignment submission patterns, GPA trajectories, and discussion participation to generate actionable insights for your advising work.",
    category: "General"
  }
};

function generateChatResponse(question) {
  const q = question.toLowerCase();
  if (q.includes("risk") || q.includes("drop") || q.includes("withdraw") || q.includes("danger")) return RESPONSES.risk;
  if (q.includes("factor") || q.includes("common") || q.includes("pattern") || q.includes("why") || q.includes("cause")) return RESPONSES.factors;
  if (q.includes("priorit") || q.includes("outreach") || q.includes("first") || q.includes("week") || q.includes("order")) return RESPONSES.prioritize;
  if (q.includes("resource") || q.includes("support") || q.includes("recommend") || q.includes("help") || q.includes("refer")) return RESPONSES.resources;
  return RESPONSES.default;
}

export { generateChatResponse, SUGGESTIONS };
