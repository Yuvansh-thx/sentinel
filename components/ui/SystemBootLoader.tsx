"use client";

import React, { useState, useEffect } from "react";

interface SystemBootLoaderProps {
  onComplete: () => void;
}

export function SystemBootLoader({ onComplete }: SystemBootLoaderProps) {
  const [step, setStep] = useState(0);

  const lines = [
    { text: "SYSTEM INITIALIZING", delay: 200 },
    { text: "SIGNAL NETWORK ……….. OK", delay: 350 },
    { text: "RISK ENGINE ………….. OK", delay: 350 },
    { text: "MODEL …………………. OK", delay: 350 },
    { text: "STREAM ………………. CONNECTED", delay: 350 },
  ];

  useEffect(() => {
    let current = 0;
    const nextStep = () => {
      if (current < lines.length) {
        setStep(current + 1);
        current++;
        setTimeout(nextStep, lines[current - 1]?.delay || 300);
      } else {
        setTimeout(onComplete, 400);
      }
    };

    const timer = setTimeout(nextStep, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-[#050914] flex flex-col items-center justify-center p-6 font-mono text-xs select-none">
      <div className="w-full max-w-md bg-surface/90 border border-border-bright rounded-lg p-6 shadow-2xl">
        <div className="flex items-center gap-2 pb-3 mb-4 border-b border-border-subtle text-accent-cyan text-[11px] font-bold">
          <span className="w-2 h-2 rounded-full bg-accent-cyan animate-ping" />
          <span>SENTINEL // SYSTEM BOOT SEQUENCE</span>
        </div>

        <div className="space-y-2 text-slate-300">
          {lines.slice(0, step).map((l, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-between ${
                idx === lines.length - 1 ? "text-emerald-400 font-bold" : ""
              }`}
            >
              <span>{l.text}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-3 border-t border-border-subtle/50 text-[10px] text-slate-500 flex justify-between">
          <span>PORT: 8080 // TLS 1.3</span>
          <span className="animate-pulse">MOUNTING INGRESS...</span>
        </div>
      </div>
    </div>
  );
}
