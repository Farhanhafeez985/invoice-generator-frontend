"use client";

import { Palette, Layout, Download } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const colorOptions = [
  { name: "Emerald", value: "emerald", primary: "#059669", light: "#D1FAE5" },
  { name: "Blue", value: "blue", primary: "#2563EB", light: "#DBEAFE" },
  { name: "Purple", value: "purple", primary: "#7C3AED", light: "#EDE9FE" },
  { name: "Rose", value: "rose", primary: "#E11D48", light: "#FFE4E6" },
  { name: "Amber", value: "amber", primary: "#D97706", light: "#FEF3C7" },
  { name: "Slate", value: "slate", primary: "#475569", light: "#F1F5F9" },
];

const templates = [
  { name: "Classic", value: "classic", description: "Traditional layout with clear sections" },
  { name: "Modern", value: "modern", description: "Clean, minimal design with accent colors" },
  { name: "Minimal", value: "minimal", description: "Bare-bones, content-focused layout" },
];

interface SettingsPanelProps {
  accentColor: string;
  template: string;
  onAccentChange: (color: string) => void;
  onTemplateChange: (template: string) => void;
  onDownloadPdf: () => void;
}

export function SettingsPanel({
  accentColor,
  template,
  onAccentChange,
  onTemplateChange,
  onDownloadPdf,
}: SettingsPanelProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <Button onClick={onDownloadPdf} className="w-full sm:w-auto">
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </Button>
      </div>

      <Separator />

      <Accordion className="space-y-2">
        <AccordionItem value="appearance">
          <AccordionTrigger className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            <span>Invoice Settings</span>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            <div>
              <Label className="text-sm font-medium text-foreground mb-2 block">Color Accent</Label>
              <div className="grid grid-cols-3 gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => onAccentChange(color.value)}
                    className={cn(
                        "relative p-2 rounded-lg border-2 transition-all",
                        accentColor === color.value
                          ? "border-primary shadow-lg shadow-primary/20"
                          : "border-border hover:border-primary/50"
                      )}
                    aria-label={color.name}
                    aria-pressed={accentColor === color.value}
                  >
                    <div
                      className="w-full h-6 rounded-md border border-border"
                      style={{
                        background: `linear-gradient(135deg, ${color.primary} 0%, ${color.light} 100%)`,
                      }}
                    />
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 text-xs text-muted-foreground whitespace-nowrap">
                      {color.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-foreground mb-2 block">Template</Label>
              <Select value={template} onValueChange={(v) => v && onTemplateChange(v)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((t) => (
                    <SelectItem key={t.value} value={t.value} className="flex flex-col gap-0.5">
                      <span className="font-medium">{t.name}</span>
                      <span className="text-xs text-muted-foreground">{t.description}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="advanced">
          <AccordionTrigger className="flex items-center gap-2">
            <Layout className="h-4 w-4" />
            <span>Advanced</span>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            <div>
              <Label className="text-sm font-medium text-foreground mb-1.5 block">Invoice Number</Label>
              <Input placeholder="INV-001" className="font-mono-nums" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-sm font-medium text-foreground mb-1.5 block">Issue Date</Label>
                <Input type="date" className="font-mono-nums" />
              </div>
              <div>
                <Label className="text-sm font-medium text-foreground mb-1.5 block">Due Date</Label>
                <Input type="date" className="font-mono-nums" />
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-foreground mb-1.5 block">Payment Terms</Label>
              <Select defaultValue="net_30">
                <SelectTrigger>
                  <SelectValue placeholder="Select terms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="due_on_receipt">Due on Receipt</SelectItem>
                  <SelectItem value="net_7">Net 7</SelectItem>
                  <SelectItem value="net_15">Net 15</SelectItem>
                  <SelectItem value="net_30">Net 30</SelectItem>
                  <SelectItem value="net_45">Net 45</SelectItem>
                  <SelectItem value="net_60">Net 60</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium text-foreground mb-1.5 block">PO Number</Label>
              <Input placeholder="PO-12345" className="font-mono-nums" />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}