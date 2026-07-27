import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  BrainCircuit, Sparkles, Activity, AlertTriangle, 
  CheckCircle, Zap, Server, BarChart, ArrowRight
} from "lucide-react";

const aiInsightsData = [
  {
    id: "INS-092",
    patient: "Maria Lopez",
    init: "ML",
    modality: "ECG 12-Lead",
    finding: "ST-Elevation suggestive of Anterior STEMI",
    model: "CardioVision v2.4",
    confidence: 98,
    severity: "Critical",
    date: "10 mins ago"
  },
  {
    id: "INS-091",
    patient: "Helena Smith",
    init: "HS",
    modality: "MRI Lumbar",
    finding: "L4-L5 Disc Herniation with nerve root compression",
    model: "NeuroRad Vision",
    confidence: 94,
    severity: "High",
    date: "1 hour ago"
  },
  {
    id: "INS-090",
    patient: "David Byrne",
    init: "DB",
    modality: "Genomic Profile",
    finding: "BRCA1 Pathogenic Variant Detected",
    model: "GenoPattern AI",
    confidence: 99,
    severity: "High",
    date: "2 hours ago"
  },
  {
    id: "INS-089",
    patient: "Robert Jenkins",
    init: "RJ",
    modality: "Clinical Notes (NLP)",
    finding: "Non-compliance with hypertension medication",
    model: "MedNLP Engine",
    confidence: 87,
    severity: "Medium",
    date: "3 hours ago"
  },
  {
    id: "INS-088",
    patient: "Marcus Chen",
    init: "MC",
    modality: "CT Thorax",
    finding: "No acute cardiopulmonary process. Small benign nodule.",
    model: "ThoraxScan AI",
    confidence: 96,
    severity: "Low",
    date: "5 hours ago"
  }
];

export default function AnalysisPage() {
  return (
    <AppShell>
      <div className="max-w-[1600px] mx-auto w-full pb-20">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-teal-950 mb-1 flex items-center gap-3">
              <BrainCircuit className="w-8 h-8 text-teal-700" />
              AI Analysis Engine
            </h1>
            <p className="text-slate-500">
              Real-time diagnostic insights, confidence scoring, and active machine learning pipelines.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="bg-white border-slate-200 text-slate-700 gap-2 hover:bg-slate-50">
              <Server className="w-4 h-4" />
              Model Settings
            </Button>
            <Button className="bg-teal-800 hover:bg-teal-900 text-white gap-2 shadow-md">
              <Zap className="w-4 h-4" />
              Run Batch Analysis
            </Button>
          </div>
        </div>

        {/* AI System Health & Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-5 shadow-sm border-slate-200 bg-white">
            <div className="flex justify-between items-start mb-3">
              <div className="bg-teal-50 p-2.5 rounded-lg">
                <Sparkles className="w-5 h-5 text-teal-700" />
              </div>
              <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-1 rounded">Live</span>
            </div>
            <p className="text-sm font-medium text-slate-500">Active AI Pipelines</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">4 Systems</h3>
          </Card>

          <Card className="p-5 shadow-sm border-slate-200 bg-white">
            <div className="flex justify-between items-start mb-3">
              <div className="bg-slate-100 p-2.5 rounded-lg">
                <Activity className="w-5 h-5 text-slate-600" />
              </div>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">99.8% Uptime</span>
            </div>
            <p className="text-sm font-medium text-slate-500">Total Insights Generated</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">1.2M</h3>
          </Card>

          <Card className="p-5 shadow-sm border-slate-200 bg-white">
            <div className="flex justify-between items-start mb-3">
              <div className="bg-slate-100 p-2.5 rounded-lg">
                <BarChart className="w-5 h-5 text-slate-600" />
              </div>
            </div>
            <p className="text-sm font-medium text-slate-500">Avg. Confidence Score</p>
            <div className="flex items-baseline gap-2 mt-1">
              <h3 className="text-2xl font-bold text-slate-900">94.2%</h3>
              <span className="text-xs text-emerald-600 font-medium">↑ 1.2%</span>
            </div>
          </Card>

          <Card className="p-5 shadow-sm border-slate-200 bg-slate-900 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <BrainCircuit className="w-24 h-24" />
            </div>
            <div className="flex justify-between items-start mb-3 relative z-10">
              <div className="bg-slate-800 p-2.5 rounded-lg">
                <Zap className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <p className="text-sm font-medium text-slate-400 relative z-10">Processing Queue</p>
            <h3 className="text-2xl font-bold text-white mt-1 relative z-10">14 Reports</h3>
            <p className="text-xs text-slate-400 mt-2 relative z-10">Est. completion: 42 seconds</p>
          </Card>
        </div>

        {/* Main Grid: Insights Table & Active Models */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Recent Insights (Takes up 2/3 of space) */}
          <Card className="lg:col-span-2 shadow-sm border-slate-200 bg-white overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <h2 className="text-lg font-bold text-teal-900">Recent Diagnostic Findings</h2>
                <p className="text-xs text-slate-500 mt-1">Flagged anomalies ordered by severity and confidence.</p>
              </div>
              <button className="text-sm font-semibold text-teal-700 hover:text-teal-800">Filter Insights</button>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="bg-white hover:bg-white">
                  <TableHead className="font-semibold text-slate-600 py-4 pl-6">Patient & Modality</TableHead>
                  <TableHead className="font-semibold text-slate-600 w-1/3">AI Finding</TableHead>
                  <TableHead className="font-semibold text-slate-600">Confidence</TableHead>
                  <TableHead className="font-semibold text-slate-600 text-right pr-6">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {aiInsightsData.map((insight, index) => (
                  <TableRow key={index} className="hover:bg-slate-50/80 cursor-pointer transition-colors">
                    
                    <TableCell className="py-4 pl-6">
                      <div className="flex items-center gap-3 mb-1">
                        <Avatar className="w-6 h-6 border border-slate-200">
                          <AvatarFallback className="bg-teal-100 text-teal-800 font-bold text-[10px]">
                            {insight.init}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-bold text-slate-900 text-sm">{insight.patient}</span>
                      </div>
                      <span className="text-xs text-slate-500 font-medium pl-9">{insight.modality}</span>
                    </TableCell>

                    <TableCell>
                      <div className="font-medium text-slate-800 text-sm mb-1">{insight.finding}</div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={
                          insight.severity === "Critical" ? "bg-rose-50 text-rose-700 border-rose-200 text-[10px]" :
                          insight.severity === "High" ? "bg-amber-50 text-amber-700 border-amber-200 text-[10px]" :
                          insight.severity === "Medium" ? "bg-blue-50 text-blue-700 border-blue-200 text-[10px]" :
                          "bg-slate-100 text-slate-600 border-slate-200 text-[10px]"
                        }>
                          {insight.severity} Priority
                        </Badge>
                        <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                          <BrainCircuit className="w-3 h-3" /> {insight.model}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-slate-700 w-8">{insight.confidence}%</span>
                        <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${insight.confidence >= 95 ? 'bg-emerald-500' : insight.confidence >= 90 ? 'bg-teal-500' : 'bg-amber-500'}`}
                            style={{ width: `${insight.confidence}%` }}
                          ></div>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="text-right pr-6">
                      <Button variant="ghost" className="text-teal-700 hover:text-teal-800 hover:bg-teal-50 gap-1 h-8 px-3 text-xs font-semibold">
                        Review <ArrowRight className="w-3 h-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          {/* Right Column: Active Models */}
          <div className="flex flex-col gap-6">
            <Card className="shadow-sm border-slate-200 bg-white p-6">
              <h3 className="text-sm font-bold text-teal-900 border-b border-slate-100 pb-3 mb-4">Active Neural Networks</h3>
              
              <div className="space-y-5">
                {/* Model 1 */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-bold text-slate-800">CardioVision v2.4</span>
                    <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> Online</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-2">ECG & Echo Image Segmentation</p>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full">
                    <div className="h-full bg-teal-600 rounded-full w-[45%]"></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>CPU Load: 45%</span>
                    <span>32 ms latency</span>
                  </div>
                </div>

                {/* Model 2 */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-bold text-slate-800">MedNLP Engine</span>
                    <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> Online</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-2">Clinical Note Entity Extraction (RAG)</p>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full">
                    <div className="h-full bg-teal-600 rounded-full w-[78%]"></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>GPU Load: 78%</span>
                    <span>112 ms latency</span>
                  </div>
                </div>

                {/* Model 3 */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-bold text-slate-800">NeuroRad Vision</span>
                    <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> Online</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-2">MRI / CT Scan Anomaly Detection</p>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full">
                    <div className="h-full bg-teal-600 rounded-full w-[20%]"></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>GPU Load: 20%</span>
                    <span>85 ms latency</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="shadow-sm border-teal-100 bg-teal-50/50 p-6 border-dashed">
              <div className="flex flex-col items-center justify-center text-center py-4">
                <div className="bg-white p-3 rounded-full shadow-sm mb-3 text-teal-700">
                  <Server className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-teal-900 text-sm mb-1">Train Custom Model</h4>
                <p className="text-xs text-slate-600 mb-4 px-4">Upload proprietary hospital datasets to fine-tune MedIntel models safely.</p>
                <Button className="w-full bg-teal-800 hover:bg-teal-900 text-white text-xs h-9">
                  Initialize Training
                </Button>
              </div>
            </Card>
          </div>

        </div>
      </div>
    </AppShell>
  );
}