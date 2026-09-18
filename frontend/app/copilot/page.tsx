"use client";

import { useEffect, useState, useRef } from "react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { 
  Bot, Send, User as UserIcon, Sparkles, 
  ArrowRight, ShieldCheck, Stethoscope, Loader2 
} from "lucide-react";

// Define TypeScript interfaces for our state
interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
}

interface Patient {
  id: number;
  first_name: string;
  last_name: string;
}

export default function CopilotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: "Hello, Doctor. I have loaded your active database. How can I assist with clinical analysis or treatment protocols today?",
      timestamp: "Just now"
    }
  ]);
  
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const [patients, setPatients] = useState<Patient[]>([]);
  const [activePatient, setActivePatient] = useState<Patient | null>(null);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom of the chat when new messages appear
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Fetch the doctor's patients on load for the context switcher
  useEffect(() => {
    const fetchPatients = async () => {
      const token = localStorage.getItem("medintel_token");
      try {
        const res = await fetch("http://localhost:8000/api/v1/patients/", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setPatients(data);
          if (data.length > 0) setActivePatient(data[0]); // Default to first patient
        }
      } catch (error) {
        console.error("Failed to load patients", error);
      }
    };
    fetchPatients();
  }, []);

  const handleSendMessage = async (textOverride?: string) => {
    const textToSend = textOverride || inputValue;
    if (!textToSend.trim()) return;

    // 1. Add User Message to UI
    const newUserMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: textToSend,
      timestamp: "Just now"
    };
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue("");
    setIsTyping(true);

    // 2. Call the FastAPI Copilot Endpoint
    const token = localStorage.getItem("medintel_token");
    try {
      const response = await fetch("http://localhost:8000/api/v1/copilot/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          message: textToSend,
          patient_id: activePatient?.id || null
        })
      });

      if (response.ok) {
        const data = await response.json();
        
        // 3. Add AI Response to UI
        const newBotMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: data.reply,
          timestamp: "Just now"
        };
        setMessages(prev => [...prev, newBotMsg]);
      } else {
        throw new Error("API Request Failed");
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: "Error: Could not reach the MedIntel backend.",
        timestamp: "Just now"
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSendMessage();
  };

  return (
    <AppShell>
      <div className="max-w-[1400px] mx-auto w-full h-[calc(100vh-8rem)] flex flex-col pb-6">
        
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-teal-950 mb-1 flex items-center gap-3">
              <Bot className="w-8 h-8 text-teal-700" />
              MedIntel AI Copilot
            </h1>
            <p className="text-slate-500 text-sm">
              Conversational clinical intelligence powered by RAG and verified hospital data.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-teal-50 border border-teal-200 px-3 py-1.5 rounded-full text-xs font-semibold text-teal-800">
            <ShieldCheck className="w-4 h-4 text-teal-700" />
            HIPAA Compliant & Secure Session
          </div>
        </div>

        {/* Chat Workspace */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
          
          {/* Main Chat Box */}
          <Card className="lg:col-span-3 shadow-sm border-slate-200 bg-white flex flex-col justify-between overflow-hidden">
            
            {/* Chat Messages Area */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-50/50">
              
              {messages.map((msg) => (
                <div key={msg.id} className={`flex items-start gap-4 ${msg.sender === "user" ? "justify-end" : ""}`}>
                  
                  {msg.sender === "bot" && (
                    <div className="bg-teal-800 text-white p-2.5 rounded-xl shadow-sm shrink-0">
                      <Bot className="w-5 h-5" />
                    </div>
                  )}

                  <div className={`rounded-2xl p-4 shadow-sm max-w-2xl ${
                    msg.sender === "user" 
                      ? "bg-teal-700 text-white" 
                      : "bg-white border border-slate-200"
                  }`}>
                    <p className={`text-sm leading-relaxed whitespace-pre-wrap ${msg.sender === "bot" ? "text-slate-800" : ""}`}>
                      {msg.text}
                    </p>
                    <span className={`text-[10px] font-medium mt-2 block ${msg.sender === "user" ? "text-teal-200" : "text-slate-400"}`}>
                      {msg.sender === "bot" ? "MedIntel AI" : "You"} • {msg.timestamp}
                    </span>
                  </div>

                  {msg.sender === "user" && (
                    <div className="bg-slate-200 text-slate-700 p-2.5 rounded-xl shadow-sm shrink-0">
                      <UserIcon className="w-5 h-5" />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-start gap-4 animate-pulse">
                  <div className="bg-teal-800 text-white p-2.5 rounded-xl shadow-sm">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                    <Loader2 className="w-5 h-5 text-teal-700 animate-spin" />
                  </div>
                </div>
              )}
              
              <div ref={chatEndRef} />
            </div>

            {/* Prompt Input Footer */}
            <div className="p-4 bg-white border-t border-slate-200">
              <div className="flex items-center gap-3">
                <Input 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask Copilot anything about patients, guidelines, or lab results..." 
                  className="flex-1 h-12 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-teal-600 px-4 text-sm"
                  disabled={isTyping}
                />
                <Button 
                  onClick={() => handleSendMessage()} 
                  disabled={isTyping || !inputValue.trim()}
                  className="h-12 px-6 bg-teal-800 hover:bg-teal-900 text-white rounded-xl shadow-md gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send
                </Button>
              </div>
            </div>

          </Card>

          {/* Right Column: Context Controls */}
          <div className="flex flex-col gap-6">
            
            {/* Suggested Prompts */}
            <Card className="shadow-sm border-slate-200 bg-white p-5">
              <h3 className="text-sm font-bold text-teal-900 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-teal-600" />
                Suggested Clinical Prompts
              </h3>
              
              <div className="space-y-3">
                {[
                  "Draft a discharge summary based on recent records.",
                  "Check the latest lab results for anomalies.",
                  "What are the hypertension guidelines for this age group?"
                ].map((prompt, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleSendMessage(prompt)}
                    disabled={isTyping}
                    className="w-full text-left p-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-teal-50/50 hover:border-teal-200 text-xs font-medium text-slate-700 transition-all flex items-center justify-between group disabled:opacity-50"
                  >
                    <span className="pr-2">{prompt}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-teal-700 shrink-0" />
                  </button>
                ))}
              </div>
            </Card>

            {/* Active Patient Context Switcher */}
            <Card className="shadow-sm border-slate-200 bg-slate-50 p-5 flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-teal-700 text-white p-2 rounded-lg shrink-0">
                  <Stethoscope className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Active Patient Context</h4>
                  {activePatient ? (
                    <p className="text-xs text-slate-500 font-medium">{activePatient.first_name} {activePatient.last_name}</p>
                  ) : (
                    <p className="text-xs text-amber-600 font-medium">No patient selected</p>
                  )}
                </div>
              </div>
              
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Copilot reads the selected patient's entire medical history to provide personalized insights.
              </p>
              
              <select 
                className="w-full h-10 px-3 text-xs border border-slate-200 rounded-lg bg-white focus:ring-teal-600 outline-none"
                value={activePatient?.id || ""}
                onChange={(e) => {
                  const selected = patients.find(p => p.id === parseInt(e.target.value));
                  setActivePatient(selected || null);
                }}
              >
                <option value="" disabled>Select a patient...</option>
                {patients.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.first_name} {p.last_name}
                  </option>
                ))}
              </select>
            </Card>

          </div>
        </div>
      </div>
    </AppShell>
  );
}