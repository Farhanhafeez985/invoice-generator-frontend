"use client";

import Link from "next/link";
import { X, Sparkles } from "lucide-react";

const GithubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const useInvoiceGeneratorLinks = [
  { name: "Invoice Generator", href: "/tools/invoice-generator" },
  { name: "Quote Generator", href: "/tools/quote-generator" },
  { name: "Receipt Generator", href: "/tools/receipt-generator" },
  { name: "Proforma Invoice Generator", href: "/tools/proforma-invoice-generator" },
  { name: "Timesheet Generator", href: "/tools/timesheet-generator" },
  { name: "Packing Slip Generator", href: "/tools/packing-slip-generator" },
];

const moreToolsLinks = [
  { name: "Credit Note Generator", href: "/tools/credit-note-generator" },
  { name: "Purchase Order Generator", href: "/tools/purchase-order-generator" },
  { name: "Estimate Generator", href: "/tools/estimate-generator" },
  { name: "Account Statement Generator", href: "/tools/account-statement-generator" },
  { name: "Work Order Generator", href: "/tools/work-order-generator" },
];

const resourcesLinks = [
  { name: "Invoicing Guides", href: "/guides/invoicing" },
  { name: "Calculators", href: "/calculators" },
  { name: "Help Center", href: "/help" },
  { name: "Release Notes", href: "/release-notes" },
  { name: "Developer API", href: "/api/docs" },
];

export function Footer() {
  return (
    <footer className="bg-card/50 border-t border-border mt-16 pt-12 pb-32 px-4 max-w-[1440px] mx-auto w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg text-foreground">InvoiceGen</span>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
            Free online invoice generator for freelancers and business owners. Create and download professional PDF invoices instantly.
          </p>
          <Link
            href="/tools/invoice-generator"
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors rounded-lg text-sm font-medium"
          >
            <Sparkles className="h-4 w-4" />
            Invoice with AI
          </Link>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-foreground tracking-wider uppercase mb-4">
            USE INVOICE GENERATOR
          </h3>
          <nav className="space-y-3">
            {useInvoiceGeneratorLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-foreground tracking-wider uppercase mb-4">
            MORE TOOLS
          </h3>
          <nav className="space-y-3">
            {moreToolsLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-foreground tracking-wider uppercase mb-4">
            RESOURCES
          </h3>
          <nav className="space-y-3">
            {resourcesLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="border-t border-border/60 pt-6 mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <p className="text-center sm:text-left">
          © 2026 InvoiceGen. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <Link
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon />
          </Link>
          <Link
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
            aria-label="Twitter / X"
          >
            <X className="h-4 w-4" />
          </Link>
          <Link
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedinIcon />
          </Link>
        </div>
      </div>
    </footer>
  );
}