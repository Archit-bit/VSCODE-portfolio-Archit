
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
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

  const currentFile = PORTFOLIO_FILES[activeFile];

  return (
    <div className="flex flex-col h-screen w-screen bg-[var(--background)] text-[var(--foreground)] font-mono overflow-hidden">
      <main className="flex flex-1 overflow-hidden">
        <Sidebar activeFile={activeFile} setActiveFile={setActiveFile} />
        <div className="flex flex-col flex-1">
          <Tabs activeFile={activeFile} setActiveFile={setActiveFile} />
          <div className="flex flex-1 overflow-hidden">
            <div className="flex-1 flex flex-col">
              <Editor file={currentFile} />
              <Terminal />
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
