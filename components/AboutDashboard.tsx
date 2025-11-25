import React from 'react';
import { UserIcon } from './Icons';
import { useTypewriter } from '../hooks/useTypewriter';

const AboutDashboard: React.FC = () => {
  const skills = [
    "X++", "Dynamics AX", "SQL Server", "C#", 
    "React", "TypeScript", "Node.js", "TailwindCSS",
    "Vercel Functions", "Google Cloud", "OpenRouter"
  ];

  const ABOUT_CODE = `class ArchitProfile extends Developer {
  name = "Archit Anurag Kaushik";
  role = "Advanced App Engineering Analyst";
  company = "Accenture (Atrias)";
  location = "Remote / International";

  constructor() {
    super();
    this.skills = [
      "X++", "Dynamics AX", "SQL Server",
      "React", "TypeScript", "Node.js",
      "Google Cloud", "OpenRouter"
    ];
    this.philosophy = "Logic + Creativity";
  }

  getCurrentFocus() {
    return "Deepening MERN + AI integration";
  }

  getCareerGoals() {
    return "Global roles (Dubai/Switzerland)";
  }
}`;

  const typedContent = useTypewriter(ABOUT_CODE, 15);

  // Helper for syntax highlighting
  const Keyword = ({ children }: { children: React.ReactNode }) => (
    <span className="text-pink-500 dark:text-[var(--pink)]">{children}</span>
  );
  const ClassName = ({ children }: { children: React.ReactNode }) => (
    <span className="text-yellow-500 dark:text-[var(--yellow)]">{children}</span>
  );
  const PropName = ({ children }: { children: React.ReactNode }) => (
    <span className="text-cyan-500 dark:text-[var(--cyan)]">{children}</span>
  );
  const StringVal = ({ children }: { children: React.ReactNode }) => (
    <span className="text-green-500 dark:text-[var(--green)]">"{children}"</span>
  );
  const FunctionName = ({ children }: { children: React.ReactNode }) => (
    <span className="text-blue-500 dark:text-[var(--blue)]">{children}</span>
  );

  // Simple syntax highlighter for the class definition
  const highlightLine = (line: string) => {
    // Keywords
    let content: React.ReactNode = line;
    
    if (line.includes("class ")) {
      const parts = line.split(" ");
      return (
        <>
          <Keyword>class</Keyword> <ClassName>{parts[1]}</ClassName> <Keyword>extends</Keyword> <ClassName>{parts[3]}</ClassName> {parts[4]}
        </>
      );
    }
    if (line.includes("constructor")) {
      return <><FunctionName>constructor</FunctionName>() {'{'}</>;
    }
    if (line.includes("super()")) {
      return <><FunctionName>super</FunctionName>();</>;
    }
    if (line.includes("return")) {
      const val = line.match(/"(.*?)"/);
      return <><Keyword>return</Keyword> {val ? <StringVal>{val[1]}</StringVal> : ""};</>;
    }
    if (line.includes("getCurrentFocus") || line.includes("getCareerGoals")) {
      const name = line.split("(")[0].trim();
      return <><FunctionName>{name}</FunctionName>() {'{'}</>;
    }
    
    // Properties
    if (line.includes(" = \"")) {
      const [prop, valPart] = line.split(" = ");
      const val = valPart.replace(";", "").replace(/"/g, "");
      return <><PropName>{prop.trim()}</PropName> = <StringVal>{val}</StringVal>;</>;
    }

    // Array strings
    if (line.includes('"')) {
       // This is a rough heuristic for array items
       return <span className="text-green-500 dark:text-[var(--green)]">{line}</span>;
    }

    return line;
  };

  return (
    <div className="relative w-full h-full bg-[var(--background)] overflow-hidden font-mono">
      
      {/* Layer 1: Full-Screen Code Background */}
      <div className="absolute inset-0 p-8 md:p-16 overflow-hidden opacity-80 pointer-events-none select-none">
        <div className="text-sm md:text-lg leading-loose text-[var(--muted)]">
          {typedContent.split('\n').map((line, index) => (
            <div key={index} className="whitespace-pre">
              {highlightLine(line)}
            </div>
          ))}
          <div className="inline-block h-5 w-2.5 bg-[var(--accent)] animate-pulse ml-1"></div>
        </div>
      </div>

      {/* Layer 2: Floating Visual Card */}
      <div className="absolute inset-0 flex items-center justify-end p-4 md:p-16 pointer-events-none">
        <div className="pointer-events-auto bg-[var(--panel)]/80 backdrop-blur-xl border border-[var(--panel-border)] rounded-2xl p-8 shadow-2xl max-w-lg w-full transform transition-all hover:scale-[1.01] hover:shadow-blue-500/10">
           
           {/* Header */}
           <div className="flex items-center gap-6 mb-8">
             <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--green)] to-[var(--accent)] p-1 shadow-lg flex-shrink-0">
               <div className="w-full h-full rounded-full bg-[var(--panel)] flex items-center justify-center overflow-hidden">
                 <UserIcon className="w-10 h-10 text-[var(--foreground)]" />
               </div>
             </div>
             <div>
               <h1 className="text-2xl font-bold text-[var(--foreground)]">Archit Anurag Kaushik</h1>
               <p className="text-[var(--accent)] font-medium">Advanced App Engineering Analyst</p>
               <p className="text-sm text-[var(--muted)]">Accenture • Atrias Client</p>
             </div>
           </div>

           {/* Skills */}
           <div className="mb-8">
             <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-3">Tech Stack</h3>
             <div className="flex flex-wrap gap-2">
               {skills.map(skill => (
                 <span key={skill} className="px-2.5 py-1 bg-[var(--background)]/50 border border-[var(--panel-border)] rounded-md text-xs font-medium text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors cursor-default">
                   {skill}
                 </span>
               ))}
             </div>
           </div>

           {/* Quote */}
           <div className="p-4 bg-[var(--background)]/50 border-l-2 border-[var(--purple)] rounded-r-lg italic text-sm text-[var(--muted)]">
             "Great engineering blends logic with creativity—reliable, understandable, and a little delightful."
           </div>

        </div>
      </div>

    </div>
  );
};

export default AboutDashboard;
