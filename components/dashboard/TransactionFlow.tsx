"use client";

import React, { useState, useEffect } from "react";
import { useSentinel } from "@/lib/context";
import { formatINR } from "@/lib/utils";

interface FlowTxn {
  id: string;
  amount: number;
  stage: number; // 0: INGEST, 1: SIGNALS, 2: FEATURES, 3: MODEL, 4: RISK, 5: DECISION
  riskScore: number;
  decision: "APPROVE" | "REVIEW" | "BLOCK";
}

const FLOW_STAGES = [
  { id: "INGEST", label: "INGEST", desc: "Network socket" },
  { id: "SIGNALS", label: "SIGNALS", desc: "Behavioral extractor" },
  { id: "FEATURES", label: "FEATURES", desc: "Graph expansion" },
  { id: "MODEL", label: "MODEL", desc: "XGBoost v1.4.2" },
  { id: "RISK", label: "RISK", desc: "Anomaly scoring" },
  { id: "DECISION", label: "DECISION", desc: "Policy execution" },
];

export function TransactionFlow() {
  const { motionEnabled, selectedTransaction } = useSentinel();
  const [activeTxn, setActiveTxn] = useState<FlowTxn>({
    id: "TX-92831",
    amount: 82400,
    stage: 0,
    riskScore: 87,
    decision: "REVIEW",
  });

  // Cycle the primary transaction through the pipeline
  useEffect(() => {
    if (!motionEnabled) return;

    const interval = setInterval(() => {
      setActiveTxn((prev) => {
        const nextStage = (prev.stage + 1) % FLOW_STAGES.length;
        return {
          ...prev,
          stage: nextStage,
        };
      });
    }, 1300);

    return () => clearInterval(interval);
  }, [motionEnabled]);

  return (
    <div className="w-full bg-surface/70 border border-border-subtle rounded-lg p-5 backdrop-blur-sm relative overflow-hidden">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-6 border-b border-border-subtle/50 text-[11px] font-mono">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-ping" />
          <span className="text-white font-semibold tracking-wider">
            PIPELINE FLOW // LIVE INFERENCE STREAM
          </span>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <span>ACTIVE PIPELINE: <strong className="text-slate-200">RUNNING</strong></span>
          <span>LATENCY: <strong className="text-accent-cyan">3.9ms</strong></span>
          <span>INSPECTION: <strong className="text-white">{activeTxn.id}</strong></span>
        </div>
      </div>

      {/* Pipeline Stages Track */}
      <div className="relative py-4">
        {/* Connecting pipeline line */}
        <div className="hidden lg:block absolute top-[44px] left-[8%] right-[8%] h-0.5 bg-slate-800 -z-0">
          <div
            className="h-full bg-gradient-to-r from-accent-blue via-accent-cyan to-orange-500 transition-all duration-700"
            style={{ width: `${(activeTxn.stage / (FLOW_STAGES.length - 1)) * 100}%` }}
          />
        </div>

        {/* Stages Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 relative z-10">
          {FLOW_STAGES.map((stg, idx) => {
            const isCurrent = activeTxn.stage === idx;
            const isPassed = activeTxn.stage > idx;
            const isRiskStage = idx === 4;
            const isDecisionStage = idx === 5;

            return (
              <div
                key={stg.id}
                className={`p-3.5 rounded-md border flex flex-col justify-between transition-all duration-300 min-h-[110px] ${
                  isCurrent
                    ? isRiskStage
                      ? "border-orange-500/80 bg-orange-950/40 shadow-[0_0_24px_rgba(249,115,22,0.25)]"
                      : isDecisionStage
                      ? "border-amber-500/80 bg-amber-950/40 shadow-[0_0_24px_rgba(245,158,11,0.25)]"
                      : "border-accent-cyan/80 bg-blue-950/40 shadow-[0_0_24px_rgba(6,182,212,0.25)]"
                    : isPassed
                    ? "border-border-bright bg-surface-secondary/70 text-slate-300"
                    : "border-border-subtle bg-surface/50 text-slate-500"
                }`}
              >
                {/* Stage Header */}
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span
                    className={
                      isCurrent
                        ? isRiskStage
                          ? "text-orange-400 font-bold"
                          : isDecisionStage
                          ? "text-amber-400 font-bold"
                          : "text-accent-cyan font-bold"
                        : "text-slate-500"
                    }
                  >
                    0{idx + 1} // {stg.label}
                  </span>
                  {isCurrent && (
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
                  )}
                </div>

                {/* Stage Body */}
                <div className="my-1">
                  {isRiskStage && (isCurrent || isPassed) ? (
                    <div className="font-mono">
                      <div className="text-[10px] text-slate-400">RISK SCORE</div>
                      <div className="text-xl font-bold text-orange-400 tabular-nums">
                        {activeTxn.riskScore}
                      </div>
                    </div>
                  ) : isDecisionStage && (isCurrent || isPassed) ? (
                    <div className="font-mono">
                      <div className="text-[10px] text-slate-400">POLICY ACTION</div>
                      <div className="text-sm font-bold text-amber-300 tracking-wider">
                        {activeTxn.decision}
                      </div>
                    </div>
                  ) : isCurrent ? (
                    <div className="font-mono text-xs text-white">
                      <div className="text-[10px] text-slate-400">{activeTxn.id}</div>
                      <div className="font-bold text-accent-cyan">
                        {formatINR(activeTxn.amount)}
                      </div>
                    </div>
                  ) : (
                    <div className="text-[10px] font-mono text-slate-500">
                      {stg.desc}
                    </div>
                  )}
                </div>

                {/* Status footnote */}
                <div className="text-[9px] font-mono text-slate-500 flex items-center justify-between border-t border-border-subtle/50 pt-1 mt-1">
                  <span>{isPassed ? "PROCESSED" : isCurrent ? "COMPUTING" : "QUEUED"}</span>
                  <span className="tabular-nums">{(idx * 0.7).toFixed(1)}ms</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Payload Bar */}
      <div className="mt-2 pt-3 border-t border-border-subtle/50 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-slate-400">
        <div className="flex items-center gap-3">
          <span className="text-slate-500">PAYLOAD:</span>
          <span className="text-white font-medium">{activeTxn.id}</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-300">{formatINR(activeTxn.amount)}</span>
          <span className="text-slate-600">•</span>
          <span className="text-blue-400">UPI / IMPS</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-300">Mumbai IP (103.21.244.89)</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-slate-500">ENGINE STATE:</span>
          <span className="text-emerald-400">OPTIMAL</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-300">0.02% DROP</span>
        </div>
      </div>
    </div>
  );
}
