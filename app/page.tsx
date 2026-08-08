"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import AmbientParticles from "@/components/AmbientParticles";
import AutoPlayToast from "@/components/AutoPlayToast";
import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import NowPlayingBanner from "@/components/NowPlayingBanner";
import SceneGrid from "@/components/SceneGrid";
import ScheduleTimeline from "@/components/ScheduleTimeline";
import StarCanvas from "@/components/StarCanvas";
import VideoModal from "@/components/VideoModal";
import { Scene } from "@/lib/scenes";
import { AUTO_PLAY_DELAY_MS, useScheduler } from "@/lib/useScheduler";

const TOAST_EXIT_MS = 300;

export default function Home() {
  const {
    scenes,
    activeScene,
    markAutoPlayFired,
    hasAutoPlayFired,
  } = useScheduler();
  const [modalScene, setModalScene] = useState<Scene | null>(null);
  const [suppressedScenes, setSuppressedScenes] = useState<Set<string>>(
    () => new Set()
  );
  const [pendingScene, setPendingScene] = useState<Scene | null>(null);
  const [remainingMs, setRemainingMs] = useState(AUTO_PLAY_DELAY_MS);
  const [toastExiting, setToastExiting] = useState(false);

  const pendingSceneRef = useRef<Scene | null>(null);
  const toastExitingRef = useRef(false);
  const deadlineRef = useRef<number | null>(null);

  useEffect(() => {
    pendingSceneRef.current = pendingScene;
  }, [pendingScene]);

  const dismissToast = useCallback(() => {
    if (toastExitingRef.current) return;
    if (!pendingSceneRef.current) return;
    toastExitingRef.current = true;
    setToastExiting(true);
    window.setTimeout(() => {
      setPendingScene(null);
      pendingSceneRef.current = null;
      toastExitingRef.current = false;
      setToastExiting(false);
      setRemainingMs(AUTO_PLAY_DELAY_MS);
      deadlineRef.current = null;
    }, TOAST_EXIT_MS);
  }, []);

  const openScene = useCallback(
    (scene: Scene) => {
      markAutoPlayFired(scene.id);
      setModalScene(scene);
    },
    [markAutoPlayFired]
  );

  // Start countdown toast when a scheduled scene becomes eligible
  useEffect(() => {
    if (!activeScene) return;
    if (modalScene) return;
    if (pendingSceneRef.current) return;
    if (toastExitingRef.current) return;
    if (hasAutoPlayFired(activeScene.id)) return;
    if (suppressedScenes.has(activeScene.id)) return;

    pendingSceneRef.current = activeScene;
    setPendingScene(activeScene);
    setRemainingMs(AUTO_PLAY_DELAY_MS);
    setToastExiting(false);
    toastExitingRef.current = false;
    deadlineRef.current = Date.now() + AUTO_PLAY_DELAY_MS;
  }, [activeScene, modalScene, hasAutoPlayFired, suppressedScenes]);

  // Tick countdown; open modal when delay elapses
  useEffect(() => {
    if (!pendingScene || toastExiting) return;

    const tick = () => {
      const deadline = deadlineRef.current;
      if (deadline == null) return;
      const left = Math.max(0, deadline - Date.now());
      setRemainingMs(left);
      if (left <= 0) {
        deadlineRef.current = null;
        openScene(pendingScene);
        dismissToast();
      }
    };

    tick();
    const id = window.setInterval(tick, 100);
    return () => window.clearInterval(id);
  }, [pendingScene, toastExiting, openScene, dismissToast]);

  // If the modal opens while a toast is pending, cancel the toast
  useEffect(() => {
    if (!modalScene || !pendingSceneRef.current) return;
    markAutoPlayFired(pendingSceneRef.current.id);
    dismissToast();
  }, [modalScene, dismissToast, markAutoPlayFired]);

  const handleDismiss = () => {
    if (!pendingScene || toastExiting) return;
    const id = pendingScene.id;
    setSuppressedScenes((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    markAutoPlayFired(id);
    dismissToast();
  };

  const handlePlayNow = () => {
    if (!pendingScene || toastExiting) return;
    openScene(pendingScene);
    dismissToast();
  };

  return (
    <main className="relative min-h-screen">
      <StarCanvas />
      <AmbientParticles />

      <div className="relative z-10">
        <Header />
        <HeroBanner />

        {activeScene && (
          <div className="px-4 sm:px-6">
            <NowPlayingBanner
              scene={activeScene}
              onOpen={setModalScene}
            />
          </div>
        )}

        <SceneGrid scenes={scenes} onOpen={setModalScene} />
        <ScheduleTimeline scenes={scenes} />

        <footer className="border-t border-white/[0.06] px-4 py-8 text-center sm:px-6">
          <p className="font-display text-lg text-fog">
            sere<em className="italic text-amber">nity</em>
          </p>
          <p className="mt-2 font-body text-xs text-fog/70">
            Ambient nature, right on time.
          </p>
        </footer>
      </div>

      {pendingScene && (
        <AutoPlayToast
          scene={pendingScene}
          remainingMs={remainingMs}
          exiting={toastExiting}
          onPlayNow={handlePlayNow}
          onDismiss={handleDismiss}
        />
      )}

      <VideoModal
        scene={modalScene}
        onClose={() => setModalScene(null)}
        onOpenScene={setModalScene}
      />
    </main>
  );
}
