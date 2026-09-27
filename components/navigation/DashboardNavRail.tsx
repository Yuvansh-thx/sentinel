"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Layers,
  Search,
  SlidersHorizontal,
  Share2,
  BarChart3,
  Cpu,
  Flame,
  HelpCircle,
  Activity,
} from "lucide-react";
import { useSentinel } from "@/lib/context";

const NAV_ITEMS = [
  { name: "OVERVIEW", href: "/dashboard", icon: LayoutDashboard },
  { name: "TRANSACTIONS", href: "/transactions", icon: Layers },
  { name: "INVESTIGATE", href: "/transactions/TX-92831", icon: Search },
  { name: "RULES", href: "/rules", icon: SlidersHorizontal },
  { name: "NETWORK", href: "/network", icon: Share2 },
  { name: "ANALYTICS", href: "/analytics", icon: BarChart3 },
  { name: "MODELS", href: "/models", icon: Cpu },
  { name: "SIMULATOR", href: "/simulator", icon: Flame },
];

export function DashboardNavRail() {
  const pathname = usePathname();
  const { motionEnabled, toggleMotion, setShowShortcutsModal } = useSentinel();

  return (
    <aside className="fixed left-0 top-0 bottom-0 z-40 w-16 md:w-20 bg-surface border-r border-border-subtle flex flex-col items-center justify-between py-4 select-none">
      {/* Brand Icon */}
      <div className="flex flex-col items-center gap-1">
        <Link
          href="/"
          className="w-10 h-10 rounded bg-blue-600 flex items-center justify-center font-mono text-sm font-bold text-white shadow-[0_0_16px_rgba(37,99,235,0.4)] hover:bg-blue-500 transition-colors"
          title="Return to Landing"
        >
          S
        </Link>
        <span className="text-[9px] font-mono text-slate-500 tracking-wider">
          v1.4
        </span>
      </div>

      {/* Navigation Items */}
      <nav className="flex flex-col items-center gap-1.5 w-full px-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`w-full py-2.5 px-1 rounded flex flex-col items-center gap-1 transition-all group relative ${
                isActive
                  ? "bg-accent-blue/15 text-accent-cyan border border-accent-blue/40"
                  : "text-slate-400 hover:text-slate-200 hover:bg-surface-secondary"
              }`}
              title={item.name}
            >
              <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span className="text-[8px] font-mono tracking-tighter uppercase leading-none">
                {item.name}
              </span>

              {/* Active Indicator dot */}
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-accent-cyan rounded-r" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Controls */}
      <div className="flex flex-col items-center gap-3 w-full px-2">
        {/* Motion Toggle */}
        <button
          onClick={toggleMotion}
          className="w-full py-1.5 rounded flex flex-col items-center text-slate-500 hover:text-slate-300 transition-colors"
          title="Toggle UI Motion"
        >
          <Activity className="w-3.5 h-3.5 mb-0.5" />
          <span className="text-[7.5px] font-mono">
            {motionEnabled ? "M:ON" : "M:OFF"}
          </span>
        </button>

        {/* Shortcuts helper */}
        <button
          onClick={() => setShowShortcutsModal(true)}
          className="w-8 h-8 rounded flex items-center justify-center text-slate-500 hover:text-slate-200 hover:bg-surface-secondary transition-colors"
          title="Keyboard shortcuts (?)"
        >
          <HelpCircle className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
