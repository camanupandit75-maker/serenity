"use client";

import { Scene } from "@/lib/scenes";
import { AUTO_PLAY_DELAY_MS } from "@/lib/useScheduler";

type Props = {
  scene: Scene;
  remainingMs: number;
  exiting: boolean;
  onPlayNow: () => void;
  onDismiss: () => void;
};

export default function AutoPlayToast({
  scene,
  remainingMs,
  exiting,
  onPlayNow,
  onDismiss,
}: Props) {
  const seconds = Math.max(0, Math.ceil(remainingMs / 1000));
  const progress = Math.min(1, Math.max(0, remainingMs / AUTO_PLAY_DELAY_MS));

  return (
    <div
      className={`fixed bottom-5 left-1/2 z-50 w-[min(92vw,420px)] -translate-x-1/2 ${
        exiting ? "autoplay-toast-out" : "autoplay-toast-in"
      }`}
    >
      <div
        role="status"
        className="cursor-pointer overflow-hidden rounded-2xl border border-amber/40 bg-deep/90 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-md"
        onClick={onPlayNow}
      >
        <div className="flex items-center gap-3 px-4 py-3.5">
          <p className="min-w-0 flex-1 font-body text-sm text-mist">
            <span aria-hidden>{scene.icon}</span>{" "}
            <span className="font-medium">{scene.name}</span>
            <span className="text-fog"> plays in </span>
            <span className="tabular-nums text-amber">{seconds}s</span>
          </p>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDismiss();
            }}
            className="shrink-0 rounded-lg border border-white/10 bg-night/60 px-2.5 py-1.5 font-body text-xs text-fog transition hover:border-amber/30 hover:text-mist"
          >
            Not now
          </button>
        </div>
        <div className="h-0.5 w-full bg-slate">
          <div
            className="h-full bg-gradient-to-r from-sage to-amber transition-[width] duration-200 ease-linear"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
