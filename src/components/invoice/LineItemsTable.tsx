"use client";

import { Trash2, GripVertical } from "lucide-react";
import { InvoiceItem } from "@/types/invoice";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LineItemsTableProps {
  items: InvoiceItem[];
  onUpdateItem: (id: string, field: keyof InvoiceItem, value: string | number) => void;
  onRemoveItem: (id: string) => void;
  onAddItem: () => void;
  onQuantityChange: (id: string, value: string) => void;
  onRateChange: (id: string, value: string) => void;
  currency: string;
}

export function LineItemsTable({
  items,
  onUpdateItem,
  onRemoveItem,
  onAddItem,
  onQuantityChange,
  onRateChange,
  currency,
}: LineItemsTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full">
        <thead className="bg-muted/50">
          <tr>
            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-8">#</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Description</th>
            <th className="px-3 py-2 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider w-24">Qty</th>
            <th className="px-3 py-2 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider w-32">Rate</th>
            <th className="px-3 py-2 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider w-32">Amount</th>
            <th className="px-3 py-2 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider w-12"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {items.map((item, index) => (
            <tr key={item.id} className="hover:bg-muted/30 transition-colors">
              <td className="px-3 py-2 text-sm text-muted-foreground font-mono-nums">{index + 1}</td>
              <td className="px-3 py-2">
                <Input
                  value={item.description}
                  onChange={(e) => onUpdateItem(item.id, "description", e.target.value)}
                  placeholder="Item description"
                  className="bg-transparent border-none focus:ring-0 focus:border-none px-0 py-1 text-sm"
                />
              </td>
              <td className="px-3 py-2 text-right">
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={item.quantity}
                  onChange={(e) => onQuantityChange(item.id, e.target.value)}
                  className="bg-transparent border-none focus:ring-0 focus:border-none px-0 py-1 text-sm text-right font-mono-nums w-20"
                />
              </td>
              <td className="px-3 py-2 text-right">
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={item.rate}
                  onChange={(e) => onRateChange(item.id, e.target.value)}
                  className="bg-transparent border-none focus:ring-0 focus:border-none px-0 py-1 text-sm text-right font-mono-nums w-28"
                />
              </td>
              <td className="px-3 py-2 text-right font-medium font-mono-nums text-sm">
                {currency}{item.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
              <td className="px-3 py-2 text-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveItem(item.id)}
                  className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  aria-label="Remove item"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td colSpan={6} className="px-3 py-8 text-center text-muted-foreground">
                No items added yet. Click "Add Item" to get started.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="p-3 border-t border-border">
        <Button variant="outline" size="sm" onClick={onAddItem} className="w-full sm:w-auto">
          <span className="flex items-center gap-2">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Item
          </span>
        </Button>
      </div>
    </div>
  );
}