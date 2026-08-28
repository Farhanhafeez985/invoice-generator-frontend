'use client';

import { useState, useEffect, useRef } from 'react';
import { Minimize2, Maximize2 } from 'lucide-react';
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface RightAdBannerProps {
  slotId: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical';
  className?: string;
  delayMs?: number;
}

export function RightAdBanner({
  slotId,
  format = 'vertical',
  className = '',
  delayMs = 3000
}: RightAdBannerProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false); // Track delay state
  const adContainerRef = useRef<HTMLDivElement>(null);
  const insRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (isMinimized) return;

    const timer = setTimeout(() => {
      setIsLoaded(true); // Reveal container after delay

      // Allow DOM update before pushing ad
      setTimeout(() => {
        const ins = insRef.current;
        if (!ins) return;
        const hasAd = ins.querySelector('iframe') || ins.hasAttribute('data-adsbygoogle-status');
        if (hasAd) return;

        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
          console.error('AdSense execution error:', err);
        }
      }, 50);
    }, delayMs);

    return () => clearTimeout(timer);
  }, [slotId, isMinimized, delayMs]);

  // If not loaded yet, keep the DOM node invisible
  if (!isLoaded) return null;

  return (
    <div className={cn("w-[300px] flex-shrink-0 transition-all duration-300", className)}>
      {!isMinimized ? (
        <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden flex flex-col h-[600px] max-h-[600px]">
          <div className="flex items-center justify-between px-3 py-1.5 border-b border-border bg-muted/50 flex-shrink-0 h-8">
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider truncate">
              Sponsored
            </span>
            <button
              onClick={() => setIsMinimized(true)}
              className="p-1 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground flex-shrink-0"
            >
              <Minimize2 className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="flex-1 p-2 overflow-hidden min-h-0 flex items-center justify-center">
            <div
              ref={adContainerRef}
              className="ad-container w-[300px] h-[600px] overflow-hidden rounded-md border border-dashed border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50"
            >
              <ins
                ref={insRef}
                className="adsbygoogle"
                style={{ display: 'block', width: '300px', height: '600px' }}
                data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-XXXXXXXXXXXXXXXX'}
                data-ad-slot={slotId}
                data-ad-format={format}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-card rounded-xl border border-border shadow-sm p-3">
          <button
            onClick={() => setIsMinimized(false)}
            className="w-full flex items-center justify-center gap-2 p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Maximize2 className="h-4 w-4" />
            <span className="text-sm font-medium">Show Ad</span>
          </button>
        </div>
      )}
    </div>
  );
}