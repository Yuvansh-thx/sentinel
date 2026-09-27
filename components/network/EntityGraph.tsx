"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
  MarkerType,
  Node,
  Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { ShieldAlert, Laptop, User, CreditCard, Store, Globe, MapPin, Search } from "lucide-react";

// Technical Node Data Interface
interface EntityNodeData {
  entityType: "USER" | "DEVICE" | "TRANSACTION" | "MERCHANT" | "IP" | "LOCATION" | "ACCOUNT";
  title: string;
  detail: string;
  risk?: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  metrics?: string;
  [key: string]: unknown;
}

// Custom Restrained Technical Node Component as specified in Section 31
function TechnicalNode({ data, selected }: { data: EntityNodeData; selected?: boolean }) {
  let riskColor = "text-slate-400 border-border-subtle";
  let badgeColor = "bg-surface-secondary text-slate-400";
  let icon = <User className="w-3.5 h-3.5 text-accent-cyan" />;

  switch (data.entityType) {
    case "USER":
      icon = <User className="w-3.5 h-3.5 text-accent-cyan" />;
      break;
    case "DEVICE":
      icon = <Laptop className="w-3.5 h-3.5 text-orange-400" />;
      break;
    case "TRANSACTION":
      icon = <CreditCard className="w-3.5 h-3.5 text-blue-400" />;
      break;
    case "MERCHANT":
      icon = <Store className="w-3.5 h-3.5 text-emerald-400" />;
      break;
    case "IP":
      icon = <Globe className="w-3.5 h-3.5 text-purple-400" />;
      break;
    case "LOCATION":
      icon = <MapPin className="w-3.5 h-3.5 text-pink-400" />;
      break;
    case "ACCOUNT":
      icon = <CreditCard className="w-3.5 h-3.5 text-cyan-300" />;
      break;
  }

  if (data.risk === "CRITICAL") {
    riskColor = "border-red-600 bg-red-950/20";
    badgeColor = "bg-red-950/60 text-red-400 border border-red-800";
  } else if (data.risk === "HIGH") {
    riskColor = "border-orange-500/80 bg-orange-950/20";
    badgeColor = "bg-orange-950/60 text-orange-400 border border-orange-800";
  } else if (data.risk === "LOW") {
    riskColor = "border-border-subtle bg-surface";
    badgeColor = "bg-emerald-950/40 text-emerald-400 border border-emerald-800";
  }

  return (
    <div
      className={`min-w-[170px] max-w-[210px] p-3 rounded bg-surface border transition-all duration-200 font-mono text-xs shadow-lg ${riskColor} ${
        selected ? "ring-2 ring-accent-cyan shadow-[0_0_20px_rgba(6,182,212,0.4)]" : ""
      }`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-2 h-2 !bg-accent-blue border-0"
      />

      {/* Node Header */}
      <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-border-subtle/60 text-[9px] text-slate-500 uppercase tracking-wider">
        <div className="flex items-center gap-1.5">
          {icon}
          <span>{data.entityType}</span>
        </div>
        {data.risk && (
          <span className={`px-1 rounded font-bold ${badgeColor}`}>
            {data.risk}
          </span>
        )}
      </div>

      {/* Title */}
      <div className="text-white font-bold text-sm tracking-tight truncate">
        {data.title}
      </div>

      {/* Technical Detail */}
      <div className="text-[10px] text-slate-400 mt-0.5 truncate">
        {data.detail}
      </div>

      {/* Micro metrics */}
      {data.metrics && (
        <div className="text-[9px] text-slate-500 mt-1 pt-1 border-t border-border-subtle/40 truncate">
          {data.metrics}
        </div>
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-2 h-2 !bg-accent-cyan border-0"
      />
    </div>
  );
}

const INITIAL_NODES: Node<EntityNodeData>[] = [
  {
    id: "n-user",
    type: "technical",
    position: { x: 380, y: 30 },
    data: {
      entityType: "USER",
      title: "U-1932",
      detail: "Ananya Sharma",
      risk: "LOW",
      metrics: "KYC VERIFIED • 421 DAYS",
    },
  },
  {
    id: "n-acc",
    type: "technical",
    position: { x: 100, y: 140 },
    data: {
      entityType: "ACCOUNT",
      title: "ACC-49102",
      detail: "Axis Bank Corporate",
      risk: "LOW",
      metrics: "AVAILABLE ₹4.20L",
    },
  },
  {
    id: "n-dev-trusted",
    type: "technical",
    position: { x: 300, y: 150 },
    data: {
      entityType: "DEVICE",
      title: "D-1044",
      detail: "TRUSTED ENCLAVE",
      risk: "LOW",
      metrics: "SEEN: INDORE • 89 TXNS",
    },
  },
  {
    id: "n-dev-rogue",
    type: "technical",
    position: { x: 550, y: 150 },
    data: {
      entityType: "DEVICE",
      title: "D-8812",
      detail: "FIRST SEEN TODAY",
      risk: "HIGH",
      metrics: "BOUND: 2m AGO • WEBKIT",
    },
  },
  {
    id: "n-txn-target",
    type: "technical",
    position: { x: 420, y: 280 },
    data: {
      entityType: "TRANSACTION",
      title: "TX-92831",
      detail: "₹82,400 (IMPS)",
      risk: "CRITICAL",
      metrics: "SCORE: 87 • REVIEW QUEUE",
    },
  },
  {
    id: "n-ip",
    type: "technical",
    position: { x: 680, y: 280 },
    data: {
      entityType: "IP",
      title: "103.21.244.89",
      detail: "MUMBAI DATACENTER",
      risk: "HIGH",
      metrics: "VPN EGRESS / TOR NODE",
    },
  },
  {
    id: "n-merch",
    type: "technical",
    position: { x: 300, y: 410 },
    data: {
      entityType: "MERCHANT",
      title: "M-291",
      detail: "Apex Luxe Retail",
      risk: "MEDIUM",
      metrics: "CHARGEBACK: 4.8%",
    },
  },
  {
    id: "n-loc",
    type: "technical",
    position: { x: 550, y: 410 },
    data: {
      entityType: "LOCATION",
      title: "MUMBAI, IN",
      detail: "19.0760° N, 72.8777° E",
      risk: "HIGH",
      metrics: "DELTA 650km IN 2m 58s",
    },
  },
];

const INITIAL_EDGES: Edge[] = [
  {
    id: "e-user-acc",
    source: "n-user",
    target: "n-acc",
    animated: false,
    style: { stroke: "#1e3a8a", strokeWidth: 1.5 },
  },
  {
    id: "e-user-dev1",
    source: "n-user",
    target: "n-dev-trusted",
    animated: false,
    style: { stroke: "#059669", strokeWidth: 1.5 },
  },
  {
    id: "e-user-dev2",
    source: "n-user",
    target: "n-dev-rogue",
    animated: true,
    style: { stroke: "#f97316", strokeWidth: 2 },
  },
  {
    id: "e-dev2-txn",
    source: "n-dev-rogue",
    target: "n-txn-target",
    animated: true,
    style: { stroke: "#ea580c", strokeWidth: 2 },
  },
  {
    id: "e-dev2-ip",
    source: "n-dev-rogue",
    target: "n-ip",
    animated: true,
    style: { stroke: "#a855f7", strokeWidth: 1.5 },
  },
  {
    id: "e-txn-merch",
    source: "n-txn-target",
    target: "n-merch",
    animated: true,
    style: { stroke: "#3b82f6", strokeWidth: 2 },
  },
  {
    id: "e-txn-loc",
    source: "n-txn-target",
    target: "n-loc",
    animated: true,
    style: { stroke: "#ef4444", strokeWidth: 2 },
  },
];

export function EntityGraph({ isCompact = false }: { isCompact?: boolean }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NodesMemo(isCompact));
  const [edges, setEdges, onEdgesChange] = useEdgesState(INITIAL_EDGES);
  const [selectedNode, setSelectedNode] = useState<Node<EntityNodeData> | null>(INITIAL_NODES[4]);

  const nodeTypes = useMemo(
    () => ({
      technical: TechnicalNode,
    }),
    []
  );

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node as Node<EntityNodeData>);
  }, []);

  return (
    <div
      className={`w-full bg-[#060b18] border border-border-subtle rounded-lg overflow-hidden flex flex-col font-mono text-xs ${
        isCompact ? "h-[450px]" : "h-[720px]"
      }`}
    >
      {/* Network HUD Controls Header */}
      <div className="p-3 bg-surface border-b border-border-subtle flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-400">
        <div className="flex items-center gap-3">
          <span className="text-white font-bold tracking-wider">ENTITY TOPOLOGY</span>
          <span className="text-slate-600">•</span>
          <span>NODES: <strong className="text-slate-200">8</strong></span>
          <span>RELATIONSHIPS: <strong className="text-slate-200">7</strong></span>
          <span>CLUSTER: <strong className="text-orange-400">ANOMALOUS</strong></span>
        </div>

        <div className="flex items-center gap-3 text-[10px]">
          <span className="text-slate-500">INTERACTION:</span>
          <span className="text-slate-300">ZOOM • PAN • DRAG • CLICK NODE</span>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          minZoom={0.4}
          maxZoom={1.6}
          defaultViewport={{ x: 0, y: 0, zoom: 0.95 }}
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={24}
            size={1.2}
            color="#1e2d4a"
          />
          <Controls showInteractive={false} className="!left-4 !bottom-4 !top-auto" />
        </ReactFlow>

        {/* Selected Entity Inspector Panel Overlay */}
        {selectedNode && (
          <div className="absolute right-4 top-4 z-20 w-72 bg-surface/95 border border-border-bright rounded-lg p-3.5 backdrop-blur-md shadow-2xl">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-border-subtle text-[10px] text-slate-500">
              <span>INSPECTOR: {selectedNode.data.entityType}</span>
              <span className="text-accent-cyan font-bold">ID: {selectedNode.id}</span>
            </div>
            <div className="text-base text-white font-bold mb-1">
              {selectedNode.data.title}
            </div>
            <div className="text-xs text-slate-300 mb-2">
              {selectedNode.data.detail}
            </div>
            {selectedNode.data.risk && (
              <div className="p-2 rounded bg-surface-secondary mb-2 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">ASSIGNED RISK:</span>
                <span className="text-orange-400 font-bold">{selectedNode.data.risk}</span>
              </div>
            )}
            <div className="text-[10px] text-slate-500 leading-relaxed font-sans">
              {selectedNode.data.metrics || "Connected across active fraud sub-graph."}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function INITIAL_NodesMemo(isCompact: boolean): Node<EntityNodeData>[] {
  if (!isCompact) return INITIAL_NODES;
  // Scaled coordinates for compact view inside investigation screen
  return INITIAL_NODES.map((n) => ({
    ...n,
    position: {
      x: n.position.x * 0.75,
      y: n.position.y * 0.75,
    },
  }));
}
