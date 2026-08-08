"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  SCENES,
  Scene,
  SceneStatus,
  getSceneStatus,
  todayKey,
} from "./scenes";

/** Delay before scheduled auto-play opens the modal (ms). */
export const AUTO_PLAY_DELAY_MS = 10000;

export type SceneWithStatus = Scene & { status: SceneStatus };

export function useScheduler() {
  const [currentTime, setCurrentTime] = useState(() => new Date());
  const [autoPlayFired, setAutoPlayFired] = useState<Set<string>>(
    () => new Set()
  );

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentTime(new Date());
    }, 60_000);
    return () => clearInterval(id);
  }, []);

  const scenes: SceneWithStatus[] = useMemo(
    () =>
      SCENES.map((scene) => ({
        ...scene,
        status: getSceneStatus(scene, currentTime),
      })),
    [currentTime]
  );

  const activeScene = useMemo(
    () => scenes.find((s) => s.status === "active") ?? null,
    [scenes]
  );

  const markAutoPlayFired = useCallback(
    (sceneId: string, date: Date = new Date()) => {
      const key = todayKey(sceneId, date);
      setAutoPlayFired((prev) => {
        if (prev.has(key)) return prev;
        const next = new Set(prev);
        next.add(key);
        return next;
      });
    },
    []
  );

  const hasAutoPlayFired = useCallback(
    (sceneId: string, date: Date = new Date()) =>
      autoPlayFired.has(todayKey(sceneId, date)),
    [autoPlayFired]
  );

  return {
    currentTime,
    scenes,
    activeScene,
    autoPlayFired,
    markAutoPlayFired,
    hasAutoPlayFired,
  };
}
