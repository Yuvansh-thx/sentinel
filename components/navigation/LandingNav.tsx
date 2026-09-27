"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Activity } from "lucide-react";
import { useSentinel } from "@/lib/context";
import { EnterSentinelButton } from "./EnterSentinelButton";

export function LandingNav() {
  const { motionEnabled, toggleMotion } = useSentinel();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-border-subtle/40 bg-background/80 backdrop-blur-md px-6 lg:px-16 flex items-center justify-between">
      {/* Brand */}
      <div className="flex items-center gap-10">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center font-mono text-[10px] font-bold text-white shadow-[0_0_12px_rgba(37,99,235,0.6)]">
            S
          </div>
          <span className="font-mono text-sm tracking-wider font-semibold text-white group-hover:text-accent-cyan transition-colors">
            SENTINEL
          </span>
        </Link>

        {/* Minimal Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono text-slate-400">
          <Link href="/#product" className="hover:text-slate-200 transition-colors">
            PRODUCT
          </Link>
          <Link href="/analytics" className="hover:text-slate-200 transition-colors">
            INTELLIGENCE
          </Link>
          <Link href="/network" className="hover:text-slate-200 transition-colors">
            NETWORK
          </Link>
          <Link href="/models" className="hover:text-slate-200 transition-colors">
            ABOUT
          </Link>
        </nav>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-6">
        {/* Motion Toggle (Section 15) */}
        <button
          onClick={toggleMotion}
          className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface border border-border-subtle text-[10px] font-mono text-slate-400 hover:text-slate-200 hover:border-slate-600 transition-colors"
          title="Toggle UI Motion"
        >
          <span>MOTION:</span>
          <span className={motionEnabled ? "text-accent-cyan font-bold" : "text-slate-500"}>
            {motionEnabled ? "ON" : "OFF"}
          </span>
        </button>

        {/* Live System Indicator */}
        <div className="hidden lg:flex items-center gap-2 text-[11px] font-mono text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-300">SYSTEM ONLINE</span>
        </div>

        {/* Main CTA with expanding data field transition */}
        <EnterSentinelButton size="default" />
      </div>
    </header>
  );
}
