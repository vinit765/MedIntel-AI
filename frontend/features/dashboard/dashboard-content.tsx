"use client";

import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  UploadCloud, UserPlus, BookOpen, Eye, ArrowRight, X,
  Search, Filter, MoreVertical, FileText, Loader2, AlertCircle
} from "lucide-react";

function calculateAge(dobString: string) {
  if (!dobString) return "--";
  const today = new Date();
  const birthDate = new Date(dobString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
  return age;
}

interface Patient {
  id: number;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  blood_type: string | null;
  contact_number: string | null;
  created_at: string;
}

interface Report {
  id: number;
  is_flagged: boolean;
}

export function DashboardContent() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal States
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  
  // Form States
  const [patientFormData, setPatientFormData] = useState({
    first_name: "", last_name: "", date_of_birth: "", gender: "Male", blood_type: "", contact_number: ""
  });
  const [reportFormData, setReportFormData] = useState({
    patient_id: "", record_type: "Discharge Summary", content: ""
  });

  // Fetch both Patients and Reports for live metrics
  const loadData = useCallback(async () => {
    const token = localStorage.getItem("medintel_token");
    if (!token) return;

    try {
      const [patientsRes, reportsRes] = await Promise.all([
        fetch("http://localhost:8000/api/v1/patients/", { headers: { "Authorization": `Bearer ${token}` } }),
        fetch("http://localhost:8000/api/v1/reports/", { headers: { "Authorization": `Bearer ${token}` } })
      ]);

      if (patientsRes.ok) setPatients(await patientsRes.json());
      if (reportsRes.ok) setReports(await reportsRes.json());
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // --- SUBMIT NEW PATIENT ---
  const handleAddPatient = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("medintel_token");
    try {
      const response = await fetch("http://localhost:8000/api/v1/patients/", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(patientFormData)
      });
      if (response.ok) {
        setIsPatientModalOpen(false);
        setPatientFormData({ first_name: "", last_name: "", date_of_birth: "", gender: "Male", blood_type: "", contact_number: "" });
        loadData();
      }
    } catch (error) { console.error("Error submitting patient:", error); }
  };

  // --- SUBMIT NEW REPORT ---
  const handleUploadReport = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("medintel_token");
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
        loadData();
      }
    } catch (error) { console.error("Error uploading report:", error); }
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
        alert("OCR Extraction failed. Make sure the file is a PDF.");
      }
    } catch (error) { console.error("Error during OCR:", error); } 
    finally {
      setIsExtracting(false);
      e.target.value = ''; 
    }
  };

  const filteredPatients = patients.filter(p => 
    `${p.first_name} ${p.last_name}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate dynamic metrics
  const criticalFlagsCount = reports.filter(r => r.is_flagged).length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
      
      <div className="lg:col-span-12">
        {/* LIVE METRIC CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-5 shadow-sm border-slate-200 bg-white">
            <p className="text-sm font-medium text-slate-500 mb-1">Total Patients</p>
            <h3 className="text-3xl font-bold text-slate-900">{patients.length}</h3>
          </Card>

          <Card className="p-5 shadow-sm border-slate-200 bg-white">
            <p className="text-sm font-medium text-slate-500 mb-1">Reports Analyzed</p>
            <h3 className="text-3xl font-bold text-slate-900">{reports.length}</h3>
          </Card>

          <Card className="p-5 shadow-sm border-l-4 border-l-rose-500 border-t-slate-200 border-b-slate-200 border-r-slate-200 bg-rose-50/20">
            <div className="flex justify-between items-start mb-1">
              <p className="text-sm font-medium text-slate-600">Critical Flags</p>
              <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded uppercase tracking-wider">Action Needed</span>
            </div>
            <h3 className="text-3xl font-bold text-rose-700">{criticalFlagsCount}</h3>
          </Card>

          <Card className="p-5 shadow-sm border-slate-200 bg-white">
            <p className="text-sm font-medium text-slate-500 mb-1">Pending Reviews</p>
            <h3 className="text-3xl font-bold text-slate-900">0</h3>
          </Card>
        </div>
      </div>

      {/* LEFT COLUMN: Main Workspace */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        <Card className="p-4 shadow-sm border-slate-200 bg-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Search registered patients..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-50 border-slate-200 rounded-lg focus-visible:ring-teal-600"
              />
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600">
                <button className="bg-white text-teal-800 px-3 py-1.5 rounded-md shadow-sm">All</button>
                <button className="px-3 py-1.5 hover:text-slate-900">Critical</button>
              </div>
            </div>
          </div>
        </Card>

        <Card className="shadow-sm border-slate-200 bg-white overflow-hidden min-h-[400px]">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h2 className="text-sm font-bold text-teal-900 uppercase tracking-wider">Patient Registry</h2>
            <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-200 shadow-none">
              {filteredPatients.length} Total
            </Badge>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-48 text-slate-400">Loading registry...</div>
          ) : filteredPatients.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-48 text-slate-500">
              <p>No patients found.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 hover:bg-slate-50">
                  <TableHead className="font-semibold text-slate-600 py-4 pl-6">Patient Name & MRN</TableHead>
                  <TableHead className="font-semibold text-slate-600">Age / Sex</TableHead>
                  <TableHead className="font-semibold text-slate-600">Blood Type</TableHead>
                  <TableHead className="font-semibold text-slate-600">Status</TableHead>
                  <TableHead className="font-semibold text-slate-600 text-right pr-6">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.map((patient) => (
                  <TableRow key={patient.id} className="hover:bg-slate-50/80 cursor-pointer transition-colors">
                    <TableCell className="py-4 pl-6">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-9 h-9 border border-slate-200">
                          <AvatarFallback className="bg-teal-100 text-teal-800 font-bold text-xs uppercase">
                            {patient.first_name[0]}{patient.last_name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-bold text-slate-900">{patient.first_name} {patient.last_name}</div>
                          <div className="text-xs text-slate-400 font-mono">MRN-{10000 + patient.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell className="text-slate-600 font-medium text-sm">
                      {calculateAge(patient.date_of_birth)} / {patient.gender.charAt(0)}
                    </TableCell>

                    <TableCell>
                      <Badge variant="outline" className="bg-slate-100 text-slate-600 border-slate-200 font-bold">
                        {patient.blood_type || "N/A"}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
                        Stable
                      </Badge>
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
          )}
        </Card>
      </div>

      {/* RIGHT COLUMN: Quick Actions */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        <Card className="shadow-sm border-slate-200 bg-slate-50/50 p-6">
          <h3 className="text-xs font-bold text-teal-800 uppercase tracking-wider mb-4">Quick Actions</h3>
          <div className="flex flex-col gap-3">
            
            <div 
              onClick={() => setIsReportModalOpen(true)}
              className="flex items-center gap-4 bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:border-teal-400 cursor-pointer transition-all group"
            >
              <div className="bg-teal-700 p-2.5 rounded-md text-white group-hover:bg-teal-600 transition-colors">
                <UploadCloud className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 text-sm">Upload New Report</h4>
                <p className="text-xs text-slate-500">Paste or scan clinical text</p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-teal-600" />
            </div>

            <div 
              onClick={() => setIsPatientModalOpen(true)}
              className="flex items-center gap-4 bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:border-teal-400 cursor-pointer transition-all group"
            >
              <div className="bg-teal-700 p-2.5 rounded-md text-white group-hover:bg-teal-600 transition-colors">
                <UserPlus className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 text-sm">Add Patient</h4>
                <p className="text-xs text-slate-500">Register new profile</p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-teal-600" />
            </div>

            <div className="flex items-center gap-4 bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:border-teal-400 cursor-pointer transition-all group">
              <div className="bg-teal-700 p-2.5 rounded-md text-white group-hover:bg-teal-600 transition-colors">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 text-sm">Search Evidence</h4>
                <p className="text-xs text-slate-500">Query MedIntel Library</p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-teal-600" />
            </div>

          </div>
        </Card>
      </div>

      {/* 1. ADD PATIENT MODAL */}
      {isPatientModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
          <Card className="w-full max-w-md p-6 bg-white shadow-xl relative">
            <button onClick={() => setIsPatientModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-teal-900 mb-4">Register New Patient</h2>
            
            <form onSubmit={handleAddPatient} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase">First Name</label>
                  <input required type="text" className="w-full p-2 border border-slate-200 rounded-lg mt-1 outline-none focus:border-teal-500"
                    value={patientFormData.first_name} onChange={(e) => setPatientFormData({...patientFormData, first_name: e.target.value})} />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase">Last Name</label>
                  <input required type="text" className="w-full p-2 border border-slate-200 rounded-lg mt-1 outline-none focus:border-teal-500"
                    value={patientFormData.last_name} onChange={(e) => setPatientFormData({...patientFormData, last_name: e.target.value})} />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 uppercase">Date of Birth</label>
                <input required type="date" className="w-full p-2 border border-slate-200 rounded-lg mt-1 outline-none focus:border-teal-500 text-slate-700"
                  value={patientFormData.date_of_birth} onChange={(e) => setPatientFormData({...patientFormData, date_of_birth: e.target.value})} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase">Gender</label>
                  <select className="w-full p-2 border border-slate-200 rounded-lg mt-1 outline-none focus:border-teal-500 bg-white"
                    value={patientFormData.gender} onChange={(e) => setPatientFormData({...patientFormData, gender: e.target.value})}>
                    <option>Male</option><option>Female</option><option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase">Blood Type</label>
                  <select className="w-full p-2 border border-slate-200 rounded-lg mt-1 outline-none focus:border-teal-500 bg-white"
                    value={patientFormData.blood_type} onChange={(e) => setPatientFormData({...patientFormData, blood_type: e.target.value})}>
                    <option value="">Select...</option>
                    <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
                    <option>AB+</option><option>AB-</option><option>O+</option><option>O-</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="mt-2 w-full bg-teal-800 hover:bg-teal-900 text-white font-bold py-3 rounded-lg shadow-md transition-colors">
                Save Patient
              </button>
            </form>
          </Card>
        </div>
      )}

      {/* 2. UPLOAD REPORT MODAL */}
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
                      id="ocr-file-upload"
                      className="hidden"
                      accept=".pdf"
                      onChange={handleFileUpload}
                      disabled={isExtracting}
                    />
                    <label
                      htmlFor="ocr-file-upload"
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
                  placeholder="Paste unstructured clinical notes, or upload a file above to extract text..."
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

    </div>
  );
}