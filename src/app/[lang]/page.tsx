import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "InvoiceGen - Free Online Invoice Generator",
  description: "Create professional invoices instantly with our free online invoice generator. Download PDF invoices in seconds.",
};

export default async function LangHome({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;

  redirect(`/${lang}/tools/invoice-generator`);
}