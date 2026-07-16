import Link from "next/link";

import { LoginForm } from "@/features/auth/login-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <section className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-950">Sign in</h1>
        <p className="mt-2 text-sm text-slate-600">Access your clinical intelligence workspace.</p>
        <LoginForm />
        <Link className="mt-6 inline-flex text-sm font-medium text-primary" href="/register">
          Create an account
        </Link>
        <Link className="ml-4 mt-6 inline-flex text-sm font-medium text-slate-600" href="/">
          Back to MedIntel AI
        </Link>
      </section>
    </main>
  );
}
