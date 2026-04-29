"use client";

import { useRef, useEffect } from "react";

interface TickerMarqueeProps {
  words: string[];
  // Highlight word renders in white with a primary-coloured dot suffix
  highlightWord?: string;
  speed?: number; // px per frame, default 0.8
}

/*
  Uses requestAnimationFrame (same technique as PhotoCarousel/PortfolioCarousel)
  instead of a CSS keyframe animation, so it never depends on tailwind.config
  and works regardless of container width or font size.
  Items are tripled so there's always overflow to scroll into on both sides.
*/
export default function TickerMarquee({
  words,
  highlightWord = "TAMARA.",
  speed = 0.4,
}: TickerMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  // Triple the words for a fully seamless loop
  const repeated = [...words, ...words, ...words];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let animFrame: number;
    let pos = 0;

    function getOneThirdWidth() {
      // One "copy" of the word list = 1/3 of total track width
      return track!.scrollWidth / 3;
    }

    function tick() {
      pos += speed;
      if (pos >= getOneThirdWidth()) pos = 0;
      track!.style.transform = `translateX(-${pos}px)`;
      animFrame = requestAnimationFrame(tick);
    }

    animFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrame);
  }, [speed]);

  return (
    <div className="overflow-hidden border-b border-white/10 py-4 bg-background">
      <div
        ref={trackRef}
        className="flex gap-12 whitespace-nowrap will-change-transform"
        style={{ width: "max-content", transform: "translateX(0px)" }}
      >
        {repeated.map((word, i) => {
          const isHighlight = word === highlightWord;
          return (
            <span
              key={i}
              className={`text-lg font-bold tracking-widest uppercase font-bebas ${
                isHighlight ? "text-white" : "text-grey/50"
              }`}
            >
              {isHighlight ? (
                <>
                  {word.replace(".", "")}
                  <span className="text-primary" style={{ fontSize: "0.85em" }}>.</span>
                </>
              ) : (
                word
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}