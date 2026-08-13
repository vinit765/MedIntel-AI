"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Activity, ShieldCheck, FileText, ArrowRight, Stethoscope } from "lucide-react";

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Check for the authentication token when the page loads
  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem("medintel_token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navigation Bar - Cleaned up to only show branding */}
      <header className="px-8 py-6 flex items-center justify-between border-b border-slate-200 bg-white">
        <div className="flex items-center gap-3">
          <div className="bg-teal-700 p-2 rounded-lg">
            <Stethoscope className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-teal-900 tracking-tight">MedIntel AI</span>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center py-24">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider mb-8">
          <Activity className="w-4 h-4" />
          <span>Clinical Intelligence Platform</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mb-6">
          Transform medical data into <span className="text-teal-700">actionable clinical insights.</span>
        </h1>
        
        <p className="text-lg text-slate-500 max-w-2xl mb-10 leading-relaxed">
          Convert medical documents, DICOM imaging, and patient histories into structured evidence, risk signals, and clinician-ready decision support reports.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 min-h-[48px]">
          {mounted && isLoggedIn ? (
            // Logged In State: One clear path to the dashboard
            <Link href="/dashboard">
              <Button className="bg-teal-800 hover:bg-teal-900 text-white h-12 px-8 text-lg rounded-xl shadow-lg gap-2 font-bold">
                Launch Workspace <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          ) : mounted ? (
            // Logged Out State: Prompts to log in
            <>
              <Link href="/login">
                <Button className="bg-teal-800 hover:bg-teal-900 text-white h-12 px-8 text-lg rounded-xl shadow-lg gap-2 font-bold">
                  Launch Workspace <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" className="h-12 px-8 text-lg rounded-xl border-slate-300 text-slate-700 hover:bg-slate-50 shadow-sm font-bold">
                  Clinician Sign In
                </Button>
              </Link>
            </>
          ) : null}
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full mt-24">
          
          <Card className="p-6 text-left border-slate-200 shadow-sm hover:shadow-md transition-shadow bg-white hover:border-teal-300 group">
            <div className="bg-teal-50 w-12 h-12 rounded-xl flex items-center justify-center text-teal-700 mb-5 group-hover:bg-teal-700 group-hover:text-white transition-colors">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Structured Extraction</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Automatically parse clinical notes, lab results, and unstructured discharge summaries into standardized, queryable formats.
            </p>
          </Card>

          <Card className="p-6 text-left border-slate-200 shadow-sm hover:shadow-md transition-shadow bg-white hover:border-rose-300 group">
            <div className="bg-rose-50 w-12 h-12 rounded-xl flex items-center justify-center text-rose-600 mb-5 group-hover:bg-rose-600 group-hover:text-white transition-colors">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Risk Intelligence</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Deploy predictive early warning systems to flag patient readmission likelihood, sepsis onset, and critical care anomalies.
            </p>
          </Card>

          <Card className="p-6 text-left border-slate-200 shadow-sm hover:shadow-md transition-shadow bg-white hover:border-emerald-300 group">
            <div className="bg-emerald-50 w-12 h-12 rounded-xl flex items-center justify-center text-emerald-600 mb-5 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Evidence Discipline</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Ground every AI-generated clinical insight strictly in verified hospital data and peer-reviewed medical guidelines to prevent hallucinations.
            </p>
          </Card>

        </div>
      </main>
    </div>
  );
}