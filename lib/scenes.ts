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
      "https://images.unsplash.com/photo-1605648916361-9bc12ad6a569?w=800&q=80",
    color: "#C77B6E",
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
