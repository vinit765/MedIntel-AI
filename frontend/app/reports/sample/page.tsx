import { AlertTriangle, BookOpen, ClipboardCheck } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { StatusPanel } from "@/components/status-panel";

export default function SampleReportPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Report viewer"
        title="Structured clinical report"
        description="This viewer shell is ready for generated report content, cited evidence, recommendations, and export controls."
      />
      <section className="mt-8 grid gap-6">
        <StatusPanel
          title="Executive summary"
          description="Generated summaries will remain decision-support focused and avoid definitive diagnostic claims."
          icon={ClipboardCheck}
          items={["Patient context pending", "Findings pending", "Recommendations pending", "Checklist pending"]}
        />
        <div className="grid gap-6 xl:grid-cols-2">
          <StatusPanel
            title="Risk analysis"
            description="Risk explanations will connect extracted evidence to transparent clinical flags."
            icon={AlertTriangle}
            items={["Risk score pending", "Risk level pending", "Clinical flags pending", "Explanation pending"]}
          />
          <StatusPanel
            title="Evidence references"
            description="Citations will be attached to RAG-supported recommendations and clinical considerations."
            icon={BookOpen}
            items={["Guidelines pending", "Drug references pending", "Medical articles pending", "Source snippets pending"]}
          />
        </div>
      </section>
    </AppShell>
  );
}
