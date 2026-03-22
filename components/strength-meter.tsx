"use client";

import { cn } from "@/lib/utils";
import type { PasswordStrength } from "@/lib/password";
import { Clock, AlertTriangle, CheckCircle, ShieldAlert, Shield } from "lucide-react";

interface StrengthMeterProps {
  strength: PasswordStrength;
}

export function StrengthMeter({ strength }: StrengthMeterProps) {
  const bars = 4;
  const filledBars = strength.score;

  // Direct color values for reliability
  const getBarColor = (index: number) => {
    if (index >= filledBars) return "bg-border";
    switch (strength.color) {
      case "strength-weak":
        return "bg-[hsl(0,84%,60%)]";
      case "strength-fair":
        return "bg-[hsl(38,92%,50%)]";
      case "strength-good":
        return "bg-[hsl(162,100%,41%)]";
      case "strength-strong":
        return "bg-[hsl(142,76%,36%)]";
      default:
        return "bg-border";
    }
  };

  const getTextColor = () => {
    switch (strength.color) {
      case "strength-weak":
        return "text-[hsl(0,84%,60%)]";
      case "strength-fair":
        return "text-[hsl(38,92%,50%)]";
      case "strength-good":
        return "text-[hsl(162,100%,41%)]";
      case "strength-strong":
        return "text-[hsl(142,76%,36%)]";
      default:
        return "text-muted-foreground";
    }
  };

  const getBgLight = () => {
    switch (strength.color) {
      case "strength-weak":
        return "bg-[hsl(0,84%,60%,0.1)]";
      case "strength-fair":
        return "bg-[hsl(38,92%,50%,0.1)]";
      case "strength-good":
        return "bg-[hsl(162,100%,41%,0.1)]";
      case "strength-strong":
        return "bg-[hsl(142,76%,36%,0.1)]";
      default:
        return "bg-secondary";
    }
  };

  const getIcon = () => {
    switch (strength.color) {
      case "strength-weak":
        return <ShieldAlert className="h-5 w-5" />;
      case "strength-fair":
        return <AlertTriangle className="h-5 w-5" />;
      case "strength-good":
        return <Shield className="h-5 w-5" />;
      case "strength-strong":
        return <CheckCircle className="h-5 w-5" />;
      default:
        return <ShieldAlert className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Strength label and bars */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Password Strength</span>
          <div className={cn("flex items-center gap-1.5", getTextColor())}>
            {getIcon()}
            <span className="text-sm font-semibold">{strength.label}</span>
          </div>
        </div>

        <div className="flex gap-1.5">
          {Array.from({ length: bars }).map((_, i) => (
            <div
              key={i}
              className={cn("h-2 flex-1 rounded-full transition-all duration-300", getBarColor(i))}
            />
          ))}
        </div>
      </div>

      {/* Crack time estimate */}
      <div className={cn("flex items-center gap-3 rounded-lg p-3", getBgLight())}>
        <div className={cn("shrink-0", getTextColor())}>
          <Clock className="h-5 w-5" />
        </div>

        <div className="flex-1 min-w-0 cursor-pointer relative group">
          <p className="text-xs text-muted-foreground">Estimated time to crack</p>

          <div className="relative h-5 overflow-hidden">
            {/* Default text */}
            <p
              className={cn(
                "absolute inset-0 text-sm font-semibold truncate transition-all duration-300",
                "group-hover:translate-y-full group-hover:opacity-0",
                getTextColor()
              )}
            >
              {strength.crackTime || "Calculating..."}
            </p>

            {/* Hover text */}
            <p
              className={cn(
                "absolute inset-0 text-sm font-semibold truncate transition-all duration-300",
                "-translate-y-full opacity-0",
                "group-hover:translate-y-0 group-hover:opacity-100",
                getTextColor()
              )}
            >
              {strength.numberOfGuesses
                ? `${strength.numberOfGuesses.toLocaleString()} guesses`
                : "0 guesses"}
            </p>
          </div>
        </div>
      </div>

      {/* Feedback tips */}
      {strength.feedback.length > 0 && (
        <ul className="space-y-1.5 list-disc pl-4">
          {strength.feedback.slice(0, 2).map((tip, i) => (
            <li key={i} className="text-xs text-muted-foreground">
              {tip}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
