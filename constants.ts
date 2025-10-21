
import type { PortfolioFile, FileId } from './types';
import { MarkdownIcon, JavaScriptIcon, JsonIcon } from './components/Icons';

const ABOUT_CONTENT = `
// Hi, I’m Archit Anurag Kaushik
// Welcome to my interactive portfolio!

// --- ABOUT ME ---
// I am an Advanced App Engineering Analyst at Accenture, specializing in Dynamics AX (X++) and C#.
// My passion lies at the intersection of robust backend systems and visually creative, AI-integrated web experiences.

// --- EDUCATION ---
// B.Tech in Electronics and Communication Engineering
// Thapar Institute of Engineering & Technology (2018-2022)

// --- VISION ---
// To build innovative applications that are not just functional, but also delightful to use.
// I'm currently deepening my expertise in full-stack JavaScript development and exploring the potential of generative AI.
`;

const PROJECTS_CONTENT = `
const portfolio = {
  name: "Archit Anurag Kaushik",
  occupation: "Advanced App Engineering Analyst",
  skills: ["Dynamics AX (X++)", "C#", "SQL", "JavaScript", "React", "Node.js", "Python", "TailwindCSS"],
};

const projects = [
  {
    name: "This VS Code Portfolio",
    description: "An interactive portfolio built with React and TailwindCSS to showcase my skills in a creative way.",
    stack: ["React", "TypeScript", "TailwindCSS", "Gemini API"],
    link: "https://github.com/your-username/your-repo" // TODO: Add your repo link
  },
  {
    name: "Atrias Project @ Accenture",
    description: "Developed and maintained modules for a large-scale ERP system using Dynamics AX and C#, improving system efficiency and user workflow.",
    stack: ["Dynamics AX", "X++", "C#", "SQL Server"],
    link: null
  },
  {
    name: "AI-Powered Content Summarizer",
    description: "A personal project exploring generative AI to summarize long articles and documents into concise points.",
    stack: ["Python", "Node.js", "React", "Gemini API"],
    link: "https://github.com/your-username/ai-summarizer" // TODO: Add your repo link
  }
];

// To see more, feel free to ask the AI assistant or check out my GitHub!
`;

const CONTACT_CONTENT = `
{
  "name": "Archit Anurag Kaushik",
  "contact": {
    "email": "archit.kaushik.dev@gmail.com",
    "github": "https://github.com/Archit-Kaushik",
    "linkedin": "https://www.linkedin.com/in/archit-anurag-kaushik",
    "twitter": "https://twitter.com/Archit_Kaushik"
  },
  "message": "I'm always open to discussing new projects, creative ideas, or opportunities to be part of an ambitious vision. Feel free to reach out!"
}
`;

export const PORTFOLIO_FILES: Record<FileId, PortfolioFile> = {
  'about.md': {
    id: 'about.md',
    name: 'About.md',
    language: 'markdown',
    content: ABOUT_CONTENT.trim(),
    icon: MarkdownIcon,
  },
  'projects.js': {
    id: 'projects.js',
    name: 'Projects.js',
    language: 'javascript',
    content: PROJECTS_CONTENT.trim(),
    icon: JavaScriptIcon,
  },
  'contact.json': {
    id: 'contact.json',
    name: 'Contact.json',
    language: 'json',
    content: CONTACT_CONTENT.trim(),
    icon: JsonIcon,
  },
};

export const FULL_PORTFOLIO_DATA = {
    ABOUT_CONTENT,
    PROJECTS_CONTENT,
    CONTACT_CONTENT
};
