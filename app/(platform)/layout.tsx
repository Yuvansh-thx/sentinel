import React from "react";
import { DashboardNavRail } from "@/components/navigation/DashboardNavRail";
import { DashboardHeader } from "@/components/navigation/DashboardHeader";

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-slate-200 sentinel-grid">
      {/* Navigation Rail */}
      <DashboardNavRail />

      {/* Main Content Area */}
      <div className="ml-16 md:ml-20 min-h-screen flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
