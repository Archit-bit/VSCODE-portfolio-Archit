import React, { useState, useRef, useEffect } from "react";
import type { Message } from "../types";

import { getChatbotResponse } from "../src/services/openrouterService";

import { ChatIcon, CloseIcon, SendIcon, UserIcon, BotIcon } from "./Icons";

interface ChatbotProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const Chatbot: React.FC<ChatbotProps> = ({ isOpen, setIsOpen }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "ai",
      text: "Hello! I'm Archit's AI assistant. Ask me anything about his portfolio!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (input.trim() === "" || isLoading) return;

    const userMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const aiResponse = await getChatbotResponse(input);
      const aiMessage: Message = { sender: "ai", text: aiResponse };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        sender: "ai",
        text: "Sorry, I'm having trouble connecting. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-[var(--pink)] rounded-full text-white flex items-center justify-center shadow-lg hover:bg-pink-600 transition-transform transform hover:scale-110"
        aria-label="Toggle AI assistant"
      >
        {isOpen ? (
          <CloseIcon className="w-8 h-8" />
        ) : (
          <ChatIcon className="w-8 h-8" />
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[32rem] bg-[var(--panel)] border border-[var(--panel-border)] rounded-lg shadow-2xl flex flex-col z-50">
          <header className="p-4 border-b border-[var(--panel-border)]">
            <h2 className="font-bold text-lg">AI Assistant</h2>
            <p className="text-xs text-[var(--muted)]">Powered by openRouter</p>
          </header>

          <div className="flex-1 p-4 overflow-y-auto">
            <div className="flex flex-col gap-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 ${
                    msg.sender === "user" ? "justify-end" : ""
                  }`}
                >
                  {msg.sender === "ai" && (
                    <BotIcon className="w-8 h-8 flex-shrink-0 text-[var(--accent)]" />
                  )}
                  <div
                    className={`rounded-lg px-4 py-2 max-w-xs ${
                      msg.sender === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-[var(--tab-inactive)]"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                  {msg.sender === "user" && (
                    <UserIcon className="w-8 h-8 flex-shrink-0 text-[var(--muted)]" />
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-3">
                  <BotIcon className="w-8 h-8 text-[var(--accent)]" />
                  <div className="rounded-lg px-4 py-2 bg-[var(--tab-inactive)]">
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-[var(--muted)] rounded-full animate-pulse delay-75"></span>
                      <span className="w-2 h-2 bg-[var(--muted)] rounded-full animate-pulse delay-150"></span>
                      <span className="w-2 h-2 bg-[var(--muted)] rounded-full animate-pulse delay-300"></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="p-4 border-t border-[var(--panel-border)]">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about my projects..."
                className="flex-1 bg-[var(--background)] border border-[var(--panel-border)] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="p-2 bg-[var(--accent)] text-white rounded-md hover:opacity-90 disabled:opacity-50"
              >
                <SendIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
