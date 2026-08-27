"use client";

import { useEffect } from "react";

export const SeoHead = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Free Online Invoice Generator",
    "url": "https://yourdomain.com",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Learn how to create invoices quickly. Free invoice generator and customizable invoice templates for freelancers and businesses."
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(jsonLd);
    script.id = "json-ld-schema";
    
    const existing = document.getElementById("json-ld-schema");
    if (existing) {
      existing.replaceWith(script);
    } else {
      document.head.appendChild(script);
    }
    
    return () => {
      const el = document.getElementById("json-ld-schema");
      if (el) el.remove();
    };
  }, []);

  return (
    <>
      <title>Free Online Invoice Generator - Create Professional Invoices Instantly</title>
      <meta name="description" content="Learn how to create invoices quickly. Free invoice generator and customizable invoice templates for freelancers and businesses. Download PDF invoices in seconds." />
      <meta name="keywords" content="how to create invoices, invoice generator, invoice template, free invoice generator, free invoice template, how to make an invoice, invoice home" />
      <meta property="og:title" content="Free Online Invoice Generator - Create Professional Invoices Instantly" />
      <meta property="og:description" content="Learn how to create invoices quickly. Free invoice generator and customizable invoice templates for freelancers and businesses." />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Free Online Invoice Generator" />
      <meta name="twitter:description" content="Create professional invoices instantly with our free online invoice generator." />
    </>
  );
};