export type Scene = {
  id: string;
  name: string;
  icon: string;
  quote: string;
  startHour: number;
  startMin: number;
  durationMin: number;
  videoFile: string;
  thumbUrl: string;
  color: string;
  ytId?: string; // YouTube video ID (optional)
  videoUrl?: string; // direct MP4 URL (external or CDN)
};

export type SceneStatus = "active" | "soon" | "past" | "upcoming";

export const SCENES: Scene[] = [
  {
    id: "rain",
    name: "Monsoon Rain",
    icon: "🌧",
    quote: "The rain whispers what the sun cannot say.",
    startHour: 6,
    startMin: 0,
    durationMin: 20,
    videoFile: "/videos/rain.mp4",
    thumbUrl:
      "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80",
    color: "#7B9ED9",
    videoUrl:
      "https://res.cloudinary.com/deivg8apm/video/upload/v1786205557/grok-video-d6a76fae-a0ac-495c-95d6-b125dc3828eb_pzoljo.mp4",
  },
  {
    id: "ocean",
    name: "Ocean Waves",
    icon: "🌊",
    quote: "The sea does not apologise for its depth.",
    startHour: 8,
    startMin: 30,
    durationMin: 25,
    videoFile: "/videos/ocean.mp4",
    thumbUrl:
      "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80",
    color: "#4A8FA8",
    ytId: "F8q9cRVndGI",
  },
  {
    id: "mountains",
    name: "Mountain Silence",
    icon: "⛰",
    quote: "Mountains teach patience by simply standing.",
    startHour: 10,
    startMin: 0,
    durationMin: 20,
    videoFile: "/videos/mountains.mp4",
    thumbUrl:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    color: "#8A9E7B",
    videoUrl:
      "https://res.cloudinary.com/deivg8apm/video/upload/v1786207785/grok-video-9b8d6499-c3ce-492f-93cd-51eacbd4d824_pwmunm.mp4",
  },
  {
    id: "forest",
    name: "Deep Forest",
    icon: "🌲",
    quote: "In the forest, silence has a sound.",
    startHour: 12,
    startMin: 0,
    durationMin: 30,
    videoFile: "/videos/forest.mp4",
    thumbUrl:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
    color: "#6B9E78",
    videoUrl:
      "https://res.cloudinary.com/deivg8apm/video/upload/v1786207118/grok-video-b7ec8fc4-223e-4d24-ad74-cefdf7bf21c3_hxt5wz.mp4",
  },
  {
    id: "fireplace",
    name: "Crackling Fireplace",
    icon: "🔥",
    quote: "Fire asks nothing of you. Just be here.",
    startHour: 14,
    startMin: 30,
    durationMin: 25,
    videoFile: "/videos/fireplace.mp4",
    thumbUrl:
      "https://res.cloudinary.com/deivg8apm/video/upload/so_0/v1786206304/grok-video-d19b74ad-1a16-42a9-b59f-ecd34fb6616a_pw1h6d.jpg",
    color: "#C77B6E",
    videoUrl:
      "https://res.cloudinary.com/deivg8apm/video/upload/v1786206304/grok-video-d19b74ad-1a16-42a9-b59f-ecd34fb6616a_pw1h6d.mp4",
  },
  {
    id: "waterfall",
    name: "Waterfall",
    icon: "💧",
    quote: "Water finds its way without forcing anything.",
    startHour: 16,
    startMin: 0,
    durationMin: 20,
    videoFile: "/videos/waterfall.mp4",
    thumbUrl:
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&q=80",
    color: "#7BB8B0",
    videoUrl:
      "https://res.cloudinary.com/deivg8apm/video/upload/v1786205626/grok-video-97a6e499-d648-4b79-b404-2c58b4705db8_wdj6jx.mp4",
  },
  {
    id: "underwater",
    name: "Coral Reef",
    icon: "🐠",
    quote: "Beneath the surface, the world slows down.",
    startHour: 10,
    startMin: 30,
    durationMin: 20,
    videoFile: "/videos/underwater.mp4",
    videoUrl:
      "https://res.cloudinary.com/deivg8apm/video/upload/v1786247804/grok-video-d664afbf-5189-4862-86b7-cbaf237daffa_ejokdk.mp4",
    thumbUrl:
      "https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=800&q=80",
    color: "#4A9EB5",
  },
  {
    id: "sunrise",
    name: "Golden Sunrise",
    icon: "🌅",
    quote: "Every morning the world is made again.",
    startHour: 17,
    startMin: 30,
    durationMin: 20,
    videoFile: "/videos/sunrise.mp4",
    thumbUrl:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80",
    color: "#F0A855",
    videoUrl:
      "https://res.cloudinary.com/deivg8apm/video/upload/v1786208264/grok-video-5eb2da73-3833-4006-81cf-af4bfcdbf6b3_i778ql.mp4",
  },
  {
    id: "aurora",
    name: "Northern Aurora",
    icon: "🌌",
    quote: "The sky dances when no one is watching.",
    startHour: 21,
    startMin: 0,
    durationMin: 30,
    videoFile: "/videos/aurora.mp4",
    thumbUrl:
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80",
    color: "#8B7ED9",
    videoUrl:
      "https://res.cloudinary.com/deivg8apm/video/upload/v1786204898/grok-video-97a1f42e-a0a8-4f77-b4c8-e222dd354ab8_dxlops.mp4",
  },
];

function toMinutes(hour: number, min: number): number {
  return hour * 60 + min;
}

export function getSceneStartMinutes(scene: Scene): number {
  return toMinutes(scene.startHour, scene.startMin);
}

export function getSceneEndMinutes(scene: Scene): number {
  return getSceneStartMinutes(scene) + scene.durationMin;
}

export function getSceneStatus(
  scene: Scene,
  now: Date = new Date()
): SceneStatus {
  const current = toMinutes(now.getHours(), now.getMinutes());
  const start = getSceneStartMinutes(scene);
  const end = getSceneEndMinutes(scene);

  if (current >= start && current < end) return "active";
  if (current >= start - 30 && current < start) return "soon";
  if (current >= end) return "past";
  return "upcoming";
}

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

export function formatSlot(scene: Scene): string {
  const startH = pad(scene.startHour);
  const startM = pad(scene.startMin);
  const endTotal = getSceneEndMinutes(scene);
  const endH = pad(Math.floor(endTotal / 60) % 24);
  const endM = pad(endTotal % 60);
  return `${startH}:${startM} – ${endH}:${endM}`;
}

export function getNextScene(current: Scene): Scene {
  const index = SCENES.findIndex((s) => s.id === current.id);
  return SCENES[(index + 1) % SCENES.length];
}

export function todayKey(sceneId: string, date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = pad(date.getMonth() + 1);
  const d = pad(date.getDate());
  return `${sceneId}-${y}-${m}-${d}`;
}
