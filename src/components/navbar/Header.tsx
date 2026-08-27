"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X, Globe, ChevronDown, Settings, AppWindow } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
];

const currencies = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "CAD", symbol: "CA$", name: "Canadian Dollar" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
];

const tools = [
  { name: "Invoice Generator", href: "/tools/invoice-generator", icon: AppWindow, current: true },
  { name: "QR Code Generator", href: "/tools/qr-code-generator", icon: Settings, comingSoon: true },
  { name: "PDF Compressor", href: "/tools/pdf-compressor", icon: Settings, comingSoon: true },
];

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <header className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-full flex items-center justify-between" />
      </header>
    );
  }

  return (
    <header className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-full flex items-center justify-between gap-4">
        <div className="flex items-center gap-6 flex-1 min-w-0">
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden">
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <AppWindow className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg text-foreground">InvoiceGen</span>
          </div>

          <nav className="hidden md:flex items-center gap-1 ml-4">
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center gap-1 h-9 px-3 text-sm bg-transparent hover:bg-muted text-foreground rounded-lg border-none transition-colors">
                <AppWindow className="h-4 w-4" />
                Tools
                <ChevronDown className="h-3.5 w-3.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {tools.map((tool) => (
                  <DropdownMenuItem
                    key={tool.name}
                    className={cn("flex items-center gap-2", tool.comingSoon && "text-muted-foreground")}
                    onClick={() => {}}
                  >
                    <tool.icon className="h-4 w-4" />
                    <span className="flex-1">{tool.name}</span>
                    {tool.comingSoon && <span className="text-xs text-muted-foreground">Soon</span>}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>

        <div className="flex items-center gap-2 flex-1 justify-end">
          <div className="hidden sm:flex items-center gap-2">
            <Select value="en" onValueChange={() => {}}>
              <SelectTrigger className="w-[140px] h-9 bg-transparent border-border">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code} className="flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value="USD" onValueChange={() => {}}>
              <SelectTrigger className="w-[150px] h-9 bg-transparent border-border">
                <SelectValue placeholder="Currency" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((curr) => (
                  <SelectItem key={curr.code} value={curr.code} className="flex items-center gap-2 justify-between">
                    <span>{curr.symbol} {curr.code}</span>
                    <span className="text-muted-foreground text-xs">{curr.name}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-9 w-9"
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background px-4 py-4 space-y-4">
          <nav className="flex flex-col gap-2">
            {tools.map((tool) => (
              <Button
                key={tool.name}
                variant="ghost"
                className={cn("justify-start gap-2", tool.comingSoon && "text-muted-foreground")}
                disabled={tool.comingSoon}
              >
                <tool.icon className="h-4 w-4" />
                <span>{tool.name}</span>
                {tool.comingSoon && <span className="text-xs text-muted-foreground">Coming Soon</span>}
              </Button>
            ))}
          </nav>
          <div className="flex items-center gap-2 flex-wrap">
            <Select value="en" onValueChange={() => {}}>
              <SelectTrigger className="w-full h-9 bg-transparent border-border">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code} className="flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value="USD" onValueChange={() => {}}>
              <SelectTrigger className="w-full h-9 bg-transparent border-border">
                <SelectValue placeholder="Currency" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((curr) => (
                  <SelectItem key={curr.code} value={curr.code} className="flex items-center gap-2 justify-between">
                    <span>{curr.symbol} {curr.code}</span>
                    <span className="text-muted-foreground text-xs">{curr.name}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </header>
  );
}