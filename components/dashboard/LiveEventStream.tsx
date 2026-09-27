"use client";

import React from "react";
import Link from "next/link";
import { Radio, AlertTriangle, ShieldCheck, Cpu } from "lucide-react";
import { useSentinel } from "@/lib/context";

export function LiveEventStream() {
  const { events, setSelectedTransaction, transactions } = useSentinel();

  return (
    <div className="w-full bg-surface/70 border border-border-subtle rounded-lg p-5 backdrop-blur-sm font-mono text-xs flex flex-col h-full">
      {/* Stream Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-border-subtle/50 text-slate-400">
        <div className="flex items-center gap-2">
          <Radio className="w-3.5 h-3.5 text-accent-cyan animate-pulse" />
          <span className="text-white font-semibold tracking-wider">
            LIVE EVENT STREAM
          </span>
        </div>
        <div className="text-[10px] text-slate-500">
          BUFFER: <strong className="text-slate-300">{events.length} EVENTS</strong>
        </div>
      </div>

      {/* Stream Items List */}
      <div className="space-y-2 overflow-y-auto max-h-[340px] pr-1">
        {events.map((ev) => {
          let severityBadge = "text-slate-400 bg-surface-secondary border-slate-700";
          if (ev.severity === "critical") {
            severityBadge = "text-red-400 bg-red-950/40 border-red-800/60";
          } else if (ev.severity === "high") {
            severityBadge = "text-orange-400 bg-orange-950/40 border-orange-800/60";
          } else if (ev.severity === "medium") {
            severityBadge = "text-amber-400 bg-amber-950/40 border-amber-800/60";
          } else if (ev.severity === "low") {
            severityBadge = "text-emerald-400 bg-emerald-950/40 border-emerald-800/60";
          }

          return (
            <div
              key={ev.id}
              className="p-2.5 rounded bg-surface/80 hover:bg-surface-secondary border border-border-subtle/60 transition-colors flex items-start justify-between gap-3 group animate-fadeIn"
            >
              <div className="flex items-start gap-2.5">
                <span className="text-slate-500 text-[10px] tabular-nums mt-0.5">
                  {ev.time}
                </span>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded border font-semibold uppercase ${severityBadge}`}
                    >
                      {ev.title}
                    </span>
                    {ev.transactionId && (
                      <Link
                        href={`/transactions/${ev.transactionId}`}
                        onClick={() => {
                          const target = transactions.find((t) => t.id === ev.transactionId);
                          if (target) setSelectedTransaction(target);
                        }}
                        className="text-[10px] text-accent-cyan hover:underline"
                      >
                        {ev.transactionId}
                      </Link>
                    )}
                  </div>
                  <div className="text-slate-300 text-[11px] leading-tight">
                    {ev.detail}
                  </div>
                </div>
              </div>

              <div className="text-[9px] text-slate-600 uppercase group-hover:text-slate-400 self-center">
                {ev.type}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
