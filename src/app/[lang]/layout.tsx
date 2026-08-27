import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Free Online Invoice Generator - Create Professional Invoices Instantly",
  description: "Learn how to create invoices quickly. Free invoice generator and customizable invoice templates for freelancers and businesses.",
};

const supportedLanguages = ["en", "es", "fr", "de", "zh"];

export default async function LangLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;

  if (!supportedLanguages.includes(lang)) {
    notFound();
  }

  return (
    <div lang={lang} suppressHydrationWarning>
      {children}
    </div>
  );
}