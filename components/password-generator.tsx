"use client";

import { useState, useEffect, useCallback } from "react";
import { TabSelector, type TabType } from "./tab-selector";
import { PasswordDisplay } from "./password-display";
import { StrengthMeter } from "./strength-meter";
import { RandomOptions } from "./random-options";
import { MemorableOptions } from "./memorable-options";
import {
  generateRandomPassword,
  generateMemorablePassword,
  evaluatePasswordStrength,
  type PasswordOptions,
  type MemorableOptions as MemorableOptionsType,
} from "@/lib/password";
import { Shield } from "lucide-react";

export function PasswordGenerator() {
  const [activeTab, setActiveTab] = useState<TabType>("memorable");
  const [password, setPassword] = useState("");

  // Random password options
  const [randomOptions, setRandomOptions] = useState<PasswordOptions>({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });

  // Memorable password options
  const [memorableOptions, setMemorableOptions] = useState<MemorableOptionsType>({
    wordCount: 3,
    includeNumbers: true,
    capitalize: true,
    separator: "-",
  });

  const generatePassword = useCallback(() => {
    if (activeTab === "random") {
      setPassword(generateRandomPassword(randomOptions));
    } else {
      setPassword(generateMemorablePassword(memorableOptions));
    }
  }, [activeTab, randomOptions, memorableOptions]);

  // Generate password on mount and when options change
  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const strength = evaluatePasswordStrength(password);

  return (
    <div className="mx-auto w-full max-w-lg">
      <div className="rounded-2xl border bg-card p-6 shadow-xl md:p-8">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2.5">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Password Generator</h1>
            <p className="text-sm text-muted-foreground">Create secure passwords instantly</p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="mb-6">
          <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Password Display */}
        <div className="mb-6">
          <PasswordDisplay 
            password={password} 
            onPasswordChange={setPassword}
            onRegenerate={generatePassword} 
          />
        </div>

        {/* Strength Meter */}
        <div className="mb-6 rounded-lg border bg-secondary/50 p-4">
          <StrengthMeter strength={strength} />
        </div>

        {/* Options Panel */}
        <div className="border-t pt-6">
          {activeTab === "random" ? (
            <RandomOptions options={randomOptions} onChange={setRandomOptions} />
          ) : (
            <MemorableOptions options={memorableOptions} onChange={setMemorableOptions} />
          )}
        </div>
      </div>

      {/* Footer */}
      <p className="mt-4 text-center text-xs text-muted-foreground">
        Passwords are generated locally and never stored or transmitted
      </p>
    </div>
  );
}
