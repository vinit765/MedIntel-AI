import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, Plus, Filter, Users, Activity, AlertTriangle, 
  UserCheck, Eye, MoreVertical, Download 
} from "lucide-react";

const patientData = [
  {
    mrn: "MRN-88021",
    init: "HS",
    name: "Helena Smith",
    ageSex: "34 / F",
    condition: "Lumbar Radiculopathy",
    physician: "Dr. Aris Thorne",
    status: "Stable",
    statusVariant: "default",
    lastVisit: "Oct 24, 2023",
  },
  {
    mrn: "MRN-88019",
    init: "RJ",
    name: "Robert Jenkins",
    ageSex: "58 / M",
    condition: "Severe Hypertension",
    physician: "Dr. Elena Vance",
    status: "In Progress",
    statusVariant: "secondary",
    lastVisit: "Oct 24, 2023",
  },
  {
    mrn: "MRN-87994",
    init: "ML",
    name: "Maria Lopez",
    ageSex: "42 / F",
    condition: "Acute Coronary Syndrome",
    physician: "Dr. Aris Thorne",
    status: "Critical Risk",
    statusVariant: "destructive",
    lastVisit: "Oct 23, 2023",
  },
  {
    mrn: "MRN-87950",
    init: "DB",
    name: "David Byrne",
    ageSex: "29 / M",
    condition: "Post-Op Monitoring",
    physician: "Dr. Rajesh Patel",
    status: "Stable",
    statusVariant: "default",
    lastVisit: "Oct 23, 2023",
  },
  {
    mrn: "MRN-87890",
    init: "SJ",
    name: "Sarah Jameson",
    ageSex: "61 / F",
    condition: "Cardiac Arrhythmia",
    physician: "Dr. Aris Thorne",
    status: "Critical Risk",
    statusVariant: "destructive",
    lastVisit: "Oct 22, 2023",
  },
  {
    mrn: "MRN-87812",
    init: "MC",
    name: "Marcus Chen",
    ageSex: "47 / M",
    condition: "Type 2 Diabetes / HbA1c",
    physician: "Dr. Elena Vance",
    status: "Stable",
    statusVariant: "default",
    lastVisit: "Oct 21, 2023",
  },
];

export default function PatientsPage() {
  return (
    <AppShell>
      <div className="max-w-[1600px] mx-auto w-full pb-20">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-teal-950 mb-1">Patient Registry</h1>
            <p className="text-slate-500">
              Manage patient records, clinical history, and AI diagnostic summaries across <span className="font-semibold text-slate-800">St. Jude's Medical Center.</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="bg-white border-slate-200 text-slate-700 gap-2 hover:bg-slate-50">
              <Download className="w-4 h-4" />
              Export Directory
            </Button>
            <Button className="bg-teal-800 hover:bg-teal-900 text-white gap-2 shadow-md">
              <Plus className="w-4 h-4" />
              Add Patient
            </Button>
          </div>
        </div>

        {/* Quick Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-5 shadow-sm border-slate-200 bg-white">
            <div className="flex justify-between items-start mb-3">
              <div className="bg-teal-50 p-2.5 rounded-lg">
                <Users className="w-5 h-5 text-teal-700" />
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">+18 this week</span>
            </div>
            <p className="text-sm font-medium text-slate-500">Total Registered</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">1,284</h3>
          </Card>

          <Card className="p-5 shadow-sm border-slate-200 bg-white">
            <div className="flex justify-between items-start mb-3">
              <div className="bg-slate-100 p-2.5 rounded-lg">
                <UserCheck className="w-5 h-5 text-slate-600" />
              </div>
              <span className="text-xs font-semibold text-slate-500">Active Care</span>
            </div>
            <p className="text-sm font-medium text-slate-500">Active Inpatients</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">142</h3>
          </Card>

          <Card className="p-5 shadow-sm border-l-4 border-l-rose-500 border-t-slate-200 border-b-slate-200 border-r-slate-200 bg-rose-50/20">
            <div className="flex justify-between items-start mb-3">
              <div className="bg-rose-100 p-2.5 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
              </div>
              <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-1 rounded uppercase tracking-wider">Action Needed</span>
            </div>
            <p className="text-sm font-medium text-slate-600">Critical Flags</p>
            <h3 className="text-2xl font-bold text-rose-700 mt-1">8</h3>
          </Card>

          <Card className="p-5 shadow-sm border-slate-200 bg-white">
            <div className="flex justify-between items-start mb-3">
              <div className="bg-slate-100 p-2.5 rounded-lg">
                <Activity className="w-5 h-5 text-slate-600" />
              </div>
              <span className="text-xs font-semibold text-slate-500">Today</span>
            </div>
            <p className="text-sm font-medium text-slate-500">Admissions / Visits</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">24</h3>
          </Card>
        </div>

        {/* Filter and Search Bar */}
        <Card className="p-4 mb-6 shadow-sm border-slate-200 bg-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Search by Patient Name, MRN, or Condition..." 
                className="pl-10 bg-slate-50 border-slate-200 rounded-lg focus-visible:ring-teal-600"
              />
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <Button variant="outline" className="border-slate-200 text-slate-700 gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </Button>
              <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600">
                <button className="bg-white text-teal-800 px-3 py-1.5 rounded-md shadow-sm">All Patients</button>
                <button className="px-3 py-1.5 hover:text-slate-900">Inpatient</button>
                <button className="px-3 py-1.5 hover:text-slate-900">Critical</button>
              </div>
            </div>
          </div>
        </Card>

        {/* Patients Table */}
        <Card className="shadow-sm border-slate-200 bg-white overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 hover:bg-slate-50">
                <TableHead className="font-semibold text-slate-600 py-4 pl-6">Patient Name & MRN</TableHead>
                <TableHead className="font-semibold text-slate-600">Age / Sex</TableHead>
                <TableHead className="font-semibold text-slate-600">Primary Condition</TableHead>
                <TableHead className="font-semibold text-slate-600">Attending Physician</TableHead>
                <TableHead className="font-semibold text-slate-600">Clinical Status</TableHead>
                <TableHead className="font-semibold text-slate-600">Last Visit</TableHead>
                <TableHead className="font-semibold text-slate-600 text-right pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patientData.map((patient, index) => (
                <TableRow key={index} className="hover:bg-slate-50/80 cursor-pointer transition-colors">
                  <TableCell className="py-4 pl-6">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-9 h-9 border border-slate-200">
                        <AvatarFallback className="bg-teal-100 text-teal-800 font-bold text-xs">
                          {patient.init}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-bold text-slate-900">{patient.name}</div>
                        <div className="text-xs text-slate-400 font-mono">{patient.mrn}</div>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell className="text-slate-600 font-medium text-sm">
                    {patient.ageSex}
                  </TableCell>

                  <TableCell className="text-slate-800 font-medium text-sm">
                    {patient.condition}
                  </TableCell>

                  <TableCell className="text-slate-600 text-sm">
                    {patient.physician}
                  </TableCell>

                  <TableCell>
                    <Badge variant="outline" className={
                      patient.statusVariant === "default" ? "bg-teal-50 text-teal-700 border-teal-200" :
                      patient.statusVariant === "secondary" ? "bg-slate-100 text-slate-600 border-slate-200" :
                      "bg-rose-50 text-rose-700 border-rose-200"
                    }>
                      {patient.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-slate-500 text-sm">
                    {patient.lastVisit}
                  </TableCell>

                  <TableCell className="text-right pr-6">
                    <div className="flex items-center justify-end gap-2">
                      <button className="text-slate-400 hover:text-teal-700 p-1.5 rounded-md hover:bg-slate-100 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-slate-400 hover:text-slate-700 p-1.5 rounded-md hover:bg-slate-100 transition-colors">
                        <MoreVertical className="w-4 h-4" />
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