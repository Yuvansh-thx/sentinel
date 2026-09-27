"use client";

import React from "react";
import { Activity } from "lucide-react";

export function SystemStatus() {
  const items = [
    { label: "SYSTEM", status: "OPERATIONAL", color: "bg-emerald-400 text-emerald-400" },
    { label: "RISK ENGINE", status: "ONLINE", color: "bg-emerald-400 text-emerald-400" },
    { label: "MODEL", status: "ACTIVE", color: "bg-accent-cyan text-accent-cyan" },
    { label: "DATA STREAM", status: "LIVE", color: "bg-blue-400 text-blue-400" },
  ];

  return (
    <div className="bg-surface/80 border border-border-subtle rounded-lg p-3 font-mono text-[10px] backdrop-blur-sm">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-border-subtle/50 text-slate-500 font-semibold tracking-wider">
        <span>GLOBAL STATUS MATRIX</span>
        <Activity className="w-3 h-3 text-accent-cyan" />
      </div>

      <div className="grid grid-cols-2 gap-2">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between p-1.5 rounded bg-surface-secondary/70 border border-border-subtle/40"
          >
            <span className="text-slate-400">{item.label}</span>
            <div className="flex items-center gap-1.5 font-bold">
              <span className={`w-1.5 h-1.5 rounded-full ${item.color.split(" ")[0]} animate-pulse`} />
              <span className={item.color.split(" ")[1]}>{item.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
