"use client";

import React from "react";
import { Cpu, CheckCircle2, ShieldCheck, Database, Calendar, Zap, AlertCircle } from "lucide-react";
import { MOCK_MODEL_METRICS } from "@/lib/mock-data";

export function ModelPerformance() {
  const model = MOCK_MODEL_METRICS;

  const coreMetrics = [
    { label: "PR-AUC", value: model.prAuc.toFixed(2), sub: "Area under PR curve", color: "text-accent-cyan" },
    { label: "PRECISION", value: `${Math.round(model.precision * 100)}%`, sub: "True positive ratio", color: "text-emerald-400" },
    { label: "RECALL", value: `${Math.round(model.recall * 100)}%`, sub: "Sensitivity to fraud", color: "text-blue-400" },
    { label: "F1 SCORE", value: `${Math.round(model.f1 * 100)}%`, sub: "Harmonic balance", color: "text-purple-400" },
    { label: "ROC-AUC", value: model.rocAuc.toFixed(2), sub: "Global discriminability", color: "text-amber-400" },
  ];

  return (
    <div className="w-full font-mono text-xs space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border-subtle">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-light text-white tracking-tight">
              MODEL PERFORMANCE // {model.name}
            </h1>
            <span className="px-2 py-0.5 rounded bg-blue-950/60 border border-blue-700 text-accent-cyan text-[10px] font-bold">
              ACTIVE PRODUCTION
            </span>
          </div>
          <p className="text-slate-400 text-xs mt-1">
            Gradient boosted decision forest architecture optimized for sub-5ms low latency scoring.
          </p>
        </div>

        {/* DEMO DATA DISCLAIMER as strictly requested */}
        <div className="px-3 py-1.5 rounded bg-orange-950/40 border border-orange-800/60 text-orange-400 flex items-center gap-2 text-[11px] font-bold">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>PROTOTYPE // DEMO DATA</span>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {coreMetrics.map((m) => (
          <div key={m.label} className="p-4 rounded-lg bg-surface/80 border border-border-subtle flex flex-col justify-between">
            <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">
              {m.label}
            </div>
            <div className={`text-3xl font-bold tracking-tight ${m.color} tabular-nums my-1`}>
              {m.value}
            </div>
            <div className="text-[9px] text-slate-500">
              {m.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Feature Importance & Model Metadata */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Feature Importance Bars */}
        <div className="lg:col-span-8 bg-surface/80 border border-border-subtle rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
            <div>
              <span className="text-white font-semibold tracking-wider">
                FEATURE IMPORTANCE
              </span>
              <span className="text-slate-500 ml-2">// SHAP VALUE CONTRIBUTION</span>
            </div>
            <span className="text-[10px] text-slate-500">NORMALIZED (0.0 - 1.0)</span>
          </div>

          <div className="space-y-4">
            {model.features.map((feat) => {
              const widthPct = (feat.importance / 0.3) * 100;
              return (
                <div key={feat.name} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-200 font-semibold">{feat.name}</span>
                    <span className="text-accent-cyan font-bold tabular-nums">
                      {(feat.importance * 100).toFixed(1)}%
                    </span>
                  </div>

                  <div className="h-2 w-full bg-surface-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-accent-cyan rounded-full transition-all duration-500"
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>

                  <div className="text-[10px] text-slate-400">
                    {feat.description}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Model Metadata Panel */}
        <div className="lg:col-span-4 bg-surface/80 border border-border-subtle rounded-lg p-6 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border-subtle text-slate-400">
            <span className="text-white font-semibold tracking-wider">
              MODEL METADATA
            </span>
            <Database className="w-3.5 h-3.5 text-accent-cyan" />
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded bg-surface-secondary/70 border border-border-subtle">
              <div className="text-[10px] text-slate-500">TRAINING DATASET SIZE</div>
              <div className="text-white font-bold mt-0.5">{model.datasetSize}</div>
            </div>

            <div className="p-3 rounded bg-surface-secondary/70 border border-border-subtle">
              <div className="text-[10px] text-slate-500">LAST RETRAINED</div>
              <div className="text-slate-300 font-bold mt-0.5">{model.lastTrained}</div>
            </div>

            <div className="p-3 rounded bg-surface-secondary/70 border border-border-subtle">
              <div className="text-[10px] text-slate-500">INFERENCE LATENCY (p99)</div>
              <div className="text-emerald-400 font-bold mt-0.5">{model.latencyP99}</div>
            </div>

            <div className="p-3 rounded bg-surface-secondary/70 border border-border-subtle">
              <div className="text-[10px] text-slate-500">ALGORITHM ARCHITECTURE</div>
              <div className="text-slate-300 text-[11px] mt-0.5 leading-snug">{model.type}</div>
            </div>
          </div>

          <div className="pt-3 border-t border-border-subtle text-[10px] text-slate-500">
            AUTOMATED RE-TRAINING CADENCE: EVERY 7 DAYS
          </div>
        </div>
      </div>
    </div>
  );
}
