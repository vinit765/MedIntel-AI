"use client";

import {
  BarChart3,
  Bot,
  ClipboardList,
  FileSearch,
  FileText,
  Home,
  Menu,
  Settings,
  Upload,
  User,
  X
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { AuthGuard } from "@/features/auth/auth-guard";
import { LogoutButton } from "@/features/dashboard/dashboard-actions";
import { cn } from "@/utils/cn";

const navigation = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Upload", href: "/upload", icon: Upload },
  { label: "Analysis", href: "/analysis", icon: FileSearch },
  { label: "Reports", href: "/reports", icon: FileText },
  { label: "AI Copilot", href: "/copilot", icon: Bot },
  { label: "Settings", href: "/settings", icon: Settings },
  { label: "Profile", href: "/profile", icon: User }
];

export function AppShell({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AuthGuard>
      <div className="min-h-screen bg-slate-50 text-slate-950">
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform lg:translate-x-0",
            isOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5">
            <Link className="flex items-center gap-3" href="/dashboard" onClick={() => setIsOpen(false)}>
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <ClipboardList className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm font-semibold">MedIntel AI</span>
                <span className="block text-xs text-slate-500">Clinical workspace</span>
              </span>
            </Link>
            <button
              className="rounded-md p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
              onClick={() => setIsOpen(false)}
              type="button"
              aria-label="Close navigation"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-950",
                    isActive && "bg-blue-50 text-primary"
                  )}
                  href={item.href}
                  key={item.href}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="border-t border-slate-200 p-4">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
                <BarChart3 className="h-4 w-4 text-primary" aria-hidden="true" />
                Risk posture
              </div>
              <p className="mt-2 text-xs leading-5 text-slate-600">No active clinical flags yet.</p>
            </div>
          </div>
        </aside>

        {isOpen ? (
          <button
            className="fixed inset-0 z-30 bg-slate-950/30 lg:hidden"
            onClick={() => setIsOpen(false)}
            type="button"
            aria-label="Close navigation overlay"
          />
        ) : null}

        <div className="lg:pl-72">
          <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6">
            <button
              className="rounded-md border border-slate-200 bg-white p-2 text-slate-600 lg:hidden"
              onClick={() => setIsOpen(true)}
              type="button"
              aria-label="Open navigation"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="hidden text-sm text-slate-600 lg:block">Clinical Intelligence & Decision Support</div>
            <LogoutButton />
          </header>
          <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}
