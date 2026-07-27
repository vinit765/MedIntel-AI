import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  AlertTriangle, ShieldAlert, TrendingUp, Activity, 
  HeartPulse, FileWarning, ArrowRight, BellRing, Thermometer
} from "lucide-react";

const riskData = [
  {
    mrn: "MRN-87890",
    patient: "Sarah Jameson",
    init: "SJ",
    ward: "ICU - Bed 4",
    prediction: "Sepsis Onset",
    probability: 92,
    timeframe: "< 4 Hours",
    trend: "increasing",
    severity: "Critical"
  },
  {
    mrn: "MRN-87994",
    patient: "Maria Lopez",
    init: "ML",
    ward: "Cardiology - Bed 12",
    prediction: "Myocardial Infarction",
    probability: 88,
    timeframe: "< 12 Hours",
    trend: "increasing",
    severity: "Critical"
  },
  {
    mrn: "MRN-88019",
    patient: "Robert Jenkins",
    init: "RJ",
    ward: "General Med - Bed 22",
    prediction: "30-Day Readmission",
    probability: 74,
    timeframe: "Post-Discharge",
    trend: "stable",
    severity: "High"
  },
  {
    mrn: "MRN-87812",
    patient: "Marcus Chen",
    init: "MC",
    ward: "Endocrinology",
    prediction: "Hypoglycemic Event",
    probability: 65,
    timeframe: "< 24 Hours",
    trend: "decreasing",
    severity: "Medium"
  },
  {
    mrn: "MRN-87950",
    patient: "David Byrne",
    init: "DB",
    ward: "Post-Op Surgery",
    prediction: "Surgical Site Infection",
    probability: 45,
    timeframe: "3-5 Days",
    trend: "stable",
    severity: "Medium"
  }
];

export default function RiskIntelligencePage() {
  return (
    <AppShell>
      <div className="max-w-[1600px] mx-auto w-full pb-20">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-teal-950 mb-1 flex items-center gap-3">
              <ShieldAlert className="w-8 h-8 text-rose-700" />
              Risk Intelligence
            </h1>
            <p className="text-slate-500">
              Predictive clinical analytics, early warning systems, and population health risk stratification.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="bg-white border-slate-200 text-slate-700 gap-2 hover:bg-slate-50">
              <FileWarning className="w-4 h-4" />
              Export Risk Roster
            </Button>
            <Button className="bg-rose-700 hover:bg-rose-800 text-white gap-2 shadow-md">
              <BellRing className="w-4 h-4" />
              Configure Alerts
            </Button>
          </div>
        </div>

        {/* Risk Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-5 shadow-sm border-l-4 border-l-rose-600 border-t-slate-200 border-b-slate-200 border-r-slate-200 bg-rose-50/30">
            <div className="flex justify-between items-start mb-3">
              <div className="bg-rose-100 p-2.5 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-rose-700" />
              </div>
              <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-1 rounded uppercase tracking-wider">Act Now</span>
            </div>
            <p className="text-sm font-medium text-slate-600">Critical Risk Patients</p>
            <h3 className="text-2xl font-bold text-rose-700 mt-1">12</h3>
          </Card>

          <Card className="p-5 shadow-sm border-slate-200 bg-white">
            <div className="flex justify-between items-start mb-3">
              <div className="bg-amber-50 p-2.5 rounded-lg">
                <TrendingUp className="w-5 h-5 text-amber-600" />
              </div>
            </div>
            <p className="text-sm font-medium text-slate-500">High Readmission Risk</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">45</h3>
          </Card>

          <Card className="p-5 shadow-sm border-slate-200 bg-white">
            <div className="flex justify-between items-start mb-3">
              <div className="bg-teal-50 p-2.5 rounded-lg">
                <HeartPulse className="w-5 h-5 text-teal-700" />
              </div>
              <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-1 rounded">+3 Today</span>
            </div>
            <p className="text-sm font-medium text-slate-500">Sepsis Protocol Alerts</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">8</h3>
          </Card>

          <Card className="p-5 shadow-sm border-slate-200 bg-white">
            <div className="flex justify-between items-start mb-3">
              <div className="bg-slate-100 p-2.5 rounded-lg">
                <Activity className="w-5 h-5 text-slate-600" />
              </div>
            </div>
            <p className="text-sm font-medium text-slate-500">Avg Population Risk Score</p>
            <div className="flex items-baseline gap-2 mt-1">
              <h3 className="text-2xl font-bold text-slate-900">2.4</h3>
              <span className="text-xs text-slate-500 font-medium">/ 10</span>
            </div>
          </Card>
        </div>

        {/* Main Grid Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Predictive Risk Roster */}
          <Card className="lg:col-span-2 shadow-sm border-slate-200 bg-white overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Predictive Risk Roster</h2>
                <p className="text-xs text-slate-500 mt-1">AI-generated probability forecasting based on real-time vitals and labs.</p>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="bg-white hover:bg-white">
                  <TableHead className="font-semibold text-slate-600 py-4 pl-6">Patient & Location</TableHead>
                  <TableHead className="font-semibold text-slate-600">Predicted Event</TableHead>
                  <TableHead className="font-semibold text-slate-600">Probability</TableHead>
                  <TableHead className="font-semibold text-slate-600">Timeframe</TableHead>
                  <TableHead className="font-semibold text-slate-600 text-right pr-6">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {riskData.map((row, index) => (
                  <TableRow key={index} className="hover:bg-slate-50/80 cursor-pointer transition-colors">
                    
                    <TableCell className="py-4 pl-6">
                      <div className="flex items-center gap-3 mb-1">
                        <Avatar className="w-6 h-6 border border-slate-200">
                          <AvatarFallback className="bg-teal-100 text-teal-800 font-bold text-[10px]">
                            {row.init}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <span className="font-bold text-slate-900 text-sm block">{row.patient}</span>
                          <span className="text-[10px] text-slate-500 font-mono">{row.ward}</span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="font-bold text-slate-800 text-sm mb-1">{row.prediction}</div>
                      <Badge variant="outline" className={
                        row.severity === "Critical" ? "bg-rose-50 text-rose-700 border-rose-200 text-[10px]" :
                        row.severity === "High" ? "bg-amber-50 text-amber-700 border-amber-200 text-[10px]" :
                        "bg-blue-50 text-blue-700 border-blue-200 text-[10px]"
                      }>
                        {row.severity} Severity
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-3">
                        <span className={`text-sm font-bold w-8 ${row.probability > 85 ? 'text-rose-600' : row.probability > 70 ? 'text-amber-600' : 'text-slate-700'}`}>
                          {row.probability}%
                        </span>
                        <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${row.probability > 85 ? 'bg-rose-500' : row.probability > 70 ? 'bg-amber-500' : 'bg-blue-500'}`}
                            style={{ width: `${row.probability}%` }}
                          ></div>
                        </div>
                        {row.trend === 'increasing' && <TrendingUp className="w-3 h-3 text-rose-500" />}
                        {row.trend === 'decreasing' && <TrendingUp className="w-3 h-3 text-emerald-500 transform rotate-180" />}
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                        <Activity className="w-4 h-4 text-slate-400" />
                        {row.timeframe}
                      </div>
                    </TableCell>

                    <TableCell className="text-right pr-6">
                      <Button variant="ghost" className="text-teal-700 hover:text-teal-800 hover:bg-teal-50 gap-1 h-8 px-3 text-xs font-semibold">
                        Intervene <ArrowRight className="w-3 h-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          {/* Right Column: Emerging Risk Factors & Protocols */}
          <div className="flex flex-col gap-6">
            <Card className="shadow-sm border-slate-200 bg-white p-6">
              <h3 className="text-sm font-bold text-teal-900 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
                <Thermometer className="w-4 h-4" />
                Active Clinical Protocols
              </h3>
              
              <div className="space-y-4">
                <div className="bg-rose-50 border border-rose-100 rounded-lg p-3">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-sm font-bold text-rose-900">Sepsis Bundle Initiation</span>
                    <Badge className="bg-rose-600 hover:bg-rose-700 text-[10px]">3 Patients</Badge>
                  </div>
                  <p className="text-xs text-rose-700/80 mb-2">Automated alerts triggered based on SIRS criteria + lactate levels.</p>
                  <button className="text-xs font-bold text-rose-700 hover:text-rose-800 flex items-center gap-1">
                    Review Triggered Labs <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="bg-amber-50 border border-amber-100 rounded-lg p-3">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-sm font-bold text-amber-900">Readmission Prevention</span>
                    <Badge className="bg-amber-600 hover:bg-amber-700 text-[10px]">12 Patients</Badge>
                  </div>
                  <p className="text-xs text-amber-700/80 mb-2">LACE index scores, Social work consult recommended.</p>
                  <button className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1">
                    View Discharge Plan <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </Card>

            <Card className="shadow-sm border-slate-200 bg-white p-6">
              <h3 className="text-sm font-bold text-slate-800 mb-4">Top Systemic Risk Factors</h3>
              <div className="space-y-3">
                {[
                  { factor: "Abnormal Vital Signs", percentage: 45 },
                  { factor: "Critical Lab Values", percentage: 32 },
                  { factor: "Medication Non-adherence", percentage: 15 },
                  { factor: "Demographic Baselines", percentage: 8 }
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs font-medium text-slate-600 mb-1">
                      <span>{item.factor}</span>
                      <span>{item.percentage}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full">
                      <div className="h-full bg-slate-400 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

        </div>
      </div>
    </AppShell>
  );
}