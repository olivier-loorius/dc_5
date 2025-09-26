"use client";
import { useEffect, useRef } from "react";

export function RenderProbe({ tag }: { tag: string }) {
  const renders = useRef(0);
  renders.current++;

  useEffect(() => {
    console.log(`🔍 ${tag} mounted (render #${renders.current})`);
  }, [tag]);

  // Log excessif de renders
  if (renders.current > 10) {
    console.error(
      `🚨 RENDER LOOP détecté sur ${tag}: ${renders.current} renders!`
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        pointerEvents: "none",
        zIndex: 9999,
      }}
      className="bg-red-500 text-white text-xs p-1"
      data-probe={`${tag}:${renders.current}`}
    >
      {tag}: {renders.current}
    </div>
  );
}
