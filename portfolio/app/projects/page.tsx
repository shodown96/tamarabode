import Navbar from "@/components/custom/Navbar";
import Footer from "@/components/custom/Footer";
import LetsTellAStory from "@/components/custom/LetsTellAStory";
import ProjectsPageClient from "@/components/custom/ProjectsPageClient";
import { client } from "@/lib/sanity";
import { PROJECTS_QUERY, type Project } from "@/lib/sanity/queries";

// ── Projects page data

const PAGE_HEADER = {
    title: "PROJECTS.",
    period: "/©2018-26/",
    description:
        "Success stories that showcase how smart automation drives real business value, competitive advantage, and lasting transformation.",
};

const options = { next: { revalidate: 30 } };

// ── Page

export default async function ProjectsPage() {
    const projects = await client.fetch<Project[]>(PROJECTS_QUERY, {}, options);

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

            <ProjectsPageClient projects={projects} />

            {/* Bottom padding before footer */}
            <div className="h-24" />
            <LetsTellAStory />
            <Footer />
        </div>
    );
}
