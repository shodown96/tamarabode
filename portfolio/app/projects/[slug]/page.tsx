"use client";

import Navbar from "@/components/custom/Navbar";
import Footer from "@/components/custom/Footer";
import LetsTellAStory from "@/components/custom/LetsTellAStory";

// ── Project detail data ──────────────────────────────────────────
// In a real app this would be fetched by slug/id. For now all content
// lives here so the structure is easy to copy per-project.

const PROJECT = {
    title: "LIGHTSPEED.",

    // 001 — Introduction
    intro: {
        sectionId: "001",
        sectionLabel: "Introduction",
        meta: {
            client: "Lightspeed.",
            timeline: "6 months",
            year: "2024",
        },
        headline:
            "How Lightspeed transformed their online retail experience by launching a mobile-optimized website and simplifying checkout workflows, increasing conversion rates by 55% and boosting customer satisfaction across devices.",
        body: "In 2024, Lightspeed, a fast-growing e-commerce brand, partnered with Fortex to redesign their website with a focus on mobile usability and a frictionless checkout. The aim was to improve sales performance and reduce cart abandonment.",
        liveUrl: "#",
        // Hero image — full-width light panel beneath the intro text
        heroImage: "/images/projects/project-1.png",
    },

    // 002 — Challenges
    challenges: {
        sectionId: "002",
        sectionLabel: "Challenges",
        headline:
            "Lightspeed struggled with a complex checkout process and inconsistent mobile experience that frustrated users and led to lost sales opportunities.",
        body: "Customers abandoned carts due to lengthy forms and slow load times on mobile devices. The lack of responsive design limited reach and negatively impacted brand perception in a highly competitive market.",
        // Two side-by-side images, then one full-width image
        images: [
            { src: "/images/projects/project-1.png", alt: "Mobile mockup 1" },
            { src: "/images/projects/project-1.png", alt: "Mobile mockup 2" },
        ],
        fullImage: { src: "/images/projects/project-1.png", alt: "Desktop mockup" },
    },

    // 003 — Results
    results: {
        sectionId: "003",
        sectionLabel: "Results",
        headline:
            "Fortex's redesign increased conversion rates by 55%, reduced cart abandonment by 40%, and generated $3.2 million in additional annual revenue through improved user experience.",
        body: "The new mobile-first site delivered faster load times, intuitive navigation, and a streamlined checkout flow. Enhanced usability boosted repeat purchases and strengthened Lightspeed's position as a customer-centric retailer.",
        finalImage: { src: "/images/projects/project-1.png", alt: "Final result mockup" },
    },
};

// ── More projects list ────────────────────────────────────────────

const MORE_PROJECTS = {
    heading: "More projects.",
    description:
        "Dive into our project archive, where design, development, and strategy come together to solve real challenges and create lasting impact for businesses.",
    items: [
        { year: "2024", title: "Boltshift.", href: "#" },
        { year: "2022", title: "Powersurge.", href: "#" },
        { year: "2020", title: "Warpspeed.", href: "#" },
        { year: "2020", title: "CloudWatch.", href: "#" },
        { year: "2018", title: "Eightball.", href: "#" },
    ],
};

// ── Sub-components ───────────────────────────────────────────────

// Reusable section sidebar label — matches the 001/002/003 pattern site-wide
function SectionLabel({ id, label }: { id: string; label: string }) {
    return (
        <div className="border-l-2 border-primary pl-3">
            <p className="text-xs font-semibold text-primary mb-0.5">{id}</p>
            <p className="text-xs font-semibold text-white">{label}</p>
        </div>
    );
}

// ── Page ─────────────────────────────────────────────────────────

export default function ProjectDetailPage() {
    return (
        <div>
            <Navbar />

            <div className="flex flex-col items-center">
                <div className="max-w-450">

                    {/* ── Project title ── */}
                    <div className="pt-32 px-9">
                        <h1
                            className="font-bebas uppercase leading-none"
                            style={{ fontSize: "clamp(4rem, 9vw, 11rem)" }}
                        >
                            {PROJECT.title.replace(".", "")}<span className="text-primary">.</span>
                        </h1>
                    </div>

                    {/* ── 001 Introduction ── */}
                    <div className="px-9 pt-12 pb-16">

                        {/* Meta row: sidebar label | meta fields | empty right */}
                        <div className="grid grid-cols-12 gap-8 mb-10">

                            {/* Sidebar */}
                            <div className="col-span-12 md:col-span-4">
                                <SectionLabel id={PROJECT.intro.sectionId} label={PROJECT.intro.sectionLabel} />
                            </div>

                            {/* Meta fields — Client / Timeline / Year stacked */}
                            <div className="col-span-12 md:col-span-8 flex flex-col gap-3">
                                {Object.entries(PROJECT.intro.meta).map(([key, val]) => (
                                    <div key={key} className="grid grid-cols-2 items-baseline border-b border-white/10 pb-3">
                                        <p className="text-grey text-xs capitalize">{key}</p>
                                        <p className="text-white text-sm font-medium text-right">{val}</p>
                                    </div>
                                ))}


                                {/* Headline */}
                                <div className="pt-12">
                                    <h2
                                        className="text-white font-semibold leading-snug mb-6"
                                        style={{ fontSize: "clamp(1.2rem, 2vw, 1.75rem)" }}
                                    >
                                        {PROJECT.intro.headline}
                                    </h2>
                                    <p className="text-grey text-sm leading-relaxed mb-6 max-w-2xl">
                                        {PROJECT.intro.body}
                                    </p>
                                    {/* Live project link */}
                                    <a
                                        href={PROJECT.intro.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-white flex items-center gap-1 hover:text-primary transition-colors"
                                    >
                                        Live project
                                        {/* Diagonal arrow */}
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* ── Hero image — full-width, light bg panel ── */}
                    <div className="flex items-center justify-center py-16 px-9">
                        <img
                            src={PROJECT.intro.heroImage}
                            alt={`${PROJECT.title} hero`}
                            className="max-h-105 w-auto object-contain bg-white/30"
                        />
                    </div>

                    {/* ── 002 Challenges ── */}
                    <div className="px-9 pt-16 pb-12">

                        {/* Sidebar + headline row */}
                        <div className="grid grid-cols-12 gap-8 mb-10">
                            <div className="col-span-12 md:col-span-4">
                                <SectionLabel id={PROJECT.challenges.sectionId} label={PROJECT.challenges.sectionLabel} />
                            </div>
                            <div className="col-span-12 md:col-span-8">
                                <h2
                                    className="text-white font-semibold leading-snug mb-4"
                                    style={{ fontSize: "clamp(1.2rem, 2vw, 1.75rem)" }}
                                >
                                    {PROJECT.challenges.headline}
                                </h2>
                                <p className="text-grey text-sm leading-relaxed max-w-2xl">
                                    {PROJECT.challenges.body}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Two side-by-side challenge images */}
                    <div className="grid grid-cols-2 gap-px px-9">
                        {PROJECT.challenges.images.map((img, i) => (
                            <div key={i} className="bg-[#f0f0f0] flex items-center justify-center py-16 px-9">
                                <img
                                    src={img.src}
                                    alt={img.alt}
                                    className="max-h-90 w-auto object-contain bg-white/30"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Full-width challenge image */}
                    <div className="bg-background flex items-center justify-center py-16 px-9 border-t border-white/10">
                        <img
                            src={PROJECT.challenges.fullImage.src}
                            alt={PROJECT.challenges.fullImage.alt}
                            className="max-h-105 w-auto object-contain bg-white/30"
                        />
                    </div>

                    {/* ── 003 Results ── */}
                    <div className="px-9 pt-16 pb-12">

                        {/* Sidebar + headline row */}
                        <div className="grid grid-cols-12 gap-8 mb-10">
                            <div className="col-span-12 md:col-span-4">
                                <SectionLabel id={PROJECT.results.sectionId} label={PROJECT.results.sectionLabel} />
                            </div>
                            <div className="col-span-12 md:col-span-8">
                                <h2
                                    className="text-white font-semibold leading-snug mb-4"
                                    style={{ fontSize: "clamp(1.2rem, 2vw, 1.75rem)" }}
                                >
                                    {PROJECT.results.headline}
                                </h2>
                                <p className="text-grey text-sm leading-relaxed max-w-2xl">
                                    {PROJECT.results.body}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Final result image — full-width, light bg */}
                    <div className="flex items-center justify-center py-16 px-9">
                        <img
                            src={PROJECT.results.finalImage.src}
                            alt={PROJECT.results.finalImage.alt}
                            className="max-h-120 w-auto object-contain bg-white/30"
                        />
                    </div>

                    {/* ── More projects ── */}
                    {/*
                Two-column layout: description left (4 cols), project list right (8 cols).
                Each list item is year + project name, separated by bottom borders.
                Hover lifts the title to white.
            */}
                    <div className="px-9 pt-24 pb-20">

                        {/* "More projects." heading — full width, massive */}
                        <h2
                            className="text-white font-semibold leading-none mb-20 col-span-12"
                            style={{ fontSize: "clamp(3rem, 7vw, 8rem)" }}
                        >
                            {MORE_PROJECTS.heading}
                        </h2>

                        <div className="grid grid-cols-12 gap-8">

                            {/* Left — description */}
                            <div className=" col-span-12 md:col-span-4">
                                <p className="text-grey text-sm leading-relaxed">{MORE_PROJECTS.description}</p>
                            </div>

                            {/* Right — project list */}
                            <div className="col-span-12 md:col-span-8 flex flex-col">
                                {MORE_PROJECTS.items.map((item, i) => (
                                    <a
                                        key={i}
                                        href={item.href}
                                        className="group grid grid-cols-12 items-center py-5 border-b border-white/10 hover:border-white/30 transition-colors"
                                    >
                                        {/* Year */}
                                        <span className="col-span-2 text-grey text-sm">{item.year}</span>

                                        {/* Project name */}
                                        <span className="col-span-10 text-white font-semibold text-xl group-hover:text-primary transition-colors">
                                            {item.title}
                                        </span>
                                    </a>
                                ))}
                                {/* Closing border */}
                                <div className="border-b border-white/10" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <LetsTellAStory />
            <Footer />
        </div>
    );
}