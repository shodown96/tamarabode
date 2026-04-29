"use client";

import { TESTIMONIALS } from "@/lib/constants";
import { AvatarStack, TestimonialCard } from "./ui";

const SECTION_ID = "003";
const SECTION_LABEL = "Testimonials";

const HEADING = { white: "Client", grey: "stories." };

const DESCRIPTION =
  "Hear directly from our clients about their experience with Fortex—from seamless collaboration to impactful design solutions that elevate their brands.";

const PROJECTS_COMPLETED_LABEL = "We're successfully completed 95+ projects.";

export default function TestimonialsSection() {
  return (
    <div className="px-9 py-25">

      {/* ── Header ── */}
      <div className="grid grid-cols-12 items-start mb-16 max-md:gap-8">

        {/* 003 sidebar */}
        <div className="col-span-12 md:col-span-4">
          <div className="border-l-2 border-primary pl-3">
            <p className="text-xs font-semibold text-primary mb-0.5">{SECTION_ID}</p>
            <p className="text-xs font-semibold">{SECTION_LABEL}</p>
          </div>
        </div>

        <div className="col-span-12 md:col-span-8">
          <h2 className="text-5xl md:text-8xl font-bold leading-none mb-10">
            <span className="text-white">{HEADING.white}</span>{" "}
            <span className="text-grey">{HEADING.grey}</span>
          </h2>

          <div className="grid grid-cols-12 max-md:gap-8">
            <div className="col-span-12 md:col-span-5">
              <p className="text-sm text-grey leading-relaxed">{DESCRIPTION}</p>
            </div>
            <div className="col-span-12 md:col-span-7 flex flex-col md:items-end gap-2">
              <AvatarStack />
              <p className="text-xs text-grey">{PROJECTS_COMPLETED_LABEL}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Testimonial cards ── */}
      {/*
        3-column grid.
        Col 1: dark card (Michael) — author bottom-right
        Col 2: accent card (Alohan) top + dark card (Obiageli) bottom — stacked
        Col 3: accent card (Salim) full height
      */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-white/10 items-stretch min-h-150">

        {/* Column 1 — Michael (dark, tall) */}
        <TestimonialCard testimonial={TESTIMONIALS[0]} authorPosition="bottom" />

        {/* Column 2 — Alohan (accent, top) + Obiageli (dark, bottom) stacked */}
        {/* <div className="flex flex-col gap-px">
            <TestimonialCard testimonial={TESTIMONIALS[1]} authorPosition="top" />
            <TestimonialCard testimonial={TESTIMONIALS[2]} authorPosition="bottom" />
          </div> */}

        <TestimonialCard testimonial={TESTIMONIALS[1]} authorPosition="top" />
        <TestimonialCard testimonial={TESTIMONIALS[2]} authorPosition="bottom" />

        {/* Column 3 — Salim (accent, tall) */}
        <TestimonialCard testimonial={TESTIMONIALS[3]} authorPosition="top" />
      </div>
    </div>
  );
}
