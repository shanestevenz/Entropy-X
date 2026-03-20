"use client";

import { cn } from "@/lib/utils";
import type { PasswordStrength } from "@/lib/password";

interface StrengthMeterProps {
  strength: PasswordStrength;
}

const colorMap: Record<string, string> = {
  "strength-weak": "bg-strength-weak",
  "strength-fair": "bg-strength-fair",
  "strength-good": "bg-strength-good",
  "strength-strong": "bg-strength-strong",
};

const textColorMap: Record<string, string> = {
  "strength-weak": "text-strength-weak",
  "strength-fair": "text-strength-fair",
  "strength-good": "text-strength-good",
  "strength-strong": "text-strength-strong",
};

export function StrengthMeter({ strength }: StrengthMeterProps) {
  const bars = 4;
  const filledBars = strength.score;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Password Strength</span>
        <span className={cn("text-sm font-semibold", textColorMap[strength.color])}>
          {strength.label}
        </span>
      </div>
      
      <div className="flex gap-1.5">
        {Array.from({ length: bars }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-2 flex-1 rounded-full transition-all duration-300",
              i < filledBars ? colorMap[strength.color] : "bg-border"
            )}
          />
        ))}
      </div>

      <div className="space-y-1">
        {strength.feedback.slice(0, 2).map((tip, i) => (
          <p key={i} className="text-xs text-muted-foreground">
            {tip}
          </p>
        ))}
      </div>
    </div>
  );
}
