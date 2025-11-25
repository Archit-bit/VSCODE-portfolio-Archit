import React from "react";
import type { PortfolioFile } from "../types";
import { useTypewriter } from "../src/hooks/useTypewriter";

import ContactDashboard from "./ContactDashboard";
import AboutDashboard from "./AboutDashboard";
import ProjectsDashboard from "./ProjectsDashboard";

interface EditorProps {
  file: PortfolioFile;
}

const SyntaxHighlighter: React.FC<{ line: string; language: string }> = ({
  line,
  language,
}) => {
  let coloredLine = line;

  if (language === "markdown") {
    if (line.startsWith("//")) {
      return (
        <span className="text-green-500 dark:text-[var(--green)]">{line}</span>
      );
    }
    if (line.startsWith("// ---")) {
      return (
        <span className="text-gray-500 dark:text-[var(--muted)]">{line}</span>
      );
    }
  }

  if (language === "javascript") {
    if (line.trim().startsWith("//")) {
      return (
        <span className="text-green-500 dark:text-[var(--green)]">{line}</span>
      );
    }
    coloredLine = coloredLine.replace(
      /\b(const|let|var)\b/g,
      '<span class="text-pink-500 dark:text-[var(--pink)]">$1</span>'
    );
    coloredLine = coloredLine.replace(
      /(\w+):/g,
      '<span class="text-cyan-500 dark:text-[var(--cyan)]">$1</span>:'
    );
    coloredLine = coloredLine.replace(
      /"(.*?)"/g,
      '<span class="text-yellow-600 dark:text-[var(--yellow)]">"$1"</span>'
    );
  }

  if (language === "json") {
    coloredLine = coloredLine.replace(
      /"(\w+)":/g,
      '<span class="text-purple-500 dark:text-[var(--purple)]">"$1"</span>:'
    );
    coloredLine = coloredLine.replace(
      /"(.*?)"/g,
      '<span class="text-yellow-600 dark:text-[var(--yellow)]">"$1"</span>'
    );
  }

  return <span dangerouslySetInnerHTML={{ __html: coloredLine }} />;
};

export const Editor: React.FC<EditorProps> = ({ file }) => {
  const typedContent = useTypewriter(file.content, 5);

  if (file.id === 'contact.json') {
    return <ContactDashboard />;
  }

  if (file.id === 'about.md') {
    return <AboutDashboard />;
  }

  if (file.id === 'projects.js') {
    return <ProjectsDashboard />;
  }

  return (
    <div className="flex-1 bg-[var(--panel)] p-6 overflow-auto text-sm md:text-base leading-loose">
      <div className="relative">
        <pre className="whitespace-pre-wrap">
          {typedContent.split("\n").map((line, index) => (
            <div key={index} className="flex items-start">
              <span className="text-right pr-4 text-[var(--muted)] select-none w-10">
                {index + 1}
              </span>
              <code>
                <SyntaxHighlighter line={line} language={file.language} />
              </code>
            </div>
          ))}
        </pre>
        <div className="inline-block h-5 w-0.5 bg-[var(--accent)] animate-pulse ml-10"></div>
      </div>
    </div>
  );
};
