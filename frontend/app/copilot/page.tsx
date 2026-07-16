import { Bot, LockKeyhole } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { StatusPanel } from "@/components/status-panel";

export default function CopilotPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="AI Copilot"
        title="Report-grounded questions"
        description="The copilot will answer only within the uploaded document, generated report, and retrieved medical evidence context."
      />
      <section className="mt-8 grid gap-6 xl:grid-cols-[1fr_0.85fr]">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-50 text-primary">
              <Bot className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-lg font-semibold text-slate-950">Conversation surface</h2>
              <p className="text-sm text-slate-600">Chat orchestration starts in Phase 10.</p>
            </div>
          </div>
          <div className="mt-6 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
            No report is selected yet.
          </div>
          <div className="mt-4 flex gap-3">
            <input
              className="min-w-0 flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm"
              disabled
              placeholder="Ask about the selected report"
            />
            <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground" disabled type="button">
              Send
            </button>
          </div>
        </div>
        <StatusPanel
          title="Scope controls"
          description="Copilot behavior will reject unrelated conversation and cite evidence when answering."
          icon={LockKeyhole}
          items={["Report-bound answers", "Evidence citations", "No unrelated chat", "Safety disclaimer"]}
        />
      </section>
    </AppShell>
  );
}
