'use client';

import { useState, useEffect, useRef } from 'react';
import { Minimize2, Maximize2, X, ChevronUp } from 'lucide-react';
import { cn } from "@/lib/utils";

// Add global TypeScript declaration for window.adsbygoogle
declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface BottomAdBannerProps {
  slotId: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  className?: string;
}

export function BottomAdBanner({ slotId, format = 'fluid', className = '' }: BottomAdBannerProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const adContainerRef = useRef<HTMLDivElement>(null);
  const insRef = useRef<HTMLModElement>(null);
  const initializedRef = useRef(false);

  const pushAd = () => {
    if (initializedRef.current) return;

    const ins = insRef.current;
    if (!ins) return;

    // Prevent pushing if AdSense already initialized this tag
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
    if (!isMinimized && !isClosed) {
      pushAd();
    }
  }, [isMinimized, isClosed, slotId]);

  const toggleMinimize = () => {
    setIsMinimized(prev => {
      const next = !prev;
      if (!next) {
        // Trigger push after component mounts back into DOM
        setTimeout(() => pushAd(), 100);
      }
      return next;
    });
  };

  if (isClosed) return null;

  return (
    <>
      {!isMinimized && (
        <div className={cn("fixed bottom-0 left-0 right-0 z-40 pointer-events-none", className)}>
          <div className="max-w-7xl mx-auto px-4 pb-4 pointer-events-auto">
            <div className="bg-card rounded-xl border border-border shadow-lg overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/50">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Sponsored</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleMinimize}
                    className="p-1 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                    aria-label="Minimize ad"
                    title="Minimize"
                  >
                    <Minimize2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setIsClosed(true)}
                    className="p-1 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                    aria-label="Close ad"
                    title="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="p-4 overflow-hidden">
                <div
                  ref={adContainerRef}
                  className="ad-container w-full overflow-hidden rounded-md border border-dashed border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 h-[90px] min-h-[90px]"
                >
                  <ins
                    ref={insRef}
                    className="adsbygoogle"
                    style={{ display: 'block', width: '100%', height: '100%' }}
                    data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-XXXXXXXXXXXXXXXX'}
                    data-ad-slot={slotId}
                    data-ad-format={format}
                    data-full-width-responsive="true"
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