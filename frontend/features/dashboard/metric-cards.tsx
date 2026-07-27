import { Card } from "@/components/ui/card";
import { Users, FileCheck, ClipboardList, AlertCircle, FileText } from "lucide-react";

export function MetricCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
      <Card className="p-5 shadow-sm border-slate-200 relative overflow-hidden bg-white">
        <div className="flex justify-between items-start mb-4">
          <div className="bg-slate-100 p-2 rounded-md"><Users className="w-5 h-5 text-slate-600" /></div>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">+2.4%</span>
        </div>
        <p className="text-sm font-medium text-slate-500">Total Patients</p>
        <h3 className="text-2xl font-bold text-slate-900 mt-1">1,284</h3>
      </Card>

      <Card className="p-5 shadow-sm border-slate-200 bg-white">
        <div className="flex justify-between items-start mb-4">
          <div className="bg-teal-50 p-2 rounded-md"><FileCheck className="w-5 h-5 text-teal-700" /></div>
          <span className="text-xs font-bold text-teal-700 bg-white">14 today</span>
        </div>
        <p className="text-sm font-medium text-slate-500">Reports Analyzed</p>
        <h3 className="text-2xl font-bold text-slate-900 mt-1">34,102</h3>
      </Card>

      <Card className="p-5 shadow-sm border-l-4 border-l-rose-500 border-t-slate-200 border-b-slate-200 border-r-slate-200 relative overflow-hidden bg-rose-50/30">
        <div className="flex justify-between items-start mb-4">
          <div className="bg-rose-100 p-2 rounded-md"><ClipboardList className="w-5 h-5 text-rose-600" /></div>
          <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-1 rounded tracking-wider uppercase">Requires Attention</span>
        </div>
        <p className="text-sm font-medium text-slate-600">Pending Reviews</p>
        <h3 className="text-2xl font-bold text-rose-700 mt-1">24</h3>
      </Card>

      <Card className="p-5 shadow-sm border-slate-200 relative bg-white">
        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-rose-500 rounded-tr-lg"></div>
        <div className="flex justify-between items-start mb-4">
          <div className="bg-slate-100 p-2 rounded-md"><AlertCircle className="w-5 h-5 text-slate-600" /></div>
          <span className="text-xs font-medium text-slate-600">High Priority</span>
        </div>
        <p className="text-sm font-medium text-slate-500">Clinical Flags</p>
        <h3 className="text-2xl font-bold text-slate-900 mt-1">12</h3>
      </Card>

      <Card className="p-5 shadow-sm border-slate-200 bg-white">
        <div className="flex justify-between items-start mb-4">
          <div className="bg-slate-100 p-2 rounded-md"><FileText className="w-5 h-5 text-slate-600" /></div>
        </div>
        <p className="text-sm font-medium text-slate-500">Generated Reports</p>
        <h3 className="text-2xl font-bold text-slate-900 mt-1">156</h3>
      </Card>
    </div>
  );
}