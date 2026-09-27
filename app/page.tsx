"use client";

import React from "react";
import { LandingNav } from "@/components/navigation/LandingNav";
import { ScrollStory } from "@/components/creative/ScrollStory";
import { DataParticles } from "@/components/creative/DataParticles";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden sentinel-grid">
      {/* Background data particles */}
      <DataParticles density={50} />

      {/* Minimal Top Navigation */}
      <LandingNav />

      {/* Main Cinematic Scroll Story */}
      <ScrollStory />

      {/* Minimal Footer */}
      <footer className="w-full border-t border-border-subtle/50 py-8 px-6 lg:px-24 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-500 relative z-10 bg-background/80 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="text-white font-bold">SENTINEL</span>
          <span>// REAL-TIME TRANSACTION INTELLIGENCE</span>
        </div>
        <div className="flex items-center gap-6">
          <span>LATENCY: &lt;4.2ms</span>
          <span>PR-AUC: 0.94</span>
          <span>STATUS: ONLINE</span>
        </div>
      </footer>
    </main>
  );
}
