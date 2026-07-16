import { Mail, UserRound } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { StatusPanel } from "@/components/status-panel";

export default function ProfilePage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Profile"
        title="User profile"
        description="View account identity and future role-based workspace preferences for authenticated users."
      />
      <section className="mt-8 grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <StatusPanel
          title="Account details"
          description="Profile fields will connect to the authenticated user endpoint and future role management."
          icon={UserRound}
          items={["Name from account", "Email from account", "Active status", "Created date"]}
        />
        <StatusPanel
          title="Communication"
          description="Clinical notifications and audit activity summaries can be introduced once workflow events exist."
          icon={Mail}
          items={["Upload alerts", "Analysis completion", "Risk notifications", "Report export events"]}
        />
      </section>
    </AppShell>
  );
}
