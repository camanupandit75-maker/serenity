"use client";

import { formatSlot, Scene } from "@/lib/scenes";
import { SceneWithStatus } from "@/lib/useScheduler";

type Props = {
  scenes: SceneWithStatus[];
  onOpen: (scene: Scene) => void;
};

const BADGE: Record<
  SceneWithStatus["status"],
  { label: string; className: string }
> = {
  active: {
    label: "● Now",
    className: "bg-amber/20 text-amber border-amber/40 badge-live",
  },
  soon: {
    label: "◎ Soon",
    className: "bg-sage/15 text-sage border-sage/35",
  },
  past: {
    label: "Done",
    className: "bg-white/5 text-fog border-white/10",
  },
  upcoming: {
    label: "Play ▶",
    className: "bg-mist/10 text-mist border-mist/20",
  },
};

export default function SceneGrid({ scenes, onOpen }: Props) {
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-4 pb-16 sm:px-6">
      <div className="mb-6 flex items-end justify-between gap-4">
        <h2 className="font-display text-2xl text-mist sm:text-3xl">
          Today&apos;s scenes
        </h2>
        <p className="font-body text-xs text-fog sm:text-sm">
          Tap any card to play
        </p>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5">
        {scenes.map((scene) => {
          const badge = BADGE[scene.status];
          const isActive = scene.status === "active";

          return (
            <button
              key={scene.id}
              type="button"
              onClick={() => onOpen(scene)}
              className={`group relative aspect-[4/3] overflow-hidden rounded-2xl border text-left transition duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber ${
                isActive
                  ? "border-amber shadow-[0_0_0_1px_rgba(240,168,85,0.35),0_0_28px_rgba(240,168,85,0.25)]"
                  : "border-white/[0.06] hover:border-amber/50 hover:shadow-[0_0_24px_rgba(240,168,85,0.18)]"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={scene.thumbUrl}
                alt=""
                className="absolute inset-0 h-full w-full object-cover brightness-[0.72] transition duration-500 group-hover:scale-105 group-hover:brightness-[0.8]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night via-night/55 to-transparent" />

              <span
                className={`absolute right-3 top-3 rounded-full border px-2.5 py-1 font-body text-[0.65rem] font-medium tracking-wide ${badge.className}`}
              >
                {badge.label}
              </span>

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl" aria-hidden>
                    {scene.icon}
                  </span>
                  <h3 className="font-display text-xl text-mist sm:text-2xl">
                    {scene.name}
                  </h3>
                </div>
                <p className="mt-1 font-body text-xs text-fog">
                  {formatSlot(scene)}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
