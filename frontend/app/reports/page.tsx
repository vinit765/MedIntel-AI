"use client";

import { useState, useEffect, useCallback } from "react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Search, Filter, UploadCloud, FileText, CheckCircle, 
  AlertCircle, Clock, Eye, Download, FileArchive, X, Loader2
} from "lucide-react";

// Interfaces for our database models
interface Patient {
  id: number;
  first_name: string;
  last_name: string;
}

interface Report {
  id: number;
  patient_id: number;
  author_id: number;
  record_type: string;
  content: string;
  is_flagged: boolean;
  created_at: string;
}

export default function ReportsPage() {
  // Data States
  const [reports, setReports] = useState<Report[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]); // Needed for the modal dropdown
  const [patientsMap, setPatientsMap] = useState<Record<number, Patient>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal & Form States
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [reportFormData, setReportFormData] = useState({
    patient_id: "", record_type: "Discharge Summary", content: ""
  });

  // Data Fetching Function (Wrapped in useCallback so we can trigger it after an upload)
  const loadData = useCallback(async () => {
    const token = localStorage.getItem("medintel_token");
    if (!token) return;

    try {
      const [reportsRes, patientsRes] = await Promise.all([
        fetch("http://localhost:8000/api/v1/reports/", { headers: { "Authorization": `Bearer ${token}` } }),
        fetch("http://localhost:8000/api/v1/patients/", { headers: { "Authorization": `Bearer ${token}` } })
      ]);

      if (reportsRes.ok && patientsRes.ok) {
        const reportsData: Report[] = await reportsRes.json();
        const patientsData: Patient[] = await patientsRes.json();

        const pMap: Record<number, Patient> = {};
        patientsData.forEach(p => { pMap[p.id] = p; });

        setPatients(patientsData);
        setPatientsMap(pMap);
        setReports(reportsData);
      } else {
        console.error("Failed to fetch data. Check if backend is running and GET route is defined.");
      }
    } catch (error) {
      console.error("Error fetching library data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch data on initial load
  useEffect(() => {
    loadData();
  }, [loadData]);

  // --- SUBMIT NEW REPORT ---
  const handleUploadReport = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("medintel_token");
    if (!token) return;
    try {
      const response = await fetch("http://localhost:8000/api/v1/reports/", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({
          patient_id: parseInt(reportFormData.patient_id),
          record_type: reportFormData.record_type,
          content: reportFormData.content
        })
      });
      if (response.ok) {
        setIsReportModalOpen(false);
        setReportFormData({ patient_id: "", record_type: "Discharge Summary", content: "" });
        loadData(); // Instantly refresh the table!
      }
    } catch (error) {
      console.error("Error uploading report:", error);
    }
  };

  // --- HANDLE OCR FILE UPLOAD ---
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsExtracting(true);
    const token = localStorage.getItem("medintel_token");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/api/v1/reports/extract-text", {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        setReportFormData(prev => ({
          ...prev,
          content: prev.content ? `${prev.content}\n\n${data.extracted_text}` : data.extracted_text
        }));
      } else {
        alert("OCR Extraction failed. Make sure it's a PDF!");
      }
    } catch (error) {
      console.error("Error during OCR:", error);
    } finally {
      setIsExtracting(false);
      e.target.value = '';
    }
  };

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const filteredReports = reports.filter(r => 
    r.record_type.toLowerCase().includes(searchQuery.toLowerCase()) || 
    r.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppShell>
      <div className="max-w-[1600px] mx-auto w-full pb-20 relative">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-teal-950 mb-1">Medical Reports Library</h1>
            <p className="text-slate-500">
              Centralized repository for lab results, imaging, and clinical documents integrated with AI analysis.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              onClick={() => setIsReportModalOpen(true)} 
              className="bg-teal-800 hover:bg-teal-900 text-white gap-2 shadow-md"
            >
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
            </div>
            <p className="text-sm font-medium text-slate-500">Total Reports</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{reports.length}</h3>
          </Card>

          <Card className="p-5 shadow-sm border-slate-200 bg-white">
            <div className="flex justify-between items-start mb-3">
              <div className="bg-slate-100 p-2.5 rounded-lg">
                <CheckCircle className="w-5 h-5 text-slate-600" />
              </div>
            </div>
            <p className="text-sm font-medium text-slate-500">AI Analyzed</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{reports.length}</h3>
          </Card>

          <Card className="p-5 shadow-sm border-l-4 border-l-rose-500 border-t-slate-200 border-b-slate-200 border-r-slate-200 bg-rose-50/20">
            <div className="flex justify-between items-start mb-3">
              <div className="bg-rose-100 p-2.5 rounded-lg">
                <AlertCircle className="w-5 h-5 text-rose-600" />
              </div>
              <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-1 rounded uppercase tracking-wider">Unreviewed</span>
            </div>
            <p className="text-sm font-medium text-slate-600">Anomalies Detected</p>
            <h3 className="text-2xl font-bold text-rose-700 mt-1">
              {reports.filter(r => r.is_flagged).length}
            </h3>
          </Card>

          <Card className="p-5 shadow-sm border-slate-200 bg-white">
            <div className="flex justify-between items-start mb-3">
              <div className="bg-slate-100 p-2.5 rounded-lg">
                <Clock className="w-5 h-5 text-slate-600" />
              </div>
            </div>
            <p className="text-sm font-medium text-slate-500">Pending Processing</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">0</h3>
          </Card>
        </div>

        {/* Filter and Search Bar */}
        <Card className="p-4 mb-6 shadow-sm border-slate-200 bg-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Search by Modality or Text..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-50 border-slate-200 rounded-lg focus-visible:ring-teal-600"
              />
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <Button variant="outline" className="border-slate-200 text-slate-700 gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </Button>
            </div>
          </div>
        </Card>

        {/* Reports Table */}
        <Card className="shadow-sm border-slate-200 bg-white overflow-hidden min-h-[400px]">
          {isLoading ? (
            <div className="flex justify-center items-center h-64 text-slate-500">
              Loading repository...
            </div>
          ) : filteredReports.length === 0 ? (
            <div className="flex justify-center items-center h-64 text-slate-500">
              No reports found. Upload a report using the button above.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 hover:bg-slate-50">
                  <TableHead className="font-semibold text-slate-600 py-4 pl-6">Report ID & Date</TableHead>
                  <TableHead className="font-semibold text-slate-600">Patient</TableHead>
                  <TableHead className="font-semibold text-slate-600">Modality / Type</TableHead>
                  <TableHead className="font-semibold text-slate-600">AI Analysis Status</TableHead>
                  <TableHead className="font-semibold text-slate-600 text-right pr-6">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => {
                  const patient = patientsMap[report.patient_id];
                  const initials = patient ? `${patient.first_name[0]}${patient.last_name[0]}`.toUpperCase() : "??";
                  const fullName = patient ? `${patient.first_name} ${patient.last_name}` : "Unknown Patient";

                  return (
                    <TableRow key={report.id} className="hover:bg-slate-50/80 cursor-pointer transition-colors">
                      
                      <TableCell className="py-4 pl-6">
                        <div className="flex items-center gap-3">
                          <div className="bg-slate-100 p-2 rounded-md">
                            <FileText className="w-4 h-4 text-slate-500" />
                          </div>
                          <div>
                            <div className="font-bold text-slate-900">REP-2026-{1000 + report.id}</div>
                            <div className="text-xs text-slate-500">{formatDate(report.created_at)}</div>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="w-6 h-6 border border-slate-200">
                            <AvatarFallback className="bg-teal-100 text-teal-800 font-bold text-[10px]">
                              {initials}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-slate-700 text-sm">{fullName}</span>
                        </div>
                      </TableCell>

                      <TableCell className="text-slate-800 font-medium text-sm">
                        {report.record_type}
                      </TableCell>

                      <TableCell>
                        <Badge variant="outline" className={
                          report.is_flagged 
                            ? "bg-rose-50 text-rose-700 border-rose-200 font-bold"
                            : "bg-teal-50 text-teal-700 border-teal-200"
                        }>
                          {report.is_flagged && <AlertCircle className="w-3 h-3 mr-1" />}
                          {report.is_flagged ? "Anomaly Detected" : "Insights Generated"}
                        </Badge>
                      </TableCell>

                      <TableCell className="text-right pr-6">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => window.location.href = `/reports/${report.id}`}
                            className="text-slate-400 hover:text-teal-700 p-1.5 rounded-md hover:bg-slate-100 transition-colors" 
                            title="View Report"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-slate-400 hover:text-slate-700 p-1.5 rounded-md hover:bg-slate-100 transition-colors" title="Download">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </Card>
      </div>

      {/* UPLOAD REPORT MODAL */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
          <Card className="w-full max-w-lg p-6 bg-white shadow-xl relative">
            <button onClick={() => setIsReportModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-teal-100 p-2 rounded-lg text-teal-700">
                <FileText className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-teal-900">Upload Clinical Document</h2>
            </div>
            
            <form onSubmit={handleUploadReport} className="flex flex-col gap-4">
              
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase">Select Patient</label>
                <select 
                  required
                  className="w-full p-2 border border-slate-200 rounded-lg mt-1 outline-none focus:border-teal-500 bg-white text-slate-700"
                  value={reportFormData.patient_id} 
                  onChange={(e) => setReportFormData({...reportFormData, patient_id: e.target.value})}
                >
                  <option value="" disabled>Choose a registered patient...</option>
                  {patients.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.first_name} {p.last_name} (MRN-{10000 + p.id})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 uppercase">Document Type</label>
                <select 
                  required
                  className="w-full p-2 border border-slate-200 rounded-lg mt-1 outline-none focus:border-teal-500 bg-white text-slate-700"
                  value={reportFormData.record_type} 
                  onChange={(e) => setReportFormData({...reportFormData, record_type: e.target.value})}
                >
                  <option>Discharge Summary</option>
                  <option>Clinical Note</option>
                  <option>Lab Result</option>
                  <option>Imaging Report</option>
                  <option>Surgical Note</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-end">
                  <label className="text-xs font-bold text-slate-600 uppercase">Clinical Text</label>
                  <div>
                    <input
                      type="file"
                      id="ocr-file-upload-reports"
                      className="hidden"
                      accept=".pdf"
                      onChange={handleFileUpload}
                      disabled={isExtracting}
                    />
                    <label
                      htmlFor="ocr-file-upload-reports"
                      className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-md cursor-pointer transition-colors ${
                        isExtracting 
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                          : 'bg-teal-50 text-teal-700 hover:bg-teal-100'
                      }`}
                    >
                      {isExtracting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <UploadCloud className="w-3.5 h-3.5" />}
                      {isExtracting ? "Extracting..." : "Scan File (OCR)"}
                    </label>
                  </div>
                </div>
                <textarea 
                  required
                  placeholder="Paste unstructured clinical notes, or upload a PDF above to extract text..."
                  className="w-full p-3 border border-slate-200 rounded-lg outline-none focus:border-teal-500 text-slate-700 min-h-[150px] resize-y"
                  value={reportFormData.content} 
                  onChange={(e) => setReportFormData({...reportFormData, content: e.target.value})}
                />
              </div>

              <button type="submit" className="mt-2 w-full bg-teal-800 hover:bg-teal-900 text-white font-bold py-3 rounded-lg shadow-md transition-colors flex justify-center items-center gap-2">
                <UploadCloud className="w-5 h-5" /> Save to Record
              </button>
            </form>
          </Card>
        </div>
      )}

    </AppShell>
  );
}