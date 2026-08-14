"use client";

import { useEffect, useState } from "react";
import { Search, Bell, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface UserProfile {
  id: number;
  email: string;
  full_name: string;
  role: string;
}

export function Header() {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    async function fetchUserProfile() {
      const token = localStorage.getItem("medintel_token");
      if (!token) return;

      try {
        const response = await fetch("http://localhost:8000/api/v1/users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error("Failed to fetch user for header:", error);
      }
    }

    fetchUserProfile();
  }, []);

  // Helper function to extract initials from the dynamic user name
  const getInitials = (name: string) => {
    if (!name) return "U";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2);
  };

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
            <span className="font-semibold text-slate-900 leading-none">
              {user ? user.full_name : "Loading..."}
            </span>
            <span className="text-slate-500 text-xs mt-1 capitalize">
              {user ? user.role : "User"}
            </span>
          </div>
          <Avatar className="w-10 h-10 border border-slate-200 shadow-sm">
            <AvatarFallback className="bg-teal-100 text-teal-700 font-bold">
              {user ? getInitials(user.full_name) : "?"}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}