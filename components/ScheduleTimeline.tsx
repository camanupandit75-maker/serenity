"use client";

import { formatSlot } from "@/lib/scenes";
import { SceneWithStatus } from "@/lib/useScheduler";

type Props = {
  scenes: SceneWithStatus[];
};

export default function ScheduleTimeline({ scenes }: Props) {
  return (
    <section className="relative z-10 mx-auto max-w-3xl px-4 pb-24 sm:px-6">
      <h2 className="mb-8 font-display text-2xl text-mist sm:text-3xl">
        Daily timeline
      </h2>

      <ol className="relative">
        <div
          className="absolute bottom-3 left-[3.25rem] top-3 w-px bg-slate sm:left-[4.25rem]"
          aria-hidden
        />

        {scenes.map((scene) => {
          const isActive = scene.status === "active";
          const isPast = scene.status === "past";
          const timeLabel = `${scene.startHour
            .toString()
            .padStart(2, "0")}:${scene.startMin.toString().padStart(2, "0")}`;

          return (
            <li
              key={scene.id}
              className={`relative grid grid-cols-[3.5rem_1.5rem_1fr] items-center gap-2 py-3 sm:grid-cols-[4.5rem_1.5rem_1fr] sm:gap-3 ${
                isPast ? "opacity-40" : "opacity-100"
              }`}
            >
              <time
                className={`font-body text-xs tabular-nums sm:text-sm ${
                  isActive ? "font-medium text-amber" : "text-fog"
                }`}
              >
                {timeLabel}
              </time>

              <span className="relative z-10 flex items-center justify-center">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    isActive
                      ? "bg-amber shadow-[0_0_12px_rgba(240,168,85,0.8)]"
                      : "bg-slate ring-1 ring-white/15"
                  }`}
                />
              </span>

              <div className="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-white/[0.04] bg-deep/60 px-3 py-2.5 sm:px-4">
                <div className="flex min-w-0 items-center gap-2">
                  <span aria-hidden>{scene.icon}</span>
                  <span className="truncate font-display text-base text-mist sm:text-lg">
                    {scene.name}
                  </span>
                </div>
                <span className="shrink-0 font-body text-[0.65rem] text-fog sm:text-xs">
                  {scene.durationMin} min · {formatSlot(scene)}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
