"use client";

import { useState, useRef, useEffect } from "react";
import { Copy, Check, RefreshCw, Eye, EyeOff, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

interface PasswordDisplayProps {
  password: string;
  onPasswordChange: (password: string) => void;
  onRegenerate: () => void;
}

export function PasswordDisplay({ password, onPasswordChange, onRegenerate }: PasswordDisplayProps) {
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

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

  const handleInputBlur = () => {
    setIsEditing(false);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEditing(false);
    }
  };

  const startEditing = () => {
    setIsEditing(true);
    setVisible(true);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 rounded-lg border bg-card p-4">
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={password}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleInputKeyDown}
            className="flex-1 bg-transparent password-display text-lg text-foreground outline-none placeholder:text-muted-foreground"
            placeholder="Type your password..."
            autoComplete="off"
            spellCheck={false}
          />
        ) : (
          <div 
            className={cn(
              "flex-1 overflow-hidden text-ellipsis whitespace-nowrap password-display text-lg cursor-text",
              password ? "text-foreground" : "text-muted-foreground"
            )}
            onClick={startEditing}
          >
            {visible
              ? (password || "Click to type or generate a password")
              : password.replace(/./g, "•")}
          </div>
        )}
        
        {!isEditing && (
          <button
            onClick={startEditing}
            className="shrink-0 rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            aria-label="Edit password"
          >
            <Pencil className="h-4 w-4" />
          </button>
        )}
        
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
              ? "text-strength-good" 
              : "text-muted-foreground hover:bg-accent hover:text-foreground",
            !password && "cursor-not-allowed opacity-50"
          )}
          aria-label="Copy to clipboard"
        >
          {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
        </button>
      </div>
      
      <button
        onClick={onRegenerate}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98]"
      >
        <RefreshCw className="h-4 w-4" />
        Generate Password
      </button>
    </div>
  );
}
