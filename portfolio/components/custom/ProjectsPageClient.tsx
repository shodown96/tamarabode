"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/custom/ui";
import type { Project } from "@/lib/sanity/queries";

const ALL = "All";

export default function ProjectsPageClient({ projects }: { projects: Project[] }) {
    const [activeFilter, setActiveFilter] = useState(ALL);

    const categories = useMemo(
        () => [ALL, ...Array.from(new Set(projects.map((p) => p.category))).sort()],
        [projects]
    );

    const filtered =
        activeFilter === ALL
            ? projects
            : projects.filter((p) => p.category === activeFilter);

    return (
        <>
            {/* Filter tabs */}
            {/*
                Pill-style filters. Active pill: solid primary bg.
                Inactive pills: transparent with white text, hover darkens slightly.
            */}
            <div className="px-9 mb-8 flex items-center gap-2 flex-wrap">
                {categories.map((cat) => (
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

            {/* Project grid */}
            {/*
                2-column grid with a 1px gap (achieved via bg-white/10 on the wrapper
                and bg-background on each cell, so the wrapper colour bleeds as lines).
                Cards fill the grid naturally in pairs as the filter changes.
            */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px px-9">
                {filtered.map((project) => (
                    <ProjectCard key={project._id} project={project} />
                ))}

                {/* If odd number of filtered cards, fill the last cell with an empty placeholder */}
                {filtered.length % 2 !== 0 && (
                    <div className="bg-background aspect-video" />
                )}
                {!filtered.length ? (
                    <div className=" text-white font-medium italic" >No projects found</div>
                ) : null}
            </div>
        </>
    );
}
