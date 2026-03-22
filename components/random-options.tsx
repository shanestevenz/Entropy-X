"use client";

import type { PasswordOptions } from "@/lib/password";

interface RandomOptionsProps {
  options: PasswordOptions;
  onChange: (options: PasswordOptions) => void;
}

export function RandomOptions({ options, onChange }: RandomOptionsProps) {
  const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...options, length: parseInt(e.target.value, 10) });
  };

  const handleCheckboxChange = (key: keyof Omit<PasswordOptions, "length">) => {
    onChange({ ...options, [key]: !options[key] });
  };

  return (
    <div className="space-y-6">
      {/* Length Slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-foreground">Password Length</label>
          <span className="rounded bg-secondary px-2.5 py-1 text-sm font-semibold tabular-nums text-foreground">
            {options.length}
          </span>
        </div>
        <input
          type="range"
          min="6"
          max="64"
          value={options.length}
          onChange={handleLengthChange}
          className="w-full"
          aria-label="Password length"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>6</span>
          <span>64</span>
        </div>
      </div>

      {/* Character Options */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">Character Types</label>
        <div className="grid grid-cols-2 gap-3">
          <label className="flex cursor-pointer items-center gap-3 rounded-lg border bg-card p-3 transition-colors hover:bg-accent">
            <input
              type="checkbox"
              checked={options.uppercase}
              onChange={() => handleCheckboxChange("uppercase")}
              aria-label="Include uppercase letters"
            />
            <div>
              <span className="text-sm font-medium text-foreground">Uppercase</span>
              <p className="text-xs text-muted-foreground">A-Z</p>
            </div>
          </label>

          <label className="flex cursor-pointer items-center gap-3 rounded-lg border bg-card p-3 transition-colors hover:bg-accent">
            <input
              type="checkbox"
              checked={options.lowercase}
              onChange={() => handleCheckboxChange("lowercase")}
              aria-label="Include lowercase letters"
            />
            <div>
              <span className="text-sm font-medium text-foreground">Lowercase</span>
              <p className="text-xs text-muted-foreground">a-z</p>
            </div>
          </label>

          <label className="flex cursor-pointer items-center gap-3 rounded-lg border bg-card p-3 transition-colors hover:bg-accent">
            <input
              type="checkbox"
              checked={options.numbers}
              onChange={() => handleCheckboxChange("numbers")}
              aria-label="Include numbers"
            />
            <div>
              <span className="text-sm font-medium text-foreground">Numbers</span>
              <p className="text-xs text-muted-foreground">0-9</p>
            </div>
          </label>

          <label className="flex cursor-pointer items-center gap-3 rounded-lg border bg-card p-3 transition-colors hover:bg-accent">
            <input
              type="checkbox"
              checked={options.symbols}
              onChange={() => handleCheckboxChange("symbols")}
              aria-label="Include symbols"
            />
            <div>
              <span className="text-sm font-medium text-foreground">Symbols</span>
              <p className="text-xs text-muted-foreground">{"!@#$%"}</p>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
