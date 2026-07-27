import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Search, Filter, UploadCloud, FileText, CheckCircle, 
  AlertCircle, Clock, Eye, Download, FileArchive 
} from "lucide-react";

const reportData = [
  {
    id: "REP-2023-8891",
    patient: "Helena Smith",
    init: "HS",
    type: "MRI Lumbar Spine",
    source: "Radiology PACS",
    date: "Oct 24, 2023",
    aiStatus: "Insights Generated",
    statusVariant: "default",
  },
  {
    id: "REP-2023-8890",
    patient: "Robert Jenkins",
    init: "RJ",
    type: "Comprehensive Metabolic Panel",
    source: "LabCorp API",
    date: "Oct 24, 2023",
    aiStatus: "Processing...",
    statusVariant: "secondary",
  },
  {
    id: "REP-2023-8885",
    patient: "Maria Lopez",
    init: "ML",
    type: "ECG / EKG 12-Lead",
    source: "Cardiology Dept",
    date: "Oct 23, 2023",
    aiStatus: "Anomaly Detected",
    statusVariant: "destructive",
  },
  {
    id: "REP-2023-8872",
    patient: "David Byrne",
    init: "DB",
    type: "Genomic Screening (BRCA)",
    source: "External PDF",
    date: "Oct 23, 2023",
    aiStatus: "Insights Generated",
    statusVariant: "default",
  },
  {
    id: "REP-2023-8865",
    patient: "Marcus Chen",
    init: "MC",
    type: "CT Scan - Thorax",
    source: "Radiology PACS",
    date: "Oct 21, 2023",
    aiStatus: "Insights Generated",
    statusVariant: "default",
  },
  {
    id: "REP-2023-8850",
    patient: "Sarah Jameson",
    init: "SJ",
    type: "Holter Monitor 24h",
    source: "Cardiology Dept",
    date: "Oct 20, 2023",
    aiStatus: "Anomaly Detected",
    statusVariant: "destructive",
  },
];

export default function ReportsPage() {
  return (
    <AppShell>
      <div className="max-w-[1600px] mx-auto w-full pb-20">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-teal-950 mb-1">Medical Reports Library</h1>
            <p className="text-slate-500">
              Centralized repository for lab results, imaging, and clinical documents integrated with AI analysis.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button className="bg-teal-800 hover:bg-teal-900 text-white gap-2 shadow-md">
              <UploadCloud className="w-4 h-4" />
              Upload Report
            </Button>
          </div>
        </div>

        {/* Quick Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-5 shadow-sm border-slate-200 bg-white">
            <div className="flex justify-between items-start mb-3">
              <div className="bg-teal-50 p-2.5 rounded-lg">
                <FileArchive className="w-5 h-5 text-teal-700" />
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">+124 this week</span>
            </div>
            <p className="text-sm font-medium text-slate-500">Total Reports</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">34,102</h3>
          </Card>

          <Card className="p-5 shadow-sm border-slate-200 bg-white">
            <div className="flex justify-between items-start mb-3">
              <div className="bg-slate-100 p-2.5 rounded-lg">
                <CheckCircle className="w-5 h-5 text-slate-600" />
              </div>
            </div>
            <p className="text-sm font-medium text-slate-500">AI Analyzed</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">33,980</h3>
          </Card>

          <Card className="p-5 shadow-sm border-l-4 border-l-rose-500 border-t-slate-200 border-b-slate-200 border-r-slate-200 bg-rose-50/20">
            <div className="flex justify-between items-start mb-3">
              <div className="bg-rose-100 p-2.5 rounded-lg">
                <AlertCircle className="w-5 h-5 text-rose-600" />
              </div>
              <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-1 rounded uppercase tracking-wider">Unreviewed</span>
            </div>
            <p className="text-sm font-medium text-slate-600">Anomalies Detected</p>
            <h3 className="text-2xl font-bold text-rose-700 mt-1">12</h3>
          </Card>

          <Card className="p-5 shadow-sm border-slate-200 bg-white">
            <div className="flex justify-between items-start mb-3">
              <div className="bg-slate-100 p-2.5 rounded-lg">
                <Clock className="w-5 h-5 text-slate-600" />
              </div>
            </div>
            <p className="text-sm font-medium text-slate-500">Pending Processing</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">110</h3>
          </Card>
        </div>

        {/* Filter and Search Bar */}
        <Card className="p-4 mb-6 shadow-sm border-slate-200 bg-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Search by Report ID, Patient, or Modality..." 
                className="pl-10 bg-slate-50 border-slate-200 rounded-lg focus-visible:ring-teal-600"
              />
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <Button variant="outline" className="border-slate-200 text-slate-700 gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </Button>
              <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hidden sm:flex">
                <button className="bg-white text-teal-800 px-3 py-1.5 rounded-md shadow-sm">All Types</button>
                <button className="px-3 py-1.5 hover:text-slate-900">Imaging</button>
                <button className="px-3 py-1.5 hover:text-slate-900">Lab Results</button>
                <button className="px-3 py-1.5 hover:text-slate-900">Pathology</button>
              </div>
            </div>
          </div>
        </Card>

        {/* Reports Table */}
        <Card className="shadow-sm border-slate-200 bg-white overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 hover:bg-slate-50">
                <TableHead className="font-semibold text-slate-600 py-4 pl-6">Report ID & Date</TableHead>
                <TableHead className="font-semibold text-slate-600">Patient</TableHead>
                <TableHead className="font-semibold text-slate-600">Modality / Type</TableHead>
                <TableHead className="font-semibold text-slate-600">Source</TableHead>
                <TableHead className="font-semibold text-slate-600">AI Analysis Status</TableHead>
                <TableHead className="font-semibold text-slate-600 text-right pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reportData.map((report, index) => (
                <TableRow key={index} className="hover:bg-slate-50/80 cursor-pointer transition-colors">
                  
                  <TableCell className="py-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-100 p-2 rounded-md">
                        <FileText className="w-4 h-4 text-slate-500" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{report.id}</div>
                        <div className="text-xs text-slate-500">{report.date}</div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6 border border-slate-200">
                        <AvatarFallback className="bg-teal-100 text-teal-800 font-bold text-[10px]">
                          {report.init}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-slate-700 text-sm">{report.patient}</span>
                    </div>
                  </TableCell>

                  <TableCell className="text-slate-800 font-medium text-sm">
                    {report.type}
                  </TableCell>

                  <TableCell className="text-slate-600 text-sm">
                    {report.source}
                  </TableCell>

                  <TableCell>
                    <Badge variant="outline" className={
                      report.statusVariant === "default" ? "bg-teal-50 text-teal-700 border-teal-200" :
                      report.statusVariant === "secondary" ? "bg-slate-100 text-slate-600 border-slate-200 animate-pulse" :
                      "bg-rose-50 text-rose-700 border-rose-200 font-bold"
                    }>
                      {report.statusVariant === "destructive" && <AlertCircle className="w-3 h-3 mr-1" />}
                      {report.aiStatus}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right pr-6">
                    <div className="flex items-center justify-end gap-2">
                      <button className="text-slate-400 hover:text-teal-700 p-1.5 rounded-md hover:bg-slate-100 transition-colors" title="View Report">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-slate-400 hover:text-slate-700 p-1.5 rounded-md hover:bg-slate-100 transition-colors" title="Download">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

      </div>
    </AppShell>
  );
}