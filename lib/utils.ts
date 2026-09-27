import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatINR(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} L`;
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getRiskLevel(score: number): "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" {
  if (score < 30) return "LOW";
  if (score < 60) return "MEDIUM";
  if (score < 80) return "HIGH";
  return "CRITICAL";
}

export function getRiskColor(score: number): {
  text: string;
  bg: string;
  border: string;
  badge: string;
  dot: string;
  hex: string;
} {
  const level = getRiskLevel(score);
  switch (level) {
    case "LOW":
      return {
        text: "text-emerald-400",
        bg: "bg-emerald-950/40",
        border: "border-emerald-800/50",
        badge: "bg-emerald-950/40 text-emerald-400 border-emerald-800/50",
        dot: "bg-emerald-400",
        hex: "#10B981",
      };
    case "MEDIUM":
      return {
        text: "text-amber-400",
        bg: "bg-amber-950/40",
        border: "border-amber-800/50",
        badge: "bg-amber-950/40 text-amber-400 border-amber-800/50",
        dot: "bg-amber-400",
        hex: "#F59E0B",
      };
    case "HIGH":
      return {
        text: "text-orange-400",
        bg: "bg-orange-950/40",
        border: "border-orange-800/50",
        badge: "bg-orange-950/40 text-orange-400 border-orange-800/50",
        dot: "bg-orange-400",
        hex: "#F97316",
      };
    case "CRITICAL":
      return {
        text: "text-red-400",
        bg: "bg-red-950/40",
        border: "border-red-800/50",
        badge: "bg-red-950/40 text-red-400 border-red-800/50",
        dot: "bg-red-500",
        hex: "#EF4444",
      };
  }
}
