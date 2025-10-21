// Fix: Import React to provide types for React.SVGProps and JSX.Element.
import React from 'react';

export type FileId = 'about.md' | 'projects.js' | 'contact.json';

export interface PortfolioFile {
  id: FileId;
  name: string;
  language: 'markdown' | 'javascript' | 'json';
  content: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
}

export type Theme = 'light' | 'dark';

export interface Message {
    sender: 'user' | 'ai';
    text: string;
}
