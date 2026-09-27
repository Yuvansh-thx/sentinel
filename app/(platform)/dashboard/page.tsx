"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, AlertTriangle } from "lucide-react";
import { KpiStrip } from "@/components/dashboard/KpiStrip";
import { TransactionFlow } from "@/components/dashboard/TransactionFlow";
import { LiveEventStream } from "@/components/dashboard/LiveEventStream";
import { RiskDistribution } from "@/components/dashboard/RiskDistribution";
import { SystemStatus } from "@/components/dashboard/SystemStatus";

export default function DashboardOverviewPage() {
  return (
    <div className="space-y-6">
      {/* 19. MAIN DASHBOARD HERO */}
      <div className="flex flex-wrap items-end justify-between gap-4 pb-2">
        <div>
          <div className="text-[10px] font-mono text-accent-cyan tracking-widest uppercase mb-1">
            SURFACE TELEMETRY // REAL-TIME ENGINE
          </div>
          <h1 className="text-3xl md:text-5xl font-light text-white tracking-tight leading-none">
            TRANSACTION
            <br />
            <span className="text-slate-400 font-normal">INTELLIGENCE</span>
          </h1>
          <p className="text-slate-400 text-xs md:text-sm font-light mt-2 max-w-xl">
            Monitoring behavioral signals across the transaction network.
          </p>
        </div>

        {/* Primary Case Callout Quick Link */}
        <Link
          href="/transactions/TX-92831"
          className="p-3.5 rounded-lg bg-orange-950/40 hover:bg-orange-950/60 border border-orange-800/60 text-orange-300 font-mono text-xs flex items-center gap-3 transition-colors shadow-[0_0_20px_rgba(249,115,22,0.15)] group"
        >
          <AlertTriangle className="w-4 h-4 text-orange-400 shrink-0" />
          <div>
            <div className="font-bold flex items-center gap-2">
              <span>PRIORITY CASE: TX-92831</span>
              <span className="text-orange-400">● 87 HIGH</span>
            </div>
            <div className="text-[10px] text-orange-400/80">
              ₹82,400 • Mumbai Datacenter • Impossible Travel
            </div>
          </div>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 ml-2" />
        </Link>
      </div>

      {/* 22. KPI INFORMATION STRIP */}
      <KpiStrip />

      {/* 20. LIVE TRANSACTION FLOW (CENTRAL VISUAL) */}
      <TransactionFlow />

      {/* 21. LIVE EVENT STREAM & 23. RISK DISTRIBUTION & 40. SYSTEM STATUS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Risk Distribution & System Status (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <RiskDistribution />
          <SystemStatus />
        </div>

        {/* Right: Live Sliding Event Stream (5 cols) */}
        <div className="lg:col-span-5">
          <LiveEventStream />
        </div>
      </div>
    </div>
  );
}
