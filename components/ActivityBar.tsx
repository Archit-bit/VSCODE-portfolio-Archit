import React from 'react';
import { 
  FilesIcon, 
  SearchIcon, 
  SourceControlIcon, 
  ExtensionsIcon, 
  SettingsIcon,
  UserIcon
} from './Icons';

interface ActivityBarProps {
  activeSection: string;
  onSectionClick: (section: string) => void;
}

export const ActivityBar: React.FC<ActivityBarProps> = ({ activeSection, onSectionClick }) => {
  const topItems = [
    { id: 'files', icon: FilesIcon, label: 'Explorer' },
    { id: 'search', icon: SearchIcon, label: 'Search' },
    { id: 'git', icon: SourceControlIcon, label: 'Source Control' },
    { id: 'extensions', icon: ExtensionsIcon, label: 'Extensions' },
  ];

  return (
    <div className="w-12 bg-[var(--activity-bar)] border-r border-[var(--panel-border)] flex flex-col justify-between py-2 z-20">
      <div className="flex flex-col items-center gap-2">
        {topItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSectionClick(item.id)}
              className={`relative p-3 w-full flex justify-center transition-colors duration-200 group ${
                isActive ? 'text-[var(--foreground)]' : 'text-[var(--muted)] hover:text-[var(--foreground)]'
              }`}
              title={item.label}
            >
              <Icon className="w-6 h-6" />
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[var(--accent)]"></div>
              )}
            </button>
          );
        })}
      </div>
      
      <div className="flex flex-col items-center gap-4 mb-2">
         <button className="p-3 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors duration-200" title="Accounts">
            <UserIcon className="w-6 h-6" />
         </button>
         <button className="p-3 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors duration-200" title="Manage">
            <SettingsIcon className="w-6 h-6" />
         </button>
      </div>
    </div>
  );
};
