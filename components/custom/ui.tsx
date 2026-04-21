"use client";

import { TESTIMONIALS } from "@/lib/constants";
import { useRouter } from "next/navigation";

// Arrow icon — diagonal up-right
export function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block ml-1.5 opacity-60"
    >
      <path
        d="M3 13L13 3M13 3H6M13 3V10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Decorative curved lines — SVG watermark used on accent cards
export function CurveWatermark() {
  return (
    <svg
      className="absolute bottom-0 right-0 opacity-10 pointer-events-none"
      width="180"
      height="180"
      viewBox="0 0 180 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M180 20 Q100 20 80 180" stroke="white" strokeWidth="1" fill="none" />
      <path d="M180 50 Q110 50 90 180" stroke="white" strokeWidth="1" fill="none" />
      <path d="M180 80 Q130 80 110 180" stroke="white" strokeWidth="1" fill="none" />
      <path d="M180 110 Q150 110 140 180" stroke="white" strokeWidth="1" fill="none" />
    </svg>
  );
}

export function AvatarStack() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-5">
        {TESTIMONIALS.map((t, i) => (
          <img
            key={t.id}
            src={t.avatar}
            alt={t.name}
            className="w-10 h-10 rounded-full object-cover border-2 border-background"
            style={{ zIndex: TESTIMONIALS.length + i }}
          />
        ))}
        {/* +95 badge on the last avatar */}
        <div
          className="w-10 h-10 rounded-full bg-background flex items-center justify-center border-2 border-white"
          style={{ zIndex: TESTIMONIALS.length * 2 }}
        >
          <span className="text-[10px] font-bold text-white leading-none">95+</span>
        </div>
      </div>
    </div>
  );
}

export function TestimonialCard({
  testimonial,
  authorPosition,
}: {
  testimonial: (typeof TESTIMONIALS)[number];
  authorPosition: "top" | "bottom";
}) {
  const isAccent = testimonial.variant === "accent";

  const authorBlock = (
    <div className="flex items-center gap-3">
      <img
        src={testimonial.avatar}
        alt={testimonial.name}
        className="w-10 h-10 rounded-full object-cover shrink-0"
      />
      <div>
        <p className={`text-sm font-semibold leading-tight ${isAccent ? "text-white" : "text-white"}`}>
          {testimonial.name}
        </p>
        <p className={`text-xs mt-0.5 font-medium ${isAccent ? "text-black" : "text-grey"}`}>
          <span className="text-white font-bold">// </span>
          {testimonial.role}
        </p>
      </div>
    </div>
  );

  // For dark cards, the design flips author to bottom-right
  const authorBlockFlipped = (
    <div className="flex items-center justify-end gap-3">
      <div className="text-right">
        <p className="text-sm font-semibold text-white leading-tight">{testimonial.name}</p>
        <p className="text-xs text-grey mt-0.5">
          {testimonial.role} <span className="text-primary font-bold">//</span>
        </p>
      </div>
      <img
        src={testimonial.avatar}
        alt={testimonial.name}
        className="w-10 h-10 rounded-full object-cover shrink-0"
      />
    </div>
  );

  return (
    <div
      className={`relative overflow-hidden flex flex-col justify-between- p-8 ${isAccent ? "bg-primary" : "bg-white/5"
        }`}
      style={{ minHeight: "340px" }}
    >
      {/* Watermark curves on accent cards */}
      {isAccent && <CurveWatermark />}

      {/* Top: author (if top-positioned) */}
      {authorPosition === "top" && (
        <div className="mb-6 relative z-10">{authorBlock}</div>
      )}

      {/* Quote */}
      <p
        className={`text-xl font-medium leading-snug relative z-10 ${isAccent ? "text-white" : "text-white"
          } ${authorPosition === "bottom" ? "mb-auto" : ""}`}
      >
        {testimonial.quote}
      </p>

      {/* Bottom: author (if bottom-positioned) */}
      {authorPosition === "bottom" && (
        <div className="mt-8 relative z-10">{authorBlockFlipped}</div>
      )}
    </div>
  );
}

export function ProjectCard({
  project,
}: {
  project: {
    title: string;
    category: string;
    year: string;
    image: string;
  };
}) {
  const router = useRouter()
  return (
    <div className="relative overflow-hidden aspect-4/3 bg-white/5 group cursor-pointer" onClick={() => router.push("/projects/min")}>
      {/* Background image */}
      <img
        src={project.image}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Subtle dark vignette so text always reads */}
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20" />

      {/* Top row: category pill (left) + year (right) */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
        <span className="bg-white text-black text-[10px] font-semibold px-2.5 py-1 rounded-sm tracking-wide">
          {project.category}
        </span>
        <span className="text-white/70 text-xs font-medium">{project.year}</span>
      </div>

      {/* Bottom: project title */}
      <div className="absolute bottom-4 left-4">
        <p className="text-white text-xl font-semibold">{project.title}</p>
      </div>
    </div>
  );
}
