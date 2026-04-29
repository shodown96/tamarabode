import React from 'react'

const CTA = {
    // Two lines of the headline — line 2 gets the slash treatment
    heading: ["Let's tell a story", "/together/."],
    description:
        "Every project is an opportunity to tell a story; blending strategy and creativity to create experiences that people remember. If you have something in mind, I'd love to hear about it.",
};


export default function LetsTellAStory() {
    return (
        <>
            {/* ── CTA — Let's tell a story /together/. ── */}
            {/*
        Full-bleed primary (red) section. Bebas headline at massive scale.
        Line 1 is plain black text; line 2 gets the /slashes/ treatment.
        Small body copy sits below. Footer follows with the ticker marquee.
      */}
            <div className="bg-primary px-9 py-24">
                <h2
                    className="font-bebas uppercase leading-[0.95] mb-8 text-black"
                    style={{ fontSize: "clamp(4rem, 9vw, 11rem)" }}
                >
                    {CTA.heading[0]}<br />
                    <span className="text-white">{CTA.heading[1]}</span>
                </h2>
                <p className="text-white text-sm leading-relaxed max-w-lg">
                    {CTA.description}
                </p>
            </div>
        </>
    )
}
