
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import type { FileId } from '../types';
import { SunIcon, MoonIcon, GitBranchIcon } from './Icons';

interface StatusBarProps {
  activeFile: FileId;
}

export const StatusBar: React.FC<StatusBarProps> = ({ activeFile }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <footer className="bg-[var(--panel)] border-t border-[var(--panel-border)] px-4 py-1 flex justify-between items-center text-xs text-[var(--muted)]">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 text-[var(--green)] font-bold">
           <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
           <span>Ready</span>
        </div>
        <div className="flex items-center gap-2">
            <GitBranchIcon className="w-4 h-4" />
            <span>main</span>
        </div>
        <span>{`File: ${activeFile}`}</span>
      </div>
      <div className="flex items-center gap-4">
        <span>Portfolio v1.0.0</span>
        <span>React • TypeScript • Tailwind</span>
        <button onClick={toggleTheme} className="flex items-center gap-1 hover:text-[var(--foreground)] transition-colors">
          {theme === 'dark' ? (
            <SunIcon className="w-4 h-4" />
          ) : (
            <MoonIcon className="w-4 h-4" />
          )}
          <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </div>
    </footer>
  );
};
