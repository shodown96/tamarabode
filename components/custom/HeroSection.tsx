"use client";

const HERO_BG = "/images/bg.png";

const HERO_SUBTITLE =
  "Product Designer & Engineer crafting scalable digital experiences.\nBridging strategy, design, and engineering to deliver meaningful digital experiences";

const HERO_TAGLINE = "Branding · Product Design · Engineering · Motion Graphics";

export default function HeroSection() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col justify-end pb-4 px-9"
      style={{ backgroundImage: `url(${HERO_BG})` }}
    >
      {/* Subtitle — sits just above the headline */}
      <p className="text-sm text-white/80 leading-relaxed mb-4 max-w-xl">
        Product Designer &amp; Engineer crafting scalable digital experiences.<br />
        Bridging strategy, design, and engineering to deliver meaningful digital experiences
      </p>

      {/* Headline — fills the full width of the viewport */}
      {/*
        font-bebas + uppercase. clamp() scales from ~5rem on mobile up to
        ~13vw on large screens so the text always bleeds edge-to-edge like
        the design. leading-[0.9] tightens the two lines into a solid block.
      */}
      <div
        className="uppercase font-bebas leading-[0.92] mb-4"
        style={{ fontSize: "clamp(2.6rem, 10vw, 15rem)" }}
      >
        <h2>
          Building for <span className="text-primary">users</span>
          <span className="text-white">//.</span>
        </h2>
        <h2>
          Designing for <span className="text-grey">growth</span>
          <span className="text-grey">/.</span>
        </h2>
      </div>

      {/* Divider */}
      <hr className="border-primary border-t mb-3" />

      {/* Bottom bar */}
      <div className="flex justify-between items-center py-1">
        <p className="text-xs text-white/70 tracking-wide">{HERO_TAGLINE}</p>
        {/* Down arrow */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 4.16663V15.8333"
            stroke="white"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.834 10L10.0007 15.8333L4.16732 10"
            stroke="white"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
