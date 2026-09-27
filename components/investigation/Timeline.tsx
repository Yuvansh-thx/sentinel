"use client";

import React from "react";
import { PRIMARY_INVESTIGATION } from "@/lib/mock-data";
import { formatINR } from "@/lib/utils";
import { AlertCircle, CheckCircle2, ShieldAlert, ArrowDown } from "lucide-react";

export function Timeline() {
  const events = PRIMARY_INVESTIGATION.timeline;

  return (
    <div className="w-full bg-surface/80 border border-border-subtle rounded-lg p-5 font-mono text-xs backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-6 border-b border-border-subtle/50 text-slate-400">
        <div>
          <span className="text-white font-semibold tracking-wider">
            FORENSIC TIMELINE
          </span>
          <span className="text-slate-500 ml-2">// INCIDENT CHRONOLOGY</span>
        </div>
        <div className="text-[10px] text-slate-500">
          WINDOW: 4m 02s
        </div>
      </div>

      {/* Vertical Timeline */}
      <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
        {events.map((ev, idx) => {
          let nodeColor = "bg-slate-700 border-slate-600";
          let textColor = "text-slate-300";

          if (ev.type === "critical") {
            nodeColor = "bg-red-500 border-red-400 shadow-[0_0_12px_rgba(239,68,68,0.5)]";
            textColor = "text-red-400";
          } else if (ev.type === "alert") {
            nodeColor = "bg-orange-500 border-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.4)]";
            textColor = "text-orange-400";
          } else if (ev.type === "warning") {
            nodeColor = "bg-amber-400 border-amber-300";
            textColor = "text-amber-300";
          } else if (ev.type === "info") {
            nodeColor = "bg-blue-500 border-blue-400";
            textColor = "text-blue-300";
          }

          return (
            <div key={ev.id} className="relative group">
              {/* Dot on the vertical line */}
              <span
                className={`absolute -left-[27px] top-1 w-3 h-3 rounded-full border-2 ${nodeColor} transition-transform group-hover:scale-125`}
              />

              <div className="flex flex-col gap-1 p-2.5 rounded bg-surface/50 hover:bg-surface-secondary border border-border-subtle/40 transition-colors">
                {/* Time & Title */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 text-[10px] tabular-nums">
                      {ev.time}
                    </span>
                    <span className={`font-semibold ${textColor}`}>
                      {ev.title}
                    </span>
                  </div>

                  {ev.amount && (
                    <span className="text-white font-bold tabular-nums">
                      {formatINR(ev.amount)}
                    </span>
                  )}
                </div>

                {/* Event detail */}
                <div className="text-[11px] text-slate-400 leading-relaxed font-sans">
                  {ev.detail}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-3 border-t border-border-subtle/50 text-[10px] text-slate-500 text-center">
        EVIDENCE TRAIL COMPLETE // AUDITED BY SENTINEL LEDGER
      </div>
    </div>
  );
}
