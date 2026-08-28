'use client';

import { useState, useEffect, useRef } from 'react';
import { Minimize2, Maximize2, X, ChevronUp } from 'lucide-react';
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface BottomAdBannerProps {
  slotId: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal';
  className?: string;
  delayMs?: number;
}

export function BottomAdBanner({
  slotId,
  format = 'horizontal',
  className = '',
  delayMs = 3000
}: BottomAdBannerProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false); // Track delay state
  const adContainerRef = useRef<HTMLDivElement>(null);
  const insRef = useRef<HTMLModElement>(null);
  const initializedRef = useRef(false);

  const pushAd = () => {
    if (initializedRef.current) return;

    const ins = insRef.current;
    if (!ins) return;

    const hasAd = ins.querySelector('iframe') || ins.hasAttribute('data-adsbygoogle-status');
    if (hasAd) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      initializedRef.current = true;
    } catch (err) {
      console.error('AdSense execution error:', err);
    }
  };

  useEffect(() => {
    if (isMinimized || isClosed) return;

    const timer = setTimeout(() => {
      setIsLoaded(true); // Reveal container after delay

      // Allow DOM update before pushing ad
      setTimeout(() => {
        pushAd();
      }, 50);
    }, delayMs);

    return () => clearTimeout(timer);
  }, [isMinimized, isClosed, slotId, delayMs]);

  const toggleMinimize = () => {
    setIsMinimized(prev => {
      const next = !prev;
      if (!next) {
        setTimeout(() => pushAd(), 100);
      }
      return next;
    });
  };

  // If closed or still waiting for the initial delay timer, render nothing
  if (isClosed || !isLoaded) return null;

  return (
    <>
      {!isMinimized && (
        <div className={cn("fixed bottom-2 left-0 right-0 z-40 flex justify-center pointer-events-none px-4", className)}>
          <div className="w-full max-w-[728px] pointer-events-auto">
            <div className="bg-card rounded-xl border border-border shadow-lg overflow-hidden">
              <div className="flex items-center justify-between px-3 py-1 border-b border-border bg-muted/50 h-7">
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Sponsored</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={toggleMinimize}
                    className="p-1 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                    aria-label="Minimize ad"
                    title="Minimize"
                  >
                    <Minimize2 className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => setIsClosed(true)}
                    className="p-1 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                    aria-label="Close ad"
                    title="Close"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              </div>
              <div className="p-2 overflow-hidden flex justify-center">
                <div
                  ref={adContainerRef}
                  className="ad-container w-[728px] h-[90px] min-h-[90px] overflow-hidden rounded-md border border-dashed border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50"
                >
                  <ins
                    ref={insRef}
                    className="adsbygoogle"
                    style={{ display: 'inline-block', width: '728px', height: '90px' }}
                    data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-XXXXXXXXXXXXXXXX'}
                    data-ad-slot={slotId}
                    data-ad-format={format}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isMinimized && (
        <div className="fixed bottom-4 right-4 z-40 pointer-events-none">
          <div className="pointer-events-auto">
            <button
              onClick={toggleMinimize}
              className="bg-card rounded-xl border border-border shadow-lg px-4 py-2 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Expand ad"
              title="Expand"
            >
              <Maximize2 className="h-4 w-4" />
              <span className="text-sm font-medium hidden sm:inline">Show Ad</span>
              <ChevronUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}