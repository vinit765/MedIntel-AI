import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Activity, Search, Filter, ShieldCheck, FileText, 
  UserCheck, AlertTriangle, Download, RefreshCw 
} from "lucide-react";

const activityData = [
  {
    id: "LOG-9021",
    user: "Dr. Aris Thorne",
    init: "AT",
    role: "Senior Clinician",
    action: "Reviewed and signed clinical discharge summary",
    target: "Patient: Helena Smith (MRN-88021)",
    timestamp: "12 minutes ago",
    type: "Sign-off",
    badgeVariant: "default"
  },
  {
    id: "LOG-9020",
    user: "MedIntel AI Engine",
    init: "AI",
    role: "Neural Net v2.4",
    action: "Detected critical anomaly in ECG 12-lead scan",
    target: "Patient: Maria Lopez (MRN-87994)",
    timestamp: "25 minutes ago",
    type: "AI Flag",
    badgeVariant: "destructive"
  },
  {
    id: "LOG-9019",
    user: "Dr. Elena Vance",
    init: "EV",
    role: "Attending Physician",
    action: "Uploaded new DICOM imaging and initiated RAG parsing",
    target: "Report ID: REP-2023-8890",
    timestamp: "1 hour ago",
    type: "Upload",
    badgeVariant: "secondary"
  },
  {
    id: "LOG-9018",
    user: "System Administrator",
    init: "SA",
    role: "IT Security",
    action: "Routine HIPAA compliance security audit completed",
    target: "Global Server Cluster A",
    timestamp: "3 hours ago",
    type: "Security",
    badgeVariant: "outline"
  },
  {
    id: "LOG-9017",
    user: "Dr. Rajesh Patel",
    init: "RP",
    role: "Specialist",
    action: "Queried Evidence Library for ACC Heart Failure Guidelines",
    target: "Query Vector ID #4492",
    timestamp: "4 hours ago",
    type: "RAG Search",
    badgeVariant: "outline"
  }
];

export default function ActivityPage() {
  return (
    <AppShell>
      <div className="max-w-[1600px] mx-auto w-full pb-20">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-teal-950 mb-1 flex items-center gap-3">
              <Activity className="w-8 h-8 text-teal-700" />
              System & Clinical Activity Audit
            </h1>
            <p className="text-slate-500">
              Immutable audit logs tracking all user interactions, AI diagnostics, and data access.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="bg-white border-slate-200 text-slate-700 gap-2 hover:bg-slate-50">
              <Download className="w-4 h-4" />
              Export Audit Trail
            </Button>
            <Button className="bg-teal-800 hover:bg-teal-900 text-white gap-2 shadow-md">
              <RefreshCw className="w-4 h-4" />
              Refresh Logs
            </Button>
          </div>
        </div>

        {/* Summary Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-5 shadow-sm border-slate-200 bg-white">
            <div className="flex justify-between items-start mb-3">
              <div className="bg-teal-50 p-2.5 rounded-lg">
                <Activity className="w-5 h-5 text-teal-700" />
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Real-time</span>
            </div>
            <p className="text-sm font-medium text-slate-500">Total Audit Events (24h)</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">1,482</h3>
          </Card>

          <Card className="p-5 shadow-sm border-slate-200 bg-white">
            <div className="flex justify-between items-start mb-3">
              <div className="bg-slate-100 p-2.5 rounded-lg">
                <UserCheck className="w-5 h-5 text-slate-600" />
              </div>
            </div>
            <p className="text-sm font-medium text-slate-500">Active Clinicians Online</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">38</h3>
          </Card>

          <Card className="p-5 shadow-sm border-slate-200 bg-white">
            <div className="flex justify-between items-start mb-3">
              <div className="bg-rose-50 p-2.5 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
              </div>
            </div>
            <p className="text-sm font-medium text-slate-500">AI Flags Triggered</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">12</h3>
          </Card>

          <Card className="p-5 shadow-sm border-slate-200 bg-teal-50/50">
            <div className="flex justify-between items-start mb-3">
              <div className="bg-teal-100 p-2.5 rounded-lg">
                <ShieldCheck className="w-5 h-5 text-teal-800" />
              </div>
            </div>
            <p className="text-sm font-medium text-teal-900">HIPAA Compliance Status</p>
            <h3 className="text-xl font-bold text-teal-950 mt-1">100% Secure</h3>
          </Card>
        </div>

        {/* Filter and Search Bar */}
        <Card className="p-4 mb-6 shadow-sm border-slate-200 bg-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Search audit logs by user, action, or log ID..." 
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

        {/* Activity Table */}
        <Card className="shadow-sm border-slate-200 bg-white overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 hover:bg-slate-50">
                <TableHead className="font-semibold text-slate-600 py-4 pl-6">User / Actor</TableHead>
                <TableHead className="font-semibold text-slate-600">Action Performed</TableHead>
                <TableHead className="font-semibold text-slate-600">Target / Reference</TableHead>
                <TableHead className="font-semibold text-slate-600">Event Type</TableHead>
                <TableHead className="font-semibold text-slate-600 text-right pr-6">Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activityData.map((log, index) => (
                <TableRow key={index} className="hover:bg-slate-50/80 cursor-pointer transition-colors">
                  
                  <TableCell className="py-4 pl-6">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-9 h-9 border border-slate-200">
                        <AvatarFallback className="bg-teal-100 text-teal-800 font-bold text-xs">
                          {log.init}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{log.user}</div>
                        <div className="text-xs text-slate-400">{log.role}</div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="text-slate-800 font-medium text-sm">
                    {log.action}
                  </TableCell>

                  <TableCell className="text-slate-600 text-sm font-mono">
                    {log.target}
                  </TableCell>

                  <TableCell>
                    <Badge variant="outline" className={
                      log.badgeVariant === "default" ? "bg-teal-50 text-teal-700 border-teal-200" :
                      log.badgeVariant === "destructive" ? "bg-rose-50 text-rose-700 border-rose-200" :
                      log.badgeVariant === "secondary" ? "bg-slate-100 text-slate-600 border-slate-200" :
                      "bg-blue-50 text-blue-700 border-blue-200"
                    }>
                      {log.type}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right pr-6 text-slate-500 text-sm font-medium">
                    {log.timestamp}
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