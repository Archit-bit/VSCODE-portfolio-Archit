import React, { useState } from 'react';
import QRCode from "react-qr-code";
import { 
  GithubIcon, 
  LinkedinIcon, 
  TwitterIcon, 
  MailIcon, 
  DownloadIcon, 
  ExternalLinkIcon,
  UserIcon
} from './Icons';

const ContactDashboard: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const contactInfo = {
    name: "Archit Anurag Kaushik",
    role: "Advanced App Engineering Analyst",
    email: "archit.kaushik.dev@gmail.com",
    github: "https://github.com/Archit-Kaushik",
    linkedin: "https://www.linkedin.com/in/archit-anurag-kaushik",
    twitter: "https://twitter.com/Archit_Kaushik",
    location: "Remote / International",
    availability: "Open to freelance & roles"
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateVCard = () => {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${contactInfo.name}
TITLE:${contactInfo.role}
EMAIL:${contactInfo.email}
URL:${contactInfo.linkedin}
URL:${contactInfo.github}
NOTE:${contactInfo.availability}
END:VCARD`;

    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'archit_kaushik.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper for syntax highlighting
  const Key = ({ children }: { children: React.ReactNode }) => (
    <span className="text-cyan-500 dark:text-[var(--cyan)]">{children}</span>
  );
  const StringVal = ({ children }: { children: React.ReactNode }) => (
    <span className="text-yellow-600 dark:text-[var(--yellow)]">"{children}"</span>
  );
  const Keyword = ({ children }: { children: React.ReactNode }) => (
    <span className="text-pink-500 dark:text-[var(--pink)]">{children}</span>
  );
  const Comment = ({ children }: { children: React.ReactNode }) => (
    <span className="text-gray-500 dark:text-[var(--muted)] italic">// {children}</span>
  );

  return (
    <div className="flex-1 bg-[var(--panel)] p-4 md:p-8 overflow-auto flex items-center justify-center min-h-full font-mono">
      <div className="relative w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Panel: Code Editor View */}
        <div className="bg-[var(--background)] border border-[var(--panel-border)] rounded-xl shadow-xl overflow-hidden flex flex-col">
          {/* Window Controls */}
          <div className="bg-[var(--tab-inactive)] px-4 py-2 flex items-center gap-2 border-b border-[var(--panel-border)]">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-2 text-xs text-[var(--muted)]">profile.ts</span>
          </div>

          {/* Code Content */}
          <div className="p-6 text-sm md:text-base leading-relaxed overflow-x-auto">
            <div className="flex">
              <div className="flex flex-col text-right pr-4 text-[var(--muted)] select-none border-r border-[var(--panel-border)] mr-4">
                {Array.from({ length: 14 }).map((_, i) => (
                  <span key={i}>{i + 1}</span>
                ))}
              </div>
              <div className="flex-1 whitespace-pre">
                <div><Comment>Define developer profile</Comment></div>
                <div><Keyword>const</Keyword> <span className="text-blue-500">profile</span> = {'{'}</div>
                <div>  <Key>name</Key>: <StringVal>{contactInfo.name}</StringVal>,</div>
                <div>  <Key>role</Key>: <StringVal>{contactInfo.role}</StringVal>,</div>
                <div>  <Key>status</Key>: <StringVal>{contactInfo.availability}</StringVal>,</div>
                <div>  <Key>contact</Key>: {'{'}</div>
                <div>    <Key>email</Key>: <StringVal>{contactInfo.email}</StringVal>,</div>
                <div>    <Key>github</Key>: <StringVal>@Archit-Kaushik</StringVal>,</div>
                <div>    <Key>linkedin</Key>: <StringVal>in/archit-anurag-kaushik</StringVal>,</div>
                <div>    <Key>twitter</Key>: <StringVal>@Archit_Kaushik</StringVal></div>
                <div>  {'}'},</div>
                <div>  <Key>location</Key>: <StringVal>{contactInfo.location}</StringVal></div>
                <div>{'}'};</div>
                <div className="mt-2"><Keyword>export default</Keyword> <span className="text-blue-500">profile</span>;</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Visual Output & Actions */}
        <div className="flex flex-col gap-6">
          
          {/* QR Code Card */}
          <div className="bg-[var(--background)]/50 backdrop-blur-xl border border-[var(--panel-border)] rounded-xl p-6 shadow-lg flex flex-col items-center justify-center text-center relative overflow-hidden group">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--accent)] to-[var(--purple)]"></div>
             
             <div className="bg-white p-4 rounded-lg shadow-inner mb-4">
                <QRCode 
                  value={`BEGIN:VCARD\nVERSION:3.0\nFN:${contactInfo.name}\nEMAIL:${contactInfo.email}\nURL:${contactInfo.linkedin}\nEND:VCARD`}
                  size={160}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  viewBox={`0 0 256 256`}
                />
             </div>
             <h3 className="font-bold text-lg">Scan to Connect</h3>
             <p className="text-xs text-[var(--muted)] mt-1">Save contact directly to phone</p>
          </div>

          {/* Interactive Actions */}
          <div className="grid grid-cols-2 gap-4">
            <a href={contactInfo.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-[var(--panel)] border border-[var(--panel-border)] rounded-lg hover:border-[var(--accent)] hover:bg-[var(--tab-inactive)] transition-all group">
              <GithubIcon className="w-5 h-5 group-hover:text-[var(--accent)]" />
              <span className="text-sm font-medium">GitHub</span>
            </a>
            <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-[var(--panel)] border border-[var(--panel-border)] rounded-lg hover:border-[#0077b5] hover:bg-[var(--tab-inactive)] transition-all group">
              <LinkedinIcon className="w-5 h-5 group-hover:text-[#0077b5]" />
              <span className="text-sm font-medium">LinkedIn</span>
            </a>
            <a href={contactInfo.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-[var(--panel)] border border-[var(--panel-border)] rounded-lg hover:border-[#1DA1F2] hover:bg-[var(--tab-inactive)] transition-all group">
              <TwitterIcon className="w-5 h-5 group-hover:text-[#1DA1F2]" />
              <span className="text-sm font-medium">Twitter</span>
            </a>
            <button onClick={handleCopyEmail} className="flex items-center gap-3 p-4 bg-[var(--panel)] border border-[var(--panel-border)] rounded-lg hover:border-[var(--orange)] hover:bg-[var(--tab-inactive)] transition-all group relative overflow-hidden">
              <MailIcon className="w-5 h-5 group-hover:text-[var(--orange)]" />
              <span className="text-sm font-medium">{copied ? 'Copied!' : 'Email'}</span>
              {copied && <div className="absolute inset-0 bg-[var(--green)]/10"></div>}
            </button>
          </div>

          {/* Download Button */}
          <button
            onClick={generateVCard}
            className="w-full py-4 bg-[var(--accent)] hover:bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/25 transition-all transform hover:scale-[1.02]"
          >
            <DownloadIcon className="w-5 h-5" />
            <span>Download vCard</span>
          </button>

        </div>
      </div>
    </div>
  );
};

export default ContactDashboard;
