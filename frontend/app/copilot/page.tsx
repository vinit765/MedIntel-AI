import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { 
  Bot, Send, User, Sparkles, FileText, 
  ArrowRight, ShieldCheck, Stethoscope, RefreshCw 
} from "lucide-react";

export default function CopilotPage() {
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
          
          {/* Main Chat Box (Takes up 3 columns) */}
          <Card className="lg:col-span-3 shadow-sm border-slate-200 bg-white flex flex-col justify-between overflow-hidden">
            
            {/* Chat Messages Area */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-50/50">
              
              {/* Bot Greeting */}
              <div className="flex items-start gap-4">
                <div className="bg-teal-800 text-white p-2.5 rounded-xl shadow-sm">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm max-w-2xl">
                  <p className="text-slate-800 text-sm leading-relaxed mb-2">
                    Hello, Dr. Thorne. I have loaded active patient files and recent hospital admissions. How can I assist with clinical analysis or treatment protocols today?
                  </p>
                  <span className="text-[10px] text-slate-400 font-medium">MedIntel AI • Just now</span>
                </div>
              </div>

              {/* User Prompt Example */}
              <div className="flex items-start gap-4 justify-end">
                <div className="bg-teal-700 text-white rounded-2xl p-4 shadow-sm max-w-2xl">
                  <p className="text-sm leading-relaxed">
                    Summarize the critical lab findings for Maria Lopez and check for any potential ECG anomalies.
                  </p>
                </div>
                <div className="bg-slate-200 text-slate-700 p-2.5 rounded-xl shadow-sm">
                  <User className="w-5 h-5" />
                </div>
              </div>

              {/* Bot Response with Citations */}
              <div className="flex items-start gap-4">
                <div className="bg-teal-800 text-white p-2.5 rounded-xl shadow-sm">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm max-w-2xl space-y-3">
                  <p className="text-slate-800 text-sm leading-relaxed">
                    Based on recent records for <strong>Maria Lopez (MRN-87994)</strong>:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                    <li><strong>ECG Analysis:</strong> ST-Elevation detected (CardioVision v2.4, 98% confidence) indicative of potential Anterior STEMI.</li>
                    <li><strong>Lab Markers:</strong> Troponin-I levels elevated at 2.4 ng/mL.</li>
                  </ul>
                  <div className="bg-teal-50 border border-teal-100 rounded-lg p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-teal-700" />
                      <span className="text-xs font-semibold text-teal-900">Source: Cardiac Stress Test & 12-Lead ECG (Oct 23, 2023)</span>
                    </div>
                    <span className="text-xs text-teal-700 font-bold underline cursor-pointer">View Record</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium block">MedIntel AI • 2 mins ago</span>
                </div>
              </div>

            </div>

            {/* Prompt Input Footer */}
            <div className="p-4 bg-white border-t border-slate-200">
              <div className="flex items-center gap-3">
                <Input 
                  placeholder="Ask Copilot anything about patients, guidelines, or lab results..." 
                  className="flex-1 h-12 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-teal-600 px-4 text-sm"
                />
                <Button className="h-12 px-6 bg-teal-800 hover:bg-teal-900 text-white rounded-xl shadow-md gap-2">
                  <Send className="w-4 h-4" />
                  Send
                </Button>
              </div>
              <div className="flex items-center justify-between mt-2 px-1 text-xs text-slate-400">
                <span>Pro-tip: You can reference patients directly by typing "@" followed by their name.</span>
                <span>Powered by MedIntel RAG v4</span>
              </div>
            </div>

          </Card>

          {/* Right Column: Quick Prompts & Context */}
          <div className="flex flex-col gap-6">
            <Card className="shadow-sm border-slate-200 bg-white p-5 flex-1">
              <h3 className="text-sm font-bold text-teal-900 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-teal-600" />
                Suggested Clinical Prompts
              </h3>
              
              <div className="space-y-3">
                {[
                  "Draft discharge summary for Helena Smith",
                  "Review Sarah Jameson's sepsis risk factors",
                  "Compare Robert Jenkins's blood panel with last month",
                  "What are the contraindications for current medications?"
                ].map((prompt, i) => (
                  <button 
                    key={i} 
                    className="w-full text-left p-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-teal-50/50 hover:border-teal-200 text-xs font-medium text-slate-700 transition-all flex items-center justify-between group"
                  >
                    <span>{prompt}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-teal-700" />
                  </button>
                ))}
              </div>
            </Card>

            <Card className="shadow-sm border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-teal-700 text-white p-2 rounded-lg">
                  <Stethoscope className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Active Patient Context</h4>
                  <p className="text-xs text-slate-500">Maria Lopez (MRN-87994)</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Copilot is currently contextualized to patient Maria Lopez's cardiology reports and real-time vital monitor.
              </p>
              <Button variant="outline" className="w-full bg-white border-slate-200 text-slate-700 h-8 text-xs font-semibold">
                Switch Patient Context
              </Button>
            </Card>
          </div>

        </div>

      </div>
    </AppShell>
  );
}