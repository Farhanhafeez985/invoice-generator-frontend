"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileText, ArrowLeft, Construction } from "lucide-react";

export default function PDFCompressorPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <Construction className="h-16 w-16 mx-auto text-muted-foreground/50" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-4">PDF Compressor</h1>
        <p className="text-muted-foreground mb-8">
          This tool is coming soon! Compress PDF files while maintaining quality.
        </p>
        <Link href="/en/tools/invoice-generator">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Invoice Generator
          </Button>
        </Link>
      </div>
    </div>
  );
}