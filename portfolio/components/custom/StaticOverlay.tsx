const NOISE_SVG =
    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")";

// TV static overlay: an animated noise texture blended over media,
// like a signal briefly losing lock and scanning back in.
export function StaticOverlay() {
    return (
        <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay animate-static-noise"
            style={{ backgroundImage: NOISE_SVG, backgroundSize: "140px 140px" }}
        />
    );
}
