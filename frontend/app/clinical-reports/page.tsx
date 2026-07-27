import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  FileBarChart, Search, Filter, Plus, Printer, 
  Download, FileText, CheckCircle2, Clock, Sparkles 
} from "lucide-react";

const clinicalReportsData = [
  {
    id: "CR-9921",
    patient: "Helena Smith",
    init: "HS",
    title: "Comprehensive Discharge Summary",
    author: "Dr. Aris Thorne",
    date: "Oct 24, 2023",
    status: "Finalized",
    statusVariant: "default",
  },
  {
    id: "CR-9920",
    patient: "Robert Jenkins",
    init: "RJ",
    title: "Cardiology Consultation & Risk Assessment",
    author: "Dr. Elena Vance",
    date: "Oct 24, 2023",
    status: "Pending Sign-off",
    statusVariant: "secondary",
  },
  {
    id: "CR-9918",
    patient: "Maria Lopez",
    init: "ML",
    title: "Emergency Intervention Protocol Report",
    author: "Dr. Aris Thorne",
    date: "Oct 23, 2023",
    status: "Finalized",
    statusVariant: "default",
  },
  {
    id: "CR-9915",
    patient: "David Byrne",
    init: "DB",
    title: "Genomic Screening Interpretation",
    author: "Dr. Rajesh Patel",
    date: "Oct 23, 2023",
    status: "Finalized",
    statusVariant: "default",
  },
  {
    id: "CR-9910",
    patient: "Sarah Jameson",
    init: "SJ",
    title: "Critical Care Transfer Summary",
    author: "Dr. Aris Thorne",
    date: "Oct 22, 2023",
    status: "Finalized",
    statusVariant: "default",
  },
];

export default function ClinicalReportsPage() {
  return (
    <AppShell>
      <div className="max-w-[1600px] mx-auto w-full pb-20">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-teal-950 mb-1 flex items-center gap-3">
              <FileBarChart className="w-8 h-8 text-teal-700" />
              Clinical Reports Management
            </h1>
            <p className="text-slate-500">
              Generate, review, and sign-off on AI-assisted clinical notes, discharge summaries, and specialist letters.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="bg-white border-slate-200 text-slate-700 gap-2 hover:bg-slate-50">
              <Printer className="w-4 h-4" />
              Batch Print
            </Button>
            <Button className="bg-teal-800 hover:bg-teal-900 text-white gap-2 shadow-md">
              <Plus className="w-4 h-4" />
              Generate New Report
            </Button>
          </div>
        </div>

        {/* Quick Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-5 shadow-sm border-slate-200 bg-white">
            <div className="flex justify-between items-start mb-3">
              <div className="bg-teal-50 p-2.5 rounded-lg">
                <FileText className="w-5 h-5 text-teal-700" />
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">+8 today</span>
            </div>
            <p className="text-sm font-medium text-slate-500">Total Generated Reports</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">156</h3>
          </Card>

          <Card className="p-5 shadow-sm border-slate-200 bg-white">
            <div className="flex justify-between items-start mb-3">
              <div className="bg-emerald-50 p-2.5 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
            <p className="text-sm font-medium text-slate-500">Signed & Finalized</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">142</h3>
          </Card>

          <Card className="p-5 shadow-sm border-slate-200 bg-white">
            <div className="flex justify-between items-start mb-3">
              <div className="bg-amber-50 p-2.5 rounded-lg">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
            </div>
            <p className="text-sm font-medium text-slate-500">Pending Physician Sign-off</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">14</h3>
          </Card>

          <Card className="p-5 shadow-sm border-teal-100 bg-teal-50/50">
            <div className="flex justify-between items-start mb-3">
              <div className="bg-teal-100 p-2.5 rounded-lg">
                <Sparkles className="w-5 h-5 text-teal-800" />
              </div>
            </div>
            <p className="text-sm font-medium text-teal-900">AI Drafting Accuracy</p>
            <h3 className="text-2xl font-bold text-teal-950 mt-1">98.4%</h3>
          </Card>
        </div>

        {/* Filter and Search Bar */}
        <Card className="p-4 mb-6 shadow-sm border-slate-200 bg-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Search by Report ID, Patient Name, or Title..." 
                className="pl-10 bg-slate-50 border-slate-200 rounded-lg focus-visible:ring-teal-600"
              />
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <Button variant="outline" className="border-slate-200 text-slate-700 gap-2">
                <Filter className="w-4 h-4" />
                Filter Type
              </Button>
            </div>
          </div>
        </Card>

        {/* Clinical Reports Table */}
        <Card className="shadow-sm border-slate-200 bg-white overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 hover:bg-slate-50">
                <TableHead className="font-semibold text-slate-600 py-4 pl-6">Report ID & Title</TableHead>
                <TableHead className="font-semibold text-slate-600">Patient</TableHead>
                <TableHead className="font-semibold text-slate-600">Attending Author</TableHead>
                <TableHead className="font-semibold text-slate-600">Date</TableHead>
                <TableHead className="font-semibold text-slate-600">Status</TableHead>
                <TableHead className="font-semibold text-slate-600 text-right pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clinicalReportsData.map((report, index) => (
                <TableRow key={index} className="hover:bg-slate-50/80 cursor-pointer transition-colors">
                  
                  <TableCell className="py-4 pl-6">
                    <div className="font-bold text-slate-900 mb-0.5">{report.title}</div>
                    <span className="text-xs text-slate-400 font-mono">{report.id}</span>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6 border border-slate-200">
                        <AvatarFallback className="bg-teal-100 text-teal-800 font-bold text-[10px]">
                          {report.init}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-semibold text-slate-800 text-sm">{report.patient}</span>
                    </div>
                  </TableCell>

                  <TableCell className="text-slate-600 text-sm font-medium">
                    {report.author}
                  </TableCell>

                  <TableCell className="text-slate-500 text-sm">
                    {report.date}
                  </TableCell>

                  <TableCell>
                    <Badge variant="outline" className={
                      report.statusVariant === "default" ? "bg-teal-50 text-teal-700 border-teal-200" :
                      "bg-amber-50 text-amber-700 border-amber-200 font-medium"
                    }>
                      {report.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right pr-6">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" className="text-teal-700 hover:text-teal-800 hover:bg-teal-50 h-8 px-3 text-xs font-semibold gap-1">
                        <Download className="w-3.5 h-3.5" /> Export PDF
                      </Button>
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