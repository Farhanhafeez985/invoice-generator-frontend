"use client";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface NotesTermsProps {
  notes: string;
  terms: string;
  onNotesChange: (value: string) => void;
  onTermsChange: (value: string) => void;
}

export function NotesTerms({ notes, terms, onNotesChange, onTermsChange }: NotesTermsProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium text-foreground mb-1.5 block">Notes</Label>
        <Textarea
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="Add any additional notes for the client..."
          className="min-h-[80px] resize-y border-border"
          rows={3}
        />
      </div>
      <div>
        <Label className="text-sm font-medium text-foreground mb-1.5 block">Terms & Conditions</Label>
        <Textarea
          value={terms}
          onChange={(e) => onTermsChange(e.target.value)}
          placeholder="Payment terms, late fees, etc."
          className="min-h-[80px] resize-y border-border"
          rows={3}
        />
      </div>
    </div>
  );
}