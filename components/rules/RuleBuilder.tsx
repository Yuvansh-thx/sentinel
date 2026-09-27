"use client";

import React, { useState } from "react";
import { SlidersHorizontal, Plus, Check, Play, History, Save, Trash2 } from "lucide-react";
import { MOCK_RULES, Rule } from "@/lib/mock-data";

export function RuleBuilder() {
  const [rules, setRules] = useState<Rule[]>(MOCK_RULES);
  const [activeTab, setActiveTab] = useState<"ACTIVE" | "CREATE">("ACTIVE");

  // Builder form state
  const [ruleName, setRuleName] = useState("High Velocity Rapid Escalation");
  const [ruleDesc, setRuleDesc] = useState("Detects burst transactions over ₹50k on recently bound hardware.");
  const [conditions, setConditions] = useState([
    { field: "Transaction amount", operator: ">", value: "₹50,000" },
    { field: "Device", operator: "is", value: "NEW" },
    { field: "Velocity 10m", operator: ">", value: "5" },
  ]);
  const [riskDelta, setRiskDelta] = useState(30);
  const [action, setAction] = useState<"ALLOW" | "REVIEW" | "BLOCK">("REVIEW");

  const [testResult, setTestResult] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleTest = () => {
    setTestResult("RULE VALIDATED: MATCHED 142/4820 HISTORICAL FRAUD TXNS (PRECISION 96.8%)");
    setTimeout(() => setTestResult(null), 5000);
  };

  const handleBacktest = () => {
    setTestResult("BACKTEST 90-DAY COMPLETE: 0.04% FALSE POSITIVE RATE ACROSS 4.8M TRANSACTIONS");
    setTimeout(() => setTestResult(null), 5000);
  };

  const handleSave = () => {
    const newRule: Rule = {
      id: `R-${Math.floor(Math.random() * 800 + 200)}`,
      name: ruleName,
      description: ruleDesc,
      enabled: true,
      conditions: [...conditions],
      consequence: {
        riskDelta,
        action,
      },
      triggerCount: 0,
      lastTriggered: "Just now",
    };
    setRules([newRule, ...rules]);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setActiveTab("ACTIVE");
    }, 1500);
  };

  const toggleRule = (id: string) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    );
  };

  return (
    <div className="w-full font-mono text-xs space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border-subtle">
        <div>
          <h1 className="text-2xl font-light text-white tracking-tight">
            RISK RULES
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Programmatic behavioral policies and deterministic mitigation rules.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-2 p-1 rounded bg-surface border border-border-subtle">
          <button
            onClick={() => setActiveTab("ACTIVE")}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeTab === "ACTIVE"
                ? "bg-accent-blue text-white font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            ACTIVE POLICIES ({rules.length})
          </button>
          <button
            onClick={() => setActiveTab("CREATE")}
            className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 ${
              activeTab === "CREATE"
                ? "bg-accent-blue text-white font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>NEW RULE</span>
          </button>
        </div>
      </div>

      {activeTab === "CREATE" ? (
        /* Visual Rule Grammar Builder */
        <div className="bg-surface/80 border border-border-subtle rounded-lg p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
            <span className="text-white font-semibold tracking-wider">
              DECLARATIVE RULE BUILDER
            </span>
            <span className="text-slate-500 text-[10px]">
              SYNTAX: SENTINEL-EXPR-v1
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] text-slate-500 block mb-1">RULE NAME</label>
              <input
                type="text"
                value={ruleName}
                onChange={(e) => setRuleName(e.target.value)}
                className="w-full bg-surface-secondary border border-border-subtle rounded px-3 py-2 text-white focus:outline-none focus:border-accent-cyan"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-500 block mb-1">DESCRIPTION</label>
              <input
                type="text"
                value={ruleDesc}
                onChange={(e) => setRuleDesc(e.target.value)}
                className="w-full bg-surface-secondary border border-border-subtle rounded px-3 py-2 text-white focus:outline-none focus:border-accent-cyan"
              />
            </div>
          </div>

          {/* IF ... AND ... AND ... Block */}
          <div className="p-4 rounded-lg bg-surface-secondary/70 border border-border-subtle space-y-3">
            <div className="text-accent-cyan font-bold text-sm tracking-wider">
              IF
            </div>

            {conditions.map((cond, idx) => (
              <div key={idx} className="flex items-center gap-2 pl-4">
                {idx > 0 && (
                  <span className="text-blue-400 font-bold w-12 text-center text-xs">
                    AND
                  </span>
                )}
                {idx === 0 && <span className="w-12" />}

                <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    value={cond.field}
                    onChange={(e) => {
                      const updated = [...conditions];
                      updated[idx].field = e.target.value;
                      setConditions(updated);
                    }}
                    className="bg-surface border border-border-subtle rounded px-2.5 py-1.5 text-white"
                  />
                  <select
                    value={cond.operator}
                    onChange={(e) => {
                      const updated = [...conditions];
                      updated[idx].operator = e.target.value;
                      setConditions(updated);
                    }}
                    className="bg-surface border border-border-subtle rounded px-2.5 py-1.5 text-accent-cyan"
                  >
                    <option value=">">&gt; (GREATER THAN)</option>
                    <option value="<">&lt; (LESS THAN)</option>
                    <option value="=">= (EQUALS)</option>
                    <option value="is">IS</option>
                    <option value="in">IN SET</option>
                  </select>
                  <input
                    type="text"
                    value={cond.value}
                    onChange={(e) => {
                      const updated = [...conditions];
                      updated[idx].value = e.target.value;
                      setConditions(updated);
                    }}
                    className="bg-surface border border-border-subtle rounded px-2.5 py-1.5 text-amber-300 font-bold"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* THEN ... ACTION ... Block */}
          <div className="p-4 rounded-lg bg-surface-secondary/70 border border-border-subtle space-y-3">
            <div className="text-orange-400 font-bold text-sm tracking-wider">
              THEN
            </div>

            <div className="pl-4 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                <span className="text-slate-400">RISK ADJUSTMENT:</span>
                <span className="text-orange-400 font-bold text-sm">+{riskDelta}</span>
                <input
                  type="range"
                  min="5"
                  max="60"
                  step="5"
                  value={riskDelta}
                  onChange={(e) => setRiskDelta(Number(e.target.value))}
                  className="w-32 accent-orange-500"
                />
              </div>

              <div className="flex items-center gap-3">
                <span className="text-slate-400">POLICY ACTION:</span>
                <select
                  value={action}
                  onChange={(e) => setAction(e.target.value as any)}
                  className="bg-surface border border-border-subtle rounded px-3 py-1.5 text-white font-bold"
                >
                  <option value="ALLOW">ALLOW (WHITELIST)</option>
                  <option value="REVIEW">MANUAL REVIEW (HOLD)</option>
                  <option value="BLOCK">BLOCK & ISOLATE</option>
                </select>
              </div>
            </div>
          </div>

          {/* Feedback banner */}
          {testResult && (
            <div className="p-3 rounded bg-blue-950/60 border border-accent-blue text-accent-cyan text-xs font-semibold animate-fadeIn">
              {testResult}
            </div>
          )}

          {/* Action Buttons: TEST, BACKTEST, SAVE as requested */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border-subtle">
            <div className="flex items-center gap-3">
              <button
                onClick={handleTest}
                className="px-4 py-2 rounded bg-surface hover:bg-surface-secondary border border-border-subtle text-slate-200 hover:text-white flex items-center gap-2 transition-colors"
              >
                <Play className="w-3.5 h-3.5 text-emerald-400" />
                <span>TEST</span>
              </button>

              <button
                onClick={handleBacktest}
                className="px-4 py-2 rounded bg-surface hover:bg-surface-secondary border border-border-subtle text-slate-200 hover:text-white flex items-center gap-2 transition-colors"
              >
                <History className="w-3.5 h-3.5 text-accent-cyan" />
                <span>BACKTEST</span>
              </button>
            </div>

            <button
              onClick={handleSave}
              className="px-6 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center gap-2 transition-all shadow-[0_0_16px_rgba(37,99,235,0.4)]"
            >
              <Save className="w-4 h-4" />
              <span>{savedSuccess ? "SAVED TO LEDGER" : "SAVE RULE"}</span>
            </button>
          </div>
        </div>
      ) : (
        /* Active Policies List */
        <div className="space-y-3">
          {rules.map((rule) => (
            <div
              key={rule.id}
              className={`p-5 rounded-lg border transition-all ${
                rule.enabled
                  ? "bg-surface/80 border-border-subtle"
                  : "bg-surface/30 border-border-subtle/50 opacity-60"
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-white text-sm">
                      {rule.name}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      [{rule.id}]
                    </span>
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded border uppercase font-bold ${
                        rule.consequence.action === "BLOCK"
                          ? "bg-red-950/40 text-red-400 border-red-800"
                          : "bg-amber-950/40 text-amber-400 border-amber-800"
                      }`}
                    >
                      {rule.consequence.action} (+{rule.consequence.riskDelta} RISK)
                    </span>
                  </div>
                  <div className="text-slate-400 text-xs mt-1 font-sans">
                    {rule.description}
                  </div>
                </div>

                {/* Enable toggle */}
                <button
                  onClick={() => toggleRule(rule.id)}
                  className={`px-3 py-1 rounded text-[11px] font-semibold border transition-colors ${
                    rule.enabled
                      ? "bg-emerald-950/40 border-emerald-700 text-emerald-400"
                      : "bg-surface-secondary border-slate-700 text-slate-500"
                  }`}
                >
                  {rule.enabled ? "ENABLED" : "DISABLED"}
                </button>
              </div>

              {/* Conditions Summary */}
              <div className="p-3 rounded bg-surface-secondary text-slate-300 text-[11px] space-y-1">
                {rule.conditions.map((cond, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-slate-500 w-8">{idx === 0 ? "IF" : "AND"}</span>
                    <span className="text-slate-200">{cond.field}</span>
                    <span className="text-accent-cyan">{cond.operator}</span>
                    <span className="text-amber-300 font-semibold">{cond.value}</span>
                  </div>
                ))}
              </div>

              {/* Stats Footer */}
              <div className="mt-3 pt-2 border-t border-border-subtle/50 flex items-center justify-between text-[10px] text-slate-500">
                <div>
                  TRIGGER COUNT: <strong className="text-slate-300">{rule.triggerCount}</strong>
                </div>
                <div>
                  LAST TRIGGERED: <strong className="text-slate-300">{rule.lastTriggered}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
