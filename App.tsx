
import React, { useState } from 'react';
import { ActivityBar } from './components/ActivityBar';
import { Explorer } from './components/Explorer';
import { Tabs } from './components/Tabs';
import { Editor } from './components/Editor';
import { Terminal } from './components/Terminal';
import { StatusBar } from './components/StatusBar';
import { Chatbot } from './components/Chatbot';
import type { FileId } from './types';
import { PORTFOLIO_FILES } from './constants';

const App: React.FC = () => {
  const [activeFile, setActiveFile] = useState<FileId>('about.md');
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('files');
  const [isExplorerVisible, setIsExplorerVisible] = useState(true);

  const currentFile = PORTFOLIO_FILES[activeFile];

  const handleSectionClick = (section: string) => {
    if (section === activeSection) {
      setIsExplorerVisible(!isExplorerVisible);
    } else {
      setActiveSection(section);
      setIsExplorerVisible(true);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[var(--background)] text-[var(--foreground)] font-mono overflow-hidden">
      <main className="flex flex-1 overflow-hidden">
        <ActivityBar activeSection={activeSection} onSectionClick={handleSectionClick} />
        <Explorer activeFile={activeFile} setActiveFile={setActiveFile} isVisible={isExplorerVisible} />
        
        <div className="flex flex-col flex-1 min-w-0">
          <Tabs activeFile={activeFile} setActiveFile={setActiveFile} />
          <div className="flex flex-1 overflow-hidden">
            <div className="flex-1 flex flex-col min-w-0">
              <Editor file={currentFile} />
              <Terminal activeFile={activeFile} setActiveFile={setActiveFile} />
            </div>
          </div>
        </div>
      </main>
      <StatusBar activeFile={activeFile} />
      <Chatbot isOpen={isChatbotOpen} setIsOpen={setIsChatbotOpen} />
    </div>
  );
};

export default App;
