"use client";

import React, { useEffect, useState, useRef } from "react";
import { useSentinel } from "@/lib/context";

interface FragmentPoint {
  x: number;
  y: number;
  text: string;
  fontSize: number;
  opacity: number;
  color: string;
  isWing?: "left" | "right" | "tail" | "body";
}

// Data fragments as specified
const DATA_STRINGS = [
  "TXN", "87", "0.82", "RISK", "ML", "NODE", "42", "1010",
  "USD", "₹", "SIG", "Δ", "0x8F21", "₹82K", "0.94", "XGB",
  "10:06", "U-1932", "99.4%", "0x7F", "FLOW", "PR-AUC",
];

export function DigitalBird({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const { motionEnabled } = useSentinel();
  const [wingFlap, setWingFlap] = useState(0);
  const [fragments, setFragments] = useState<FragmentPoint[]>([]);
  const trailCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Generate bird typography matrix
  useEffect(() => {
    const pts: FragmentPoint[] = [];

    // Body / Spine line
    for (let i = 0; i < 18; i++) {
      const x = 180 + i * 9;
      const y = 140 + Math.sin(i * 0.3) * 6;
      pts.push({
        x,
        y,
        text: DATA_STRINGS[i % DATA_STRINGS.length],
        fontSize: i === 0 ? 11 : 9,
        opacity: 0.9 - i * 0.02,
        color: i < 5 ? "#22D3EE" : "#3B82F6",
        isWing: "body",
      });
    }

    // Head and Beak
    pts.push(
      { x: 345, y: 138, text: "▲", fontSize: 10, opacity: 0.95, color: "#22D3EE", isWing: "body" },
      { x: 335, y: 137, text: "87", fontSize: 9, opacity: 1, color: "#F97316", isWing: "body" },
      { x: 320, y: 136, text: "SIG", fontSize: 8, opacity: 0.85, color: "#38BDF8", isWing: "body" },
      { x: 305, y: 135, text: "0x8F21", fontSize: 7, opacity: 0.8, color: "#2563EB", isWing: "body" }
    );

    // Left Upper Wing (sweeping outward and upward)
    for (let row = 1; row <= 5; row++) {
      for (let col = 0; col < 10 - row; col++) {
        const x = 250 - col * 14 + row * 6;
        const y = 135 - row * 16 - col * 5;
        pts.push({
          x,
          y,
          text: DATA_STRINGS[(row * 7 + col) % DATA_STRINGS.length],
          fontSize: Math.max(7, 10 - row),
          opacity: 0.85 - (row + col) * 0.035,
          color: (row + col) % 2 === 0 ? "#06B6D4" : "#2563EB",
          isWing: "left",
        });
      }
    }

    // Right Lower Wing (counter-sweep with perspective compression)
    for (let row = 1; row <= 4; row++) {
      for (let col = 0; col < 8 - row; col++) {
        const x = 240 - col * 12 + row * 4;
        const y = 145 + row * 14 + col * 4;
        pts.push({
          x,
          y,
          text: DATA_STRINGS[(row * 5 + col + 3) % DATA_STRINGS.length],
          fontSize: Math.max(6.5, 9 - row),
          opacity: 0.7 - (row + col) * 0.04,
          color: (row + col) % 3 === 0 ? "#22D3EE" : "#1D4ED8",
          isWing: "right",
        });
      }
    }

    // Articulated Stream Tail
    for (let t = 0; t < 12; t++) {
      const x = 180 - t * 12;
      const spread = (t * 4);
      pts.push(
        {
          x,
          y: 140 - spread * 0.5,
          text: DATA_STRINGS[(t * 2) % DATA_STRINGS.length],
          fontSize: 7.5,
          opacity: 0.8 - t * 0.06,
          color: "#3B82F6",
          isWing: "tail",
        },
        {
          x,
          y: 140 + spread * 0.5,
          text: DATA_STRINGS[(t * 2 + 1) % DATA_STRINGS.length],
          fontSize: 7.5,
          opacity: 0.8 - t * 0.06,
          color: "#06B6D4",
          isWing: "tail",
        }
      );
    }

    setFragments(pts);
  }, []);

  // Wing flapping & flight oscillation
  useEffect(() => {
    if (!motionEnabled) return;

    let reqId: number;
    let time = 0;

    const loop = () => {
      time += 0.06;
      setWingFlap(Math.sin(time) * 12);
      reqId = requestAnimationFrame(loop);
    };

    reqId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(reqId);
  }, [motionEnabled]);

  if (!motionEnabled) return null;

  // Trajectory based on scroll progress:
  // 0.0 - 0.15: Not visible / entering from right
  // 0.25: center-right
  // 0.50: center
  // 0.75: upper-right
  // 1.00: exits
  const isVisible = scrollProgress > 0.08 && scrollProgress < 0.98;
  if (!isVisible) return null;

  // Interpolated flight path coordinates in viewport percentages
  let posX = 110; // off right
  let posY = 50;
  let rotation = -8;
  let opacity = 0;

  if (scrollProgress <= 0.25) {
    const t = (scrollProgress - 0.08) / (0.25 - 0.08);
    posX = 100 - t * 25; // 100% -> 75%
    posY = 60 - t * 15;  // 60% -> 45%
    rotation = -12 + t * 4;
    opacity = Math.min(1, t * 1.5);
  } else if (scrollProgress <= 0.50) {
    const t = (scrollProgress - 0.25) / 0.25;
    posX = 75 - t * 25;  // 75% -> 50%
    posY = 45 + Math.sin(t * Math.PI) * 5;
    rotation = -8 + t * 6;
    opacity = 1;
  } else if (scrollProgress <= 0.75) {
    const t = (scrollProgress - 0.50) / 0.25;
    posX = 50 + t * 25;  // 50% -> 75%
    posY = 45 - t * 20;  // 45% -> 25%
    rotation = -2 - t * 10;
    opacity = 1;
  } else {
    const t = (scrollProgress - 0.75) / (0.98 - 0.75);
    posX = 75 + t * 35;  // 75% -> 110%
    posY = 25 - t * 25;  // 25% -> 0%
    rotation = -12 - t * 8;
    opacity = 1 - t;
  }

  return (
    <div
      className="pointer-events-none fixed z-30 transition-all duration-300 ease-out select-none will-change-transform"
      style={{
        left: `${posX}vw`,
        top: `${posY}vh`,
        transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(0.95)`,
        opacity,
      }}
    >
      <div className="relative w-[380px] h-[280px]">
        {/* Subtle cyan glow behind core */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-32 bg-blue-500/10 blur-2xl rounded-full" />

        {/* Geometric wireframe skeleton underneath */}
        <svg
          className="absolute inset-0 w-full h-full overflow-visible"
          viewBox="0 0 380 280"
        >
          {/* Subtle structural connecting flight paths */}
          <path
            d={`M 180 140 Q 250 ${110 + wingFlap * 0.4} 340 137`}
            fill="none"
            stroke="rgba(37, 99, 235, 0.25)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          <path
            d={`M 250 135 L ${220} ${70 - wingFlap * 1.5} L 180 140`}
            fill="none"
            stroke="rgba(6, 182, 212, 0.2)"
            strokeWidth="0.8"
          />
          <path
            d={`M 240 145 L ${210} ${200 + wingFlap * 1.2} L 180 140`}
            fill="none"
            stroke="rgba(37, 99, 235, 0.15)"
            strokeWidth="0.8"
          />

          {/* Render individual financial data fragments that construct the bird */}
          {fragments.map((frag, idx) => {
            let dy = 0;
            if (frag.isWing === "left") {
              dy = -wingFlap * ((260 - frag.x) / 70);
            } else if (frag.isWing === "right") {
              dy = wingFlap * 0.8 * ((260 - frag.x) / 70);
            } else if (frag.isWing === "tail") {
              dy = Math.sin(idx * 0.5) * 3;
            }

            return (
              <text
                key={idx}
                x={frag.x}
                y={frag.y + dy}
                fontSize={frag.fontSize}
                fontFamily="JetBrains Mono, monospace"
                fontWeight="600"
                fill={frag.color}
                opacity={frag.opacity}
                textAnchor="middle"
                className="select-none tracking-tight"
                style={{
                  textShadow:
                    frag.opacity > 0.85
                      ? `0 0 6px ${frag.color}`
                      : "none",
                }}
              >
                {frag.text}
              </text>
            );
          })}
        </svg>

        {/* Trailing data stream label */}
        <div className="absolute -bottom-4 left-6 text-[9px] font-mono text-cyan-400/60 tracking-widest uppercase">
          SENTINEL // ARTIFACT.01 // FLIGHT_VECTOR
        </div>
      </div>
    </div>
  );
}
