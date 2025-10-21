
import React from 'react';
import type { FileId } from '../types';
import { PORTFOLIO_FILES } from '../constants';
import { SettingsIcon } from './Icons';

interface SidebarProps {
  activeFile: FileId;
  setActiveFile: (id: FileId) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeFile, setActiveFile }) => {
  return (
    <div className="w-16 bg-[var(--panel)] border-r border-[var(--panel-border)] flex flex-col items-center justify-between py-4">
      <div className="flex flex-col items-center gap-6">
        {Object.values(PORTFOLIO_FILES).map((file) => {
          const Icon = file.icon;
          const isActive = activeFile === file.id;
          return (
            <button
              key={file.id}
              onClick={() => setActiveFile(file.id)}
              className={`relative p-2 rounded-md transition-colors duration-200 ${
                isActive ? 'text-[var(--accent)]' : 'text-[var(--muted)] hover:text-[var(--foreground)]'
              }`}
              aria-label={`Open ${file.name}`}
            >
              <Icon className="w-7 h-7" />
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--accent)] rounded-r-full"></div>
              )}
            </button>
          );
        })}
      </div>
      <div className="flex flex-col items-center gap-4">
         <button className="p-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors duration-200" aria-label="Settings">
            <SettingsIcon className="w-7 h-7" />
         </button>
      </div>
    </div>
  );
};
