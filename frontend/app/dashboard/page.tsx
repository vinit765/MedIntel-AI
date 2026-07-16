import { Activity, FileText, ShieldAlert, Upload } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { MetricCard } from "@/components/metric-card";
import { PageHeader } from "@/components/page-header";
import { StatusPanel } from "@/components/status-panel";

const metrics = [
  { label: "Uploaded Reports", value: "0", icon: FileText, helper: "Documents available for analysis" },
  { label: "Recent Analysis", value: "0", icon: Activity, helper: "Completed intelligence runs" },
  { label: "Clinical Flags", value: "0", icon: ShieldAlert, helper: "Risks requiring review" },
  { label: "Pending Uploads", value: "0", icon: Upload, helper: "Files waiting for processing" }
];

export default function DashboardPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Dashboard"
        title="Clinical workspace"
        description="Track uploaded reports, recent AI analysis, clinical flags, and report generation activity from one workspace."
      />
      <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </section>
      <section className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <StatusPanel
          title="Recent analysis"
          description="Analysis history will populate here after document upload and intelligence extraction are implemented."
          icon={Activity}
          items={["No reports analyzed", "No evidence retrieval runs", "No recommendations generated", "No PDF exports"]}
        />
        <StatusPanel
          title="Risk summary"
          description="Clinical risk intelligence will surface duplicate medications, abnormal values, missing data, and conflict signals."
          icon={ShieldAlert}
          items={["Risk score unavailable", "No active flags", "No high-risk keywords", "No medication conflicts"]}
        />
      </section>
    </AppShell>
  );
}
