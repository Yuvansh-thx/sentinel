"use client";

import React, { useState } from "react";
import { MOCK_ANALYTICS } from "@/lib/mock-data";

export function RiskDistribution() {
  const [hoveredTier, setHoveredTier] = useState<string | null>(null);

  const tiers = MOCK_ANALYTICS.riskDistribution;
  const activeData = tiers.find((t) => t.tier === hoveredTier) || tiers[2]; // Default highlight HIGH

  return (
    <div className="w-full bg-surface/70 border border-border-subtle rounded-lg p-5 backdrop-blur-sm font-mono text-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-border-subtle/50 text-slate-400">
        <div>
          <span className="text-white font-semibold tracking-wider">
            RISK SCORE DISTRIBUTION
          </span>
          <span className="text-slate-500 ml-2">// 24H SPECTRUM</span>
        </div>
        <div className="text-[10px] text-slate-400">
          HOVER REGION TO INSPECT EXPOSURE
        </div>
      </div>

      {/* Smooth Horizontal Segmented Bar */}
      <div className="w-full h-8 bg-surface-secondary rounded flex overflow-hidden p-1 gap-1 border border-border-subtle">
        {tiers.map((t) => (
          <div
            key={t.tier}
            onMouseEnter={() => setHoveredTier(t.tier)}
            onMouseLeave={() => setHoveredTier(null)}
            className="h-full rounded-sm cursor-pointer transition-all duration-200 relative group flex items-center justify-center"
            style={{
              width: `${t.percent}%`,
              backgroundColor: t.color,
              opacity: hoveredTier && hoveredTier !== t.tier ? 0.35 : 0.85,
            }}
          >
            {t.percent > 10 && (
              <span className="text-[10px] font-bold text-slate-950 truncate px-1 select-none">
                {t.tier} ({t.percent}%)
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Detailed Horizontal Breakdown Rows as specified:
          LOW █████████████████
          MEDIUM ██████
          HIGH ███
          CRITICAL █
      */}
      <div className="mt-4 space-y-2">
        {tiers.map((t) => {
          const isSelected = hoveredTier === t.tier;
          return (
            <div
              key={t.tier}
              onMouseEnter={() => setHoveredTier(t.tier)}
              onMouseLeave={() => setHoveredTier(null)}
              className={`p-2 rounded flex items-center justify-between transition-colors cursor-pointer ${
                isSelected ? "bg-surface-secondary border border-border-bright" : "hover:bg-surface-secondary/50"
              }`}
            >
              <div className="flex items-center gap-3 w-40">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: t.color }}
                />
                <span className="text-white font-semibold">{t.tier}</span>
                <span className="text-slate-500 text-[10px]">{t.range}</span>
              </div>

              {/* Progress representation */}
              <div className="flex-1 mx-4 h-2 bg-surface-secondary rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${t.percent}%`, backgroundColor: t.color }}
                />
              </div>

              {/* Metrics */}
              <div className="flex items-center gap-6 text-right tabular-nums text-slate-300">
                <span className="w-16">{t.count.toLocaleString()} txns</span>
                <span className="w-12 font-bold">{t.percent}%</span>
                <span className="w-20 text-slate-400">{t.exposure}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Inspector Card */}
      <div className="mt-4 pt-3 border-t border-border-subtle/50 flex items-center justify-between text-[11px] text-slate-400">
        <div>
          SELECTED TIER: <strong className="text-white">{activeData.tier}</strong> ({activeData.range})
        </div>
        <div className="flex items-center gap-4">
          <span>TXNS: <strong className="text-slate-200">{activeData.count.toLocaleString()}</strong></span>
          <span>SHARE: <strong className="text-accent-cyan">{activeData.percent}%</strong></span>
          <span>EXPOSURE: <strong className="text-orange-400">{activeData.exposure}</strong></span>
        </div>
      </div>
    </div>
  );
}
