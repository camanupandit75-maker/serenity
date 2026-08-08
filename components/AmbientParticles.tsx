"use client";

import { useMemo } from "react";

export default function AmbientParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: `${4 + ((i * 8.3) % 92)}%`,
        duration: `${18 + ((i * 3) % 21)}s`,
        delay: `${-((i * 2.7) % 20)}s`,
        size: 3 + (i % 3),
      })),
    []
  );

  return (
    <>
      {particles.map((p) => (
        <span
          key={p.id}
          className="ambient-particle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
          aria-hidden
        />
      ))}
    </>
  );
}
