"use client";

import { cn } from "@/lib/utils";
import type { PasswordStrength } from "@/lib/password";
import { Clock, AlertTriangle, CheckCircle, ShieldAlert, Shield } from "lucide-react";

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

const bgLightMap: Record<string, string> = {
  "strength-weak": "bg-strength-weak/10",
  "strength-fair": "bg-strength-fair/10",
  "strength-good": "bg-strength-good/10",
  "strength-strong": "bg-strength-strong/10",
};

const iconMap: Record<string, React.ReactNode> = {
  "strength-weak": <ShieldAlert className="h-5 w-5" />,
  "strength-fair": <AlertTriangle className="h-5 w-5" />,
  "strength-good": <Shield className="h-5 w-5" />,
  "strength-strong": <CheckCircle className="h-5 w-5" />,
};

export function StrengthMeter({ strength }: StrengthMeterProps) {
  const bars = 4;
  const filledBars = strength.score;

  return (
    <div className="space-y-4">
      {/* Strength label and bars */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Password Strength</span>
          <div className={cn("flex items-center gap-1.5", textColorMap[strength.color])}>
            {iconMap[strength.color]}
            <span className="text-sm font-semibold">{strength.label}</span>
          </div>
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
      </div>

      {/* Crack time estimate */}
      <div className={cn(
        "flex items-center gap-3 rounded-lg p-3",
        bgLightMap[strength.color]
      )}>
        <div className={cn("shrink-0", textColorMap[strength.color])}>
          <Clock className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted-foreground">Estimated time to crack</p>
          <p className={cn("text-sm font-semibold truncate", textColorMap[strength.color])}>
            {strength.crackTime}
          </p>
        </div>
      </div>

      {/* Feedback tips */}
      {strength.feedback.length > 0 && (
        <div className="space-y-1.5">
          {strength.feedback.slice(0, 2).map((tip, i) => (
            <p key={i} className="text-xs text-muted-foreground flex items-start gap-2">
              <span className="shrink-0 mt-0.5 h-1 w-1 rounded-full bg-muted-foreground" />
              <span>{tip}</span>
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
