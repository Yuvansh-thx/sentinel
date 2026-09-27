"use client";

import React from "react";
import { useSentinel } from "@/lib/context";

export function KpiStrip() {
  const { kpis } = useSentinel();

  const metrics = [
    {
      label: "TRANSACTIONS",
      value: kpis.transactions.toLocaleString(),
      sub: "Active stream",
      color: "text-white",
    },
    {
      label: "FLAGGED",
      value: kpis.flagged.toLocaleString(),
      sub: "Anomalies isolated",
      color: "text-orange-400",
    },
    {
      label: "REVIEW QUEUE",
      value: kpis.reviewQueue.toString(),
      sub: "Pending human review",
      color: "text-amber-400",
    },
    {
      label: "EXPOSURE",
      value: kpis.exposureFormatted,
      sub: "Total quarantined volume",
      color: "text-red-400",
    },
    {
      label: "MODEL PR-AUC",
      value: kpis.modelPrAuc.toFixed(2),
      sub: "XGBoost v1.4.2 active",
      color: "text-accent-cyan",
    },
  ];

  return (
    <div className="w-full border-b border-border-subtle bg-surface/50 px-6 py-3.5 backdrop-blur-sm">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-8 font-mono">
        {metrics.map((m, idx) => (
          <div key={m.label} className="flex flex-col">
            <div className="text-[10px] text-slate-500 tracking-wider uppercase mb-0.5">
              {m.label}
            </div>
            <div className={`text-xl lg:text-2xl font-bold tracking-tight tabular-nums ${m.color}`}>
              {m.value}
            </div>
            <div className="text-[9px] text-slate-500 mt-0.5">
              {m.sub}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
