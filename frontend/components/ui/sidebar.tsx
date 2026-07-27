"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; // Ensure this matches your shadcn utils path
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, Users, FileText, Activity, AlertTriangle, 
  Library, FileBarChart, Bot, Settings, HelpCircle, LifeBuoy, Stethoscope 
} from "lucide-react";

const mainNav = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Patients", href: "/patients", icon: Users },
  { name: "Medical Reports", href: "/reports", icon: FileText },
  { name: "AI Analysis", href: "/analysis", icon: Activity },
  { name: "Risk Intelligence", href: "/risk", icon: AlertTriangle },
  { name: "Evidence Library", href: "/evidence", icon: Library },
  { name: "Clinical Reports", href: "/clinical-reports", icon: FileBarChart },
];

const bottomNav = [
  { name: "Activity", href: "/activity", icon: Activity },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Help", href: "/help", icon: HelpCircle },
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
        
        {/* AI Copilot Call to Action */}
        <div className="mt-6 mb-4 px-2">
          <Button className="w-full bg-teal-800 hover:bg-teal-900 text-white gap-2 shadow-md">
            <Bot className="w-5 h-5" />
            AI Copilot
          </Button>
        </div>
        
        <div className="h-px bg-slate-100 my-2 mx-2"></div>

        {bottomNav.map((item) => (
          <Link key={item.name} href={item.href}>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 px-3 py-5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-teal-700"
            >
              <item.icon className="w-5 h-5 text-slate-400" />
              {item.name}
            </Button>
          </Link>
        ))}
      </nav>

      {/* Support Footer */}
      <div className="p-4 border-t border-slate-100">
        <Button variant="ghost" className="w-full justify-start gap-3 text-slate-600 hover:bg-slate-50">
          <LifeBuoy className="w-5 h-5 text-slate-400" />
          Support
        </Button>
      </div>
    </aside>
  );
}