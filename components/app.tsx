"use client";

import { useState, useEffect, useCallback } from "react";
import { TabSelector, type TabType } from "./tab-selector";
import { PasswordBar } from "./password-bar";
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

// TODO: Consider moving this component back into to page.tsx for simplicity
export function App() {
  const [activeTab, setActiveTab] = useState<TabType>("memorable");
  const [password, setPassword] = useState("");

  const [randomOptions, setRandomOptions] = useState<PasswordOptions>({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });

  const [memorableOptions, setMemorableOptions] = useState<MemorableOptionsType>({
    wordCount: 3,
    includeNumbers: true,
    capitalize: true,
    separator: "-",
    similarChacters: false, // Not used yet TODO
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
    <div className="mx-auto w-full max-w-4xl ">
      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="mb-6  flex items-center justify-center gap-3 ">
          
          <div>
            <h1 className="text-6xl font-bold text-foreground text-center">EntropyX</h1>
            <p className="text-xl text-muted-foreground">Create and test secure passwords instantly</p>
          </div>
        </div>

      

        {/* Password Display */}
        <div className="mb-6">
          <PasswordBar
            password={password}
            onPasswordChange={setPassword}
            onRegenerate={generatePassword}
          />
        </div>

        {/* Strength Meter */}
        <div className="mb-6 rounded-lg border bg-secondary/50 p-4">
          <StrengthMeter strength={strength} />
        </div>


       {/* Tab Selector */}
        <div className="mb-6">
          <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />
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
