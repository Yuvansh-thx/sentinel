"use client";

import React from "react";
import { Search, Filter, RotateCcw } from "lucide-react";

interface FilterState {
  search: string;
  risk: string;
  decision: string;
  location: string;
  device: string;
}

interface TransactionFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
  resultCount: number;
}

export function TransactionFilters({
  filters,
  onFilterChange,
  onReset,
  resultCount,
}: TransactionFiltersProps) {
  return (
    <div className="w-full bg-surface/80 border border-border-subtle rounded-lg p-4 font-mono text-xs mb-4 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Search Input */}
        <div className="flex-1 min-w-[240px] relative">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by ID, User, Merchant, IP, or Device..."
            value={filters.search}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            className="w-full pl-9 pr-3 py-1.5 rounded bg-surface-secondary border border-border-subtle focus:border-accent-cyan text-white placeholder-slate-500 focus:outline-none text-xs"
          />
        </div>

        {/* Result Counter */}
        <div className="text-slate-400 text-[11px]">
          SHOWING: <strong className="text-white">{resultCount}</strong> TRANSACTIONS
        </div>
      </div>

      {/* Filter Selectors Row */}
      <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-border-subtle/50 text-[11px]">
        {/* Risk Filter */}
        <div className="flex items-center gap-1.5">
          <span className="text-slate-500">RISK:</span>
          <select
            value={filters.risk}
            onChange={(e) => onFilterChange({ ...filters, risk: e.target.value })}
            className="bg-surface-secondary border border-border-subtle text-slate-300 rounded px-2 py-1 focus:outline-none cursor-pointer"
          >
            <option value="ALL">ALL TIERS</option>
            <option value="CRITICAL">CRITICAL (&gt;=80)</option>
            <option value="HIGH">HIGH (60-79)</option>
            <option value="MEDIUM">MEDIUM (30-59)</option>
            <option value="LOW">LOW (&lt;30)</option>
          </select>
        </div>

        {/* Decision Filter */}
        <div className="flex items-center gap-1.5">
          <span className="text-slate-500">DECISION:</span>
          <select
            value={filters.decision}
            onChange={(e) => onFilterChange({ ...filters, decision: e.target.value })}
            className="bg-surface-secondary border border-border-subtle text-slate-300 rounded px-2 py-1 focus:outline-none cursor-pointer"
          >
            <option value="ALL">ALL DECISIONS</option>
            <option value="APPROVE">APPROVE</option>
            <option value="REVIEW">REVIEW</option>
            <option value="BLOCK">BLOCK</option>
          </select>
        </div>

        {/* Location Filter */}
        <div className="flex items-center gap-1.5">
          <span className="text-slate-500">LOCATION:</span>
          <select
            value={filters.location}
            onChange={(e) => onFilterChange({ ...filters, location: e.target.value })}
            className="bg-surface-secondary border border-border-subtle text-slate-300 rounded px-2 py-1 focus:outline-none cursor-pointer"
          >
            <option value="ALL">ALL HUBS</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Indore">Indore</option>
            <option value="Delhi">Delhi</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Pune">Pune</option>
          </select>
        </div>

        {/* Device Status */}
        <div className="flex items-center gap-1.5">
          <span className="text-slate-500">DEVICE:</span>
          <select
            value={filters.device}
            onChange={(e) => onFilterChange({ ...filters, device: e.target.value })}
            className="bg-surface-secondary border border-border-subtle text-slate-300 rounded px-2 py-1 focus:outline-none cursor-pointer"
          >
            <option value="ALL">ALL HARDWARE</option>
            <option value="NEW">NEW HARDWARE</option>
            <option value="TRUSTED">TRUSTED</option>
            <option value="UNKNOWN">UNKNOWN</option>
          </select>
        </div>

        {/* Reset Filter Button */}
        <button
          onClick={onReset}
          className="ml-auto inline-flex items-center gap-1 px-2.5 py-1 rounded bg-surface hover:bg-surface-secondary text-slate-400 hover:text-white transition-colors"
          title="Reset Filters"
        >
          <RotateCcw className="w-3 h-3" />
          <span>RESET</span>
        </button>
      </div>
    </div>
  );
}
