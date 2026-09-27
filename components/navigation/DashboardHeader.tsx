"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Command, Radio, Zap } from "lucide-react";
import { useSentinel } from "@/lib/context";

export function DashboardHeader() {
  const { kpis, setCommandPaletteOpen, isSimulatingAttack } = useSentinel();
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString("en-IN", { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-14 border-b border-border-subtle bg-surface/90 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30 font-mono text-xs">
      {/* Left Metadata Readout */}
      <div className="flex items-center gap-4 lg:gap-8">
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-white tracking-wider">
          <span className="text-accent-blue">SENTINEL</span>
          <span className="text-slate-600">//</span>
        </Link>

        {/* Pulsing LIVE Indicator */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-emerald-400 font-semibold tracking-wider">LIVE</span>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-slate-400">
          <span className="text-slate-600">•</span>
          <span className="text-slate-200">SYSTEM OPERATIONAL</span>
        </div>

        <div className="hidden md:flex items-center gap-2 text-slate-400">
          <span className="text-slate-600">•</span>
          <span>MODEL <strong className="text-accent-cyan">v1.4.2</strong></span>
        </div>

        <div className="hidden xl:flex items-center gap-2 text-slate-400">
          <span className="text-slate-600">•</span>
          <span>
            TRANSACTIONS <strong className="text-white tabular-nums">{kpis.transactions.toLocaleString()}</strong>
          </span>
        </div>

        {/* Live Attack Warning Banner if running */}
        {isSimulatingAttack && (
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-orange-950/80 border border-orange-700/60 text-orange-400 animate-pulse text-[11px]">
            <Radio className="w-3 h-3 text-orange-500" />
            <span>ATTACK SIMULATION ACTIVE</span>
          </div>
        )}
      </div>

      {/* Right Search & Command Palette trigger */}
      <div className="flex items-center gap-3">
        <div className="hidden lg:flex items-center gap-2 text-slate-500 text-[11px]">
          <span>IST:</span>
          <span className="text-slate-300 tabular-nums">{timeStr}</span>
        </div>

        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="flex items-center gap-3 px-3 py-1.5 rounded bg-surface-secondary hover:bg-surface-tertiary border border-border-subtle hover:border-slate-600 text-slate-400 hover:text-slate-200 transition-colors text-[11px]"
        >
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden sm:inline">Search intelligence or transactions...</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-surface border border-slate-700 text-[10px] text-slate-400 font-sans">
            <Command className="w-2.5 h-2.5" /> K
          </kbd>
        </button>
      </div>
    </header>
  );
}
