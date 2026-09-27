"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { X, Keyboard } from "lucide-react";
import { useSentinel } from "@/lib/context";

export function KeyboardShortcuts() {
  const router = useRouter();
  const { showShortcutsModal, setShowShortcutsModal } = useSentinel();
  const lastKeyTime = useRef<number>(0);
  const pendingKey = useRef<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if focus is inside an input/textarea
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
        return;
      }

      if (e.key === "?") {
        e.preventDefault();
        setShowShortcutsModal(true);
        return;
      }

      if (e.key === "Escape" && showShortcutsModal) {
        setShowShortcutsModal(false);
        return;
      }

      const now = Date.now();
      const key = e.key.toLowerCase();

      // Check 'g' prefix chords
      if (key === "g") {
        pendingKey.current = "g";
        lastKeyTime.current = now;
        return;
      }

      if (pendingKey.current === "g" && now - lastKeyTime.current < 1000) {
        pendingKey.current = null;
        switch (key) {
          case "d":
            router.push("/dashboard");
            break;
          case "t":
            router.push("/transactions");
            break;
          case "i":
            router.push("/transactions/TX-92831");
            break;
          case "r":
            router.push("/rules");
            break;
          case "n":
            router.push("/network");
            break;
          case "a":
            router.push("/analytics");
            break;
          case "s":
            router.push("/simulator");
            break;
        }
      } else {
        pendingKey.current = null;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router, showShortcutsModal, setShowShortcutsModal]);

  if (!showShortcutsModal) return null;

  const shortcuts = [
    { key: "G D", desc: "Go to Overview Dashboard" },
    { key: "G T", desc: "Go to Transaction Monitor" },
    { key: "G I", desc: "Open Investigation (TX-92831)" },
    { key: "G R", desc: "Open Risk Rules" },
    { key: "G N", desc: "Open Entity Network Graph" },
    { key: "G A", desc: "Open Analytics & Telemetry" },
    { key: "G S", desc: "Open Attack Simulator" },
    { key: "⌘ K", desc: "Open Command Palette" },
    { key: "?", desc: "Show Keyboard Shortcuts Modal" },
    { key: "ESC", desc: "Close Modals & Drawers" },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface border border-border-bright rounded-lg shadow-2xl p-6 font-mono text-xs">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-border-subtle">
          <div className="flex items-center gap-2 text-white font-semibold">
            <Keyboard className="w-4 h-4 text-accent-cyan" />
            <span>OPERATIONAL KEYBOARD SHORTCUTS</span>
          </div>
          <button
            onClick={() => setShowShortcutsModal(false)}
            className="text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2.5">
          {shortcuts.map((s) => (
            <div key={s.key} className="flex items-center justify-between py-1.5 px-2 rounded bg-surface-secondary">
              <span className="text-slate-400">{s.desc}</span>
              <kbd className="px-2 py-0.5 rounded bg-surface border border-slate-700 text-accent-cyan font-bold">
                {s.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-3 border-t border-border-subtle/50 text-[10px] text-slate-500 text-center">
          SENTINEL RAPID NAVIGATION PROTOCOL
        </div>
      </div>
    </div>
  );
}
