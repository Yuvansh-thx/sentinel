"use client";

import React, { useState } from "react";
import {
  Flame,
  Play,
  Pause,
  PlusCircle,
  AlertTriangle,
  RotateCcw,
  Sliders,
  TrendingDown,
  TrendingUp,
  ShieldAlert,
  Radio,
} from "lucide-react";
import { useSentinel } from "@/lib/context";
import { formatINR } from "@/lib/utils";

export function SimulatorView() {
  const {
    riskThreshold,
    setRiskThreshold,
    simulateAttack,
    pauseSimulation,
    isSimulatingAttack,
    attackStep,
    generateNormalTxn,
    generateHighRiskTxn,
    resetSimulation,
    events,
    kpis,
  } = useSentinel();

  // Attack sequence step definitions as specified in Section 37
  const attackSequenceSteps = [
    { label: "NORMAL LOGIN", desc: "User authenticated in Indore (D-1044)", tag: "AUTH" },
    { label: "₹850", desc: "Baseline Coffee purchase via UPI", tag: "TXN" },
    { label: "NEW DEVICE", desc: "Unverified token D-8812 bound in Mumbai", tag: "DEVICE" },
    { label: "₹12,400", desc: "Electronics store spend (Virtual Card)", tag: "TXN" },
    { label: "₹27,000", desc: "Crypto ramp outflow via UPI", tag: "TXN" },
    { label: "₹82,400", desc: "High value target transfer (Apex Luxe)", tag: "TXN" },
    { label: "LOCATION ANOMALY", desc: "Indore to Mumbai (650 km in 2m 58s)", tag: "GEO" },
    { label: "HIGH VELOCITY", desc: "4 transactions totaling ₹1.22L in 4m", tag: "BURST" },
    { label: "RISK 87", desc: "Escalated score breached 70 threshold", tag: "SCORE" },
    { label: "MANUAL REVIEW", desc: "Held in sentinel isolation queue", tag: "ACTION" },
  ];

  // Dynamic calculations based on riskThreshold (Section 33)
  // Lower threshold = catches more fraud, but higher false positives & higher review volume
  // Higher threshold = fewer false positives, but missed fraud & higher exposure
  const threshold = riskThreshold;
  const fraudDetectionPercent = Math.min(99.4, Math.max(45, 100 - (threshold - 20) * 0.75)).toFixed(1);
  const falsePositiveRate = Math.min(4.8, Math.max(0.02, Math.pow((100 - threshold) / 40, 2) * 0.8)).toFixed(2);
  const reviewQueueVolume = Math.round(Math.pow((100 - threshold) / 10, 1.8) * 1.8 + 8);
  const potentialExposure = Math.round(35000 + Math.pow(threshold / 10, 2.4) * 620);

  return (
    <div className="w-full font-mono text-xs space-y-8">
      {/* Title */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border-subtle">
        <div>
          <h1 className="text-2xl font-light text-white tracking-tight">
            TRANSACTION & ATTACK SIMULATOR
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Real-time behavioral stress-testing and dynamic threshold risk modeling.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isSimulatingAttack ? (
            <button
              onClick={pauseSimulation}
              className="px-4 py-2 rounded bg-amber-600 hover:bg-amber-500 text-white font-semibold flex items-center gap-2 transition-all shadow-[0_0_16px_rgba(245,158,11,0.4)]"
            >
              <Pause className="w-3.5 h-3.5" />
              <span>PAUSE SIMULATION</span>
            </button>
          ) : (
            <button
              onClick={simulateAttack}
              className="px-5 py-2 rounded bg-red-600 hover:bg-red-500 text-white font-semibold flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(239,68,68,0.5)]"
            >
              <Flame className="w-4 h-4 text-orange-200" />
              <span>SIMULATE ATTACK</span>
            </button>
          )}

          <button
            onClick={resetSimulation}
            className="px-3 py-2 rounded bg-surface hover:bg-surface-secondary border border-border-subtle text-slate-400 hover:text-white transition-colors"
            title="Reset Simulator"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* SECTION 33: DYNAMIC RISK THRESHOLD SLIDER */}
      <div className="bg-surface/80 border border-border-subtle rounded-lg p-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-border-subtle">
          <div>
            <span className="text-white font-semibold tracking-wider">
              RISK THRESHOLD OPTIMIZER
            </span>
            <span className="text-slate-500 ml-2">// REAL-TIME TRADE-OFF ENGINE</span>
          </div>
          <div className="text-xs text-slate-400">
            CURRENT THRESHOLD: <strong className="text-accent-cyan text-sm">{threshold}</strong> / 100
          </div>
        </div>

        {/* The Slider UI: 0 ─────────●──────── 100 */}
        <div className="space-y-3">
          <div className="flex justify-between text-[11px] text-slate-500">
            <span>0 (MAXIMUM SENSITIVITY)</span>
            <span className="text-orange-400 font-bold">OPTIMAL ZONE (65 - 75)</span>
            <span>100 (PERMISSIVE)</span>
          </div>

          <div className="relative flex items-center">
            <input
              type="range"
              min="10"
              max="95"
              value={threshold}
              onChange={(e) => setRiskThreshold(Number(e.target.value))}
              className="w-full h-2.5 bg-surface-secondary rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          <div className="text-[10px] text-slate-400 flex items-center justify-between">
            <span>← Lower: catches more fraud, increases false alerts</span>
            <span>Higher: fewer alerts, risks missed fraud →</span>
          </div>
        </div>

        {/* 4 Responsive Dynamic Mock Metrics as required */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {/* FRAUD DETECTION */}
          <div className="p-4 rounded bg-surface-secondary border border-border-subtle">
            <div className="text-[10px] text-slate-500 uppercase mb-1">
              FRAUD DETECTION (RECALL)
            </div>
            <div className="text-2xl font-bold text-emerald-400 tabular-nums">
              {fraudDetectionPercent}%
            </div>
            <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-emerald-400" />
              <span>Catch rate of known attacks</span>
            </div>
          </div>

          {/* FALSE POSITIVE RATE */}
          <div className="p-4 rounded bg-surface-secondary border border-border-subtle">
            <div className="text-[10px] text-slate-500 uppercase mb-1">
              FALSE POSITIVE RATE
            </div>
            <div className="text-2xl font-bold text-amber-400 tabular-nums">
              {falsePositiveRate}%
            </div>
            <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
              <TrendingDown className="w-3 h-3 text-amber-400" />
              <span>Genuine users challenged</span>
            </div>
          </div>

          {/* REVIEW VOLUME */}
          <div className="p-4 rounded bg-surface-secondary border border-border-subtle">
            <div className="text-[10px] text-slate-500 uppercase mb-1">
              REVIEW QUEUE LOAD
            </div>
            <div className="text-2xl font-bold text-accent-cyan tabular-nums">
              {reviewQueueVolume} <span className="text-xs text-slate-400">cases/hr</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-1">
              Estimated analyst capacity
            </div>
          </div>

          {/* POTENTIAL EXPOSURE */}
          <div className="p-4 rounded bg-surface-secondary border border-border-subtle">
            <div className="text-[10px] text-slate-500 uppercase mb-1">
              POTENTIAL EXPOSURE
            </div>
            <div className="text-2xl font-bold text-red-400 tabular-nums">
              {formatINR(potentialExposure)}
            </div>
            <div className="text-[10px] text-slate-400 mt-1">
              Uncaught leakage estimate
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 36 & 37: ATTACK SEQUENCE PLAYOUT */}
      <div className="bg-surface/80 border border-border-subtle rounded-lg p-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-border-subtle">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white font-semibold tracking-wider">
                CINEMATIC ATTACK SEQUENCE // STAGED ESCALATION
              </span>
              {isSimulatingAttack && (
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              )}
            </div>
            <div className="text-slate-500 text-[10px] mt-0.5">
              10-STEP ATTACK REPLAY • ESSENTIAL HACKATHON DEMO PIPELINE
            </div>
          </div>

          {/* Manual Generator Buttons as requested in Section 36 */}
          <div className="flex flex-wrap items-center gap-2 text-[11px]">
            <button
              onClick={generateNormalTxn}
              className="px-3 py-1.5 rounded bg-surface-secondary hover:bg-surface border border-border-subtle text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>GENERATE NORMAL</span>
            </button>

            <button
              onClick={generateHighRiskTxn}
              className="px-3 py-1.5 rounded bg-surface-secondary hover:bg-surface border border-border-subtle text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-orange-400" />
              <span>GENERATE HIGH RISK</span>
            </button>

            <button
              onClick={resetSimulation}
              className="px-3 py-1.5 rounded bg-surface-secondary hover:bg-surface border border-border-subtle text-slate-400 hover:text-white transition-colors"
            >
              CLEAR
            </button>
          </div>
        </div>

        {/* 10-Step Interactive Visual Flow Track */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {attackSequenceSteps.map((step, idx) => {
            const isCompleted = attackStep > idx;
            const isCurrent = isSimulatingAttack && attackStep === idx;

            let cardStyle = "border-border-subtle bg-surface/40 text-slate-500";
            if (isCurrent) {
              cardStyle =
                idx >= 8
                  ? "border-red-500 bg-red-950/60 text-red-300 shadow-[0_0_20px_rgba(239,68,68,0.4)]"
                  : idx >= 5
                  ? "border-orange-500 bg-orange-950/60 text-orange-300 shadow-[0_0_20px_rgba(249,115,22,0.4)]"
                  : "border-accent-cyan bg-blue-950/50 text-cyan-200 shadow-[0_0_16px_rgba(6,182,212,0.3)]";
            } else if (isCompleted) {
              cardStyle = "border-border-bright bg-surface-secondary text-slate-300";
            }

            return (
              <div
                key={step.label}
                className={`p-3 rounded-md border flex flex-col justify-between transition-all duration-300 min-h-[92px] ${cardStyle}`}
              >
                <div className="flex items-center justify-between text-[9px] mb-1">
                  <span className="font-bold">0{idx + 1}</span>
                  <span className="px-1 rounded bg-surface border border-border-subtle text-[8px] uppercase">
                    {step.tag}
                  </span>
                </div>

                <div className="font-bold text-xs truncate" title={step.label}>
                  {step.label}
                </div>

                <div className="text-[9.5px] leading-tight text-slate-400 truncate mt-1" title={step.desc}>
                  {step.desc}
                </div>
              </div>
            );
          })}
        </div>

        {/* Attack Execution HUD Status */}
        <div className="p-4 rounded-lg bg-surface-secondary/70 border border-border-subtle flex flex-wrap items-center justify-between gap-4 text-slate-400">
          <div className="flex items-center gap-3">
            <span className="text-slate-500">SIMULATION ENGINE:</span>
            <span className={isSimulatingAttack ? "text-orange-400 font-bold" : "text-slate-400"}>
              {isSimulatingAttack ? `STEP ${attackStep + 1} OF 10 [ACTIVE]` : "STANDBY"}
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>EXPOSURE MITIGATED: <strong className="text-emerald-400">₹82,400</strong></span>
            <span>CONFIDENCE: <strong className="text-accent-cyan">94.2%</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}
