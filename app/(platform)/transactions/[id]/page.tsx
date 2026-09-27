"use client";

import React from "react";
import { useParams } from "next/navigation";
import { DecisionPanel } from "@/components/investigation/DecisionPanel";
import { RiskBreakdown } from "@/components/investigation/RiskBreakdown";
import { Timeline } from "@/components/investigation/Timeline";
import { EntityGraph } from "@/components/network/EntityGraph";
import { useSentinel } from "@/lib/context";
import { PRIMARY_INVESTIGATION } from "@/lib/mock-data";

export default function TransactionInvestigationPage() {
  const params = useParams();
  const id = (params?.id as string) || "TX-92831";
  const { transactions } = useSentinel();

  // Find transaction or default to primary case study TX-92831
  const txn = transactions.find((t) => t.id === id) || PRIMARY_INVESTIGATION.transaction;

  return (
    <div className="space-y-6">
      {/* 27. Header & Headline Controls */}
      <DecisionPanel transaction={txn} />

      {/* Grid: Risk Decomposition & Forensic Chronology */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: 28. WHY FLAGGED Risk Breakdown (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <RiskBreakdown />

          {/* Quick Technical Telemetry Card */}
          <div className="bg-surface/80 border border-border-subtle rounded-lg p-5 font-mono text-xs">
            <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">
              SESSION TELEMETRY & HARDWARE BINDINGS
            </div>
            <div className="grid grid-cols-2 gap-3 text-[11px]">
              <div className="p-2 rounded bg-surface-secondary border border-border-subtle/50">
                <span className="text-slate-500 block text-[9px]">DEVICE TOKEN</span>
                <span className="text-white font-bold">{txn.deviceId} (WebKit / iOS 18)</span>
              </div>
              <div className="p-2 rounded bg-surface-secondary border border-border-subtle/50">
                <span className="text-slate-500 block text-[9px]">ORIGIN IP</span>
                <span className="text-cyan-400 font-bold">{txn.ipAddress}</span>
              </div>
              <div className="p-2 rounded bg-surface-secondary border border-border-subtle/50">
                <span className="text-slate-500 block text-[9px]">GEOGRAPHIC HUB</span>
                <span className="text-slate-300 font-bold">{txn.location}, IN</span>
              </div>
              <div className="p-2 rounded bg-surface-secondary border border-border-subtle/50">
                <span className="text-slate-500 block text-[9px]">PAYMENT RAIL</span>
                <span className="text-blue-400 font-bold">{txn.channel} (IMPS 24/7)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 29. TRANSACTION TIMELINE (6 cols) */}
        <div className="lg:col-span-6">
          <Timeline />
        </div>
      </div>

      {/* 30. EMBEDDED COMPACT ENTITY GRAPH */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <span className="text-white font-semibold">INVESTIGATION ENTITY SUBGRAPH</span>
          <span className="text-[10px] text-slate-500">650km GEO HOP DETECTED</span>
        </div>
        <EntityGraph isCompact={true} />
      </div>
    </div>
  );
}
