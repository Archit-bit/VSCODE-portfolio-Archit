// constants.ts
import type { PortfolioFile, FileId } from "./types";
import { MarkdownIcon, JavaScriptIcon, JsonIcon } from "./components/Icons";

/* =========================
   ABOUT (Markdown-style)
   ========================= */
const ABOUT_CONTENT = `
// Hi, I’m Archit Anurag Kaushik
// Welcome to my interactive VS Code-style portfolio!

// --- ABOUT ME ---
// Advanced App Engineering Analyst @ Accenture (client: Atrias)
// Domains: Billing, Structure, Settlement
// Strengths: debugging, SQL optimization, clean architecture, and turning chaos into closed tickets.

// --- TECH ---
// X++, Dynamics AX 2012 R3 (AOT, Forms, TempDB, SPs)
// SQL Server, C#, TFVC/Git
// React + TypeScript, Node.js/Express, TailwindCSS
// Vercel Functions, Google Cloud, OpenRouter

// --- SIDE PROJECT ENERGY ---
// • This VS Code Portfolio with a chatty AI assistant (hi 👋).
// • FitDays Automation (health data → AI summaries).
// • GymBuddy Tracker (consistency + weekly AI retros).
// • Finance & Life Dashboard (personal analytics).

// --- PHILOSOPHY ---
// Great engineering blends logic with creativity—reliable, understandable, and a little delightful.
// If it “works on my machine”, I ship the machine.

// --- CURRENTLY ---
// Deepening MERN + AI integration; open to global roles (Dubai/Switzerland) and interesting freelance.
`;

/* =========================
   PROJECTS (JS look, highlighted by your editor)
   ========================= */
const PROJECTS_CONTENT = `
// prettier-ignore
const portfolio = {
  name: "Archit Anurag Kaushik",
  occupation: "Advanced App Engineering Analyst",
  skills: ["X++", "SQL Server", "C#", "React", "TypeScript", "Node.js", "TailwindCSS", "Vercel Functions", "OpenRouter"],
};

// NOTE: Yes, this looks like JS on purpose—your editor paints it nicely.
const projects = [
  {
    name: "VS Code Portfolio (this site)",
    description: "Interactive portfolio styled like VS Code with a serverless AI assistant (OpenRouter) on Vercel.",
    stack: ["React", "TypeScript", "TailwindCSS", "Vercel Functions", "OpenRouter API"],
    link: "https://archit-s-vs-code-portfolio-1.vercel.app"
  },
  {
    name: "FitDays Automation",
    description: "Ingests health metrics and emails AI-generated progress summaries. If a pipeline can’t judge my sleep, who will?",
    stack: ["Python", "Google Cloud Pub/Sub", "Gmail API", "LLM"],
    link: null
  },
  {
    name: "GymBuddy Tracker",
    description: "Motivational gym tracker with weekly AI retrospectives. PRs for your PRs.",
    stack: ["React Native", "Firebase", "LLM Feedback Engine"],
    link: null
  },
  {
    name: "Finance & Life Dashboard",
    description: "Personal analytics for expenses, habits, and journaling. Turns spreadsheets into insights faster than you can say \`VLOOKUP\`.",
    stack: ["Python", "Google Sheets API", "Notion API", "LLM"],
    link: null
  }
];

// Pro tip: ask the AI assistant about any of these—it's been thoroughly briefed (and mildly sarcastic).
`;

/* =========================
   CONTACT (JSON look, highlighted by your editor)
   ========================= */
const CONTACT_CONTENT = `
{
  "name": "Archit Anurag Kaushik",
  "contact": {
    "email": "archit.kaushik.dev@gmail.com",
    "github": "https://github.com/Archit-Kaushik",
    "linkedin": "https://www.linkedin.com/in/archit-anurag-kaushik",
    "twitter": "https://twitter.com/Archit_Kaushik"
  },
  "availability": "Open to freelance, remote, and international roles.",
  "message": "Want to collaborate, hire me, or send a meme that compiles? My inbox is open."
}
`;

/* =========================
   PERSONAL CONTEXT (for AI)
   - If you want the chatbot to use this,
     you can import it in your API route
     and inject into the system prompt.
   ========================= */

/* =========================
   FILE REGISTRY FOR YOUR UI
   ========================= */
export const PORTFOLIO_FILES: Record<FileId, PortfolioFile> = {
  "about.md": {
    id: "about.md",
    name: "About.md",
    language: "markdown",
    content: ABOUT_CONTENT.trim(),
    icon: MarkdownIcon,
  },
  "projects.js": {
    id: "projects.js",
    name: "Projects.js",
    language: "javascript",
    content: PROJECTS_CONTENT.trim(),
    icon: JavaScriptIcon,
  },
  "contact.json": {
    id: "contact.json",
    name: "Contact.json",
    language: "json",
    content: CONTACT_CONTENT.trim(),
    icon: JsonIcon,
  },
};

export const FULL_PORTFOLIO_DATA = {
  ABOUT_CONTENT,
  PROJECTS_CONTENT,
  CONTACT_CONTENT,
};
