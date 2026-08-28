"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SettingsPanelProps {
  onDownloadPdf: () => void;
}

export function SettingsPanel({ onDownloadPdf }: SettingsPanelProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <Button onClick={onDownloadPdf} className="w-full sm:w-auto">
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </Button>
      </div>
    </div>
  );
}