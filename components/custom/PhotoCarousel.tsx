"use client";

import { useRef, useEffect } from "react";

// Types

interface PhotoItem {
  src: string;
  caption: string;
  landscape?: boolean;
}

interface PhotoCarouselProps {
  photos: PhotoItem[];
  // Optional: control scroll speed (px per frame, default 0.6)
  speed?: number;
}

// Component
/*
  Vertical card carousel — portrait aspect ratio cards with a caption
  bar at the bottom, matching the reference screenshot.
  Cards scroll continuously left-to-right (left drift).
  Left and right edges fade out using gradient overlays.
  Hovering pauses the animation.
  Items are doubled internally for a seamless infinite loop.
*/

export default function PhotoCarousel({ photos, speed = 0.6 }: PhotoCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  // Duplicate for seamless loop
  const doubled = [...photos, ...photos];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let animFrame: number;
    let pos = 0;

    function getHalfWidth() {
      // Half the total scrollWidth = one full copy of items
      return track!.scrollWidth / 2;
    }

    function tick() {
      pos += speed;
      if (pos >= getHalfWidth()) pos = 0;
      track!.style.transform = `translateX(-${pos}px)`;
      animFrame = requestAnimationFrame(tick);
    }

    animFrame = requestAnimationFrame(tick);

    const container = track.parentElement!;
    const pause  = () => cancelAnimationFrame(animFrame);
    const resume = () => { animFrame = requestAnimationFrame(tick); };
    container.addEventListener("mouseenter", pause);
    container.addEventListener("mouseleave", resume);

    return () => {
      cancelAnimationFrame(animFrame);
      container.removeEventListener("mouseenter", pause);
      container.removeEventListener("mouseleave", resume);
    };
  }, [speed]);

  return (
    <div className="relative overflow-hidden py-2">

      {/* Left fade */}
      <div
        className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, var(--color-background, #111), transparent)" }}
      />

      {/* Right fade */}
      <div
        className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, var(--color-background, #111), transparent)" }}
      />

      {/* Scrolling track */}
      <div
        ref={trackRef}
        className="flex w-max will-change-transform"
        style={{ transform: "translateX(0px)" }}
      >
        {doubled.map((photo, i) => (
          /*
            Card: portrait ratio (roughly 3:4), rounded corners, dark caption
            bar pinned to the bottom — matching the reference design.
          */
          <div
            key={`${photo.caption}-${i}`}
            className="shrink-0 rounded-xl- overflow-hidden border-r border-white/10! relative group cursor-pointer outline-none"
            style={{ aspectRatio: photo.landscape ? "4 / 3" : "3 / 4", width: photo.landscape ? "298px" : "224px" }}
          >
            {/* Photo */}
            <img
              src={photo.src}
              alt={photo.caption}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Dark gradient so caption always reads */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />

            {/* Caption bar — bottom of card */}
            <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-background">
              <p className="text-white text-xs font-medium leading-snug">{photo.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}