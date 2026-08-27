export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface InvoiceState {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  paymentTerms: string;
  poNumber: string;
  currency: string;
  senderInfo: string;
  billTo: string;
  shipTo: string;
  logoUrl: string;
  items: InvoiceItem[];
  notes: string;
  terms: string;
  taxRate: number;
  discount: number;
  shipping: number;
  amountPaid: number;
}

export interface CalculatedTotals {
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  shippingAmount: number;
  total: number;
  balanceDue: number;
}