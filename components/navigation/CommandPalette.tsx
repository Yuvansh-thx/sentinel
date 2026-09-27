"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Layers,
  Search,
  SlidersHorizontal,
  Share2,
  BarChart3,
  Flame,
  Activity,
  X,
  Command,
} from "lucide-react";
import { useSentinel } from "@/lib/context";

export function CommandPalette() {
  const router = useRouter();
  const {
    commandPaletteOpen,
    setCommandPaletteOpen,
    simulateAttack,
    toggleMotion,
    motionEnabled,
    transactions,
    setSelectedTransaction,
  } = useSentinel();

  const [query, setQuery] = useState("");

  // Listen for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      } else if (e.key === "Escape" && commandPaletteOpen) {
        setCommandPaletteOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  if (!commandPaletteOpen) return null;

  const navigateTo = (path: string) => {
    router.push(path);
    setCommandPaletteOpen(false);
  };

  const commands = [
    {
      id: "cmd-dash",
      title: "Go to Dashboard",
      category: "Navigation",
      icon: LayoutDashboard,
      action: () => navigateTo("/dashboard"),
    },
    {
      id: "cmd-txn",
      title: "Search Transactions",
      category: "Navigation",
      icon: Layers,
      action: () => navigateTo("/transactions"),
    },
    {
      id: "cmd-inv",
      title: "Open Investigation (TX-92831)",
      category: "Investigation",
      icon: Search,
      action: () => {
        setSelectedTransaction(transactions[0]);
        navigateTo("/transactions/TX-92831");
      },
    },
    {
      id: "cmd-rules",
      title: "Open Rules Engine",
      category: "Controls",
      icon: SlidersHorizontal,
      action: () => navigateTo("/rules"),
    },
    {
      id: "cmd-network",
      title: "Open Entity Network Graph",
      category: "Intelligence",
      icon: Share2,
      action: () => navigateTo("/network"),
    },
    {
      id: "cmd-analytics",
      title: "Open Analytics & Telemetry",
      category: "Intelligence",
      icon: BarChart3,
      action: () => navigateTo("/analytics"),
    },
    {
      id: "cmd-sim",
      title: "Start Live Attack Simulation",
      category: "Simulation",
      icon: Flame,
      action: () => {
        simulateAttack();
        navigateTo("/simulator");
      },
    },
    {
      id: "cmd-motion",
      title: `Toggle UI Motion (Currently ${motionEnabled ? "ON" : "OFF"})`,
      category: "Preferences",
      icon: Activity,
      action: () => {
        toggleMotion();
        setCommandPaletteOpen(false);
      },
    },
  ];

  const filteredCommands = commands.filter((c) =>
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-24 px-4">
      <div className="w-full max-w-xl bg-surface border border-border-bright rounded-lg shadow-2xl overflow-hidden font-mono text-xs">
        {/* Header Search Input */}
        <div className="flex items-center px-4 py-3 border-b border-border-subtle bg-surface-secondary">
          <Search className="w-4 h-4 text-slate-400 mr-3" />
          <input
            type="text"
            placeholder="Type a command or search transactions..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-white placeholder-slate-500 focus:outline-none text-xs"
            autoFocus
          />
          <button
            onClick={() => setCommandPaletteOpen(false)}
            className="p-1 rounded text-slate-400 hover:text-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Command list */}
        <div className="max-h-80 overflow-y-auto py-2">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd) => {
              const Icon = cmd.icon;
              return (
                <button
                  key={cmd.id}
                  onClick={cmd.action}
                  className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-surface-secondary text-left transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-slate-400 group-hover:text-accent-cyan" />
                    <div>
                      <div className="text-slate-200 group-hover:text-white font-medium">
                        {cmd.title}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {cmd.category}
                      </div>
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-600 group-hover:text-slate-400">
                    ↵ SELECT
                  </div>
                </button>
              );
            })
          ) : (
            <div className="p-8 text-center text-slate-500">
              No matching commands or intelligence signals found.
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-surface-secondary border-t border-border-subtle flex items-center justify-between text-[10px] text-slate-500">
          <div className="flex items-center gap-2">
            <span>Press</span>
            <kbd className="px-1.5 py-0.5 rounded bg-surface border border-slate-700">ESC</kbd>
            <span>to close</span>
          </div>
          <div>SENTINEL ANALYST HUD</div>
        </div>
      </div>
    </div>
  );
}
