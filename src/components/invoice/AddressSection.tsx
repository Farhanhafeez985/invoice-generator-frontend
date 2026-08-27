"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface AddressSectionProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
}

export function AddressSection({ label, value, onChange, placeholder, required = false }: AddressSectionProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      setIsEditing(false);
    }
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2">
        <Label className="text-sm font-medium text-foreground">{label}{required && <span className="text-destructive ml-1">*</span>}</Label>
        {isEditing && (
          <span className="text-xs text-muted-foreground">Press Enter to save</span>
        )}
      </div>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsEditing(true)}
        placeholder={placeholder}
        className={cn(
          "min-h-[80px] md:min-h-[100px] resize-none transition-colors",
          isEditing ? "ring-2 ring-primary border-primary" : "border-border hover:border-primary/50"
        )}
        rows={4}
      />
    </div>
  );
}