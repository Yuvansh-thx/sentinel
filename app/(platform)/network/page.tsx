"use client";

import React from "react";
import { EntityGraph } from "@/components/network/EntityGraph";
import { Share2, Network, ShieldCheck } from "lucide-react";

export default function EntityNetworkPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border-subtle">
        <div>
          <h1 className="text-2xl md:text-3xl font-light text-white tracking-tight">
            ENTITY RELATIONSHIP GRAPH
          </h1>
          <p className="text-slate-400 text-xs mt-1 font-mono">
            Interactive graph topology revealing hidden multi-hop fraud vectors, shared devices, and syndicated rings.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
          <span>GRAPH ENGINE: <strong className="text-accent-cyan">REACT FLOW v12</strong></span>
          <span>CLUSTER ANALYSIS: <strong className="text-orange-400">ISOLATED</strong></span>
        </div>
      </div>

      {/* Entity Graph full view */}
      <EntityGraph isCompact={false} />
    </div>
  );
}
