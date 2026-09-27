"use client";

import React, { useEffect, useState } from "react";
import { useSentinel } from "@/lib/context";

interface Stage {
  id: string;
  name: string;
  sub: string;
  detail: string;
}

const STAGES: Stage[] = [
  { id: "s1", name: "TRANSACTION", sub: "INGEST", detail: "TX-92831 • ₹82,400 • UPI" },
  { id: "s2", name: "SIGNALS", sub: "EXTRACTION", detail: "48 behavioral features" },
  { id: "s3", name: "CONTEXT", sub: "GRAPH EXPANSION", detail: "650km geo delta • D-8812" },
  { id: "s4", name: "RISK", sub: "INFERENCE", detail: "Escalated Score" },
  { id: "s5", name: "DECISION", sub: "POLICY ENGINE", detail: "Manual Review Queue" },
];

export function HeroFlow() {
  const { motionEnabled } = useSentinel();
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    if (!motionEnabled) return;
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % STAGES.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [motionEnabled]);

  return (
    <div className="w-full max-w-4xl mx-auto my-12 p-6 rounded-lg bg-surface/80 border border-border-subtle backdrop-blur-sm relative overflow-hidden">
      {/* Background glow behind active node */}
      <div
        className="absolute top-1/2 -translate-y-1/2 w-40 h-24 bg-accent-blue/10 blur-3xl transition-all duration-700 pointer-events-none"
        style={{ left: `${(activeStage / (STAGES.length - 1)) * 80 + 10}%` }}
      />

      <div className="flex items-center justify-between mb-4 pb-3 border-b border-border-subtle/50 text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-ping" />
          <span className="text-slate-200">PIPELINE EXECUTION CYCLE</span>
        </div>
        <div className="flex items-center gap-4">
          <span>LATENCY: <strong className="text-slate-200">3.8ms</strong></span>
          <span>CYCLE: <strong className="text-accent-cyan">ACTIVE</strong></span>
        </div>
      </div>

      {/* Nodes Row */}
      <div className="relative flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2">
        {/* Continuous Connecting Line */}
        <div className="hidden md:block absolute top-[28px] left-[6%] right-[6%] h-[2px] bg-slate-800 -z-0">
          <div
            className="h-full bg-gradient-to-r from-accent-blue via-accent-cyan to-orange-500 transition-all duration-500"
            style={{ width: `${(activeStage / (STAGES.length - 1)) * 100}%` }}
          />
        </div>

        {STAGES.map((stage, idx) => {
          const isActive = idx === activeStage;
          const isPassed = idx < activeStage;
          const isRisk = idx === 3;
          const isDecision = idx === 4;

          return (
            <div
              key={stage.id}
              className="relative z-10 flex flex-col items-center text-center w-full md:w-44"
            >
              {/* Node indicator */}
              <div
                className={`w-14 h-14 rounded-md border flex flex-col items-center justify-center transition-all duration-300 font-mono ${
                  isActive
                    ? isRisk
                      ? "border-orange-500 bg-orange-950/60 shadow-[0_0_20px_rgba(249,115,22,0.4)]"
                      : isDecision
                      ? "border-amber-500 bg-amber-950/60 shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                      : "border-accent-cyan bg-accent-blue/20 shadow-[0_0_20px_rgba(6,182,212,0.35)]"
                    : isPassed
                    ? "border-accent-blue/60 bg-surface-secondary text-slate-300"
                    : "border-border-subtle bg-surface text-slate-500"
                }`}
              >
                {/* Custom display on Risk and Decision */}
                {isRisk && (isActive || isPassed) ? (
                  <div className="flex flex-col items-center leading-none">
                    <span className="text-[10px] text-orange-400 font-bold">SCORE</span>
                    <span className="text-base text-orange-400 font-bold">87</span>
                  </div>
                ) : isDecision && (isActive || isPassed) ? (
                  <div className="flex flex-col items-center leading-none">
                    <span className="text-[9px] text-amber-300 font-bold">STATUS</span>
                    <span className="text-xs text-amber-300 font-bold">REVIEW</span>
                  </div>
                ) : (
                  <div className="text-xs font-semibold">
                    0{idx + 1}
                  </div>
                )}
              </div>

              {/* Node Label */}
              <div className="mt-3">
                <div
                  className={`text-xs font-mono font-semibold tracking-wider transition-colors duration-200 ${
                    isActive
                      ? isRisk
                        ? "text-orange-400"
                        : isDecision
                        ? "text-amber-300"
                        : "text-accent-cyan"
                      : "text-slate-300"
                  }`}
                >
                  {stage.name}
                </div>
                <div className="text-[10px] font-mono text-slate-500 uppercase mt-0.5">
                  {stage.sub}
                </div>
                <div className="text-[10px] text-slate-400 mt-1 h-4">
                  {isActive ? stage.detail : ""}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
