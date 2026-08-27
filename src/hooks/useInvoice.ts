"use client";

import { useState, useEffect, useCallback } from "react";
import { InvoiceState, InvoiceItem, CalculatedTotals } from "@/types/invoice";
import { v4 as uuidv4 } from "uuid";

const STORAGE_KEY = "invoice_generator_state";

const defaultState: InvoiceState = {
  invoiceNumber: `INV-${new Date().getFullYear()}-${String(Date.now()).slice(-4)}`,
  date: new Date().toISOString().split("T")[0],
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  paymentTerms: "Net 30",
  poNumber: "",
  currency: "$",
  senderInfo: "Your Company Name\n123 Business Street\nCity, State 12345\nEmail: company@example.com",
  billTo: "Client Name\n456 Client Avenue\nCity, State 67890\nEmail: client@example.com",
  shipTo: "",
  logoUrl: "",
  items: [
    { id: uuidv4(), description: "Consulting Services", quantity: 10, rate: 150, amount: 1500 },
    { id: uuidv4(), description: "Design Work", quantity: 5, rate: 200, amount: 1000 },
  ],
  notes: "Thank you for your business!",
  terms: "Payment is due within 30 days of invoice date. Late payments may incur a 1.5% monthly fee.",
  taxRate: 0,
  discount: 0,
  shipping: 0,
  amountPaid: 0,
};

function calculateTotals(state: InvoiceState): CalculatedTotals {
  const subtotal = state.items.reduce((sum, item) => sum + item.amount, 0);
  const taxAmount = subtotal * (state.taxRate / 100);
  const discountAmount = state.discount;
  const shippingAmount = state.shipping;
  const total = subtotal + taxAmount + shippingAmount - discountAmount;
  const balanceDue = total - state.amountPaid;
  return { subtotal, taxAmount, discountAmount, shippingAmount, total, balanceDue };
}

export function useInvoice() {
  const [state, setState] = useState<InvoiceState>(defaultState);
  const [totals, setTotals] = useState<CalculatedTotals>(calculateTotals(defaultState));
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setState(parsed);
        setTotals(calculateTotals(parsed));
      }
    } catch (e) {
      console.error("Failed to load invoice state:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      setTotals(calculateTotals(state));
    }
  }, [state, isLoaded]);

  const updateField = useCallback(<K extends keyof InvoiceState>(field: K, value: InvoiceState[K]) => {
    setState((prev) => ({ ...prev, [field]: value }));
  }, []);

  const updateItem = useCallback((id: string, field: keyof InvoiceItem, value: string | number) => {
    setState((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  }, []);

  const addItem = useCallback(() => {
    const newItem: InvoiceItem = {
      id: uuidv4(),
      description: "",
      quantity: 1,
      rate: 0,
      amount: 0,
    };
    setState((prev) => ({ ...prev, items: [...prev.items, newItem] }));
  }, []);

  const removeItem = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }));
  }, []);

  const recalculateItemAmount = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      items: prev.items.map((item) => {
        if (item.id === id) {
          const amount = item.quantity * item.rate;
          return { ...item, amount };
        }
        return item;
      }),
    }));
  }, []);

  const handleQuantityChange = useCallback((id: string, value: string) => {
    const num = parseFloat(value) || 0;
    updateItem(id, "quantity", num);
    setTimeout(() => recalculateItemAmount(id), 0);
  }, [updateItem, recalculateItemAmount]);

  const handleRateChange = useCallback((id: string, value: string) => {
    const num = parseFloat(value) || 0;
    updateItem(id, "rate", num);
    setTimeout(() => recalculateItemAmount(id), 0);
  }, [updateItem, recalculateItemAmount]);

  const clearAll = useCallback(() => {
    setState(defaultState);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
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
  };
}