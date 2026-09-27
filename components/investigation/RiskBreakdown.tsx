"use client";

import React, { useEffect, useState } from "react";
import { PRIMARY_INVESTIGATION } from "@/lib/mock-data";
import { useSentinel } from "@/lib/context";

export function RiskBreakdown() {
  const { motionEnabled } = useSentinel();
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const factors = PRIMARY_INVESTIGATION.riskFactors;
  const totalDelta = factors.reduce((sum, f) => sum + f.scoreDelta, 0);

  return (
    <div className="w-full bg-surface/80 border border-border-subtle rounded-lg p-5 font-mono text-xs backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-border-subtle/50">
        <div>
          <span className="text-white font-semibold tracking-wider">
            WHY FLAGGED
          </span>
          <span className="text-slate-500 ml-2">// RISK DECOMPOSITION</span>
        </div>
        <div className="text-[11px] text-orange-400 font-bold">
          TOTAL EXPLAINED DELTA: +{totalDelta}
        </div>
      </div>

      {/* Factor Contribution Bars */}
      <div className="space-y-4">
        {factors.map((factor) => {
          const widthPercent = (factor.scoreDelta / 30) * 100;
          return (
            <div key={factor.factor} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-slate-200 font-medium">
                  {factor.factor}
                </span>
                <span className="text-orange-400 font-bold tabular-nums">
                  +{factor.scoreDelta}
                </span>
              </div>

              {/* Progress bar with smooth entrance */}
              <div className="h-2 w-full bg-surface-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: motionEnabled && !animated ? "0%" : `${Math.min(100, widthPercent)}%`,
                  }}
                />
              </div>

              <div className="text-[10px] text-slate-400 leading-normal">
                {factor.description}
              </div>
            </div>
          );
        })}
      </div>

      {/* SHAP summary badge */}
      <div className="mt-5 pt-3 border-t border-border-subtle/50 flex items-center justify-between text-[10px] text-slate-500">
        <div>EXPLAINABLE AI ENGINE: SHAPLEY VALUE DECOMPOSITION</div>
        <div className="text-accent-cyan font-semibold">CONFIDENCE 94.2%</div>
      </div>
    </div>
  );
}
