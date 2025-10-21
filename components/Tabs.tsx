
import React from 'react';
import type { FileId } from '../types';
import { PORTFOLIO_FILES } from '../constants';

interface TabsProps {
  activeFile: FileId;
  setActiveFile: (id: FileId) => void;
}

export const Tabs: React.FC<TabsProps> = ({ activeFile, setActiveFile }) => {
  return (
    <div className="flex bg-[var(--background)] border-b border-[var(--panel-border)]">
      {Object.values(PORTFOLIO_FILES).map((file) => {
        const isActive = activeFile === file.id;
        const Icon = file.icon;
        return (
          <button
            key={file.id}
            onClick={() => setActiveFile(file.id)}
            className={`flex items-center gap-2 px-4 py-2 text-sm border-r border-[var(--panel-border)] transition-colors duration-200 ${
              isActive
                ? 'bg-[var(--tab-active)] text-[var(--foreground)]'
                : 'bg-[var(--tab-inactive)] text-[var(--muted)] hover:bg-[var(--tab-active)] hover:text-[var(--foreground)]'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{file.name}</span>
          </button>
        );
      })}
    </div>
  );
};
