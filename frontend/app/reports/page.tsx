import Link from "next/link";
import { Download, FileText } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { StatusPanel } from "@/components/status-panel";

export default function ReportsPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Reports"
        title="Clinical report viewer"
        description="Generated reports will combine extracted medical data, risks, cited evidence, recommendations, and checklists."
      />
      <section className="mt-8 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <StatusPanel
          title="Report sections"
          description="The report generator will populate each section from validated analysis outputs and evidence retrieval."
          icon={FileText}
          items={["Executive summary", "Patient information", "Risk analysis", "Evidence references"]}
        />
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-950">Sample report shell</h2>
              <p className="mt-1 text-sm text-slate-600">Preview the report layout surface before Phase 9 generation.</p>
            </div>
            <Download className="h-5 w-5 text-primary" aria-hidden="true" />
          </div>
          <Link
            className="mt-5 inline-flex rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
            href="/reports/sample"
          >
            Open viewer
          </Link>
        </div>
      </section>
    </AppShell>
  );
}
