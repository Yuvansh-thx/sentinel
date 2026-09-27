import type { Metadata } from "next";
import "./globals.css";
import { SentinelProvider } from "@/lib/context";
import { MouseSignalTracker } from "@/components/creative/MouseSignalTracker";
import { CommandPalette } from "@/components/navigation/CommandPalette";
import { KeyboardShortcuts } from "@/components/navigation/KeyboardShortcuts";

export const metadata: Metadata = {
  title: "SENTINEL // FinTech Fraud Intelligence Platform",
  description: "Real-time transaction intelligence for detecting anomalous financial behavior.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-slate-200 antialiased selection:bg-blue-600/30 selection:text-white min-h-screen">
        <SentinelProvider>
          {/* Global secondary lagging cursor signal tracker */}
          <MouseSignalTracker />

          {/* Global Command Palette (Cmd+K) */}
          <CommandPalette />

          {/* Global Keyboard Shortcuts listener & help modal (?) */}
          <KeyboardShortcuts />

          {children}
        </SentinelProvider>
      </body>
    </html>
  );
}
