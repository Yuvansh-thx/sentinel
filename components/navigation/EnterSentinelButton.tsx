"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

interface EnterSentinelButtonProps {
  className?: string;
  size?: "default" | "large";
}

export function EnterSentinelButton({
  className = "",
  size = "default",
}: EnterSentinelButtonProps) {
  const router = useRouter();
  const [isExpanding, setIsExpanding] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsExpanding(true);

    // 400ms transition as requested in Section 16:
    // "landing environment -> data field expands -> dashboard appears. Keep under approx 500ms."
    setTimeout(() => {
      router.push("/dashboard");
    }, 420);
  };

  return (
    <>
      {/* Fullscreen expanding data field surge overlay during transition */}
      {isExpanding && (
        <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center bg-[#050914] animate-fadeIn transition-opacity duration-300">
          <div className="w-[150vw] h-[150vh] rounded-full border-2 border-accent-cyan/60 scale-150 animate-ping opacity-60" />
          <div className="absolute font-mono text-xs text-accent-cyan tracking-widest uppercase animate-pulse">
            ENTERING SENTINEL INTELLIGENCE RUNTIME...
          </div>
        </div>
      )}

      <button
        onClick={handleClick}
        disabled={isExpanding}
        className={`group inline-flex items-center gap-2 rounded bg-blue-600 hover:bg-blue-500 text-white font-mono font-medium tracking-wide transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_28px_rgba(37,99,235,0.6)] ${
          size === "large"
            ? "px-6 py-3.5 text-xs uppercase"
            : "px-3.5 py-1.5 text-xs"
        } ${className}`}
      >
        <span>ENTER SENTINEL</span>
        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
      </button>
    </>
  );
}
