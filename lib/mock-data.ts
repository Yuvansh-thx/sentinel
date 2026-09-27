export interface Transaction {
  id: string;
  time: string;
  userId: string;
  merchantId: string;
  merchantName: string;
  amount: number;
  channel: "UPI" | "CARD" | "BANK_TRANSFER";
  device: "NEW" | "TRUSTED" | "UNKNOWN";
  deviceId: string;
  location: string;
  ipAddress: string;
  riskScore: number;
  decision: "APPROVE" | "REVIEW" | "BLOCK";
  status: "PENDING" | "RESOLVED";
  signals: string[];
}

export interface LiveEvent {
  id: string;
  time: string;
  type: "DEVICE" | "VELOCITY" | "LOCATION" | "RISK" | "DECISION" | "RULE";
  title: string;
  detail: string;
  severity: "low" | "medium" | "high" | "critical";
  transactionId?: string;
}

export interface RiskFactor {
  factor: string;
  scoreDelta: number;
  description: string;
  category: "velocity" | "device" | "location" | "amount" | "merchant";
}

export interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  detail: string;
  type: "info" | "warning" | "alert" | "critical";
  amount?: number;
}

export interface Rule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  conditions: {
    field: string;
    operator: string;
    value: string;
  }[];
  consequence: {
    riskDelta: number;
    action: "ALLOW" | "REVIEW" | "BLOCK";
  };
  triggerCount: number;
  lastTriggered: string;
}

export interface KPI {
  transactions: number;
  flagged: number;
  reviewQueue: number;
  exposure: number;
  exposureFormatted: string;
  modelPrAuc: number;
  liveThroughputTps: number;
}

export const INITIAL_KPIS: KPI = {
  transactions: 128421,
  flagged: 1284,
  reviewQueue: 37,
  exposure: 482000,
  exposureFormatted: "₹4.82L",
  modelPrAuc: 0.94,
  liveThroughputTps: 842,
};

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "TX-92831",
    time: "10:06:13",
    userId: "U-1932",
    merchantId: "M-291",
    merchantName: "Apex Luxe Retail",
    amount: 82400,
    channel: "BANK_TRANSFER",
    device: "NEW",
    deviceId: "D-8812",
    location: "Mumbai",
    ipAddress: "103.21.244.89",
    riskScore: 87,
    decision: "REVIEW",
    status: "PENDING",
    signals: [
      "Amount 9.4x user historical mean",
      "First authentication from D-8812",
      "Impossible travel: 650km in 2m 58s",
      "Velocity spike: 4 txns in 4 minutes",
    ],
  },
  {
    id: "TX-92830",
    time: "10:05:42",
    userId: "U-1932",
    merchantId: "M-804",
    merchantName: "Bharat Crypto Ramp",
    amount: 27000,
    channel: "UPI",
    device: "NEW",
    deviceId: "D-8812",
    location: "Mumbai",
    ipAddress: "103.21.244.89",
    riskScore: 74,
    decision: "REVIEW",
    status: "RESOLVED",
    signals: ["New merchant destination", "UPI velocity limit approaching"],
  },
  {
    id: "TX-92829",
    time: "10:05:03",
    userId: "U-1932",
    merchantId: "M-118",
    merchantName: "Croma Retail Digital",
    amount: 12400,
    channel: "CARD",
    device: "NEW",
    deviceId: "D-8812",
    location: "Mumbai",
    ipAddress: "103.21.244.89",
    riskScore: 61,
    decision: "APPROVE",
    status: "RESOLVED",
    signals: ["New device first transaction"],
  },
  {
    id: "TX-92828",
    time: "10:04:45",
    userId: "U-4029",
    merchantId: "M-502",
    merchantName: "Swiggy Corporate",
    amount: 1450,
    channel: "UPI",
    device: "TRUSTED",
    deviceId: "D-3041",
    location: "Bengaluru",
    ipAddress: "49.207.181.12",
    riskScore: 12,
    decision: "APPROVE",
    status: "RESOLVED",
    signals: ["Pattern matches habit profile"],
  },
  {
    id: "TX-92827",
    time: "10:04:18",
    userId: "U-8190",
    merchantId: "M-677",
    merchantName: "Amazon India Pay",
    amount: 3499,
    channel: "CARD",
    device: "TRUSTED",
    deviceId: "D-9910",
    location: "Delhi",
    ipAddress: "14.139.241.11",
    riskScore: 16,
    decision: "APPROVE",
    status: "RESOLVED",
    signals: ["Trusted merchant token", "Biometric verified"],
  },
  {
    id: "TX-92826",
    time: "10:03:55",
    userId: "U-7112",
    merchantId: "M-991",
    merchantName: "DarkMesh Cloud VPN",
    amount: 142000,
    channel: "BANK_TRANSFER",
    device: "UNKNOWN",
    deviceId: "D-0041",
    location: "Indore",
    ipAddress: "185.220.101.5",
    riskScore: 94,
    decision: "BLOCK",
    status: "RESOLVED",
    signals: ["Tor exit relay detected", "Sanction list watchword trigger"],
  },
  {
    id: "TX-92825",
    time: "10:03:21",
    userId: "U-1932",
    merchantId: "M-045",
    merchantName: "Blue Tokai Coffee",
    amount: 850,
    channel: "UPI",
    device: "TRUSTED",
    deviceId: "D-1044",
    location: "Indore",
    ipAddress: "157.34.120.44",
    riskScore: 8,
    decision: "APPROVE",
    status: "RESOLVED",
    signals: ["Baseline transaction match"],
  },
  {
    id: "TX-92824",
    time: "10:02:40",
    userId: "U-3382",
    merchantId: "M-312",
    merchantName: "Flipkart Internet Pvt",
    amount: 18990,
    channel: "CARD",
    device: "TRUSTED",
    deviceId: "D-5501",
    location: "Hyderabad",
    ipAddress: "115.112.89.34",
    riskScore: 24,
    decision: "APPROVE",
    status: "RESOLVED",
    signals: ["Known merchant whitelist"],
  },
  {
    id: "TX-92823",
    time: "10:01:59",
    userId: "U-6601",
    merchantId: "M-488",
    merchantName: "Titan Eyeplus",
    amount: 6800,
    channel: "UPI",
    device: "TRUSTED",
    deviceId: "D-7719",
    location: "Pune",
    ipAddress: "182.73.119.50",
    riskScore: 19,
    decision: "APPROVE",
    status: "RESOLVED",
    signals: ["Normal temporal rhythm"],
  },
  {
    id: "TX-92822",
    time: "10:01:14",
    userId: "U-5540",
    merchantId: "M-723",
    merchantName: "FastGold Bullion",
    amount: 98000,
    channel: "BANK_TRANSFER",
    device: "NEW",
    deviceId: "D-9211",
    location: "Delhi",
    ipAddress: "49.36.12.80",
    riskScore: 81,
    decision: "REVIEW",
    status: "PENDING",
    signals: ["Dormant account reactivation", "High value outflow"],
  },
];

export const LIVE_EVENT_STREAM: LiveEvent[] = [
  {
    id: "EV-01",
    time: "10:06:16",
    type: "RISK",
    title: "RISK ESCALATED",
    detail: "TX-92831 escalated to 87 [HIGH]",
    severity: "high",
    transactionId: "TX-92831",
  },
  {
    id: "EV-02",
    time: "10:06:15",
    type: "LOCATION",
    title: "LOCATION ANOMALY",
    detail: "MUMBAI vs INDORE (Delta 650km / 2m)",
    severity: "high",
    transactionId: "TX-92831",
  },
  {
    id: "EV-03",
    time: "10:06:14",
    type: "VELOCITY",
    title: "HIGH VELOCITY",
    detail: "TX-92831: 4 txns in 4m (₹1,22,650)",
    severity: "medium",
    transactionId: "TX-92831",
  },
  {
    id: "EV-04",
    time: "10:06:13",
    type: "DEVICE",
    title: "NEW DEVICE",
    detail: "U-1932 bound to unverified D-8812",
    severity: "medium",
    transactionId: "TX-92831",
  },
  {
    id: "EV-05",
    time: "10:05:42",
    type: "DECISION",
    title: "HOLD ISSUED",
    detail: "TX-92830 held for Step-up Auth",
    severity: "medium",
    transactionId: "TX-92830",
  },
  {
    id: "EV-06",
    time: "10:04:12",
    type: "RULE",
    title: "RULE TRIGGERED",
    detail: "R-102 (Velocity & New Device) activated",
    severity: "low",
  },
];

export const PRIMARY_INVESTIGATION = {
  transaction: MOCK_TRANSACTIONS[0], // TX-92831
  riskFactors: [
    {
      factor: "Amount anomaly",
      scoreDelta: 28,
      description: "Amount ₹82,400 is 9.4x user historical 90-day mean of ₹8,750.",
      category: "amount" as const,
    },
    {
      factor: "New device",
      scoreDelta: 21,
      description: "Device D-8812 (iOS 18.2, Safari WebKit) seen for the first time 2m ago.",
      category: "device" as const,
    },
    {
      factor: "Transaction velocity",
      scoreDelta: 17,
      description: "4 transactions totaling ₹1,22,650 within 4 minutes (threshold: ₹30,000/hr).",
      category: "velocity" as const,
    },
    {
      factor: "Location anomaly",
      scoreDelta: 14,
      description: "Geo delta: Indore to Mumbai (650 km) within 2 minutes 58 seconds (impossible travel).",
      category: "location" as const,
    },
    {
      factor: "Merchant behavior",
      scoreDelta: 7,
      description: "M-291 (Apex Luxe) flagged with 4.8% chargeback rate across sentinel network.",
      category: "merchant" as const,
    },
  ],
  timeline: [
    {
      id: "TL-01",
      time: "10:02:14",
      title: "Login from Device A",
      detail: "Indore IP (157.34.120.44), Fingerprint D-1044. Trusted hardware enclave.",
      type: "info" as const,
    },
    {
      id: "TL-02",
      time: "10:03:21",
      title: "Baseline Transaction",
      detail: "₹850 paid to Blue Tokai Coffee via UPI. Risk score: 08 (Normal).",
      type: "info" as const,
      amount: 850,
    },
    {
      id: "TL-03",
      time: "10:04:12",
      title: "New device detected",
      detail: "Hardware D-8812 bound to account via Web session in Mumbai. SMS OTP bypassed.",
      type: "warning" as const,
    },
    {
      id: "TL-04",
      time: "10:05:03",
      title: "Escalating Spend",
      detail: "₹12,400 charged at Croma Retail Digital via Virtual Card.",
      type: "warning" as const,
      amount: 12400,
    },
    {
      id: "TL-05",
      time: "10:05:42",
      title: "High Velocity Outflow",
      detail: "₹27,000 transferred to Bharat Crypto Ramp via UPI handle.",
      type: "alert" as const,
      amount: 27000,
    },
    {
      id: "TL-06",
      time: "10:06:11",
      title: "Target Transaction",
      detail: "₹82,400 requested by Apex Luxe Retail via Immediate Bank Transfer.",
      type: "critical" as const,
      amount: 82400,
    },
    {
      id: "TL-07",
      time: "10:06:12",
      title: "Risk Score → 87",
      detail: "XGBoost v1.4.2 evaluated 48 behavioral features. Confidence 94.2%.",
      type: "critical" as const,
    },
    {
      id: "TL-08",
      time: "10:06:13",
      title: "Review triggered",
      detail: "Automated isolation policy hold applied. Sent to manual analyst queue.",
      type: "critical" as const,
    },
  ],
};

export const MOCK_RULES: Rule[] = [
  {
    id: "R-101",
    name: "High Velocity Rapid Escalation",
    description: "Detects burst transactions over ₹50k on recently bound hardware.",
    enabled: true,
    conditions: [
      { field: "Transaction amount", operator: ">", value: "₹50,000" },
      { field: "Device", operator: "is", value: "NEW" },
      { field: "Velocity 10m", operator: ">", value: "5" },
    ],
    consequence: {
      riskDelta: 30,
      action: "REVIEW",
    },
    triggerCount: 142,
    lastTriggered: "10:06:13",
  },
  {
    id: "R-102",
    name: "Impossible Travel Velocity Barrier",
    description: "Calculates physical travel speed between consecutive authorizations.",
    enabled: true,
    conditions: [
      { field: "Geo Delta", operator: ">", value: "500 km" },
      { field: "Elapsed Time", operator: "<", value: "15 min" },
    ],
    consequence: {
      riskDelta: 45,
      action: "BLOCK",
    },
    triggerCount: 89,
    lastTriggered: "10:06:12",
  },
  {
    id: "R-103",
    name: "New Merchant High Value Outflow",
    description: "Catches large drain attempts to merchants seen for first time.",
    enabled: true,
    conditions: [
      { field: "Merchant Age", operator: "<", value: "7 days" },
      { field: "Transaction amount", operator: ">", value: "₹25,000" },
    ],
    consequence: {
      riskDelta: 20,
      action: "REVIEW",
    },
    triggerCount: 312,
    lastTriggered: "09:48:22",
  },
  {
    id: "R-104",
    name: "Tor / Anonymous Proxy Egress",
    description: "Blocks traffic originating from verified anonymity relays.",
    enabled: true,
    conditions: [
      { field: "IP Classification", operator: "in", value: "TOR, EXIT_RELAY, VPN_SUSPECT" },
    ],
    consequence: {
      riskDelta: 50,
      action: "BLOCK",
    },
    triggerCount: 67,
    lastTriggered: "10:03:55",
  },
];

export const MOCK_MODEL_METRICS = {
  name: "XGBoost v1.4.2-prod",
  type: "Gradient Boosted Decision Forest + Neural Embeddings",
  lastTrained: "2026-09-18 04:30 UTC",
  datasetSize: "4,820,000 labeled transactions",
  prAuc: 0.94,
  precision: 0.91,
  recall: 0.87,
  f1: 0.89,
  rocAuc: 0.97,
  latencyP99: "4.2 ms",
  features: [
    { name: "velocity_10m", importance: 0.28, description: "Transaction count in last 10m" },
    { name: "amount_vs_user_avg", importance: 0.22, description: "Ratio to user 90-day avg" },
    { name: "device_trust_score", importance: 0.18, description: "Device reputation hash" },
    { name: "geo_velocity_kmh", importance: 0.14, description: "Calculated km/h between hops" },
    { name: "merchant_chargeback_rate", importance: 0.10, description: "Merchant network risk" },
    { name: "time_of_day_anomaly", importance: 0.08, description: "Hour vs historical habitual pattern" },
  ],
};

export const MOCK_ANALYTICS = {
  fraudRateTrend: [
    { hour: "00:00", rate: 0.32, total: 3200, fraud: 10 },
    { hour: "03:00", rate: 0.89, total: 1800, fraud: 16 },
    { hour: "06:00", rate: 0.41, total: 2900, fraud: 12 },
    { hour: "09:00", rate: 1.15, total: 8400, fraud: 96 },
    { hour: "12:00", rate: 1.48, total: 14200, fraud: 210 },
    { hour: "15:00", rate: 1.82, total: 18900, fraud: 344 },
    { hour: "18:00", rate: 1.64, total: 22400, fraud: 367 },
    { hour: "21:00", rate: 1.22, total: 16200, fraud: 198 },
  ],
  riskDistribution: [
    { tier: "LOW", range: "0 - 29", count: 95031, percent: 74.0, exposure: "₹1.12 Cr", color: "#10B981" },
    { tier: "MEDIUM", range: "30 - 59", count: 23115, percent: 18.0, exposure: "₹84.2 L", color: "#F59E0B" },
    { tier: "HIGH", range: "60 - 79", count: 7705, percent: 6.0, exposure: "₹38.5 L", color: "#F97316" },
    { tier: "CRITICAL", range: "80 - 100", count: 2570, percent: 2.0, exposure: "₹18.4 L", color: "#EF4444" },
  ],
  fraudByCity: [
    { city: "Mumbai", fraudVolume: 420000, cases: 412, riskIndex: 82 },
    { city: "Delhi", fraudVolume: 380000, cases: 389, riskIndex: 78 },
    { city: "Bengaluru", fraudVolume: 240000, cases: 210, riskIndex: 45 },
    { city: "Indore", fraudVolume: 190000, cases: 142, riskIndex: 64 },
    { city: "Hyderabad", fraudVolume: 160000, cases: 128, riskIndex: 51 },
    { city: "Pune", fraudVolume: 90000, cases: 88, riskIndex: 39 },
  ],
  fraudByChannel: [
    { name: "UPI", value: 58, fraudPercent: 2.4, color: "#3B82F6" },
    { name: "CARD", value: 26, fraudPercent: 1.8, color: "#06B6D4" },
    { name: "BANK_TRANSFER", value: 16, fraudPercent: 3.9, color: "#8B5CF6" },
  ],
  decisions: [
    { name: "APPROVE", count: 123512, percent: 96.2, color: "#10B981" },
    { name: "REVIEW", count: 3595, percent: 2.8, color: "#F59E0B" },
    { name: "BLOCK", count: 1314, percent: 1.0, color: "#EF4444" },
  ],
};
