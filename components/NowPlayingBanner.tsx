"use client";

import { Scene } from "@/lib/scenes";
import { formatSlot } from "@/lib/scenes";

type Props = {
  scene: Scene;
  onOpen: (scene: Scene) => void;
};

export default function NowPlayingBanner({ scene, onOpen }: Props) {
  return (
    <button
      type="button"
      onClick={() => onOpen(scene)}
      className="now-playing-glow relative z-10 mx-auto mb-10 flex w-full max-w-xl items-center gap-4 rounded-2xl border border-amber/35 bg-amber/[0.08] px-5 py-4 text-left backdrop-blur-sm transition hover:bg-amber/[0.12] sm:px-6"
    >
      <span
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl"
        style={{ background: `${scene.color}22` }}
        aria-hidden
      >
        {scene.icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="badge-live block font-body text-[0.65rem] font-medium uppercase tracking-[0.22em] text-amber">
          ▶ Now Playing
        </span>
        <span className="mt-1 block truncate font-display text-xl text-mist sm:text-2xl">
          {scene.name}
        </span>
        <span className="mt-0.5 block font-body text-xs text-fog">
          {formatSlot(scene)}
        </span>
      </span>
      <span className="hidden shrink-0 font-body text-xs text-amber/80 sm:block">
        Tap to watch →
      </span>
    </button>
  );
}
