'use client';

import { useState, useEffect, useRef } from 'react';
import { Minimize2, Maximize2 } from 'lucide-react';
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    adsbygoogle: unknown[];
    __adSenseInitialized: boolean;
  }
}

interface RightAdBannerProps {
  slotId: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical';
  className?: string;
}

export function RightAdBanner({ slotId, format = 'auto', className = '' }: RightAdBannerProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const adContainerRef = useRef<HTMLDivElement>(null);
  const insRef = useRef<HTMLModElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (isMinimized) return;

    if (!window.__adSenseInitialized) {
      window.__adSenseInitialized = true;
    }

    // Only initialize once per component mount
    if (initializedRef.current) return;
    initializedRef.current = true;

    const ins = insRef.current;
    if (!ins || adContainerRef.current === null) return;

    // Check if ad already loaded
    const hasAd = ins.querySelector('iframe') || ins.hasAttribute('data-adsbygoogle-status');
    if (hasAd) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense execution error:', err);
    }
  }, [slotId, isMinimized]);

  const toggleMinimize = () => {
    setIsMinimized(prev => !prev);
    initializedRef.current = false;
  };

  return (
    <div className={cn("w-full flex-shrink-0 transition-all duration-300", className)}>
      {!isMinimized ? (
        <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden flex flex-col h-[1200px]">
          <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/50 flex-shrink-0 h-10">
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider truncate">
              Sponsored
            </span>
            <button
              onClick={toggleMinimize}
              className="p-1 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground flex-shrink-0"
              aria-label="Minimize ad"
              title="Minimize"
            >
              <Minimize2 className="h-4 w-4" />
            </button>
          </div>
          <div className="flex-1 p-4 overflow-hidden min-h-0">
            <div
              ref={adContainerRef}
              className="ad-container w-full h-full overflow-hidden rounded-md border border-dashed border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50"
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
      ) : (
        <div className="bg-card rounded-xl border border-border shadow-sm p-3">
          <button
            onClick={toggleMinimize}
            className="w-full flex items-center justify-center gap-2 p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Expand ad"
            title="Expand"
          >
            <Maximize2 className="h-4 w-4" />
            <span className="text-sm font-medium">Show Ad</span>
          </button>
        </div>
      )}
    </div>
  );
}