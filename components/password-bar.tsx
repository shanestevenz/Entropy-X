"use client";

import { useState } from "react";
import { Copy, Check, RefreshCw, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface PasswordBarProps {
  password: string;
  onPasswordChange: (password: string) => void;
  onRegenerate: () => void;
}

export function PasswordBar({ password, onPasswordChange, onRegenerate }: PasswordBarProps) {
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(true);
  const [popAnimation, setPopAnimation] = useState(false);


  const handleGenerate = () => {
    setPopAnimation(true);
    onRegenerate();

    setTimeout(() => setPopAnimation(false), 150);
  }

  const handleCopy = async () => {
    if (!password) return;
    
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onPasswordChange(e.target.value);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 rounded-lg border bg-card p-4">
        <input
          type={visible ? "text" : "password"}
          value={password}
          onChange={handleInputChange}
          className={cn("flex-1 bg-transparent password-display text-foreground outline-none placeholder:text-muted-foreground min-w-0 origin-left transition-transform duration-150",popAnimation && "scale-[1.02]")}
          placeholder="Type or generate a password..."
          autoComplete="off"
          spellCheck={false}
        />

          

        <button
          onClick={() => setVisible(!visible)}
          className="shrink-0 rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
        </button>
        
        <button
          onClick={handleCopy}
          disabled={!password}
          className={cn(
            "shrink-0 rounded-md p-2 transition-colors",
            copied 
              ? "text-[hsl(142,76%,36%)]" 
              : "text-muted-foreground hover:bg-accent hover:text-foreground",
            !password && "cursor-not-allowed opacity-50"
          )}
          aria-label="Copy to clipboard"
        >
          {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
        </button>
        

        <button
        onClick={handleGenerate}
        className="flex  px-3 items-center justify-center gap-2 rounded-lg bg-primary py-2 font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98]"
      >
        <RefreshCw className="h-4 w-4" />
        Generate
      </button>




      </div>
      
      
    </div>
  );
}
