"use client";

import { useState } from "react";
import { Upload, Image, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoDropzoneProps {
  logoUrl: string;
  onChange: (url: string) => void;
}

export function LogoDropzone({ logoUrl, onChange }: LogoDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onChange(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onChange(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    onChange("");
  };

  if (logoUrl) {
    return (
      <div className="relative w-32 h-32 md:w-40 md:h-40">
        <img
          src={logoUrl}
          alt="Company logo"
          className="w-full h-full object-contain rounded-lg border border-border"
        />
        <button
          type="button"
          onClick={handleRemove}
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:opacity-80 transition-opacity"
          aria-label="Remove logo"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative w-32 h-32 md:w-40 md:h-40 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors",
        isDragging
          ? "border-primary bg-primary/5"
          : "border-border hover:border-primary/50"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        id="logo-upload"
      />
      <label htmlFor="logo-upload" className="w-full h-full flex flex-col items-center justify-center gap-2 cursor-pointer">
        <Upload className="h-8 w-8 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Drop logo or click</span>
        <span className="text-xs text-muted-foreground">PNG, JPG up to 2MB</span>
      </label>
    </div>
  );
}