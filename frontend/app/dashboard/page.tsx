import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Filter, RefreshCw, Bot } from "lucide-react";
import { MetricCards } from "@/features/dashboard/metric-cards";
import { DashboardContent } from "@/features/dashboard/dashboard-content";

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="max-w-[1600px] mx-auto w-full relative pb-20">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-teal-950 mb-1">Main Workspace</h1>
            <p className="text-slate-500">
              Reviewing clinical intelligence for <span className="font-semibold text-slate-800">St. Jude's Medical Center.</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="bg-white border-slate-200 text-slate-700 gap-2 hover:bg-slate-50">
              <Filter className="w-4 h-4" />
              Filter View
            </Button>
            <Button className="bg-teal-800 hover:bg-teal-900 text-white gap-2 shadow-md">
              <RefreshCw className="w-4 h-4" />
              Sync Data
            </Button>
          </div>
        </div>

        {/* Main Grid Architecture */}
        <MetricCards />
        <DashboardContent />

        {/* Floating Action Button (FAB) for AI Copilot */}
        <div className="fixed bottom-8 right-8 z-50">
          <button className="bg-teal-800 hover:bg-teal-900 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-teal-500/30">
            <Bot className="w-6 h-6" />
          </button>
        </div>
        
      </div>
    </AppShell>
  );
} 