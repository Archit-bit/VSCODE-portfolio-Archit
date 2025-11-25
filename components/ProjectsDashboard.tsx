import React from 'react';
import { GitBranchIcon, ExternalLinkIcon, GithubIcon } from './Icons';

const ProjectsDashboard: React.FC = () => {
  const projects = [
    {
      name: "VS Code Portfolio",
      description: "Interactive portfolio styled like VS Code with a serverless AI assistant.",
      stack: ["React", "TypeScript", "TailwindCSS", "Vercel Functions"],
      link: "https://archit-s-vs-code-portfolio-1.vercel.app",
      github: "https://github.com/Archit-Kaushik"
    },
    {
      name: "FitDays Automation",
      description: "Ingests health metrics and emails AI-generated progress summaries.",
      stack: ["Python", "Google Cloud", "Gmail API", "LLM"],
      link: null,
      github: null
    },
    {
      name: "GymBuddy Tracker",
      description: "Motivational gym tracker with weekly AI retrospectives.",
      stack: ["React Native", "Firebase", "LLM Engine"],
      link: null,
      github: null
    },
    {
      name: "Finance Dashboard",
      description: "Personal analytics for expenses, habits, and journaling.",
      stack: ["Python", "Sheets API", "Notion API", "LLM"],
      link: null,
      github: null
    }
  ];

  // Helper for syntax highlighting
  const Key = ({ children }: { children: React.ReactNode }) => (
    <span className="text-cyan-500 dark:text-[var(--cyan)]">{children}</span>
  );
  const StringVal = ({ children }: { children: React.ReactNode }) => (
    <span className="text-yellow-600 dark:text-[var(--yellow)]">"{children}"</span>
  );
  const Keyword = ({ children }: { children: React.ReactNode }) => (
    <span className="text-pink-500 dark:text-[var(--pink)]">{children}</span>
  );
  const Comment = ({ children }: { children: React.ReactNode }) => (
    <span className="text-gray-500 dark:text-[var(--muted)] italic">// {children}</span>
  );

  return (
    <div className="flex-1 bg-[var(--panel)] p-4 md:p-8 overflow-auto flex items-center justify-center min-h-full font-mono">
      <div className="relative w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
        
        {/* Left Panel: Code Editor View */}
        <div className="bg-[var(--background)] border border-[var(--panel-border)] rounded-xl shadow-xl overflow-hidden flex flex-col h-[600px] lg:h-auto">
          {/* Window Controls */}
          <div className="bg-[var(--tab-inactive)] px-4 py-2 flex items-center gap-2 border-b border-[var(--panel-border)]">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-2 text-xs text-[var(--muted)]">projects.js</span>
          </div>

          {/* Code Content */}
          <div className="p-6 text-sm md:text-base leading-relaxed overflow-auto flex-1">
            <div className="flex">
              <div className="flex flex-col text-right pr-4 text-[var(--muted)] select-none border-r border-[var(--panel-border)] mr-4">
                {Array.from({ length: 30 }).map((_, i) => (
                  <span key={i}>{i + 1}</span>
                ))}
              </div>
              <div className="flex-1 whitespace-pre font-mono text-xs md:text-sm">
                <div><Comment>My recent work & side projects</Comment></div>
                <div><Keyword>const</Keyword> <span className="text-blue-500">projects</span> = [</div>
                {projects.map((project, i) => (
                  <div key={i}>
                    <div>  {'{'}</div>
                    <div>    <Key>name</Key>: <StringVal>{project.name}</StringVal>,</div>
                    <div>    <Key>description</Key>: <StringVal>{project.description}</StringVal>,</div>
                    <div>    <Key>stack</Key>: [<StringVal>{project.stack.join('", "')}</StringVal>],</div>
                    <div>    <Key>link</Key>: {project.link ? <StringVal>{project.link}</StringVal> : <span className="text-purple-500">null</span>}</div>
                    <div>  {'}'},</div>
                  </div>
                ))}
                <div>];</div>
                <br />
                <div><Keyword>export default</Keyword> <span className="text-blue-500">projects</span>;</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Visual Grid */}
        <div className="bg-[var(--background)]/50 backdrop-blur-xl border border-[var(--panel-border)] rounded-xl p-8 shadow-lg flex flex-col overflow-y-auto h-[600px] lg:h-auto relative">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--purple)] to-[var(--pink)]"></div>
           
           <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
             <GitBranchIcon className="w-6 h-6 text-[var(--purple)]" />
             Project Showcase
           </h2>

           <div className="grid grid-cols-1 gap-6">
             {projects.map((project, index) => (
               <div key={index} className="group bg-[var(--panel)] border border-[var(--panel-border)] rounded-xl p-6 hover:border-[var(--purple)] hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--purple)] opacity-5 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>
                 
                 <div className="flex justify-between items-start mb-4">
                   <h3 className="text-xl font-bold group-hover:text-[var(--purple)] transition-colors">{project.name}</h3>
                   <div className="flex gap-2">
                     {project.github && (
                       <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-[var(--tab-inactive)] rounded-lg transition-colors" title="View Code">
                         <GithubIcon className="w-5 h-5" />
                       </a>
                     )}
                     {project.link && (
                       <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-[var(--tab-inactive)] rounded-lg transition-colors" title="Live Demo">
                         <ExternalLinkIcon className="w-5 h-5" />
                       </a>
                     )}
                   </div>
                 </div>
                 
                 <p className="text-[var(--muted)] mb-4 leading-relaxed">
                   {project.description}
                 </p>
                 
                 <div className="flex flex-wrap gap-2 mt-auto">
                   {project.stack.map(tech => (
                     <span key={tech} className="px-2 py-1 bg-[var(--background)] rounded text-xs font-mono text-[var(--accent)] border border-[var(--panel-border)]">
                       {tech}
                     </span>
                   ))}
                 </div>
               </div>
             ))}
           </div>

        </div>
      </div>
    </div>
  );
};

export default ProjectsDashboard;
