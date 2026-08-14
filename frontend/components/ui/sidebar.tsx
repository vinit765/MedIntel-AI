"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; // Ensure this matches your shadcn utils path
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, FileText, Library, Bot, Stethoscope 
} from "lucide-react";

const mainNav = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Medical Reports", href: "/reports", icon: FileText },
  { name: "Evidence Library", href: "/evidence", icon: Library },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white flex flex-col h-screen fixed left-0 top-0 border-r border-slate-200 shadow-sm z-20">
      {/* Brand Header */}
      <div className="h-20 flex items-center px-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="bg-teal-700 p-2 rounded-lg">
            <Stethoscope className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-teal-900 leading-tight">MedIntel AI</h1>
            <p className="text-xs text-slate-500 font-medium">Clinical Intelligence</p>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 flex flex-col gap-1 px-4">
        {mainNav.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 px-3 py-6 rounded-lg text-sm font-medium transition-all",
                  isActive 
                    ? "bg-teal-50 text-teal-800 border-l-4 border-teal-600 shadow-sm" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-teal-700"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive ? "text-teal-600" : "text-slate-400")} />
                {item.name}
              </Button>
            </Link>
          );
        })}
        
        {/* AI Copilot Call to Action - Wrapped in Link */}
        <div className="mt-6 mb-4 px-2">
          <Link href="/copilot">
            <Button className={cn(
              "w-full bg-teal-800 hover:bg-teal-900 text-white gap-2 shadow-md justify-start px-4 py-6",
              pathname === "/copilot" && "ring-2 ring-teal-500"
            )}>
              <Bot className="w-5 h-5" />
              AI Copilot
            </Button>
          </Link>
        </div>
      </nav>
    </aside>
  );
}