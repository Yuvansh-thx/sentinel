"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, AlertTriangle, ShieldX, Check } from "lucide-react";
import { Transaction } from "@/lib/mock-data";
import { formatINR } from "@/lib/utils";

interface DecisionPanelProps {
  transaction: Transaction;
}

export function DecisionPanel({ transaction }: DecisionPanelProps) {
  const [decisionState, setDecisionState] = useState<"NONE" | "APPROVE" | "REVIEW" | "BLOCK">("NONE");
  const [analystNote, setAnalystNote] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const handleDecision = (type: "APPROVE" | "REVIEW" | "BLOCK") => {
    setDecisionState(type);
    setConfirmed(true);
    setTimeout(() => setConfirmed(false), 3000);
  };

  return (
    <div className="w-full bg-surface/90 border border-border-subtle rounded-lg p-6 font-mono text-xs backdrop-blur-md mb-6">
      {/* Back Link & Breadcrumb */}
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-border-subtle">
        <Link
          href="/transactions"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>TRANSACTIONS</span>
        </Link>
        <div className="flex items-center gap-2 text-slate-500">
          <span>INVESTIGATION CASE:</span>
          <strong className="text-white">{transaction.id}</strong>
        </div>
      </div>

      {/* Main Headline Metric Display */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Amount & Risk Badge */}
        <div className="md:col-span-6 space-y-2">
          <div className="text-[11px] text-slate-400 uppercase tracking-wider">
            AUTHORIZATION VALUE
          </div>
          <div className="text-4xl md:text-5xl font-bold text-white tracking-tight tabular-nums">
            {formatINR(transaction.amount)}
          </div>
          <div className="flex items-center gap-3 pt-1">
            <span className="text-2xl font-bold text-orange-400 font-mono">
              {transaction.riskScore} <span className="text-slate-500 text-lg font-normal">/ 100</span>
            </span>
            <span className="px-2.5 py-1 rounded bg-orange-950/60 border border-orange-800 text-orange-400 font-bold uppercase text-[11px] tracking-wider">
              HIGH RISK
            </span>
            <span className="text-slate-500 text-[11px]">
              • {transaction.channel} via {transaction.location}
            </span>
          </div>
        </div>

        {/* Decision Controls */}
        <div className="md:col-span-6 flex flex-col items-start md:items-end gap-3">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider">
            ANALYST DECISION OVERRIDE
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => handleDecision("APPROVE")}
              className={`px-4 py-2.5 rounded border font-semibold flex items-center gap-2 transition-all ${
                decisionState === "APPROVE"
                  ? "bg-emerald-600 border-emerald-500 text-white shadow-[0_0_16px_rgba(16,185,129,0.4)]"
                  : "bg-surface-secondary border-border-subtle hover:border-emerald-700 text-emerald-400 hover:bg-emerald-950/20"
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>APPROVE</span>
            </button>

            <button
              onClick={() => handleDecision("REVIEW")}
              className={`px-4 py-2.5 rounded border font-semibold flex items-center gap-2 transition-all ${
                decisionState === "REVIEW"
                  ? "bg-amber-600 border-amber-500 text-white shadow-[0_0_16px_rgba(245,158,11,0.4)]"
                  : "bg-surface-secondary border-border-subtle hover:border-amber-700 text-amber-400 hover:bg-amber-950/20"
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>REVIEW (HOLD)</span>
            </button>

            <button
              onClick={() => handleDecision("BLOCK")}
              className={`px-4 py-2.5 rounded border font-semibold flex items-center gap-2 transition-all ${
                decisionState === "BLOCK"
                  ? "bg-red-600 border-red-500 text-white shadow-[0_0_16px_rgba(239,68,68,0.4)]"
                  : "bg-surface-secondary border-border-subtle hover:border-red-700 text-red-400 hover:bg-red-950/20"
              }`}
            >
              <ShieldX className="w-4 h-4" />
              <span>BLOCK & QUARANTINE</span>
            </button>
          </div>

          {confirmed && (
            <div className="text-[11px] text-accent-cyan flex items-center gap-1.5 animate-fadeIn">
              <Check className="w-3.5 h-3.5" />
              <span>DECISION RECORDED IN AUDIT LEDGER [{decisionState}]</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
