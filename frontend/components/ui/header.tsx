"use client";

import { Search, Bell, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header() {
  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
      {/* Search Bar */}
      <div className="flex-1 max-w-xl relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input 
          type="text"
          placeholder="Search patient, report, or intelligence..."
          className="w-full pl-11 bg-slate-100 border-transparent rounded-full focus-visible:ring-teal-600 focus-visible:bg-white h-11"
        />
      </div>

      {/* Center Tabs */}
      <div className="hidden lg:flex items-center gap-8 mx-8">
        <button className="text-teal-800 font-semibold border-b-2 border-teal-600 pb-1 -mb-1 text-sm">
          Workspace
        </button>
        <button className="text-slate-500 font-medium hover:text-slate-800 text-sm">
          Analytics
        </button>
        <button className="text-slate-500 font-medium hover:text-slate-800 text-sm">
          Registry
        </button>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 text-slate-500">
          <button className="relative hover:text-slate-800 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <button className="hover:text-slate-800 transition-colors">
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>
        
        <div className="h-8 w-px bg-slate-200"></div>

        <div className="flex items-center gap-3 cursor-pointer">
          <div className="hidden md:flex flex-col items-end text-sm">
            <span className="font-semibold text-slate-900 leading-none">Dr. Aris Thorne</span>
            <span className="text-slate-500 text-xs mt-1">Senior Clinician</span>
          </div>
          <Avatar className="w-10 h-10 border border-slate-200 shadow-sm">
            <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Dr. Aris Thorne" />
            <AvatarFallback className="bg-teal-100 text-teal-700 font-bold">AT</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}