import Link from "next/link";

import { RegisterForm } from "@/features/auth/register-form";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <section className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-950">Create account</h1>
        <p className="mt-2 text-sm text-slate-600">Set up secure access for clinical document workflows.</p>
        <RegisterForm />
        <Link className="mt-6 inline-flex text-sm font-medium text-primary" href="/login">
          Already have an account?
        </Link>
        <Link className="ml-4 mt-6 inline-flex text-sm font-medium text-slate-600" href="/">
          Back to MedIntel AI
        </Link>
      </section>
    </main>
  );
}
