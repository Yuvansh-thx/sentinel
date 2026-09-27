"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Transaction } from "@/lib/mock-data";
import { formatINR, getRiskColor, getRiskLevel } from "@/lib/utils";
import { RiskIndicator } from "./RiskIndicator";
import { useSentinel } from "@/lib/context";

interface TransactionTableProps {
  transactions: Transaction[];
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  const router = useRouter();
  const { setSelectedTransaction } = useSentinel();

  const handleRowClick = (txn: Transaction) => {
    setSelectedTransaction(txn);
    router.push(`/transactions/${txn.id}`);
  };

  return (
    <div className="w-full bg-surface/70 border border-border-subtle rounded-lg overflow-hidden font-mono text-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border-subtle bg-surface-secondary/80 text-[10px] text-slate-500 uppercase tracking-wider select-none">
              <th className="py-3 px-4 font-semibold">ID</th>
              <th className="py-3 px-3 font-semibold">TIME</th>
              <th className="py-3 px-3 font-semibold">USER</th>
              <th className="py-3 px-3 font-semibold">MERCHANT</th>
              <th className="py-3 px-3 font-semibold">AMOUNT</th>
              <th className="py-3 px-3 font-semibold">DEVICE</th>
              <th className="py-3 px-3 font-semibold">LOCATION</th>
              <th className="py-3 px-4 font-semibold">RISK</th>
              <th className="py-3 px-4 font-semibold">DECISION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle/50 text-slate-300">
            {transactions.map((txn) => {
              const colors = getRiskColor(txn.riskScore);
              const isFlagged = txn.riskScore >= 60;

              return (
                <tr
                  key={txn.id}
                  onClick={() => handleRowClick(txn)}
                  className={`cursor-pointer transition-colors duration-150 group ${
                    isFlagged
                      ? "hover:bg-surface-secondary bg-surface/40"
                      : "hover:bg-surface-secondary/70 bg-surface/20"
                  }`}
                >
                  {/* ID */}
                  <td className="py-2.5 px-4 font-bold text-accent-cyan group-hover:underline">
                    {txn.id}
                  </td>

                  {/* TIME */}
                  <td className="py-2.5 px-3 text-slate-400 tabular-nums">
                    {txn.time}
                  </td>

                  {/* USER */}
                  <td className="py-2.5 px-3 text-slate-300">
                    {txn.userId}
                  </td>

                  {/* MERCHANT */}
                  <td className="py-2.5 px-3 text-slate-300 truncate max-w-[160px]" title={txn.merchantName}>
                    <span className="text-slate-500 mr-1.5">{txn.merchantId}</span>
                    <span>{txn.merchantName}</span>
                  </td>

                  {/* AMOUNT */}
                  <td className="py-2.5 px-3 font-semibold text-white tabular-nums">
                    {formatINR(txn.amount)}
                  </td>

                  {/* DEVICE */}
                  <td className="py-2.5 px-3">
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded border uppercase ${
                        txn.device === "NEW"
                          ? "bg-orange-950/40 text-orange-400 border-orange-800/50 font-bold"
                          : txn.device === "UNKNOWN"
                          ? "bg-red-950/40 text-red-400 border-red-800/50"
                          : "bg-surface-secondary text-slate-400 border-border-subtle"
                      }`}
                    >
                      {txn.device}
                    </span>
                  </td>

                  {/* LOCATION */}
                  <td className="py-2.5 px-3 text-slate-400">
                    {txn.location}
                  </td>

                  {/* RISK */}
                  <td className="py-2.5 px-4">
                    <RiskIndicator score={txn.riskScore} />
                  </td>

                  {/* DECISION */}
                  <td className="py-2.5 px-4">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded border tracking-wider ${
                        txn.decision === "APPROVE"
                          ? "bg-emerald-950/40 text-emerald-400 border-emerald-800/50"
                          : txn.decision === "REVIEW"
                          ? "bg-amber-950/40 text-amber-400 border-amber-800/50"
                          : "bg-red-950/40 text-red-400 border-red-800/50"
                      }`}
                    >
                      {txn.decision}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="p-3 bg-surface-secondary/50 border-t border-border-subtle flex items-center justify-between text-[10px] text-slate-500">
        <div>CLICK ROW TO LAUNCH FORENSIC INVESTIGATION HUD</div>
        <div>REAL-TIME SENTINEL LEDGER BUFFER</div>
      </div>
    </div>
  );
}
