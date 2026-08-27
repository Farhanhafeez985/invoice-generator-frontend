"use client";

import { CalculatedTotals } from "@/types/invoice";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TotalsSectionProps {
  totals: CalculatedTotals;
  taxRate: number;
  discount: number;
  shipping: number;
  amountPaid: number;
  currency: string;
  onTaxChange: (value: string) => void;
  onDiscountChange: (value: string) => void;
  onShippingChange: (value: string) => void;
  onAmountPaidChange: (value: string) => void;
}

export function TotalsSection({
  totals,
  taxRate,
  discount,
  shipping,
  amountPaid,
  currency,
  onTaxChange,
  onDiscountChange,
  onShippingChange,
  onAmountPaidChange,
}: TotalsSectionProps) {
  const formatCurrency = (value: number) => {
    return `${currency}${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const isOverdue = totals.balanceDue > 0;

  return (
    <div className="space-y-4 w-full">
      <div className="rounded-lg border border-border bg-card p-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-mono-nums font-medium">{formatCurrency(totals.subtotal)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Label className="w-24 text-sm text-muted-foreground whitespace-nowrap text-right pr-2">Tax (%)</Label>
          <Input
            type="number"
            step="0.01"
            min="0"
            value={taxRate}
            onChange={(e) => onTaxChange(e.target.value)}
            className="w-20 text-right font-mono-nums text-sm bg-transparent border-border focus:ring-0 focus:border-primary px-2 py-1.5 flex-shrink-0"
          />
          <span className="font-mono-nums text-sm text-right w-28 flex-shrink-0">{formatCurrency(totals.taxAmount)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Label className="w-24 text-sm text-muted-foreground whitespace-nowrap text-right pr-2">Discount</Label>
          <Input
            type="number"
            step="0.01"
            min="0"
            value={discount}
            onChange={(e) => onDiscountChange(e.target.value)}
            className="w-20 text-right font-mono-nums text-sm bg-transparent border-border focus:ring-0 focus:border-primary px-2 py-1.5 flex-shrink-0"
          />
          <span className="font-mono-nums text-sm text-destructive text-right w-28 flex-shrink-0">-{formatCurrency(totals.discountAmount)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Label className="w-24 text-sm text-muted-foreground whitespace-nowrap text-right pr-2">Shipping</Label>
          <Input
            type="number"
            step="0.01"
            min="0"
            value={shipping}
            onChange={(e) => onShippingChange(e.target.value)}
            className="w-20 text-right font-mono-nums text-sm bg-transparent border-border focus:ring-0 focus:border-primary px-2 py-1.5 flex-shrink-0"
          />
          <span className="font-mono-nums text-sm text-right w-28 flex-shrink-0">{formatCurrency(totals.shippingAmount)}</span>
        </div>
        <div className="border-t border-border pt-3 flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span className="font-mono-nums">{formatCurrency(totals.total)}</span>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-4 space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <Label className="w-24 text-sm text-muted-foreground whitespace-nowrap text-right pr-2">Amount Paid</Label>
          <Input
            type="number"
            step="0.01"
            min="0"
            max={totals.total}
            value={amountPaid}
            onChange={(e) => onAmountPaidChange(e.target.value)}
            className="w-20 text-right font-mono-nums text-sm bg-transparent border-border focus:ring-0 focus:border-primary px-2 py-1.5 flex-shrink-0"
          />
          <span className="font-mono-nums text-emerald-600 dark:text-emerald-400 text-sm text-right w-28 flex-shrink-0">{formatCurrency(amountPaid)}</span>
        </div>
        <div className={cn(
          "flex justify-between text-lg font-semibold p-3 rounded-md",
          isOverdue
            ? "bg-destructive/10 border border-destructive/20 text-destructive"
            : "bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400"
        )}>
          <span>Balance Due</span>
          <span className="font-mono-nums">{formatCurrency(totals.balanceDue)}</span>
        </div>
      </div>
    </div>
  );
}