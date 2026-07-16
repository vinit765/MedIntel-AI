import { Microscope, Stethoscope } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { StatusPanel } from "@/components/status-panel";

export default function AnalysisPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Analysis"
        title="Clinical intelligence results"
        description="Review extracted entities, lab values, symptoms, medications, diagnoses, and generated clinical risk signals."
      />
      <section className="mt-8 grid gap-6 xl:grid-cols-2">
        <StatusPanel
          title="Document intelligence"
          description="Extracted structured medical data will appear here after Phase 5 connects parsers and clinical entity extraction."
          icon={Microscope}
          items={["Patient information", "Symptoms", "Medications", "Laboratory values"]}
        />
        <StatusPanel
          title="Clinical risk intelligence"
          description="Risk scoring will be introduced in Phase 6 with explainable flags and clinician-friendly summaries."
          icon={Stethoscope}
          items={["Duplicate medications", "Abnormal values", "Missing information", "Medication conflicts"]}
        />
      </section>
    </AppShell>
  );
}
