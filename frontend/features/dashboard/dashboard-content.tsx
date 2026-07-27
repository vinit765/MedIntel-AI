import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UploadCloud, UserPlus, BookOpen, Eye, ArrowRight } from "lucide-react";

export function DashboardContent() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Main Reports Table */}
      <Card className="lg:col-span-8 shadow-sm border-slate-200 bg-white">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-teal-900">Recent Reports</h2>
          <button className="text-sm font-semibold text-teal-700 hover:text-teal-800">View All Reports</button>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 hover:bg-slate-50">
              <TableHead className="font-semibold text-slate-600 py-4">Patient Name</TableHead>
              <TableHead className="font-semibold text-slate-600">Report Type</TableHead>
              <TableHead className="font-semibold text-slate-600">Date</TableHead>
              <TableHead className="font-semibold text-slate-600">AI Analysis</TableHead>
              <TableHead className="font-semibold text-slate-600 text-right pr-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { init: "HS", name: "Helena Smith", type: "MRI Lumbar Spine", date: "Oct 24, 2023", status: "Completed", variant: "default" },
              { init: "RJ", name: "Robert Jenkins", type: "Blood Panel - Comprehensive", date: "Oct 24, 2023", status: "In Progress", variant: "secondary" },
              { init: "ML", name: "Maria Lopez", type: "Cardiac Stress Test", date: "Oct 23, 2023", status: "Critical Risk", variant: "destructive" },
              { init: "DB", name: "David Byrne", type: "Genomic Screening", date: "Oct 23, 2023", status: "Completed", variant: "default" },
            ].map((row, i) => (
              <TableRow key={i} className="hover:bg-slate-50 cursor-pointer transition-colors">
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-xs">{row.init}</div>
                    <span className="font-semibold text-slate-800">{row.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-slate-600 font-medium">{row.type}</TableCell>
                <TableCell className="text-slate-500">{row.date}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={
                    row.variant === "default" ? "bg-teal-50 text-teal-700 border-teal-200" :
                    row.variant === "secondary" ? "bg-slate-100 text-slate-600 border-slate-200" :
                    "bg-rose-50 text-rose-700 border-rose-200"
                  }>
                    {row.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right pr-6">
                  <button className="text-slate-400 hover:text-teal-700"><Eye className="w-5 h-5" /></button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Right Sidebar actions */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        
        <Card className="shadow-sm border-slate-200 bg-slate-50/50 p-6">
          <h3 className="text-xs font-bold text-teal-800 uppercase tracking-wider mb-4">Quick Actions</h3>
          <div className="flex flex-col gap-3">
            {[
              { title: "Upload New Report", subtitle: "DICOM, PDF, or FHIR data", icon: UploadCloud },
              { title: "Add Patient", subtitle: "Register new profile", icon: UserPlus },
              { title: "Search Evidence", subtitle: "Query MedIntel Library", icon: BookOpen },
            ].map((action, i) => (
              <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:border-teal-400 cursor-pointer transition-all group">
                <div className="bg-teal-700 p-2.5 rounded-md text-white group-hover:bg-teal-600 transition-colors">
                  <action.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 text-sm">{action.title}</h4>
                  <p className="text-xs text-slate-500">{action.subtitle}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-teal-600" />
              </div>
            ))}
          </div>
        </Card>

        <Card className="shadow-sm border-rose-200 bg-white overflow-hidden">
          <div className="bg-rose-50 px-5 py-3 border-b border-rose-100 flex justify-between items-center">
            <h3 className="text-sm font-bold text-rose-800">Cases Requiring Attention</h3>
            <Badge className="bg-rose-600 hover:bg-rose-700 text-white">3 Critical</Badge>
          </div>
          <div className="p-5 border-l-4 border-l-rose-500 m-4 shadow-sm border border-slate-100 rounded-r-lg">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold text-slate-900">Jameson, Sarah</h4>
              <span className="text-xs text-slate-400">12m ago</span>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              Anomalous ECG readings detected. AI suggests potential arrhythmia intervention.
            </p>
            <div className="flex justify-between items-center">
              <div className="flex -space-x-2">
                <Avatar className="w-6 h-6 border-2 border-white"><AvatarImage src="https://i.pravatar.cc/100" /></Avatar>
                <div className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-600">+2</div>
              </div>
              <button className="text-sm font-bold text-teal-700 flex items-center gap-1 hover:text-teal-800">
                Review Case <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </Card>

      </div>
    </div>
  );
}