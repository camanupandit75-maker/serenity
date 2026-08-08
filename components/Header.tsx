"use client";

import { useEffect, useState } from "react";

function formatClock(date: Date): string {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

export default function Header() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-night/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <a
          href="/"
          className="font-display text-2xl tracking-wide text-mist sm:text-3xl"
        >
          sere<em className="italic text-amber">nity</em>
        </a>
        <time
          className="font-body text-xs tabular-nums tracking-widest text-fog sm:text-sm"
          dateTime={now?.toISOString()}
          suppressHydrationWarning
        >
          {now ? formatClock(now) : "--:--:--"}
        </time>
      </div>
    </header>
  );
}
