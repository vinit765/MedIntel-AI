"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  AlertTriangle, BookOpen, ClipboardCheck, 
  ArrowLeft, Loader2, Play, Bot, Download, FileText, CheckCircle2, ShieldAlert
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

  // Fetch report data on load
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
          const data = await response.json();
          setReport(data);
          
          if (data.ai_analysis) {
            setAiOutput(data.ai_analysis);
          }
        }
      } catch (error) {
        console.error("Failed to fetch report:", error);
      }
    };
    if (reportId) fetchReport();
  }, [reportId, router]);

  // Trigger RAG Pipeline + Llama 3
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

  const handleExportPDF = () => {
    window.print();
  };

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

  const execSummary = aiOutput ? getExecutiveSummary(aiOutput) : [];
  const riskAnalysis = aiOutput ? getRiskAnalysis(aiOutput) : [];
  const evidenceList = aiOutput ? getEvidence(aiOutput) : [];

  return (
    <>
      {/* GLOBAL PRINT STYLES */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 12mm 15mm 15mm 15mm;
          }
          body {
            background-color: #ffffff !important;
            color: #0f172a !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          /* Hide all application chrome, sidebar, and web navigation */
          aside, nav, header, button, [role="navigation"], .print-hidden-element {
            display: none !important;
          }
        }
      `}</style>

      {/* ========================================================= */}
      {/* 1. SCREEN VIEW (Visible on web dashboard, hidden on print) */}
      {/* ========================================================= */}
      <div className="print:hidden">
        <AppShell>
          <div className="max-w-[1600px] mx-auto w-full pb-20 relative">
            
            <div className="flex justify-between items-center mb-6">
              <button 
                onClick={() => router.back()} 
                className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-teal-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Library
              </button>

              {aiOutput && (
                <Button 
                  onClick={handleExportPDF}
                  className="bg-teal-800 hover:bg-teal-900 text-white gap-2 shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  Export to PDF
                </Button>
              )}
            </div>

            <PageHeader 
              eyebrow={`REP-2026-${1000 + report.id}`} 
              title={report.record_type} 
              description="Review extracted clinical text and run AI RAG analysis." 
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-start">
              
              {/* Left Column: Source Document */}
              <div className="lg:col-span-5">
                <Card className="p-6 shadow-sm border-slate-200">
                  <h3 className="font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-teal-700" /> Source Document
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
                      items={execSummary} 
                    />
                    <div className="grid gap-6 xl:grid-cols-2 items-start">
                      <StatusPanel 
                        title="Risk Analysis" 
                        description="Anomalies and flags detected" 
                        icon={AlertTriangle} 
                        items={riskAnalysis} 
                      />
                      <StatusPanel 
                        title="Evidence References" 
                        description="RAG Vector Citations" 
                        icon={BookOpen} 
                        items={evidenceList} 
                      />
                    </div>
                  </div>
                )}
              </div>
              
            </div>
          </div>
        </AppShell>
      </div>

      {/* ====================================================================== */}
      {/* 2. DEDICATED CLINICAL DOSSIER (Hidden on screen, rendered on export)  */}
      {/* ====================================================================== */}
      <div className="hidden print:block w-full max-w-[800px] mx-auto text-slate-900 bg-white font-sans">
        
        {/* Letterhead / Header */}
        <div className="border-b-2 border-teal-900 pb-4 mb-6 flex justify-between items-end">
          <div>
            <div className="text-[11px] font-bold tracking-widest text-teal-800 uppercase">
              MedIntel AI • Clinical Intelligence Platform
            </div>
            <h1 className="text-2xl font-black text-slate-950 mt-0.5 tracking-tight">
              Clinical Assessment & Diagnostic Report
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Privacy-Preserving On-Device RAG Synthesis • Local LLM Inference
            </p>
          </div>
          <div className="text-right">
            <div className="text-xs font-mono font-bold text-slate-900">
              REP-2026-{1000 + report.id}
            </div>
            <div className="text-[11px] text-slate-500">
              Date: {new Date(report.created_at || Date.now()).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
            </div>
            <div className="inline-block px-2 py-0.5 mt-1 text-[10px] font-bold bg-teal-50 text-teal-800 border border-teal-200 rounded">
              VERIFIED RECORD
            </div>
          </div>
        </div>

        {/* Metadata Summary Box */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 mb-6 grid grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Record Type</span>
            <span className="font-bold text-slate-800">{report.record_type}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Analysis Engine</span>
            <span className="font-semibold text-slate-800">Llama 3 (Local Edge)</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Clinical Triage</span>
            <span className={`font-bold ${report.is_flagged ? "text-rose-700" : "text-teal-700"}`}>
              {report.is_flagged ? "Priority Flag Detected" : "Standard Review"}
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Security Status</span>
            <span className="font-semibold text-slate-800">100% Local Storage</span>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="mb-6 break-inside-avoid">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-1.5 mb-3">
            <CheckCircle2 className="w-4 h-4 text-teal-800" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-teal-950">
              1. Executive Clinical Summary
            </h2>
          </div>
          <div className="space-y-2 bg-slate-50/70 border border-slate-200 rounded-lg p-4 text-xs leading-relaxed text-slate-800">
            {execSummary.length > 0 ? (
              execSummary.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-teal-700 font-bold">•</span>
                  <span>{item}</span>
                </div>
              ))
            ) : (
              <p className="text-slate-500 italic">No summary generated.</p>
            )}
          </div>
        </div>

        {/* Risk Analysis & Evidence References (2 Columns) */}
        <div className="grid grid-cols-2 gap-4 mb-6 break-inside-avoid">
          
          {/* Risk Analysis */}
          <div className="border border-slate-200 rounded-lg p-3.5 bg-rose-50/20">
            <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-rose-100">
              <ShieldAlert className="w-4 h-4 text-rose-700" />
              <h3 className="text-xs font-bold text-rose-950 uppercase tracking-wide">
                2. Risk & Critical Flags
              </h3>
            </div>
            <div className="space-y-1.5 text-[11px] leading-snug text-slate-800">
              {riskAnalysis.length > 0 ? (
                riskAnalysis.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-1.5">
                    <span className="text-rose-600 font-bold">›</span>
                    <span>{item}</span>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 italic">No specific risks flagged.</p>
              )}
            </div>
          </div>

          {/* Evidence References */}
          <div className="border border-slate-200 rounded-lg p-3.5 bg-teal-50/20">
            <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-teal-100">
              <BookOpen className="w-4 h-4 text-teal-800" />
              <h3 className="text-xs font-bold text-teal-950 uppercase tracking-wide">
                3. Clinical Evidence Citations
              </h3>
            </div>
            <div className="space-y-1.5 text-[11px] leading-snug text-slate-800">
              {evidenceList.length > 0 ? (
                evidenceList.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-1.5">
                    <span className="text-teal-700 font-bold">›</span>
                    <span>{item}</span>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 italic">No guidelines cited.</p>
              )}
            </div>
          </div>

        </div>

        {/* Source Clinical Documentation */}
        <div className="mb-8 break-inside-avoid">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-1.5 mb-2">
            <FileText className="w-4 h-4 text-slate-700" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              4. Source Document Transcript
            </h2>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-[10.5px] font-mono leading-relaxed text-slate-700 whitespace-pre-wrap">
            {report.content}
          </div>
        </div>

        {/* Sign-off & Verification Footer */}
        <div className="border-t border-slate-300 pt-4 break-inside-avoid text-[11px] text-slate-500">
          <div className="flex justify-between items-end mb-6">
            <div className="max-w-md">
              <span className="font-bold text-slate-700 block mb-0.5">Clinical Disclaimer</span>
              This synthesis is generated locally via edge artificial intelligence (Llama 3) for diagnostic reference and decision support. Attending physician verification required before prescribing or triage execution.
            </div>
            <div className="text-right">
              <div className="border-b border-slate-400 w-48 mb-1"></div>
              <span className="text-[10px] uppercase font-bold text-slate-600">Attending Clinician Signature</span>
            </div>
          </div>

          <div className="flex justify-between items-center text-[10px] text-slate-400 border-t border-slate-100 pt-2">
            <span>MedIntel AI Edge Deployment • Zero External Network Transmission</span>
            <span>Page 1 of 1 (Consolidated Report)</span>
          </div>
        </div>

      </div>
    </>
  );
}