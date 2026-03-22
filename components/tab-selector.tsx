"use client";

import { cn } from "@/lib/utils";

export type TabType = "memorable" | "random";

interface TabSelectorProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function TabSelector({ activeTab, onTabChange }: TabSelectorProps) {
  return (
    <div className="flex rounded-lg bg-secondary p-1">
      <button
        onClick={() => onTabChange("memorable")}
        className={cn(
          "flex-1 rounded-md px-4 py-2.5 text-sm font-medium transition-all duration-200",
          activeTab === "memorable"
            ? "bg-card text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        Memorable
      </button>
      <button
        onClick={() => onTabChange("random")}
        className={cn(
          "flex-1 rounded-md px-4 py-2.5 text-sm font-medium transition-all duration-200",
          activeTab === "random"
            ? "bg-card text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        Random
      </button>
    </div>
  );
}
