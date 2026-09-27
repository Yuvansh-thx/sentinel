"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  Transaction,
  LiveEvent,
  KPI,
  MOCK_TRANSACTIONS,
  LIVE_EVENT_STREAM,
  INITIAL_KPIS,
} from "./mock-data";

interface SentinelContextType {
  motionEnabled: boolean;
  toggleMotion: () => void;
  selectedTransaction: Transaction;
  setSelectedTransaction: (t: Transaction) => void;
  transactions: Transaction[];
  riskThreshold: number;
  setRiskThreshold: (val: number) => void;
  events: LiveEvent[];
  kpis: KPI;
  isSimulatingAttack: boolean;
  attackStep: number;
  simulateAttack: () => void;
  pauseSimulation: () => void;
  generateNormalTxn: () => void;
  generateHighRiskTxn: () => void;
  resetSimulation: () => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  showShortcutsModal: boolean;
  setShowShortcutsModal: (show: boolean) => void;
}

const SentinelContext = createContext<SentinelContextType | null>(null);

export function SentinelProvider({ children }: { children: React.ReactNode }) {
  const [motionEnabled, setMotionEnabled] = useState(true);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction>(
    MOCK_TRANSACTIONS[0]
  );
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [riskThreshold, setRiskThreshold] = useState<number>(70);
  const [events, setEvents] = useState<LiveEvent[]>(LIVE_EVENT_STREAM);
  const [kpis, setKpis] = useState<KPI>(INITIAL_KPIS);
  const [isSimulatingAttack, setIsSimulatingAttack] = useState(false);
  const [attackStep, setAttackStep] = useState(0);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [showShortcutsModal, setShowShortcutsModal] = useState(false);

  // Check system prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mediaQuery.matches) {
        setMotionEnabled(false);
      }
      const listener = (e: MediaQueryListEvent) => {
        setMotionEnabled(!e.matches);
      };
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, []);

  const toggleMotion = useCallback(() => {
    setMotionEnabled((prev) => !prev);
  }, []);

  // Attack simulation step by step as per prompt:
  // NORMAL LOGIN -> ₹850 -> NEW DEVICE -> ₹12,400 -> ₹27,000 -> ₹82,400 -> LOCATION ANOMALY -> HIGH VELOCITY -> RISK 87 -> MANUAL REVIEW
  const attackSteps = [
    {
      title: "NORMAL LOGIN",
      event: {
        id: "SIM-01",
        time: new Date().toLocaleTimeString(),
        type: "DEVICE" as const,
        title: "AUTH_SUCCESS",
        detail: "User U-1932 authenticated via Indore Trusted Enclave D-1044",
        severity: "low" as const,
      },
      kpiDelta: { txns: 1, flagged: 0, exposure: 0 },
    },
    {
      title: "₹850 BASELINE",
      event: {
        id: "SIM-02",
        time: new Date().toLocaleTimeString(),
        type: "DECISION" as const,
        title: "TX_APPROVED",
        detail: "TX-92825 ₹850 Blue Tokai Coffee [UPI] - Normal Habit Pattern",
        severity: "low" as const,
      },
      kpiDelta: { txns: 1, flagged: 0, exposure: 850 },
    },
    {
      title: "NEW DEVICE BOUND",
      event: {
        id: "SIM-03",
        time: new Date().toLocaleTimeString(),
        type: "DEVICE" as const,
        title: "NEW DEVICE D-8812",
        detail: "U-1932 bound to unverified hardware token in Mumbai datacenter",
        severity: "medium" as const,
      },
      kpiDelta: { txns: 0, flagged: 0, exposure: 0 },
    },
    {
      title: "₹12,400 VELOCITY SPEND",
      event: {
        id: "SIM-04",
        time: new Date().toLocaleTimeString(),
        type: "VELOCITY" as const,
        title: "VELOCITY STEP-1",
        detail: "TX-92829 ₹12,400 Croma Retail Digital [CARD] - Step-up flag",
        severity: "medium" as const,
      },
      kpiDelta: { txns: 1, flagged: 0, exposure: 12400 },
    },
    {
      title: "₹27,000 CRYPTO RAMP",
      event: {
        id: "SIM-05",
        time: new Date().toLocaleTimeString(),
        type: "VELOCITY" as const,
        title: "VELOCITY STEP-2",
        detail: "TX-92830 ₹27,000 Bharat Crypto Ramp [UPI] - Rapid Outflow",
        severity: "high" as const,
      },
      kpiDelta: { txns: 1, flagged: 1, exposure: 27000 },
    },
    {
      title: "₹82,400 LARGE OUTFLOW",
      event: {
        id: "SIM-06",
        time: new Date().toLocaleTimeString(),
        type: "RISK" as const,
        title: "TARGET OUTFLOW",
        detail: "TX-92831 ₹82,400 Apex Luxe Retail [BANK_TRANSFER]",
        severity: "high" as const,
        transactionId: "TX-92831",
      },
      kpiDelta: { txns: 1, flagged: 1, exposure: 82400 },
    },
    {
      title: "LOCATION ANOMALY",
      event: {
        id: "SIM-07",
        time: new Date().toLocaleTimeString(),
        type: "LOCATION" as const,
        title: "IMPOSSIBLE TRAVEL",
        detail: "Indore -> Mumbai (650 km in 2m 58s). Speed: 13,100 km/h",
        severity: "critical" as const,
        transactionId: "TX-92831",
      },
      kpiDelta: { txns: 0, flagged: 0, exposure: 0 },
    },
    {
      title: "HIGH VELOCITY ESCALATION",
      event: {
        id: "SIM-08",
        time: new Date().toLocaleTimeString(),
        type: "VELOCITY" as const,
        title: "VELOCITY BURST",
        detail: "4 transactions totaling ₹1,22,650 within 4 minutes window",
        severity: "critical" as const,
        transactionId: "TX-92831",
      },
      kpiDelta: { txns: 0, flagged: 0, exposure: 0 },
    },
    {
      title: "RISK SCORE 87",
      event: {
        id: "SIM-09",
        time: new Date().toLocaleTimeString(),
        type: "RISK" as const,
        title: "RISK CRITICAL: 87",
        detail: "XGBoost Model 01.4 score spiked to 87. Breach threshold 70.",
        severity: "critical" as const,
        transactionId: "TX-92831",
      },
      kpiDelta: { txns: 0, flagged: 1, exposure: 0 },
    },
    {
      title: "MANUAL REVIEW TRIGGERED",
      event: {
        id: "SIM-10",
        time: new Date().toLocaleTimeString(),
        type: "DECISION" as const,
        title: "ISOLATION HOLD APPLIED",
        detail: "Rule R-101 tripped. Transaction held in sentinel isolation queue.",
        severity: "critical" as const,
        transactionId: "TX-92831",
      },
      kpiDelta: { txns: 0, flagged: 1, exposure: 0 },
    },
  ];

  const simulateAttack = useCallback(() => {
    setIsSimulatingAttack(true);
    setAttackStep(0);
  }, []);

  const pauseSimulation = useCallback(() => {
    setIsSimulatingAttack(false);
  }, []);

  useEffect(() => {
    if (!isSimulatingAttack) return;

    if (attackStep >= attackSteps.length) {
      setIsSimulatingAttack(false);
      return;
    }

    const timer = setTimeout(() => {
      const step = attackSteps[attackStep];
      if (step) {
        setEvents((prev) => [step.event, ...prev.slice(0, 19)]);
        setKpis((prev) => ({
          ...prev,
          transactions: prev.transactions + step.kpiDelta.txns,
          flagged: prev.flagged + step.kpiDelta.flagged,
          reviewQueue: prev.reviewQueue + (step.kpiDelta.flagged > 0 ? 1 : 0),
          exposure: prev.exposure + step.kpiDelta.exposure,
          exposureFormatted: `₹${((prev.exposure + step.kpiDelta.exposure) / 100000).toFixed(2)}L`,
        }));
      }
      setAttackStep((s) => s + 1);
    }, 1200);

    return () => clearTimeout(timer);
  }, [isSimulatingAttack, attackStep]);

  const generateNormalTxn = useCallback(() => {
    const randomAmount = Math.floor(Math.random() * 2500) + 350;
    const cities = ["Bengaluru", "Mumbai", "Delhi", "Indore", "Pune"];
    const city = cities[Math.floor(Math.random() * cities.length)];
    const merchants = ["Swiggy", "Zomato", "Uber India", "Apollo Pharmacy", "Blue Tokai"];
    const merchant = merchants[Math.floor(Math.random() * merchants.length)];
    const id = `TX-${Math.floor(Math.random() * 90000 + 10000)}`;

    const newTxn: Transaction = {
      id,
      time: new Date().toLocaleTimeString(),
      userId: `U-${Math.floor(Math.random() * 8000 + 1000)}`,
      merchantId: `M-${Math.floor(Math.random() * 900 + 100)}`,
      merchantName: merchant,
      amount: randomAmount,
      channel: Math.random() > 0.4 ? "UPI" : "CARD",
      device: "TRUSTED",
      deviceId: `D-${Math.floor(Math.random() * 9000 + 1000)}`,
      location: city,
      ipAddress: `103.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}.12`,
      riskScore: Math.floor(Math.random() * 22) + 5,
      decision: "APPROVE",
      status: "RESOLVED",
      signals: ["Matches normal velocity profile", "Biometric enclave passed"],
    };

    setTransactions((prev) => [newTxn, ...prev.slice(0, 49)]);
    setEvents((prev) => [
      {
        id: `EV-${Date.now()}`,
        time: newTxn.time,
        type: "DECISION",
        title: "TX_APPROVED",
        detail: `${newTxn.id} ₹${newTxn.amount} to ${newTxn.merchantName} [${newTxn.riskScore}]`,
        severity: "low",
        transactionId: newTxn.id,
      },
      ...prev.slice(0, 19),
    ]);
    setKpis((prev) => ({
      ...prev,
      transactions: prev.transactions + 1,
    }));
  }, []);

  const generateHighRiskTxn = useCallback(() => {
    const randomAmount = Math.floor(Math.random() * 90000) + 50000;
    const id = `TX-${Math.floor(Math.random() * 90000 + 10000)}`;
    const score = Math.floor(Math.random() * 15) + 82;

    const newTxn: Transaction = {
      id,
      time: new Date().toLocaleTimeString(),
      userId: `U-${Math.floor(Math.random() * 8000 + 1000)}`,
      merchantId: "M-881",
      merchantName: "Express Crypto Gateway",
      amount: randomAmount,
      channel: "BANK_TRANSFER",
      device: "NEW",
      deviceId: `D-${Math.floor(Math.random() * 9000 + 1000)}`,
      location: "Mumbai",
      ipAddress: "185.220.101.42",
      riskScore: score,
      decision: score >= 90 ? "BLOCK" : "REVIEW",
      status: "PENDING",
      signals: ["Tor exit node fingerprint", "High velocity spike", "Amount > 8x median"],
    };

    setTransactions((prev) => [newTxn, ...prev.slice(0, 49)]);
    setEvents((prev) => [
      {
        id: `EV-${Date.now()}`,
        time: newTxn.time,
        type: "RISK",
        title: `HIGH RISK: ${score}`,
        detail: `${newTxn.id} ₹${newTxn.amount} to ${newTxn.merchantName} [${newTxn.decision}]`,
        severity: "critical",
        transactionId: newTxn.id,
      },
      ...prev.slice(0, 19),
    ]);
    setKpis((prev) => ({
      ...prev,
      transactions: prev.transactions + 1,
      flagged: prev.flagged + 1,
      reviewQueue: prev.reviewQueue + 1,
      exposure: prev.exposure + randomAmount,
      exposureFormatted: `₹${((prev.exposure + randomAmount) / 100000).toFixed(2)}L`,
    }));
  }, []);

  const resetSimulation = useCallback(() => {
    setIsSimulatingAttack(false);
    setAttackStep(0);
    setTransactions(MOCK_TRANSACTIONS);
    setEvents(LIVE_EVENT_STREAM);
    setKpis(INITIAL_KPIS);
  }, []);

  return (
    <SentinelContext.Provider
      value={{
        motionEnabled,
        toggleMotion,
        selectedTransaction,
        setSelectedTransaction,
        transactions,
        riskThreshold,
        setRiskThreshold,
        events,
        kpis,
        isSimulatingAttack,
        attackStep,
        simulateAttack,
        pauseSimulation,
        generateNormalTxn,
        generateHighRiskTxn,
        resetSimulation,
        commandPaletteOpen,
        setCommandPaletteOpen,
        showShortcutsModal,
        setShowShortcutsModal,
      }}
    >
      {children}
    </SentinelContext.Provider>
  );
}

export function useSentinel() {
  const context = useContext(SentinelContext);
  if (!context) {
    throw new Error("useSentinel must be used within a SentinelProvider");
  }
  return context;
}
