"use client";

import React, { useEffect, useState, useRef } from "react";
import { useSentinel } from "@/lib/context";

interface TrailFragment {
  id: number;
  text: string;
  x: number;
  y: number;
  opacity: number;
}

const TECHNICAL_WORDS = [
  "0x7F21",
  "NODE_82",
  "SIG_09",
  "TXN",
  "ΔRISK",
  "ML_042",
  "FRAUD",
  "ENTITY",
  "0x8F21",
  "LATENCY_4MS",
  "UPI_AUTH",
];

export function MouseSignalTracker() {
  const { motionEnabled } = useSentinel();
  const [mounted, setMounted] = useState(false);
  const [coords, setCoords] = useState({ x: -100, y: -100 });
  const [rawCoords, setRawCoords] = useState({ x: 0, y: 0 });
  const [angle, setAngle] = useState(0);
  const [signalId, setSignalId] = useState("SIG_82AF");
  const [riskText, setRiskText] = useState("RISK_087");
  const [trails, setTrails] = useState<TrailFragment[]>([]);
  const lastTrailTime = useRef(0);
  const trailIdCounter = useRef(0);

  // Lagged position target and current state
  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const lastPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!motionEnabled || !mounted) return;

    let animFrame: number;

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      setRawCoords({ x: Math.round(e.clientX), y: Math.round(e.clientY) });

      const now = performance.now();
      // Throttled trail generation every ~400ms
      if (now - lastTrailTime.current > 420 && Math.random() > 0.35) {
        lastTrailTime.current = now;
        const text = TECHNICAL_WORDS[Math.floor(Math.random() * TECHNICAL_WORDS.length)];
        const newTrail: TrailFragment = {
          id: ++trailIdCounter.current,
          text,
          x: e.clientX + (Math.random() - 0.5) * 40,
          y: e.clientY + (Math.random() - 0.5) * 40,
          opacity: 0.65,
        };
        setTrails((prev) => [...prev.slice(-5), newTrail]);

        // Occasionally rotate random technical signal
        if (Math.random() > 0.6) {
          const hex = Math.floor(Math.random() * 0xffff)
            .toString(16)
            .toUpperCase()
            .padStart(4, "0");
          setSignalId(`SIG_${hex}`);
          setRiskText(`RISK_${(Math.floor(Math.random() * 40) + 60).toString().padStart(3, "0")}`);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Smooth lag loop (interpolation factor 0.12 gives ~120-180ms lag)
    const loop = () => {
      const dx = targetPos.current.x - currentPos.current.x;
      const dy = targetPos.current.y - currentPos.current.y;

      currentPos.current.x += dx * 0.14;
      currentPos.current.y += dy * 0.14;

      // Calculate travel angle for directional arrow
      const moveDeltaX = currentPos.current.x - lastPos.current.x;
      const moveDeltaY = currentPos.current.y - lastPos.current.y;
      const speed = Math.sqrt(moveDeltaX * moveDeltaX + moveDeltaY * moveDeltaY);

      if (speed > 0.8) {
        const rad = Math.atan2(moveDeltaY, moveDeltaX);
        const deg = (rad * 180) / Math.PI;
        setAngle(deg);
      }

      lastPos.current = { ...currentPos.current };
      setCoords({ x: Math.round(currentPos.current.x), y: Math.round(currentPos.current.y) });

      // Decay trail opacities
      setTrails((prev) =>
        prev
          .map((t) => ({ ...t, y: t.y - 0.4, opacity: t.opacity - 0.02 }))
          .filter((t) => t.opacity > 0)
      );

      animFrame = requestAnimationFrame(loop);
    };

    animFrame = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animFrame);
    };
  }, [motionEnabled, mounted]);

  if (!motionEnabled || !mounted || coords.x < 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block">
      {/* Lagging secondary tracker */}
      <div
        className="absolute top-0 left-0 transition-transform duration-75 ease-out select-none"
        style={{
          transform: `translate3d(${coords.x + 14}px, ${coords.y + 14}px, 0)`,
        }}
      >
        <div className="flex items-start gap-2 backdrop-blur-[2px] bg-background/50 p-1 rounded border border-border-subtle/70 shadow-sm text-[10px] font-mono leading-none">
          {/* Arrow pointing in direction of movement */}
          <div
            className="text-accent-cyan transition-transform duration-100 ease-out origin-center"
            style={{ transform: `rotate(${angle}deg)` }}
          >
            →
          </div>

          <div className="flex flex-col gap-0.5 text-slate-400">
            <div className="flex gap-2">
              <span className="text-slate-500">X</span>
              <span className="text-slate-300 tabular-nums">{rawCoords.x}</span>
              <span className="text-slate-500">Y</span>
              <span className="text-slate-300 tabular-nums">{rawCoords.y}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-accent-blue">{signalId}</span>
              <span className="text-orange-400">{riskText}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Code fragment trails */}
      {trails.map((t) => (
        <div
          key={t.id}
          className="absolute text-[9px] font-mono font-medium text-accent-cyan/90 tracking-wider select-none pointer-events-none transition-opacity duration-300"
          style={{
            transform: `translate3d(${t.x}px, ${t.y}px, 0)`,
            opacity: t.opacity,
          }}
        >
          {t.text}
        </div>
      ))}
    </div>
  );
}
