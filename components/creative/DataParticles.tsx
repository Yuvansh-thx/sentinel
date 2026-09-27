"use client";

import React, { useEffect, useRef } from "react";
import { useSentinel } from "@/lib/context";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  label?: string;
  isHighRisk?: boolean;
}

export function DataParticles({ density = 45 }: { density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { motionEnabled } = useSentinel();

  useEffect(() => {
    if (!motionEnabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Initialize particles
    const particleCount = Math.min(density, Math.floor((width * height) / 30000));
    const particles: Particle[] = [];
    const technicalLabels = ["TXN", "SIG", "Δ", "NODE", "87", "0x8F", "₹", "UPI", "RISK"];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 1,
        opacity: Math.random() * 0.4 + 0.15,
        label: Math.random() > 0.75 ? technicalLabels[Math.floor(Math.random() * technicalLabels.length)] : undefined,
        isHighRisk: Math.random() > 0.9,
      });
    }

    let pulseCycle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      pulseCycle += 0.015;

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        if (p.isHighRisk) {
          ctx.fillStyle = `rgba(249, 115, 22, ${p.opacity * (1 + Math.sin(pulseCycle) * 0.3)})`;
        } else {
          ctx.fillStyle = `rgba(37, 99, 235, ${p.opacity})`;
        }
        ctx.fill();

        // Occasional tiny label
        if (p.label && p.opacity > 0.3) {
          ctx.font = "9px monospace";
          ctx.fillStyle = p.isHighRisk ? "rgba(249, 115, 22, 0.4)" : "rgba(34, 211, 238, 0.35)";
          ctx.fillText(p.label, p.x + 5, p.y + 3);
        }

        // Draw connections to nearby nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const lineOpacity = (1 - dist / 130) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);

            // Highlight path occasionally
            if ((i + j) % 7 === 0) {
              const activePulse = (Math.sin(pulseCycle * 2 + i) + 1) / 2;
              ctx.strokeStyle = `rgba(34, 211, 238, ${lineOpacity * (1 + activePulse * 2.5)})`;
              ctx.lineWidth = 1;
            } else {
              ctx.strokeStyle = `rgba(30, 58, 102, ${lineOpacity})`;
              ctx.lineWidth = 0.6;
            }
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [density, motionEnabled]);

  if (!motionEnabled) {
    return <div className="absolute inset-0 pointer-events-none opacity-20 sentinel-grid" />;
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 opacity-70"
    />
  );
}
