import React, { useState } from 'react';
import type { FileId } from '../types';
import { PORTFOLIO_FILES } from '../constants';
import { ChevronRightIcon, ChevronDownIcon } from './Icons';

interface ExplorerProps {
  activeFile: FileId;
  setActiveFile: (id: FileId) => void;
  isVisible: boolean;
}

export const Explorer: React.FC<ExplorerProps> = ({ activeFile, setActiveFile, isVisible }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
    'About': true,
    'Projects': true,
    'Contact': true
  });

  if (!isVisible) return null;

  const toggleFolder = (folder: string) => {
    setOpenFolders(prev => ({ ...prev, [folder]: !prev[folder] }));
  };

  const FileItem = ({ fileId, folderName }: { fileId: FileId, folderName: string }) => {
    const file = PORTFOLIO_FILES[fileId];
    const Icon = file.icon;
    const isActive = activeFile === fileId;

    return (
      <div className="pl-4">
        <div 
          className={`flex items-center gap-1 py-1 px-2 cursor-pointer hover:bg-[var(--tab-inactive)] ${isActive ? 'bg-[var(--tab-inactive)] text-[var(--foreground)]' : 'text-[var(--muted)]'}`}
          onClick={() => setActiveFile(fileId)}
        >
          <Icon className="w-4 h-4 shrink-0" />
          <span className="text-sm truncate">{file.name}</span>
        </div>
      </div>
    );
  };

  const FolderItem = ({ name, fileId }: { name: string, fileId: FileId }) => {
    const isOpen = openFolders[name];
    
    return (
      <div>
        <div 
          className="flex items-center gap-1 py-1 px-2 cursor-pointer hover:bg-[var(--tab-inactive)] text-[var(--foreground)] font-bold"
          onClick={() => toggleFolder(name)}
        >
          {isOpen ? <ChevronDownIcon className="w-4 h-4" /> : <ChevronRightIcon className="w-4 h-4" />}
          <span className="text-xs uppercase tracking-wider font-bold">{name}</span>
        </div>
        {isOpen && <FileItem fileId={fileId} folderName={name} />}
      </div>
    );
  };

  return (
    <div className="w-64 bg-[var(--panel)] border-r border-[var(--panel-border)] flex flex-col h-full select-none">
      <div className="p-3 text-xs font-bold text-[var(--muted)] tracking-widest">EXPLORER</div>
      
      {/* Root Folder */}
      <div>
        <div 
          className="flex items-center gap-1 py-1 px-2 cursor-pointer hover:bg-[var(--tab-inactive)] font-bold text-[var(--foreground)] bg-[var(--tab-inactive)]/50"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? <ChevronDownIcon className="w-4 h-4" /> : <ChevronRightIcon className="w-4 h-4" />}
          <span className="text-xs font-bold">VELOXNOVA</span>
        </div>

        {isExpanded && (
          <div className="mt-1">
            <FolderItem name="About" fileId="about.md" />
            <FolderItem name="Projects" fileId="projects.js" />
            <FolderItem name="Contact" fileId="contact.json" />
          </div>
        )}
      </div>
    </div>
  );
};
