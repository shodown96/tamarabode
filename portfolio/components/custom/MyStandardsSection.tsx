"use client";

const SECTION_ID = "004";
const SECTION_LABEL = "My Standards";

const STATEMENT = {
  prefix: "I believe",
  highlight1: "/great design/",
  middle: "should be both",
  highlight2: "/felt and functional/",
  suffix: "; resonating emotionally while seamlessly solving real problems.",
};

export default function MyStandardsSection() {
  return (
    <div className="relative min-h-screen bg-primary px-9 py-25 grid grid-cols-12 gap-5 md:gap-10">

      {/* ── 004 sidebar ── */}
      <div className="col-span-12 md:col-span-1">
        <div className="border-l-2 border-black pl-3">
          <p className="text-xs font-semibold text-white mb-0.5">{SECTION_ID}</p>
          <p className="text-xs font-semibold text-black">{SECTION_LABEL}</p>
        </div>
      </div>

      {/* ── Statement ── */}
      {/*
        The highlighted phrases /great design/, /felt and functional/
        are rendered in black while the rest of the text is white.
        font-size is intentionally massive — the text IS the design.
      */}
      <div className="col-span-12 md:col-span-10 flex items-center">
        <h2
          className="text-white font-bold leading-[1.05] mt-8"
          style={{ fontSize: "clamp(3rem, 7.5vw, 9rem)" }}
        >
          {STATEMENT.prefix}{" "}
          <span className="text-black">{STATEMENT.highlight1}</span>
          {" "}{STATEMENT.middle}{" "}
          <span className="text-black">{STATEMENT.highlight2}</span>
          {STATEMENT.suffix}
        </h2>
      </div>

    </div>
  );
}
