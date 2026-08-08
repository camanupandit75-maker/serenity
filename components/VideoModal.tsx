"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getNextScene, Scene } from "@/lib/scenes";

type Props = {
  scene: Scene | null;
  onClose: () => void;
  onOpenScene: (scene: Scene) => void;
};

function formatCountdown(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

function youtubeEmbedSrc(ytId: string, loop: boolean): string {
  const base =
    `https://www.youtube-nocookie.com/embed/${ytId}` +
    `?autoplay=1&rel=0&modestbranding=1&controls=0&disablekb=1` +
    `&iv_load_policy=3&fs=0&enablejsapi=1`;
  return loop ? `${base}&loop=1&playlist=${ytId}` : base;
}

function postYouTubeCommand(
  iframe: HTMLIFrameElement | null,
  func: "playVideo" | "pauseVideo" | "mute" | "unMute"
) {
  iframe?.contentWindow?.postMessage(
    JSON.stringify({ event: "command", func, args: "" }),
    "*"
  );
}

function ComingSoonFallback({ scene }: { scene: Scene }) {
  return (
    <div className="absolute inset-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={scene.thumbUrl}
        alt=""
        className="h-full w-full object-cover brightness-75"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-night/50 px-4 text-center">
        <p className="font-display text-2xl text-mist">Video coming soon</p>
        <p className="mt-2 font-body text-sm text-fog">
          A playable source will appear here shortly.
        </p>
      </div>
    </div>
  );
}

export default function VideoModal({ scene, onClose, onOpenScene }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loopEnabled, setLoopEnabled] = useState(true);
  const [remaining, setRemaining] = useState(0);
  const [total, setTotal] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const [ytPlaying, setYtPlaying] = useState(true);
  const [ytMuted, setYtMuted] = useState(false);

  const cleanupVideo = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.removeAttribute("src");
      video.load();
    }
    const iframe = iframeRef.current;
    if (iframe) {
      postYouTubeCommand(iframe, "pauseVideo");
      iframe.src = "about:blank";
    }
  }, []);

  const handleClose = useCallback(() => {
    cleanupVideo();
    onClose();
  }, [cleanupVideo, onClose]);

  useEffect(() => {
    if (!scene) return;

    setLoopEnabled(true);
    setVideoError(false);
    setYtPlaying(true);
    setYtMuted(false);
    const seconds = scene.durationMin * 60;
    setTotal(seconds);
    setRemaining(seconds);

    if (scene.videoUrl) {
      // Allow the new <video> to mount, then play
      requestAnimationFrame(() => {
        const video = videoRef.current;
        if (!video) return;
        video.loop = true;
        void video.play().catch(() => {
          /* autoplay may be blocked; native controls remain */
        });
      });
    }
  }, [scene]);

  useEffect(() => {
    if (!scene) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [scene, handleClose]);

  useEffect(() => {
    if (!scene) return;

    const id = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          handleClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [scene, handleClose]);

  // Loop toggle: HTML5 updates in place; YouTube remounts via iframe key/src
  useEffect(() => {
    if (!scene) return;
    if (scene.videoUrl) {
      if (videoRef.current) videoRef.current.loop = loopEnabled;
      return;
    }
    if (scene.ytId) {
      setYtPlaying(true);
    }
  }, [loopEnabled, scene]);

  const toggleYtPlay = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    if (ytPlaying) {
      postYouTubeCommand(iframe, "pauseVideo");
      setYtPlaying(false);
    } else {
      postYouTubeCommand(iframe, "playVideo");
      setYtPlaying(true);
    }
  }, [ytPlaying]);

  const toggleYtMute = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    if (ytMuted) {
      postYouTubeCommand(iframe, "unMute");
      setYtMuted(false);
    } else {
      postYouTubeCommand(iframe, "mute");
      setYtMuted(true);
    }
  }, [ytMuted]);

  if (!scene) return null;

  const progress = total > 0 ? remaining / total : 0;
  const useDirectVideo = Boolean(scene.videoUrl) && !videoError;
  const useYouTube = !scene.videoUrl && Boolean(scene.ytId);

  return (
    <div
      className="fixed inset-0 z-100 flex flex-col bg-night/85 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={`Now playing ${scene.name}`}
    >
      <div className="flex items-start justify-between gap-4 border-b border-white/[0.06] px-4 py-4 sm:px-6">
        <div className="min-w-0">
          <p className="font-body text-[0.65rem] uppercase tracking-[0.22em] text-amber">
            Now Playing
          </p>
          <h2 className="mt-1 truncate font-display text-xl text-mist sm:text-2xl">
            {scene.icon} {scene.name}
          </h2>
          <p className="mt-1 line-clamp-2 font-display text-sm italic text-fog sm:text-base">
            {scene.quote}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => setLoopEnabled((v) => !v)}
            className={`rounded-lg border px-3 py-2 font-body text-xs transition sm:text-sm ${
              loopEnabled
                ? "border-amber/40 bg-amber/15 text-amber"
                : "border-white/10 bg-deep text-fog hover:text-mist"
            }`}
          >
            Loop {loopEnabled ? "On" : "Off"}
          </button>
          <button
            type="button"
            onClick={() => {
              cleanupVideo();
              onOpenScene(getNextScene(scene));
            }}
            className="hidden rounded-lg border border-white/10 bg-deep px-3 py-2 font-body text-xs text-mist transition hover:border-aurora/40 hover:text-aurora sm:inline-flex sm:text-sm"
          >
            Next Scene →
          </button>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close player"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-deep text-mist transition hover:border-amber/40 hover:text-amber"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-3 py-4 sm:px-6">
        <div className="w-full max-w-[900px]">
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-deep shadow-[0_24px_80px_rgba(0,0,0,0.55)]">
            {useDirectVideo && scene.videoUrl ? (
              <video
                ref={videoRef}
                key={scene.id}
                src={scene.videoUrl}
                autoPlay
                loop={loopEnabled}
                playsInline
                controls
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={() => setVideoError(true)}
              />
            ) : useYouTube && scene.ytId ? (
              <>
                <iframe
                  ref={iframeRef}
                  key={`${scene.ytId}-${loopEnabled ? "loop" : "once"}`}
                  src={youtubeEmbedSrc(scene.ytId, loopEnabled)}
                  title={scene.name}
                  className="h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                />
                <button
                  type="button"
                  aria-label={ytPlaying ? "Pause" : "Play"}
                  onClick={toggleYtPlay}
                  className="absolute inset-0 z-10 cursor-pointer bg-transparent"
                />
              </>
            ) : (
              <ComingSoonFallback scene={scene} />
            )}
          </div>

          {useYouTube && (
            <div className="mt-3 flex items-center gap-2 rounded-xl border border-white/[0.06] bg-deep/80 px-3 py-2">
              <button
                type="button"
                onClick={toggleYtPlay}
                aria-label={ytPlaying ? "Pause" : "Play"}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-night/50 text-mist transition hover:border-amber/40 hover:text-amber"
              >
                {ytPlaying ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden>
                    <rect x="2" y="1" width="3.5" height="12" rx="0.5" />
                    <rect x="8.5" y="1" width="3.5" height="12" rx="0.5" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden>
                    <path d="M3 1.5v11l9-5.5L3 1.5z" />
                  </svg>
                )}
              </button>
              <button
                type="button"
                onClick={toggleYtMute}
                aria-label={ytMuted ? "Unmute" : "Mute"}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-night/50 text-mist transition hover:border-amber/40 hover:text-amber"
              >
                {ytMuted ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
                    <path d="M11 5L6 9H3v6h3l5 4V5z" />
                    <path d="M22 9l-6 6M16 9l6 6" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
                    <path d="M11 5L6 9H3v6h3l5 4V5z" />
                    <path d="M15.5 8.5a5 5 0 010 7M18.5 6a9 9 0 010 12" />
                  </svg>
                )}
              </button>
              <span className="ml-1 font-body text-xs text-fog">
                {ytPlaying ? "Playing" : "Paused"}
                {ytMuted ? " · Muted" : ""}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-white/[0.06] px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-[900px] flex-wrap items-center gap-3 sm:gap-4">
          <span className="font-body text-xs text-fog">Auto-closes in</span>
          <div className="relative h-2 min-w-[120px] flex-1 overflow-hidden rounded-full bg-slate">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-sage to-amber transition-[width] duration-1000 linear"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <span className="font-body text-sm tabular-nums text-mist">
            {formatCountdown(remaining)}
          </span>
          <button
            type="button"
            onClick={() => {
              setRemaining((r) => r + 300);
              setTotal((t) => t + 300);
            }}
            className="rounded-lg border border-sage/35 bg-sage/10 px-3 py-1.5 font-body text-xs text-sage transition hover:bg-sage/20"
          >
            +5 min
          </button>
          <button
            type="button"
            onClick={() => {
              cleanupVideo();
              onOpenScene(getNextScene(scene));
            }}
            className="rounded-lg border border-white/10 bg-deep px-3 py-1.5 font-body text-xs text-mist sm:hidden"
          >
            Next Scene →
          </button>
        </div>
      </div>
    </div>
  );
}
