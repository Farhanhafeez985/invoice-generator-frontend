"use client";

import { useState } from "react";
import { useInvoice } from "@/hooks/useInvoice";
import { LogoDropzone } from "./LogoDropzone";
import { AddressSection } from "./AddressSection";
import { LineItemsTable } from "./LineItemsTable";
import { TotalsSection } from "./TotalsSection";
import { NotesTerms } from "./NotesTerms";
import { SettingsPanel } from "./SettingsPanel";
import { RightAdBanner } from "@/components/ads/RightAdBanner";
import { BottomAdBanner } from "@/components/ads/BottomAdBanner";
import { PDFGenerator } from "@/components/pdf/PDFGenerator";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function InvoiceEditor() {
  const {
    state,
    totals,
    isLoaded,
    updateField,
    addItem,
    removeItem,
    handleQuantityChange,
    handleRateChange,
    updateItem,
    clearAll,
  } = useInvoice();

  const [showPdfModal, setShowPdfModal] = useState(false);

  if (!isLoaded) {
    return (
      <div className="flex h-[600px] items-center justify-center">
        <div className="animate-pulse space-y-4 w-full max-w-4xl mx-auto px-4">
          <div className="h-32 bg-muted rounded-lg" />
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px_300px] gap-6">
            <div className="lg:col-span-1 h-96 bg-muted rounded-lg" />
            <div className="h-96 bg-muted rounded-lg" />
            <div className="h-96 bg-muted rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  const handleDownloadPdf = () => {
    setShowPdfModal(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1440px] mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* COLUMN 1: LEFT / CENTER CANVAS - Main Invoice Editor (Takes 6 of 12 cols on large screen) */}
          <div className="lg:col-span-6 xl:col-span-7">
            <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <div className="p-6 space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <LogoDropzone logoUrl={state.logoUrl} onChange={(url) => updateField("logoUrl", url)} />
                  <div className="text-right min-w-[180px]">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Invoice</p>
                    <Input
                      value={state.invoiceNumber}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField("invoiceNumber", e.target.value)}
                      className="font-mono-nums text-lg font-semibold text-right bg-transparent border-none focus:ring-0 focus:border-none px-0 py-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <AddressSection
                    label="From"
                    value={state.senderInfo}
                    onChange={(v) => updateField("senderInfo", v)}
                    placeholder="Your company details"
                    required
                  />
                  <AddressSection
                    label="Bill To"
                    value={state.billTo}
                    onChange={(v) => updateField("billTo", v)}
                    placeholder="Client details"
                    required
                  />
                  <AddressSection
                    label="Ship To"
                    value={state.shipTo}
                    onChange={(v) => updateField("shipTo", v)}
                    placeholder="Shipping address (optional)"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Issue Date</label>
                    <input
                      type="date"
                      value={state.date}
                      onChange={(e) => updateField("date", e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground font-mono-nums focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Due Date</label>
                    <input
                      type="date"
                      value={state.dueDate}
                      onChange={(e) => updateField("dueDate", e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground font-mono-nums focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Payment Terms</label>
                    <input
                      type="text"
                      value={state.paymentTerms}
                      onChange={(e) => updateField("paymentTerms", e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">PO Number</label>
                    <input
                      type="text"
                      value={state.poNumber}
                      onChange={(e) => updateField("poNumber", e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground font-mono-nums focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                <LineItemsTable
                  items={state.items}
                  onUpdateItem={updateItem}
                  onRemoveItem={removeItem}
                  onAddItem={addItem}
                  onQuantityChange={handleQuantityChange}
                  onRateChange={handleRateChange}
                  currency={state.currency}
                />

                <NotesTerms
                  notes={state.notes}
                  terms={state.terms}
                  onNotesChange={(v) => updateField("notes", v)}
                  onTermsChange={(v) => updateField("terms", v)}
                />
              </div>
            </div>
          </div>

          {/* COLUMN 2: SUBTOTAL / TAX / DISCOUNTS / SETTINGS PANEL */}
          <aside className="hidden lg:block lg:col-span-3 xl:col-span-3 space-y-4">
            <div className="sticky top-6 space-y-4">
              <TotalsSection
                totals={totals}
                taxRate={state.taxRate}
                discount={state.discount}
                shipping={state.shipping}
                amountPaid={state.amountPaid}
                currency={state.currency}
                onTaxChange={(v) => updateField("taxRate", parseFloat(v) || 0)}
                onDiscountChange={(v) => updateField("discount", parseFloat(v) || 0)}
                onShippingChange={(v) => updateField("shipping", parseFloat(v) || 0)}
                onAmountPaidChange={(v) => updateField("amountPaid", parseFloat(v) || 0)}
              />

              <div className="bg-card rounded-xl border border-border shadow-sm p-6">
                <SettingsPanel onDownloadPdf={handleDownloadPdf} />
              </div>
            </div>
          </aside>

          {/* COLUMN 3: RIGHT AD SIDEBAR (Fixed 300px width slot) */}
          <aside className="hidden xl:block xl:col-span-2 w-[300px] shrink-0 sticky top-6 self-start">
            <RightAdBanner slotId="1234567890" delayMs={3000} />
          </aside>
        </div>

        {/* BOTTOM AD BANNER */}
        <BottomAdBanner slotId="0987654321" delayMs={3000} />
      </div>

      {showPdfModal && (
        <PDFGenerator
          invoice={state}
          totals={totals}
          currency={state.currency}
          onClose={() => setShowPdfModal(false)}
        />
      )}
    </div>
  );
}