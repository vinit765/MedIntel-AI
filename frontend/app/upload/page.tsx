import { FileUp, ShieldCheck, UploadCloud } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { StatusPanel } from "@/components/status-panel";

export default function UploadPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Document upload"
        title="Upload medical documents"
        description="Prepare PDF, DOCX, and TXT reports for extraction, risk analysis, evidence retrieval, and report generation."
      />
      <section className="mt-8 grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-md bg-blue-50 text-primary">
            <UploadCloud className="h-7 w-7" aria-hidden="true" />
          </div>
          <h2 className="mt-5 text-xl font-semibold text-slate-950">Document intake area</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-600">
            Phase 4 will connect this workspace to validated uploads, file storage, and document records.
          </p>
          <button
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground disabled:opacity-70"
            disabled
            type="button"
          >
            <FileUp className="h-4 w-4" aria-hidden="true" />
            Upload coming in Phase 4
          </button>
        </div>
        <StatusPanel
          title="Validation policy"
          description="Upload handling will enforce file type, size, and safe storage controls before analysis begins."
          icon={ShieldCheck}
          items={["PDF, DOCX, TXT", "20 MB default limit", "Authenticated access", "Local storage abstraction"]}
        />
      </section>
    </AppShell>
  );
}
