"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ShieldAlert, Cpu, Activity, GitBranch, Terminal } from "lucide-react";
import { DigitalBird } from "./DigitalBird";
import { HeroFlow } from "./HeroFlow";
import { EnterSentinelButton } from "@/components/navigation/EnterSentinelButton";

export function ScrollStory() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalHeight = containerRef.current.offsetHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      const progress = Math.max(0, Math.min(1, -rect.top / totalHeight));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Scroll-driven Digital Bird */}
      <DigitalBird scrollProgress={scrollProgress} />

      {/* Progress telemetry rail on the right side */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end gap-3 pointer-events-none">
        <div className="text-[10px] font-mono text-slate-500 tracking-wider">
          STORY_TRAJECTORY
        </div>
        <div className="w-1 h-36 bg-slate-800 rounded-full overflow-hidden relative">
          <div
            className="w-full bg-gradient-to-b from-accent-blue via-accent-cyan to-orange-500 rounded-full transition-all duration-150"
            style={{ height: `${scrollProgress * 100}%` }}
          />
        </div>
        <div className="text-[10px] font-mono text-accent-cyan tabular-nums">
          {Math.round(scrollProgress * 100)}%
        </div>
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-6 lg:px-24 pt-24 pb-16 relative z-10">
        <div className="max-w-5xl">
          <h1 className="text-6xl md:text-8xl font-light tracking-tight text-white mb-6 leading-none">
            SURFACE
            <br />
            <span className="text-slate-400 font-normal">THE SIGNAL.</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 max-w-2xl font-light leading-relaxed mb-10">
            Real-time transaction intelligence for detecting anomalous financial behavior.
            Engineered for high-throughput payment rails, cross-border settlement, and instant fraud isolation.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <EnterSentinelButton size="large" />

            <Link
              href="/transactions/TX-92831"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded bg-surface/90 hover:bg-surface-secondary border border-border-subtle hover:border-slate-600 text-slate-300 font-mono text-xs tracking-wider transition-colors duration-200"
            >
              <span>INSPECT CASE TX-92831</span>
              <span className="text-orange-400 font-bold">● 87</span>
            </Link>
          </div>
        </div>

        {/* Animated Hero Data Flow Diagram */}
        <HeroFlow />
      </section>

      {/* SECTION 01 */}
      <section className="min-h-screen flex items-center px-6 lg:px-24 py-24 relative z-10 border-t border-border-subtle/30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full max-w-7xl mx-auto items-center">
          <div className="lg:col-span-6">
            <div className="text-xs font-mono text-accent-cyan tracking-widest uppercase mb-3">
              SECTION 01 // INGESTION
            </div>
            <h2 className="text-4xl md:text-6xl font-light text-white tracking-tight leading-tight mb-6">
              EVERY TRANSACTION
              <br />
              <span className="text-accent-blue font-normal">LEAVES A SIGNAL.</span>
            </h2>
            <p className="text-slate-400 text-base leading-relaxed mb-6 font-light">
              Raw telemetry flows into Sentinel within single-digit milliseconds. Device tokens, geo-coordinates,
              typing cadence, network egress routes, and merchant identifiers are parsed before transaction authorization.
            </p>
            <div className="grid grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-4 rounded bg-surface/60 border border-border-subtle">
                <div className="text-slate-500 mb-1">LATENCY BUDGET</div>
                <div className="text-lg text-white font-semibold">&lt; 4.2ms</div>
                <div className="text-[10px] text-accent-cyan mt-1">p99 across 1.2M TPS</div>
              </div>
              <div className="p-4 rounded bg-surface/60 border border-border-subtle">
                <div className="text-slate-500 mb-1">RAW TELEMETRY</div>
                <div className="text-lg text-white font-semibold">142 Params</div>
                <div className="text-[10px] text-slate-400 mt-1">Extracted per transaction</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="p-6 rounded-lg bg-surface/90 border border-border-subtle font-mono text-xs">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-border-subtle text-slate-400">
                <span className="text-accent-cyan">STREAM_INGEST // ACTIVE</span>
                <span>TX-92831</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 rounded bg-surface-secondary">
                  <span className="text-slate-400">AMOUNT</span>
                  <span className="text-white font-semibold">₹82,400</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded bg-surface-secondary">
                  <span className="text-slate-400">CHANNEL</span>
                  <span className="text-blue-400">BANK_TRANSFER (IMPS)</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded bg-surface-secondary">
                  <span className="text-slate-400">DEVICE HARDWARE</span>
                  <span className="text-orange-400 font-semibold">D-8812 [FIRST SEEN]</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded bg-surface-secondary">
                  <span className="text-slate-400">GEO COORDINATE</span>
                  <span className="text-slate-300">19.0760° N, 72.8777° E (Mumbai)</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded bg-surface-secondary">
                  <span className="text-slate-400">ORIGIN IP</span>
                  <span className="text-cyan-400">103.21.244.89 (Datacenter Egress)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 02 */}
      <section className="min-h-screen flex items-center px-6 lg:px-24 py-24 relative z-10 border-t border-border-subtle/30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full max-w-7xl mx-auto items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="p-6 rounded-lg bg-surface/90 border border-border-subtle relative overflow-hidden font-mono text-xs">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-border-subtle text-slate-400">
                <span className="text-accent-blue">GRAPH_CORRELATION</span>
                <span>TOPOLOGY: 6 NODES</span>
              </div>
              <div className="space-y-2.5">
                <div className="p-3 rounded border border-blue-900/60 bg-blue-950/20">
                  <div className="text-[10px] text-blue-400 font-bold">USER ENTITY</div>
                  <div className="text-white text-sm">U-1932 (Ananya Sharma)</div>
                  <div className="text-[10px] text-slate-400 mt-1">Historically trusted, 421 days account maturity</div>
                </div>
                <div className="pl-4 border-l-2 border-dashed border-slate-700 space-y-2">
                  <div className="p-2.5 rounded bg-surface-secondary text-slate-300">
                    <span className="text-slate-500">TRUSTED DEVICE:</span> D-1044 (Indore)
                  </div>
                  <div className="p-2.5 rounded bg-orange-950/40 border border-orange-800/40 text-orange-300">
                    <span className="text-orange-500 font-bold">NEW DEVICE:</span> D-8812 (Mumbai) • Bounded 2m ago
                  </div>
                  <div className="p-2.5 rounded bg-red-950/40 border border-red-800/40 text-red-300">
                    <span className="text-red-500 font-bold">IMPOSSIBLE TRAVEL:</span> 650 km in 2m 58s
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="text-xs font-mono text-accent-blue tracking-widest uppercase mb-3">
              SECTION 02 // GRAPH SYNTHESIS
            </div>
            <h2 className="text-4xl md:text-6xl font-light text-white tracking-tight leading-tight mb-6">
              SIGNALS
              <br />
              <span className="text-cyan-400 font-normal">BECOME CONTEXT.</span>
            </h2>
            <p className="text-slate-400 text-base leading-relaxed mb-6 font-light">
              Isolated signals are ambiguous. A ₹82,400 transaction could be legitimate luxury shopping.
              When linked to an unverified hardware token in Mumbai two minutes after an authentic coffee purchase in Indore,
              context transforms data into an unmistakable attack pattern.
            </p>
            <div className="flex items-center gap-3 text-xs font-mono text-slate-300">
              <span className="px-2.5 py-1 rounded bg-surface-secondary border border-border-subtle">
                ENTITY RESOLUTION
              </span>
              <span className="px-2.5 py-1 rounded bg-surface-secondary border border-border-subtle">
                GRAPH HOP EXPANSION
              </span>
              <span className="px-2.5 py-1 rounded bg-surface-secondary border border-border-subtle">
                TEMPORAL COHESION
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 03 */}
      <section className="min-h-screen flex items-center px-6 lg:px-24 py-24 relative z-10 border-t border-border-subtle/30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full max-w-7xl mx-auto items-center">
          <div className="lg:col-span-6">
            <div className="text-xs font-mono text-orange-400 tracking-widest uppercase mb-3">
              SECTION 03 // RISK SCORING
            </div>
            <h2 className="text-4xl md:text-6xl font-light text-white tracking-tight leading-tight mb-6">
              CONTEXT
              <br />
              <span className="text-orange-400 font-normal">BECOMES RISK.</span>
            </h2>
            <p className="text-slate-400 text-base leading-relaxed mb-6 font-light">
              Sentinel’s gradient-boosted decision engine scores transaction risk from 0 to 100 with full explainability.
              Every feature contributes an explicit delta, eliminating black-box opacity.
            </p>
            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center text-slate-400">
                <span>AMOUNT ANOMALY</span>
                <span className="text-orange-400 font-bold">+28</span>
              </div>
              <div className="h-1.5 w-full bg-surface-secondary rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full w-[28%]" />
              </div>

              <div className="flex justify-between items-center text-slate-400">
                <span>NEW DEVICE TOKEN</span>
                <span className="text-orange-400 font-bold">+21</span>
              </div>
              <div className="h-1.5 w-full bg-surface-secondary rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full w-[21%]" />
              </div>

              <div className="flex justify-between items-center text-slate-400">
                <span>TRANSACTION VELOCITY (4x in 4m)</span>
                <span className="text-orange-400 font-bold">+17</span>
              </div>
              <div className="h-1.5 w-full bg-surface-secondary rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full w-[17%]" />
              </div>

              <div className="flex justify-between items-center text-slate-400">
                <span>IMPOSSIBLE TRAVEL GEODELTA</span>
                <span className="text-orange-400 font-bold">+14</span>
              </div>
              <div className="h-1.5 w-full bg-surface-secondary rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full w-[14%]" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <div className="relative p-10 rounded-2xl bg-surface/90 border border-orange-500/50 shadow-[0_0_60px_rgba(249,115,22,0.15)] flex flex-col items-center text-center">
              <div className="text-[11px] font-mono text-orange-400 tracking-widest uppercase mb-2">
                CALCULATED RISK SEVERITY
              </div>
              <div className="text-8xl md:text-9xl font-bold font-mono text-orange-400 tracking-tighter leading-none mb-2">
                87
              </div>
              <div className="px-3 py-1 rounded bg-orange-950/60 border border-orange-800 text-orange-300 font-mono text-xs font-semibold uppercase tracking-wider mb-4">
                HIGH RISK // THRESHOLD EXCEEDED
              </div>
              <div className="text-xs text-slate-400 font-mono max-w-xs">
                Exceeded automated pass boundary (threshold: 70).
                Flagged for mandatory forensic isolation.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 04 */}
      <section className="min-h-screen flex items-center px-6 lg:px-24 py-24 relative z-10 border-t border-border-subtle/30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full max-w-7xl mx-auto items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="p-6 rounded-lg bg-surface/90 border border-border-subtle font-mono text-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
                <span className="text-amber-400">POLICY_ENFORCEMENT</span>
                <span>STATUS: HOLD_ACTIVE</span>
              </div>
              <div className="p-3 rounded bg-amber-950/30 border border-amber-800/50 text-amber-300">
                <div className="font-semibold text-sm mb-1">DECISION: MANUAL REVIEW</div>
                <div>Automated routing triggered Rule R-101. Outflow frozen for 15 minutes.</div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                <div className="p-2 rounded bg-surface-secondary border border-border-subtle text-slate-400">
                  CHALLENGE SENT
                  <div className="text-white font-bold mt-0.5">SMS OTP + BIO</div>
                </div>
                <div className="p-2 rounded bg-surface-secondary border border-border-subtle text-slate-400">
                  SETTLEMENT
                  <div className="text-amber-400 font-bold mt-0.5">ISOLATED</div>
                </div>
                <div className="p-2 rounded bg-surface-secondary border border-border-subtle text-slate-400">
                  DISPUTE RISK
                  <div className="text-red-400 font-bold mt-0.5">99.1% MITIGATED</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="text-xs font-mono text-amber-400 tracking-widest uppercase mb-3">
              SECTION 04 // INTERVENTION
            </div>
            <h2 className="text-4xl md:text-6xl font-light text-white tracking-tight leading-tight mb-6">
              RISK
              <br />
              <span className="text-amber-400 font-normal">BECOMES A DECISION.</span>
            </h2>
            <p className="text-slate-400 text-base leading-relaxed mb-6 font-light">
              High-value fraud cannot wait for end-of-day reconciliation. Sentinel enforces dynamic decisions in-flight:
              approve genuine commerce, step-up suspicious activity, and quarantine catastrophic outflows before ledger settlement.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/rules"
                className="inline-flex items-center gap-2 text-xs font-mono text-accent-cyan hover:underline"
              >
                <span>EXPLORE RISK RULES</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 05 */}
      <section className="min-h-screen flex items-center px-6 lg:px-24 py-24 relative z-10 border-t border-border-subtle/30">
        <div className="w-full max-w-5xl mx-auto text-center flex flex-col items-center">
          <div className="text-xs font-mono text-accent-cyan tracking-widest uppercase mb-4">
            SECTION 05 // SYSTEM MATURATION
          </div>
          <h2 className="text-5xl md:text-7xl font-light text-white tracking-tight leading-none mb-8">
            EVERY DECISION
            <br />
            <span className="text-blue-400 font-normal">BECOMES INTELLIGENCE.</span>
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl font-light leading-relaxed mb-12">
            Analyst confirmations, chargeback reports, and graph traversals feed directly back into Sentinel’s continuous
            learning loop. The network becomes smarter with every transaction processed.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl mb-12 font-mono text-left">
            <div className="p-5 rounded-lg bg-surface/80 border border-border-subtle">
              <div className="text-xs text-slate-500 mb-1">MODEL PR-AUC</div>
              <div className="text-3xl text-white font-bold">0.94</div>
              <div className="text-[11px] text-accent-cyan mt-1">XGBoost v1.4.2 active</div>
            </div>
            <div className="p-5 rounded-lg bg-surface/80 border border-border-subtle">
              <div className="text-xs text-slate-500 mb-1">FALSE POSITIVE RATE</div>
              <div className="text-3xl text-white font-bold">0.08%</div>
              <div className="text-[11px] text-emerald-400 mt-1">Minimizing user friction</div>
            </div>
            <div className="p-5 rounded-lg bg-surface/80 border border-border-subtle">
              <div className="text-xs text-slate-500 mb-1">PROTECTED ASSETS</div>
              <div className="text-3xl text-white font-bold">₹1.12 Cr</div>
              <div className="text-[11px] text-blue-400 mt-1">Live 24h volume</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <EnterSentinelButton size="large" />

            <Link
              href="/simulator"
              className="inline-flex items-center gap-2 px-6 py-4 rounded bg-surface/90 hover:bg-surface-secondary border border-border-subtle text-slate-300 font-mono text-sm tracking-wider transition-colors duration-200"
            >
              <span>LAUNCH SIMULATOR</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
