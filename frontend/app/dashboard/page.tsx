"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Filter, RefreshCw, Bot, Activity, LogOut } from "lucide-react";
import { MetricCards } from "@/features/dashboard/metric-cards";
import { DashboardContent } from "@/features/dashboard/dashboard-content";

// Define the shape of the user data coming from the backend
interface UserProfile {
  id: number;
  email: string;
  full_name: string;
  role: string;
  is_active: boolean;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserProfile() {
      const token = localStorage.getItem("medintel_token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:8000/api/v1/users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Session expired");
        }

        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Authentication error:", error);
        localStorage.removeItem("medintel_token");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }

    fetchUserProfile();
  }, [router]);

  // Logout function: Clears the token and sends the user to the homepage
  const handleLogout = () => {
    localStorage.removeItem("medintel_token");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-teal-700">
        <Activity className="animate-pulse" size={48} />
      </div>
    );
  }

  return (
    <AppShell>
      <div className="max-w-[1600px] mx-auto w-full relative pb-20">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-teal-950 mb-1">
              Welcome back, {user?.full_name}
            </h1>
            <p className="text-slate-500">
              Reviewing clinical intelligence for <span className="font-semibold text-slate-800">St. Jude's Medical Center.</span>
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" className="bg-white border-slate-200 text-slate-700 gap-2 hover:bg-slate-50">
              <Filter className="w-4 h-4" />
              Filter View
            </Button>
            
            <Button className="bg-teal-800 hover:bg-teal-900 text-white gap-2 shadow-md">
              <RefreshCw className="w-4 h-4" />
              Sync Data
            </Button>

            {/* Logout Button */}
            <Button 
              onClick={handleLogout} 
              variant="outline" 
              className="bg-red-50 border-red-200 text-red-600 gap-2 hover:bg-red-100 hover:text-red-700"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Main Grid Architecture */}
        <MetricCards />
        <DashboardContent />

        {/* Floating Action Button (FAB) for AI Copilot */}
        <div className="fixed bottom-8 right-8 z-50">
          <button className="bg-teal-800 hover:bg-teal-900 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-teal-500/30">
            <Bot className="w-6 h-6" />
          </button>
        </div>
        
      </div>
    </AppShell>
  );
}