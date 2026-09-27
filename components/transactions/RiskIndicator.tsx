"use client";

import React from "react";
import { getRiskLevel, getRiskColor } from "@/lib/utils";

interface RiskIndicatorProps {
  score: number;
  showBar?: boolean;
}

export function RiskIndicator({ score, showBar = true }: RiskIndicatorProps) {
  const level = getRiskLevel(score);
  const colors = getRiskColor(score);

  return (
    <div className="inline-flex items-center gap-2 font-mono text-xs tabular-nums select-none">
      {/* Small Severity Dot */}
      <span className={`w-1.5 h-1.5 rounded-full ${colors.dot} shrink-0`} />

      {/* Numeric Score & Level */}
      <span className={`font-bold ${colors.text}`}>{score}</span>
      <span className={`text-[9px] uppercase font-semibold tracking-wider ${colors.text}`}>
        {level}
      </span>

      {/* Horizontal Severity Bar (e.g. 87 ━━━━━━━) */}
      {showBar && (
        <div className="w-12 h-1 bg-surface-secondary rounded-full overflow-hidden shrink-0 hidden sm:block">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${score}%`, backgroundColor: colors.hex }}
          />
        </div>
      )}
    </div>
  );
}
