"use client";

import React, { useState, useMemo } from "react";
import { TransactionTable } from "@/components/transactions/TransactionTable";
import { TransactionFilters } from "@/components/transactions/TransactionFilters";
import { useSentinel } from "@/lib/context";
import { getRiskLevel } from "@/lib/utils";

export default function TransactionsMonitorPage() {
  const { transactions } = useSentinel();

  const [filters, setFilters] = useState({
    search: "",
    risk: "ALL",
    decision: "ALL",
    location: "ALL",
    device: "ALL",
  });

  const handleReset = () => {
    setFilters({
      search: "",
      risk: "ALL",
      decision: "ALL",
      location: "ALL",
      device: "ALL",
    });
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      // Search text match
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const matches =
          t.id.toLowerCase().includes(query) ||
          t.userId.toLowerCase().includes(query) ||
          t.merchantName.toLowerCase().includes(query) ||
          t.merchantId.toLowerCase().includes(query) ||
          t.ipAddress.toLowerCase().includes(query) ||
          t.deviceId.toLowerCase().includes(query) ||
          t.location.toLowerCase().includes(query);
        if (!matches) return false;
      }

      // Risk level match
      if (filters.risk !== "ALL") {
        const level = getRiskLevel(t.riskScore);
        if (level !== filters.risk) return false;
      }

      // Decision match
      if (filters.decision !== "ALL" && t.decision !== filters.decision) {
        return false;
      }

      // Location match
      if (filters.location !== "ALL" && t.location !== filters.location) {
        return false;
      }

      // Device match
      if (filters.device !== "ALL" && t.device !== filters.device) {
        return false;
      }

      return true;
    });
  }, [transactions, filters]);

  return (
    <div className="space-y-6">
      {/* 24. TRANSACTION MONITOR HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border-subtle">
        <div>
          <h1 className="text-2xl md:text-3xl font-light text-white tracking-tight">
            TRANSACTION MONITOR
          </h1>
          <p className="text-slate-400 text-xs mt-1 font-mono">
            Live transaction activity and risk decisions.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
          <span>BUFFER DEPTH: <strong className="text-slate-200">{transactions.length}</strong></span>
          <span>LIVE STREAM: <strong className="text-accent-cyan">CONNECTED</strong></span>
        </div>
      </div>

      {/* Filter Bar */}
      <TransactionFilters
        filters={filters}
        onFilterChange={setFilters}
        onReset={handleReset}
        resultCount={filteredTransactions.length}
      />

      {/* 25. TRANSACTION TABLE */}
      <TransactionTable transactions={filteredTransactions} />
    </div>
  );
}
