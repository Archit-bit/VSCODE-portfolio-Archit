
import React from 'react';
import { useTypewriter } from '../hooks/useTypewriter';

const terminalContent = `
$ npm run dev

> portfolio@1.0.0 dev
> React + Vite

  VITE v5.2.0  ready in 312 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help

Compilation successful.
Watching for file changes...
Portfolio v1.0.0 ready.
`;

export const Terminal: React.FC = () => {
  const typedOutput = useTypewriter(terminalContent.trim(), 15);

  return (
    <div className="h-48 bg-[var(--panel)] border-t border-[var(--panel-border)] p-4 overflow-y-auto text-sm">
      <div className="flex gap-2 items-center mb-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-xs text-[var(--muted)] ml-2">bash</span>
      </div>
      <pre className="whitespace-pre-wrap">
        <code>{typedOutput}</code>
        <div className="inline-block h-4 w-2 bg-[var(--foreground)] animate-pulse ml-1"></div>
      </pre>
    </div>
  );
};
