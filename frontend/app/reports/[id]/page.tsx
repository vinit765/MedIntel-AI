"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  AlertTriangle, BookOpen, ClipboardCheck, 
  ArrowLeft, Loader2, Play, Bot 
} from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusPanel } from "@/components/status-panel";
import { PageHeader } from "@/components/page-header";

export default function ReportViewerPage() {
  const params = useParams();
  const router = useRouter();
  const reportId = params.id;
  
  const [report, setReport] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiOutput, setAiOutput] = useState<string | null>(null);

  // Fetch the report data when the page loads
  useEffect(() => {
    const fetchReport = async () => {
      const token = localStorage.getItem("medintel_token");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const response = await fetch(`http://localhost:8000/api/v1/reports/${reportId}`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (response.ok) {
          setReport(await response.json());
        }
      } catch (error) {
        console.error("Failed to fetch report:", error);
      }
    };
    if (reportId) fetchReport();
  }, [reportId, router]);

  // Trigger the RAG Pipeline and Llama 3
  const handleRunAnalysis = async () => {
    setIsAnalyzing(true);
    const token = localStorage.getItem("medintel_token");
    
    try {
      const response = await fetch(`http://localhost:8000/api/v1/analysis/${reportId}/analyze`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setAiOutput(data.raw_response);
      } else {
        alert("Analysis failed. Please check backend logs.");
      }
    } catch (error) {
      console.error("AI Analysis failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Helper function to split bullet points into a clean string array
  const parseSectionToItems = (sectionText: string): string[] => {
    if (!sectionText) return [];
    const items = sectionText
      .split("\n")
      .map((line) => line.replace(/^[-*•\d.)]\s*/, "").trim())
      .filter((line) => line.length > 0);
    return items.length > 0 ? items : [sectionText.trim()];
  };

  const getExecutiveSummary = (text: string): string[] => {
    try {
      const raw = text.split("RISK ANALYSIS:")[0].replace("EXECUTIVE SUMMARY:", "").trim();
      return parseSectionToItems(raw);
    } catch {
      return ["Parsing error."];
    }
  };

  const getRiskAnalysis = (text: string): string[] => {
    try {
      const raw = text.split("RISK ANALYSIS:")[1].split("EVIDENCE REFERENCES:")[0].trim();
      return parseSectionToItems(raw);
    } catch {
      return ["Parsing error."];
    }
  };

  const getEvidence = (text: string): string[] => {
    try {
      const raw = text.split("EVIDENCE REFERENCES:")[1].trim();
      return parseSectionToItems(raw);
    } catch {
      return ["Parsing error."];
    }
  };

  if (!report) {
    return (
      <AppShell>
        <div className="flex h-[80vh] items-center justify-center text-slate-500 gap-3">
          <Loader2 className="w-6 h-6 animate-spin" /> Loading clinical record...
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="max-w-[1600px] mx-auto w-full pb-20 relative">
        
        {/* Navigation */}
        <button 
          onClick={() => router.back()} 
          className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-teal-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Library
        </button>

        <PageHeader 
          eyebrow={`REP-2026-${1000 + report.id}`} 
          title={report.record_type} 
          description="Review extracted clinical text and run AI RAG analysis." 
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-start">
          
          {/* Left Column: Source Document */}
          <div className="lg:col-span-5">
            <Card className="p-6 shadow-sm border-slate-200">
              <h3 className="font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">
                Source Document
              </h3>
              <div className="whitespace-pre-wrap text-sm text-slate-600 font-mono bg-slate-50 p-4 rounded-lg border border-slate-100 max-h-[600px] overflow-y-auto">
                {report.content}
              </div>
            </Card>
          </div>

          {/* Right Column: AI Analysis Panels */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {!aiOutput ? (
              <div className="flex flex-col items-center justify-center bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl p-8 text-center min-h-[400px]">
                <Bot className="w-16 h-16 text-teal-200 mb-4" />
                <h3 className="text-xl font-bold text-slate-700 mb-2">Ready for Intelligence</h3>
                <p className="text-slate-500 mb-8 max-w-md">
                  Run the RAG pipeline to embed this document, cross-reference your Evidence Library, and generate clinical insights via Llama 3.
                </p>
                <Button 
                  onClick={handleRunAnalysis} 
                  disabled={isAnalyzing} 
                  className="bg-teal-800 hover:bg-teal-900 text-white px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all"
                >
                  {isAnalyzing ? (
                    <Loader2 className="w-5 h-5 animate-spin mr-3" />
                  ) : (
                    <Play className="w-5 h-5 mr-3 fill-current" />
                  )}
                  {isAnalyzing ? "Processing RAG Pipeline..." : "Run AI Analysis"}
                </Button>
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col gap-6">
                <StatusPanel 
                  title="Executive Summary" 
                  description="Generated via local Llama 3" 
                  icon={ClipboardCheck} 
                  items={getExecutiveSummary(aiOutput)} 
                />
                <div className="grid gap-6 xl:grid-cols-2 items-start">
                  <StatusPanel 
                    title="Risk Analysis" 
                    description="Anomalies and flags detected" 
                    icon={AlertTriangle} 
                    items={getRiskAnalysis(aiOutput)} 
                  />
                  <StatusPanel 
                    title="Evidence References" 
                    description="RAG Vector Citations" 
                    icon={BookOpen} 
                    items={getEvidence(aiOutput)} 
                  />
                </div>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </AppShell>
  );
}