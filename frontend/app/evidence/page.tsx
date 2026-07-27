import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, BookOpen, Filter, Bookmark, ExternalLink, 
  GraduationCap, Microscope, Stethoscope, Sparkles
} from "lucide-react";

const evidenceDatabase = [
  {
    title: "2023 AHA/ACC/HFSA Guideline for the Management of Heart Failure",
    source: "Journal of the American College of Cardiology",
    type: "Clinical Guideline",
    date: "Aug 2023",
    relevance: 98,
    tags: ["Cardiology", "Heart Failure", "AHA"],
    aiSummary: "Recommends SGLT2 inhibitors for all patients with heart failure with reduced ejection fraction (HFrEF) regardless of diabetes status.",
  },
  {
    title: "Efficacy of Novel Oral Anticoagulants in Non-Valvular Atrial Fibrillation",
    source: "New England Journal of Medicine",
    type: "Meta-Analysis",
    date: "Oct 2023",
    relevance: 94,
    tags: ["Cardiology", "Pharmacology", "AFib"],
    aiSummary: "NOACs demonstrate a 19% risk reduction in stroke and systemic embolism compared to warfarin, with lower rates of intracranial hemorrhage.",
  },
  {
    title: "Standardized Protocol for Sepsis Management in Emergency Departments",
    source: "Annals of Emergency Medicine",
    type: "Protocol",
    date: "Sep 2023",
    relevance: 89,
    tags: ["Emergency Med", "Sepsis", "Critical Care"],
    aiSummary: "Implementation of the 3-hour bundle (lactate measurement, blood cultures, broad-spectrum antibiotics, crystalloid fluids) significantly reduces mortality.",
  },
  {
    title: "Long-term Outcomes of Robotic-Assisted vs Traditional Lumbar Fusion",
    source: "The Lancet: Neurology",
    type: "Clinical Trial",
    date: "Jul 2023",
    relevance: 85,
    tags: ["Orthopedics", "Neurosurgery"],
    aiSummary: "Robotic-assisted cohorts showed decreased operative time and lower 1-year complication rates, though baseline pain reduction was similar.",
  }
];

export default function EvidenceLibraryPage() {
  return (
    <AppShell>
      <div className="max-w-[1200px] mx-auto w-full pb-20">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-teal-950 mb-1 flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-teal-700" />
              Evidence Library
            </h1>
            <p className="text-slate-500">
              Query MedIntel's vector database of peer-reviewed journals, clinical guidelines, and trials.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="bg-white border-slate-200 text-slate-700 gap-2 hover:bg-slate-50">
              <Bookmark className="w-4 h-4" />
              Saved Articles
            </Button>
          </div>
        </div>

        {/* Semantic Search Bar */}
        <Card className="p-6 mb-8 shadow-md border-teal-100 bg-gradient-to-r from-teal-800 to-teal-950 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Sparkles className="w-32 h-32" />
          </div>
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-xl font-bold mb-4">Semantic Clinical Search</h2>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input 
                  placeholder="e.g., What are the latest ACC guidelines for HFrEF management?" 
                  className="w-full pl-12 h-14 bg-white/10 border-white/20 text-white placeholder:text-slate-300 rounded-xl focus-visible:ring-teal-400 text-lg"
                />
              </div>
              <Button className="h-14 px-8 bg-teal-500 hover:bg-teal-400 text-teal-950 font-bold rounded-xl shadow-lg transition-all">
                Search
              </Button>
            </div>
            <div className="flex gap-2 mt-4 text-sm text-teal-100/70 font-medium">
              <span>Try:</span>
              <button className="hover:text-white transition-colors underline decoration-teal-500/50">"First-line SSRIs for pediatric anxiety"</button>
              <span>•</span>
              <button className="hover:text-white transition-colors underline decoration-teal-500/50">"Contraindications for Apixaban"</button>
            </div>
          </div>
        </Card>

        {/* Filter Chips */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Button variant="outline" className="h-9 border-slate-200 text-slate-700 gap-2 bg-white">
            <Filter className="w-4 h-4" /> All Sources
          </Button>
          <div className="h-6 w-px bg-slate-300 mx-1"></div>
          <Badge className="h-9 px-4 cursor-pointer bg-teal-100 hover:bg-teal-200 text-teal-800 border border-teal-200 flex gap-2 rounded-full">
            <Stethoscope className="w-4 h-4" /> Guidelines
          </Badge>
          <Badge variant="outline" className="h-9 px-4 cursor-pointer bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 flex gap-2 rounded-full">
            <Microscope className="w-4 h-4" /> Clinical Trials
          </Badge>
          <Badge variant="outline" className="h-9 px-4 cursor-pointer bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 flex gap-2 rounded-full">
            <GraduationCap className="w-4 h-4" /> Peer-Reviewed
          </Badge>
        </div>

        {/* Search Results List */}
        <div className="space-y-4">
          {evidenceDatabase.map((doc, index) => (
            <Card key={index} className="p-6 shadow-sm border-slate-200 bg-white hover:border-teal-300 transition-colors group">
              <div className="flex flex-col md:flex-row gap-6">
                
                {/* Left side: Vector Match Score */}
                <div className="flex flex-col items-center justify-center bg-slate-50 border border-slate-100 rounded-lg p-4 min-w-[120px]">
                  <span className="text-3xl font-bold text-teal-700">{doc.relevance}%</span>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mt-1 text-center">AI Match<br/>Confidence</span>
                </div>

                {/* Right side: Content */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-800 transition-colors pr-8">
                      {doc.title}
                    </h3>
                    <div className="flex gap-2">
                      <button className="text-slate-400 hover:text-teal-600 p-1"><Bookmark className="w-5 h-5" /></button>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 mb-4">
                    <span className="font-semibold text-slate-700">{doc.source}</span>
                    <span>•</span>
                    <span>{doc.date}</span>
                    <span>•</span>
                    <Badge variant="secondary" className="bg-slate-100 text-slate-600">{doc.type}</Badge>
                  </div>

                  {/* AI Generated RAG Summary */}
                  <div className="bg-teal-50/50 border border-teal-100 rounded-md p-4 mb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="w-4 h-4 text-teal-600" />
                      <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">AI Extracted Context</span>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {doc.aiSummary}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {doc.tags.map((tag, i) => (
                        <span key={i} className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Button variant="ghost" className="text-teal-700 hover:text-teal-800 hover:bg-teal-50 gap-2 h-8 text-xs font-bold">
                      View Full Document <ExternalLink className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

              </div>
            </Card>
          ))}
        </div>

      </div>
    </AppShell>
  );
}