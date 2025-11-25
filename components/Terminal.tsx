import React, { useState, useRef, useEffect } from 'react';
import type { FileId } from '../types';

interface TerminalLine {
  type: 'input' | 'output';
  content: React.ReactNode;
}

interface TerminalProps {
  activeFile: FileId;
  setActiveFile: (file: FileId) => void;
}

const FILE_TO_DIR: Record<FileId, string> = {
  'about.md': 'About',
  'projects.js': 'Projects',
  'contact.json': 'Contact'
};

const DIR_TO_FILE: Record<string, FileId> = {
  'About': 'about.md',
  'Projects': 'projects.js',
  'Contact': 'contact.json',
  'about': 'about.md',
  'projects': 'projects.js',
  'contact': 'contact.json'
};

export const Terminal: React.FC<TerminalProps> = ({ activeFile, setActiveFile }) => {
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'output', content: 'Welcome to VeloxNova Terminal v2.0.0' },
    { type: 'output', content: 'Type "help" for available commands.' }
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync CWD with active file
  const currentDir = FILE_TO_DIR[activeFile] || 'Root';
  const promptPath = `~/VeloxNova/${currentDir}`;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    const args = trimmedCmd.split(' ');
    const command = args[0].toLowerCase();
    
    let output: React.ReactNode = '';

    switch (command) {
      case 'help':
        output = (
          <div className="text-[var(--muted)]">
            <div>Available commands:</div>
            <div className="grid grid-cols-[100px_1fr] gap-2 mt-1">
              <span className="text-[var(--accent)]">cd</span> <span>[dir] Change directory (switches tab)</span>
              <span className="text-[var(--accent)]">ls</span> <span>List contents</span>
              <span className="text-[var(--accent)]">cat</span> <span>[file] View file content</span>
              <span className="text-[var(--accent)]">whoami</span> <span>Display current user</span>
              <span className="text-[var(--accent)]">clear</span> <span>Clear terminal history</span>
            </div>
          </div>
        );
        break;
      case 'ls':
        if (currentDir === 'Root') {
           output = (
            <div className="flex gap-4 text-[var(--accent)] font-bold">
              <span>About/</span>
              <span>Projects/</span>
              <span>Contact/</span>
            </div>
          );
        } else {
           // Inside a folder, show the file
           output = (
            <div className="text-[var(--green)]">
              {activeFile}
            </div>
           );
        }
        break;
      case 'cd':
        if (!args[1] || args[1] === '..') {
           // Go to root? Since we don't have a "Root" tab, we might just stay or pick default?
           // Let's say '..' goes to About as default or just prints a message
           output = 'Returned to root (select a folder to open)';
           // Optionally we could have a 'root' state but our app structure requires an active file.
           // So we'll just simulate it by saying we are in root but keeping file open?
           // Actually, the user wants "VeloxNova is root and editor pages are folders".
           // So if I type "cd ..", I should technically go to ~/VeloxNova. 
           // But I can't "close" the tab in this architecture easily without changing App state to null.
           // For now, let's just support navigating TO folders.
        } else {
           const targetDir = args[1];
           const targetFile = DIR_TO_FILE[targetDir];
           if (targetFile) {
             setActiveFile(targetFile);
             output = `Entered ${targetDir}/`;
           } else {
             output = <span className="text-red-400">Directory not found: {targetDir}</span>;
           }
        }
        break;
      case 'cat':
        if (!args[1]) {
          output = <span className="text-red-400">Usage: cat [filename]</span>;
        } else {
           // If we are in "About", we can cat "about.md"
           if (args[1] === activeFile) {
              output = "Content displayed in editor above.";
           } else {
              output = <span className="text-red-400">File not found in current directory.</span>;
           }
        }
        break;
      case 'whoami':
        output = 'guest@VeloxNova';
        break;
      case 'clear':
        setHistory([]);
        return;
      case '':
        output = '';
        break;
      default:
        output = <span className="text-red-400">Command not found: {command}</span>;
    }

    setHistory(prev => [
      ...prev,
      { type: 'input', content: trimmedCmd } as TerminalLine,
      ...(output ? [{ type: 'output', content: output } as TerminalLine] : [])
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <div 
      className="h-48 bg-[var(--panel)] border-t border-[var(--panel-border)] p-4 overflow-y-auto text-sm font-mono"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal Header */}
      <div className="flex gap-2 items-center mb-4 sticky top-0 bg-[var(--panel)] pb-2 border-b border-[var(--panel-border)] w-full z-10">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-xs text-[var(--muted)] ml-2">guest@VeloxNova: {currentDir}</span>
      </div>

      {/* History */}
      <div className="flex flex-col gap-1">
        {history.map((line, i) => (
          <div key={i} className={`${line.type === 'input' ? 'mt-2' : ''}`}>
            {line.type === 'input' && (
              <div className="flex">
                 <span className="text-[var(--green)] mr-2">guest@VeloxNova:{promptPath} $</span>
                 <span>{line.content}</span>
              </div>
            )}
            {line.type === 'output' && (
              <div className="ml-4">{line.content}</div>
            )}
          </div>
        ))}
      </div>

      {/* Input Line */}
      <div className="flex items-center mt-2">
        <span className="text-[var(--green)] mr-2">guest@VeloxNova:{promptPath} $</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-[var(--foreground)]"
          autoFocus
        />
      </div>
      <div ref={bottomRef} />
    </div>
  );
};
