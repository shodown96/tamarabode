import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/custom/Navbar";
import Footer from "@/components/custom/Footer";
import LetsTellAStory from "@/components/custom/LetsTellAStory";
import { client, urlFor } from "@/lib/sanity";
import { PROJECT_QUERY, PROJECTS_QUERY, type Project } from "@/lib/sanity/queries";

// More projects copy: static framing text around the real project list

const MORE_PROJECTS_COPY = {
    heading: "More projects.",
    description:
        "Dive into our project archive, where design, development, and strategy come together to solve real challenges and create lasting impact for businesses.",
};

const options = { next: { revalidate: 30 } };

// Data 

async function getProject(slug: string) {
    return client.fetch<Project | null>(PROJECT_QUERY, { slug }, options);
}

export async function generateStaticParams() {
    const projects = await client.fetch<Project[]>(PROJECTS_QUERY);
    return projects.map((project) => ({ slug: project.slug.current }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const project = await getProject(slug);

    if (!project) return {};

    return {
        title: `${project.title} - Tamara`,
        description: project.intro?.body,
    };
}

// Sub-components

// Reusable section sidebar label, matches the 001/002/003 pattern site-wide
function SectionLabel({ id, label }: { id: string; label: string }) {
    return (
        <div className="border-l-2 border-primary pl-3">
            <p className="text-xs font-semibold text-primary mb-0.5">{id}</p>
            <p className="text-xs font-semibold text-white">{label}</p>
        </div>
    );
}

// Page 

export default async function ProjectDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const project = await getProject(slug);

    if (!project) notFound();

    const allProjects = await client.fetch<Project[]>(PROJECTS_QUERY, {}, options);
    const moreProjects = allProjects.filter((p) => p.slug.current !== slug).slice(0, 5);

    const heroImageUrl = urlFor(project.image)?.width(1600).height(900).url();
    const challengeImages = (project.images ?? []).slice(0, 2);
    const challengesFullImage = project.images?.[2];
    const finalImage = project.images?.[3] ?? project.image;
    const finalImageUrl = urlFor(finalImage)?.width(1600).height(1000).url();

    return (
        <div>
            <Navbar />

            <div className="flex flex-col items-center">
                <div className="max-w-450">

                    {/* Project title */}
                    <div className="pt-32 px-9">
                        <h1
                            className="font-bebas uppercase leading-none"
                            style={{ fontSize: "clamp(4rem, 9vw, 11rem)" }}
                        >
                            {project.title.replace(/\.$/, "")}<span className="text-primary">.</span>
                        </h1>
                    </div>

                    {/* 001 Introduction */}
                    <div className="px-9 pt-12 pb-16">

                        {/* Meta row: sidebar label | meta fields | empty right */}
                        <div className="grid grid-cols-12 gap-8 mb-10">

                            {/* Sidebar */}
                            <div className="col-span-12 md:col-span-4">
                                <SectionLabel id="001" label="Introduction" />
                            </div>

                            {/* Meta fields: Client / Timeline / Year stacked */}
                            <div className="col-span-12 md:col-span-8 flex flex-col gap-3">
                                {[
                                    ["client", project.client],
                                    ["timeline", project.timeline],
                                    ["year", project.year],
                                ]
                                    .filter(([, val]) => val)
                                    .map(([key, val]) => (
                                        <div key={key} className="grid grid-cols-2 items-baseline border-b border-white/10 pb-3">
                                            <p className="text-grey text-xs capitalize">{key}</p>
                                            <p className="text-white text-sm font-medium text-right">{val}</p>
                                        </div>
                                    ))}

                                {/* Headline */}
                                {(project.intro?.heading || project.intro?.body) && (
                                    <div className="pt-12">
                                        {project.intro?.heading && (
                                            <h2
                                                className="text-white font-semibold leading-snug mb-6"
                                                style={{ fontSize: "clamp(1.2rem, 2vw, 1.75rem)" }}
                                            >
                                                {project.intro.heading}
                                            </h2>
                                        )}
                                        {project.intro?.body && (
                                            <p className="text-grey text-sm leading-relaxed mb-6 max-w-2xl">
                                                {project.intro.body}
                                            </p>
                                        )}
                                        {/* Live project link */}
                                        {project.liveUrl && (
                                            <a
                                                href={project.liveUrl}
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
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* Hero image, full-width, light bg panel */}
                    {heroImageUrl && (
                        <div className="flex items-center justify-center py-16 px-9">
                            <img
                                src={heroImageUrl}
                                alt={`${project.title} hero`}
                                className="max-h-105 w-auto object-contain bg-white/30"
                            />
                        </div>
                    )}

                    {/* 002 Challenges */}
                    {(project.challenges?.heading || project.challenges?.body) && (
                        <div className="px-9 pt-16 pb-12">

                            {/* Sidebar + headline row */}
                            <div className="grid grid-cols-12 gap-8 mb-10">
                                <div className="col-span-12 md:col-span-4">
                                    <SectionLabel id="002" label="Challenges" />
                                </div>
                                <div className="col-span-12 md:col-span-8">
                                    {project.challenges?.heading && (
                                        <h2
                                            className="text-white font-semibold leading-snug mb-4"
                                            style={{ fontSize: "clamp(1.2rem, 2vw, 1.75rem)" }}
                                        >
                                            {project.challenges.heading}
                                        </h2>
                                    )}
                                    {project.challenges?.body && (
                                        <p className="text-grey text-sm leading-relaxed max-w-2xl">
                                            {project.challenges.body}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Two side-by-side challenge images */}
                    {challengeImages.length > 0 && (
                        <div className="grid grid-cols-2 gap-px px-9">
                            {challengeImages.map((img, i) => {
                                const src = urlFor(img)?.width(900).height(700).url();
                                if (!src) return null;
                                return (
                                    <div key={i} className="bg-[#f0f0f0] flex items-center justify-center py-16 px-9">
                                        <img
                                            src={src}
                                            alt={img.alt || `${project.title} mockup ${i + 1}`}
                                            className="max-h-90 w-auto object-contain bg-white/30"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Full-width challenge image */}
                    {challengesFullImage && (
                        <div className="bg-background flex items-center justify-center py-16 px-9 border-t border-white/10">
                            <img
                                src={urlFor(challengesFullImage)?.width(1600).height(900).url() ?? undefined}
                                alt={challengesFullImage.alt || `${project.title} desktop mockup`}
                                className="max-h-105 w-auto object-contain bg-white/30"
                            />
                        </div>
                    )}

                    {/* 003 Results */}
                    {(project.results?.heading || project.results?.body) && (
                        <div className="px-9 pt-16 pb-12">

                            {/* Sidebar + headline row */}
                            <div className="grid grid-cols-12 gap-8 mb-10">
                                <div className="col-span-12 md:col-span-4">
                                    <SectionLabel id="003" label="Results" />
                                </div>
                                <div className="col-span-12 md:col-span-8">
                                    {project.results?.heading && (
                                        <h2
                                            className="text-white font-semibold leading-snug mb-4"
                                            style={{ fontSize: "clamp(1.2rem, 2vw, 1.75rem)" }}
                                        >
                                            {project.results.heading}
                                        </h2>
                                    )}
                                    {project.results?.body && (
                                        <p className="text-grey text-sm leading-relaxed max-w-2xl mb-8">
                                            {project.results.body}
                                        </p>
                                    )}

                                    {/* Stat callouts */}
                                    {!!project.results?.stats?.length && (
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                                            {project.results.stats.map((stat, i) => (
                                                <div key={i}>
                                                    <p className="text-3xl md:text-4xl font-bold text-primary leading-none mb-2">
                                                        {stat.value}
                                                    </p>
                                                    <p className="text-grey text-xs leading-snug">{stat.label}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Final result image, full-width, light bg */}
                    {finalImageUrl && (
                        <div className="flex items-center justify-center py-16 px-9">
                            <img
                                src={finalImageUrl}
                                alt="Final result mockup"
                                className="max-h-120 w-auto object-contain bg-white/30"
                            />
                        </div>
                    )}

                    {/* More projects */}
                    {/*
                Two-column layout: description left (4 cols), project list right (8 cols).
                Each list item is year + project name, separated by bottom borders.
                Hover lifts the title to white.
            */}
                    {moreProjects.length > 0 && (
                        <div className="px-9 pt-24 pb-20">

                            {/* "More projects." heading, full width, massive */}
                            <h2
                                className="text-white font-semibold leading-none mb-20 col-span-12"
                                style={{ fontSize: "clamp(3rem, 7vw, 8rem)" }}
                            >
                                {MORE_PROJECTS_COPY.heading}
                            </h2>

                            <div className="grid grid-cols-12 gap-8">

                                {/* Left: description */}
                                <div className=" col-span-12 md:col-span-4">
                                    <p className="text-grey text-sm leading-relaxed">{MORE_PROJECTS_COPY.description}</p>
                                </div>

                                {/* Right: project list */}
                                <div className="col-span-12 md:col-span-8 flex flex-col">
                                    {moreProjects.map((item) => (
                                        <Link
                                            key={item._id}
                                            href={`/projects/${item.slug.current}`}
                                            className="group grid grid-cols-12 items-center py-5 border-b border-white/10 hover:border-white/30 transition-colors"
                                        >
                                            {/* Year */}
                                            <span className="col-span-2 text-grey text-sm">{item.year}</span>

                                            {/* Project name */}
                                            <span className="col-span-10 text-white font-semibold text-xl group-hover:text-primary transition-colors">
                                                {item.title}
                                            </span>
                                        </Link>
                                    ))}
                                    {/* Closing border */}
                                    <div className="border-b border-white/10" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <LetsTellAStory />
            <Footer />
        </div>
    );
}
