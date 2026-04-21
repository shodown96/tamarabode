"use client";

import { useState } from "react";
import Navbar from "@/components/custom/Navbar";
import Footer from "@/components/custom/Footer";
import LetsTellAStory from "@/components/custom/LetsTellAStory";
import { PROJECTS } from "@/lib/constants";
import { ProjectCard } from "@/components/custom/ui";

// ── Projects page data 

const PAGE_HEADER = {
    title: "PROJECTS.",
    period: "/©2018-26/",
    description:
        "Success stories that showcase how smart automation drives real business value, competitive advantage, and lasting transformation.",
};

const FILTER_CATEGORIES = [
    "All",
    "Branding",
    "Design",
    "Motion Graphics",
    "NoCode Development",
];


// ── Page

export default function ProjectsPage() {
    const [activeFilter, setActiveFilter] = useState("All");

    const filtered =
        activeFilter === "All"
            ? PROJECTS
            : PROJECTS.filter((p) => p.category === activeFilter);

    return (
        <div>
            <Navbar />

            {/* ── Page header ── */}
            {/*
                Two-column header: giant PROJECTS. wordmark left, period label +
                description right. Matches the asymmetric editorial layout from the design.
            */}
            <div className="pt-32 pb-16 px-9 grid grid-cols-12 items-end max-md:gap-8">

                {/* Left — PROJECTS. wordmark */}
                <div className="col-span-12 md:col-span-4">
                    <h1
                        className="font-bebas uppercase leading-none"
                        style={{ fontSize: "clamp(4rem, 8vw, 10rem)" }}
                    >
                        PROJECTS<span className="text-primary">.</span>
                    </h1>
                </div>

                {/* Right — period label + description */}
                <div className="col-span-12 md:col-span-8 flex flex-col gap-3 pb-2">
                    <p className="text-grey text-sm font-medium tracking-wide">
                        {PAGE_HEADER.period}
                    </p>
                    <p className="text-grey text-sm leading-relaxed max-w-xs">
                        {PAGE_HEADER.description}
                    </p>
                </div>
            </div>

            {/* ── Filter tabs ── */}
            {/*
                Pill-style filters. Active pill: solid primary bg.
                Inactive pills: transparent with white text, hover darkens slightly.
            */}
            <div className="px-9 mb-8 flex items-center gap-2 flex-wrap">
                {FILTER_CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveFilter(cat)}
                        className={`px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${activeFilter === cat
                            ? "bg-primary text-white"
                            : "text-white hover:bg-white/10"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* ── Project grid ── */}
            {/*
                2-column grid with a 1px gap (achieved via bg-white/10 on the wrapper
                and bg-background on each cell, so the wrapper colour bleeds as lines).
                Cards fill the grid naturally in pairs as the filter changes.
            */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px px-9">
                {filtered.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}

                {/* If odd number of filtered cards, fill the last cell with an empty placeholder */}
                {filtered.length % 2 !== 0 && (
                    <div className="bg-background aspect-video" />
                )}
                {!filtered.length ? (
                    <div className=" text-white font-medium italic" >No projects found</div>
                ):null}
            </div>

            {/* Bottom padding before footer */}
            <div className="h-24" />
            <LetsTellAStory />
            <Footer />
        </div>
    );
}