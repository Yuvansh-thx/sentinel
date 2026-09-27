"use client";

import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  CartesianGrid,
} from "recharts";
import { MOCK_ANALYTICS } from "@/lib/mock-data";
import { formatINR } from "@/lib/utils";

// Custom dark technical tooltip for recharts
function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface/95 border border-border-bright p-2.5 rounded font-mono text-xs shadow-xl backdrop-blur-md">
        <div className="text-[10px] text-slate-500 mb-1">{label}</div>
        {payload.map((item: any, i: number) => (
          <div key={i} className="flex items-center justify-between gap-3">
            <span className="text-slate-300">{item.name}:</span>
            <span className="font-bold text-accent-cyan tabular-nums">
              {typeof item.value === "number" && item.value > 1000
                ? item.value.toLocaleString()
                : item.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export function AnalyticsView() {
  const { fraudRateTrend, fraudByCity, fraudByChannel, decisions } = MOCK_ANALYTICS;

  return (
    <div className="w-full font-mono text-xs space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border-subtle">
        <div>
          <h1 className="text-2xl font-light text-white tracking-tight">
            INTELLIGENCE TELEMETRY & ANALYTICS
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            System-wide fraud metrics, geospatial incidence, and temporal volume distribution.
          </p>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-slate-400">
          <span>WINDOW: <strong className="text-slate-200">24 HOURS</strong></span>
          <span>AGGREGATION: <strong className="text-accent-cyan">HOURLY BINS</strong></span>
        </div>
      </div>

      {/* Row 1: FRAUD RATE & TRANSACTION VOLUME OVER TIME */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-surface/80 border border-border-subtle rounded-lg p-5">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-border-subtle">
            <div>
              <span className="text-white font-semibold tracking-wider">
                FRAUD RATE & VOLUME CORRELATION
              </span>
              <span className="text-slate-500 ml-2">// 24H SPECTRUM</span>
            </div>
            <div className="flex items-center gap-4 text-[10px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded bg-blue-500" /> TOTAL TXNS
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded bg-orange-500" /> FRAUD INCIDENTS
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={fraudRateTrend}>
                <defs>
                  <linearGradient id="volumeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="fraudGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F97316" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#F97316" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#162138" />
                <XAxis dataKey="hour" stroke="#64748B" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={10} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="total"
                  name="Volume"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#volumeGrad)"
                  isAnimationActive={false}
                />
                <Area
                  type="monotone"
                  dataKey="fraud"
                  name="Fraud Count"
                  stroke="#F97316"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#fraudGrad)"
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* DECISION DISTRIBUTION (Linear/Bar, not circular) */}
        <div className="lg:col-span-4 bg-surface/80 border border-border-subtle rounded-lg p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
            <span className="text-white font-semibold tracking-wider">
              POLICY DECISION MATRIX
            </span>
            <span className="text-[10px] text-slate-500">128.4K TXNS</span>
          </div>

          <div className="space-y-4 my-auto py-2">
            {decisions.map((d) => (
              <div key={d.name} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-semibold">{d.name}</span>
                  <div className="flex gap-2">
                    <span className="text-slate-400">{d.count.toLocaleString()}</span>
                    <span className="font-bold text-white tabular-nums">{d.percent}%</span>
                  </div>
                </div>
                <div className="h-2 w-full bg-surface-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${d.percent}%`, backgroundColor: d.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-border-subtle text-[10px] text-slate-500">
            AUTO-POLICY ENFORCEMENT ACCURACY: 99.92%
          </div>
        </div>
      </div>

      {/* Row 2: FRAUD BY LOCATION & FRAUD BY CHANNEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* FRAUD BY LOCATION (CITIES) */}
        <div className="lg:col-span-7 bg-surface/80 border border-border-subtle rounded-lg p-5">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-border-subtle">
            <span className="text-white font-semibold tracking-wider">
              GEOSPATIAL FRAUD CONCENTRATION (BY CITY)
            </span>
            <span className="text-[10px] text-slate-500">RISK INDEX</span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fraudByCity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#162138" vertical={false} />
                <XAxis dataKey="city" stroke="#64748B" fontSize={10} tickLine={false} />
                <YAxis
                  stroke="#64748B"
                  fontSize={10}
                  tickLine={false}
                  tickFormatter={(val) => `₹${val / 1000}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="fraudVolume"
                  name="Loss Prevented"
                  radius={[4, 4, 0, 0]}
                  isAnimationActive={false}
                >
                  {fraudByCity.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.riskIndex >= 70 ? "#F97316" : "#3B82F6"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* FRAUD BY CHANNEL */}
        <div className="lg:col-span-5 bg-surface/80 border border-border-subtle rounded-lg p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
            <span className="text-white font-semibold tracking-wider">
              PAYMENT CHANNEL ANOMALY RATE
            </span>
            <span className="text-[10px] text-slate-500">UPI / CARD / IMPS</span>
          </div>

          <div className="space-y-4 my-auto py-2">
            {fraudByChannel.map((ch) => (
              <div key={ch.name} className="p-3 rounded bg-surface-secondary border border-border-subtle space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold">{ch.name}</span>
                  <span className="text-orange-400 font-bold tabular-nums">
                    {ch.fraudPercent}% Fraud Rate
                  </span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>NETWORK VOLUME SHARE:</span>
                  <span className="text-slate-200">{ch.value}% OF TOTAL</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-border-subtle text-[10px] text-slate-500">
            UPI HIGH VELOCITY ANOMALIES DOMINATE 58% OF FRAUD VECTOR ATTEMPTS
          </div>
        </div>
      </div>
    </div>
  );
}
