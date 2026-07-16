import { Database, KeyRound } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { StatusPanel } from "@/components/status-panel";

export default function SettingsPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Settings"
        title="Platform configuration"
        description="Manage workspace preferences, model settings, storage configuration, and security controls as the platform grows."
      />
      <section className="mt-8 grid gap-6 xl:grid-cols-2">
        <StatusPanel
          title="AI configuration"
          description="Model and embedding settings are environment-driven for local development and later deployment."
          icon={KeyRound}
          items={["Ollama endpoint", "LLM model", "Embedding model", "JWT lifetime"]}
        />
        <StatusPanel
          title="Storage configuration"
          description="Local storage is active for development while preserving a path to cloud storage in later phases."
          icon={Database}
          items={["Upload directory", "Chroma persistence", "Database URL", "File size limit"]}
        />
      </section>
    </AppShell>
  );
}
