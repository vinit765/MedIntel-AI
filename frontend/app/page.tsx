import Link from "next/link";
import { Activity, FileText, ShieldCheck } from "lucide-react";

const capabilities = [
  { label: "Structured extraction", icon: FileText },
  { label: "Risk intelligence", icon: Activity },
  { label: "Evidence discipline", icon: ShieldCheck }
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-12">
        <p className="text-sm font-medium uppercase tracking-normal text-primary">Clinical intelligence</p>
        <h1 className="mt-4 max-w-3xl text-5xl font-semibold leading-tight">MedIntel AI</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
          Convert medical documents into structured evidence, risk signals, and clinician-ready
          decision support reports.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link className="rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground" href="/dashboard">
            Open dashboard
          </Link>
          <Link className="rounded-md border border-slate-300 px-5 py-3 text-sm font-medium" href="/login">
            Sign in
          </Link>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {capabilities.map((capability) => {
            const Icon = capability.icon;
            return (
              <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm" key={capability.label}>
                <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                <p className="mt-4 text-sm font-medium text-slate-900">{capability.label}</p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
