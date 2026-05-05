"use client";

import { PORTFOLIO_ITEMS, TOP_BRANDS } from "@/lib/constants";
import { useEffect, useRef } from "react";

const SECTION_ID = "001";
const SECTION_LABEL = "Work With Me";
const SUBTEXT =
  "I enjoy collaborating with people who care about what they're building. Whether it's a brand, product, or idea in its early stages, I'm here to help shape it into something meaningful.";

const STATS = {
  projectCount: "75+",
  projectLabel: "Projects Delivered",
  projectDescription:
    "Successfully completed projects across branding, product design, web experiences, and motion graphics for startups and growing businesses",
  yearsCount: "7+",
  yearsLabel: "Years of Experience",
  yearsSubLabel: "with 75+ client projects",
  portraitSrc: "/images/tamara-smiling.png",
  portraitAlt: "Designer portrait",
};

export default function WorkWithMeSection() {
  return (
    <div className="min-h-screen pt-20 px-9">

      {/* Hero row */}
      <div className="grid grid-cols-12 items-start mb-16 max-md:gap-8">
        <div className="col-span-12 md:col-span-4">
          <div className="border-l-2 border-primary pl-3">
            <p className="text-xs font-semibold text-primary mb-0.5">{SECTION_ID}</p>
            <p className="text-xs font-semibold">{SECTION_LABEL}</p>
          </div>
        </div>

        <div className="col-span-12 md:col-span-8">
          <h4 className="text-5xl md:text-8xl font-medium mb-4 leading-tight">
            <span className="text-grey">Let's Work</span> Together.
          </h4>
          <p className="text-grey w-5/6 text-sm leading-relaxed">{SUBTEXT}</p>
        </div>
      </div>

      {/* Stats row */}
      {/*
        Split: 8 cols for the projects panel, 4 cols for the photo panel.
        Both panels sit inside a shared border that forms one visual row.
      */}
      <div className="grid grid-cols-12 border border-white/10">

        {/* Left: 75+ Projects + portfolio thumbnails */}
        <div className="col-span-12 md:col-span-8 p-8 border-r border-white/10">
          <h3 className="text-4xl font-semibold mb-1">
            <span className="text-white">{STATS.projectCount}</span>{" "}
            <span className="text-grey">{STATS.projectLabel}</span>
          </h3>
          <p className="text-sm text-grey mb-6">
            <span className="text-white font-semibold">Successfully</span> completed{" "}
            <span className="text-white font-semibold">projects</span> across branding,
            product design, web experiences, and motion graphics for{" "}
            <span className="text-white font-semibold">startups</span> and{" "}
            <span className="text-white font-semibold">growing businesses</span>
          </p>

          <PortfolioCarousel items={PORTFOLIO_ITEMS} />
        </div>

        {/* Right: Photo + stats overlay */}
        {/*
          The image is a true <img> filling the container.
          A red-to-transparent gradient sits on top of it (absolute).
          The "7+" text block is absolutely positioned over that gradient.
        */}
        <div className="col-span-12 md:col-span-4 relative overflow-hidden min-h-90 md:min-h-70">
          {/* Photo */}
          <img
            src={STATS.portraitSrc}
            alt={STATS.portraitAlt}
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
          {/* Red gradient overlay — bottom half */}
          <div className="absolute inset-0 bg-linear-to-t from-red-600 via-red-500/60 to-transparent" />

          {/* Corner bracket decoration (matches the design's thin corner lines) */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-white/60" />

          {/* Stats text over gradient */}
          <div className="absolute bottom-0 left-0 p-8 text-white">
            <p className="text-7xl font-bold leading-none mb-2">{STATS.yearsCount}</p>
            <p className="text-lg font-semibold leading-snug">{STATS.yearsLabel}</p>
            <p className="text-sm text-white/70">{STATS.yearsSubLabel}</p>
          </div>
        </div>
      </div>

      {/* Brand grid */}
      {/*
        3-column grid. The outer wrapper provides the right and bottom border;
        each cell provides its own top and left border — classic "inner lines only" trick.
        The brand ID is absolutely positioned at bottom-right of its cell.
      */}
      <div className="grid grid-cols-1 md:grid-cols-3 border-b border-r border-white/10">
        {TOP_BRANDS.map((brand) => (
          <div
            key={brand.id}
            className="relative border-t border-l border-white/10 col-span-1"
          >
            {/* Centred brand name */}
            <div className="flex items-center justify-center h-40 md:h-28 py-5">
              <img src={brand.image} alt="" className="h-8 object-contain" />
            </div>

            {/* ID — absolute bottom-right, matching the design */}
            <span className="absolute bottom-2 right-3 text-[10px] text-grey/50">
              {brand.id}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}



// Types

interface PortfolioItem {
  name: string;
  image?: string;
}

interface PortfolioCarouselProps {
  items: PortfolioItem[];
}

// Component

function PortfolioCarousel({ items }: PortfolioCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  // Duplicate items for a seamless infinite loop
  const doubled = [...items, ...items];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let animFrame: number;
    let pos = 0;

    // Speed in px per frame (~1px @ 60fps = slow, smooth drift)
    const SPEED = 0.6;

    // Width of one set of items (half the total scrollWidth)
    function getHalfWidth() {
      return (track?.scrollWidth || 0) / 2;
    }

    function tick() {
      if (!track) return;
      pos += SPEED;
      // Once we've scrolled one full copy, reset silently to 0
      if (pos >= getHalfWidth()) {
        pos = 0;
      }
      track.style.transform = `translateX(-${pos}px)`;
      animFrame = requestAnimationFrame(tick);
    }

    animFrame = requestAnimationFrame(tick);

    // Pause on hover
    const container = track.parentElement!;
    const pause = () => cancelAnimationFrame(animFrame);
    const resume = () => { animFrame = requestAnimationFrame(tick); };
    container.addEventListener("mouseenter", pause);
    container.addEventListener("mouseleave", resume);

    return () => {
      cancelAnimationFrame(animFrame);
      container.removeEventListener("mouseenter", pause);
      container.removeEventListener("mouseleave", resume);
    };
  }, []);

  return (
    /*
      Outer wrapper: overflow-hidden clips the track.
      The two pseudo-gradient overlays are achieved with absolute
      divs on left and right, fading from bg to transparent.
    */
    <div className="relative overflow-hidden">

      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, var(--color-background, #111), transparent)" }}
      />

      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, var(--color-background, #111), transparent)" }}
      />

      {/* Scrolling track — doubled items for seamless loop */}
      <div
        ref={trackRef}
        className="flex gap-4 w-max will-change-transform"
        style={{ transform: "translateX(0px)" }}
      >
        {doubled.map((item, i) => (
          <div
            key={`${item.name}-${i}`}
            className="shrink-0 w-72 aspect-video rounded-xl overflow-hidden border border-white/10 bg-white/5 relative group"
          >
            {/* If an image is provided, show it; otherwise show a placeholder */}
            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs text-grey">{item.name}</span>
              </div>
            )}

            {/* Name overlay — bottom-left, always visible */}
            {item.image && (
              <>
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                <p className="absolute bottom-3 left-4 text-white text-sm font-semibold">
                  {item.name}
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}