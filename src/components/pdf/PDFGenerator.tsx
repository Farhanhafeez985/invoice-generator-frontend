"use client";

import { useState, useCallback } from "react";
import { Document, Page, Text, View, StyleSheet, Font, Image as PDFImage, pdf } from "@react-pdf/renderer";
import { InvoiceState, CalculatedTotals } from "@/types/invoice";
import { Download, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

Font.register({
  family: "Helvetica",
  fonts: [
    { src: "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxK.woff2", fontWeight: 400 },
    { src: "https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9fBBc4.woff2", fontWeight: 700 },
  ],
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.5,
    color: "#09090b",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#059669",
    paddingBottom: 15,
  },
  logo: {
    maxHeight: 60,
    maxWidth: 150,
  },
  invoiceTitle: {
    textAlign: "right",
  },
  invoiceTitleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#059669",
    marginBottom: 5,
  },
  invoiceNumber: {
    fontSize: 12,
    color: "#71717a",
  },
  meta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 20,
  },
  metaColumn: {
    flex: 1,
  },
  metaLabel: {
    fontWeight: "bold",
    fontSize: 9,
    textTransform: "uppercase",
    color: "#71717a",
    marginBottom: 2,
  },
  metaValue: {
    fontSize: 10,
  },
  addresses: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 20,
  },
  addressBox: {
    flex: 1,
  },
  addressLabel: {
    fontSize: 8,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#71717a",
    borderBottomWidth: 1,
    borderBottomColor: "#e4e4e7",
    paddingBottom: 3,
    marginBottom: 5,
  },
  addressText: {
    fontSize: 9,
  },
  table: {
    width: "100%",
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f4f4f5",
    padding: "8 10",
    borderBottomWidth: 1,
    borderBottomColor: "#e4e4e7",
  },
  tableHeaderCell: {
    fontWeight: "bold",
    fontSize: 8,
    textTransform: "uppercase",
    color: "#71717a",
  },
  tableRow: {
    flexDirection: "row",
    padding: "8 10",
    borderBottomWidth: 1,
    borderBottomColor: "#e4e4e7",
  },
  tableCell: {
    fontSize: 9,
  },
  cellDesc: { flex: 3 },
  cellQty: { flex: 1, textAlign: "right", fontFamily: "Helvetica" },
  cellRate: { flex: 1, textAlign: "right", fontFamily: "Helvetica" },
  cellAmount: { flex: 1, textAlign: "right", fontFamily: "Helvetica", fontWeight: "bold" },
  totals: {
    width: 200,
    marginLeft: "auto",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "6 10",
    borderBottomWidth: 1,
    borderBottomColor: "#e4e4e7",
  },
  totalRowFinal: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "8 10",
    borderTopWidth: 2,
    borderTopColor: "#059669",
    fontWeight: "bold",
    fontSize: 11,
  },
  totalRowBalance: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "8 10",
    backgroundColor: "#ecfdf5",
    color: "#059669",
    fontWeight: "bold",
    fontSize: 11,
    borderTopWidth: 2,
    borderTopColor: "#059669",
  },
  notesTerms: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 20,
  },
  notesBox: {
    flex: 1,
  },
  notesLabel: {
    fontSize: 8,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#71717a",
    borderBottomWidth: 1,
    borderBottomColor: "#e4e4e7",
    paddingBottom: 3,
    marginBottom: 5,
  },
  notesText: {
    fontSize: 9,
  },
  footer: {
    marginTop: 30,
    textAlign: "center",
    fontSize: 8,
    color: "#a1a1aa",
  },
});

interface InvoiceDocumentProps {
  invoice: InvoiceState;
  totals: CalculatedTotals;
  currency: string;
}

function InvoiceDocument({ invoice, totals, currency }: InvoiceDocumentProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            {invoice.logoUrl && <PDFImage src={invoice.logoUrl} style={styles.logo} />}
          </View>
          <View style={styles.invoiceTitle}>
            <Text style={styles.invoiceTitleText}>INVOICE</Text>
            <Text style={styles.invoiceNumber}>#{invoice.invoiceNumber}</Text>
          </View>
        </View>

        <View style={styles.meta}>
          <View style={styles.metaColumn}>
            <Text style={styles.metaLabel}>Issue Date</Text>
            <Text style={styles.metaValue}>{invoice.date}</Text>
          </View>
          <View style={styles.metaColumn}>
            <Text style={styles.metaLabel}>Due Date</Text>
            <Text style={styles.metaValue}>{invoice.dueDate || "N/A"}</Text>
          </View>
          <View style={styles.metaColumn}>
            <Text style={styles.metaLabel}>Terms</Text>
            <Text style={styles.metaValue}>{invoice.paymentTerms || "N/A"}</Text>
          </View>
          <View style={styles.metaColumn}>
            <Text style={styles.metaLabel}>PO Number</Text>
            <Text style={styles.metaValue}>{invoice.poNumber || "N/A"}</Text>
          </View>
        </View>

        <View style={styles.addresses}>
          <View style={styles.addressBox}>
            <Text style={styles.addressLabel}>FROM</Text>
            <Text style={styles.addressText}>{invoice.senderInfo}</Text>
          </View>
          <View style={styles.addressBox}>
            <Text style={styles.addressLabel}>BILL TO</Text>
            <Text style={styles.addressText}>{invoice.billTo}</Text>
          </View>
          <View style={styles.addressBox}>
            <Text style={styles.addressLabel}>SHIP TO</Text>
            <Text style={styles.addressText}>{invoice.shipTo || "Same as Bill To"}</Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, styles.cellDesc]}>Description</Text>
            <Text style={[styles.tableHeaderCell, styles.cellQty]}>Qty</Text>
            <Text style={[styles.tableHeaderCell, styles.cellRate]}>Rate</Text>
            <Text style={[styles.tableHeaderCell, styles.cellAmount]}>Amount</Text>
          </View>
          {invoice.items.map((item) => (
            <View key={item.id} style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.cellDesc]}>{item.description}</Text>
              <Text style={[styles.tableCell, styles.cellQty]}>{item.quantity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
              <Text style={[styles.tableCell, styles.cellRate]}>{currency}{item.rate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
              <Text style={[styles.tableCell, styles.cellAmount]}>{currency}{item.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
            </View>
          ))}
        </View>

        <View style={styles.totals}>
          <View style={styles.totalRow}>
            <Text>Subtotal</Text>
            <Text>{currency}{totals.subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text>Tax ({invoice.taxRate}%)</Text>
            <Text>{currency}{totals.taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text>Discount</Text>
            <Text style={{ color: "#ef4444" }}>-{currency}{totals.discountAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text>Shipping</Text>
            <Text>{currency}{totals.shippingAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
          </View>
          <View style={styles.totalRowFinal}>
            <Text>Total</Text>
            <Text>{currency}{totals.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text>Amount Paid</Text>
            <Text style={{ color: "#059669" }}>-{currency}{invoice.amountPaid.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
          </View>
          <View style={styles.totalRowBalance}>
            <Text>Balance Due</Text>
            <Text>{currency}{totals.balanceDue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
          </View>
        </View>

        <View style={styles.notesTerms}>
          <View style={styles.notesBox}>
            <Text style={styles.notesLabel}>NOTES</Text>
            <Text style={styles.notesText}>{invoice.notes || ""}</Text>
          </View>
          <View style={styles.notesBox}>
            <Text style={styles.notesLabel}>TERMS & CONDITIONS</Text>
            <Text style={styles.notesText}>{invoice.terms || ""}</Text>
          </View>
        </View>

        <Text style={styles.footer}>Generated by InvoiceGen - Free Online Invoice Generator</Text>
      </Page>
    </Document>
  );
}

interface PDFGeneratorProps {
  invoice: InvoiceState;
  totals: CalculatedTotals;
  currency: string;
  onClose: () => void;
}

export function PDFGenerator({ invoice, totals, currency, onClose }: PDFGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  const generatePDF = useCallback(async () => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const blob = await pdf(<InvoiceDocument invoice={invoice} totals={totals} currency={currency} />).toBlob();
      const url = URL.createObjectURL(blob);
      setBlobUrl(url);
    } catch (err) {
      console.error("PDF generation error:", err);
      setError("Failed to generate PDF. Please try the server-side option.");
    } finally {
      setIsGenerating(false);
    }
  }, [invoice, totals, currency]);

  const downloadPDF = useCallback(() => {
    if (blobUrl) {
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `invoice-${invoice.invoiceNumber}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    }
  }, [blobUrl, invoice.invoiceNumber]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-card rounded-xl border border-border shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Generate PDF</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-2">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {blobUrl ? (
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 flex items-center gap-3">
              <CheckCircle className="h-6 w-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              <div>
                <p className="font-medium text-emerald-800 dark:text-emerald-200">PDF Generated Successfully</p>
                <p className="text-sm text-emerald-600 dark:text-emerald-400">Ready to download</p>
              </div>
            </div>
            <Button onClick={downloadPDF} className="w-full" size="lg">
              <Download className="h-4 w-4 mr-2" />
              Download Invoice PDF
            </Button>
            <Button variant="outline" onClick={onClose} className="w-full">
              Close
            </Button>
          </div>
        ) : (
          <Button 
            onClick={generatePDF} 
            disabled={isGenerating} 
            className="w-full" 
            size="lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Generate & Download PDF
              </>
            )}
          </Button>
        )}

        <p className="mt-4 text-center text-xs text-muted-foreground">
          For complex invoices, use the server-side PDF generation via "Save & Send"
        </p>
      </div>
    </div>
  );
}