"use client";

import type { MemorableOptions } from "@/lib/password";
import { cn } from "@/lib/utils";

interface MemorableOptionsProps {
  options: MemorableOptions;
  onChange: (options: MemorableOptions) => void;
}

const separatorOptions = [
  { value: "-", label: "Dash", preview: "word-word" },
  { value: "_", label: "Underscore", preview: "word_word" },
  { value: ".", label: "Dot", preview: "word.word" },
  { value: "", label: "None", preview: "wordword" },
];

export function MemorableOptions({ options, onChange }: MemorableOptionsProps) {
  const handleWordCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...options, wordCount: parseInt(e.target.value, 10) });
  };

  return (
    <div className="space-y-6">
      {/* Word Count Slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-foreground">
            Number of Words
          </label>
          <span className="rounded bg-secondary px-2.5 py-1 text-sm font-semibold tabular-nums text-foreground">
            {options.wordCount}
          </span>
        </div>
        <input
          type="range"
          min="2"
          max="6"
          value={options.wordCount}
          onChange={handleWordCountChange}
          className="w-full"
          aria-label="Number of words"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>2</span>
          <span>6</span>
        </div>
      </div>

      {/* Separator Selection */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">
          Word Separator
        </label>
        <div className="grid grid-cols-2 gap-2">
          {separatorOptions.map((sep) => (
            <button
              key={sep.label}
              onClick={() => onChange({ ...options, separator: sep.value })}
              className={cn(
                "rounded-lg border p-3 text-left transition-all",
                options.separator === sep.value
                  ? "border-primary bg-primary/10"
                  : "bg-card hover:bg-accent"
              )}
            >
              <span className="text-sm font-medium text-foreground">{sep.label}</span>
              <p className="text-xs text-muted-foreground">{sep.preview}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Additional Options */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">
          Additional Options
        </label>
        <div className="space-y-2">
          <label className="flex cursor-pointer items-center gap-3 rounded-lg border bg-card p-3 transition-colors hover:bg-accent">
            <input
              type="checkbox"
              checked={options.capitalize}
              onChange={() => onChange({ ...options, capitalize: !options.capitalize })}
              aria-label="Capitalize words"
            />
            <div>
              <span className="text-sm font-medium text-foreground">Capitalize Words</span>
              <p className="text-xs text-muted-foreground">First letter uppercase</p>
            </div>
          </label>
          
          <label className="flex cursor-pointer items-center gap-3 rounded-lg border bg-card p-3 transition-colors hover:bg-accent">
            <input
              type="checkbox"
              checked={options.includeNumbers}
              onChange={() => onChange({ ...options, includeNumbers: !options.includeNumbers })}
              aria-label="Include numbers"
            />
            <div>
              <span className="text-sm font-medium text-foreground">Include Numbers</span>
              <p className="text-xs text-muted-foreground">Add random digits at the end</p>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
