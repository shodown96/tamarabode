import Link from "next/link";
import { client } from "@/lib/sanity";
import { FEATURED_PROJECTS_QUERY, PROJECTS_QUERY, type Project } from "@/lib/sanity/queries";
import { ProjectCard } from "./ui";

const SECTION_ID = "002";
const SECTION_LABEL = "Projects";

const HEADING = "Projects.";
const BYLINE = "TAMARA.";
const DESCRIPTION =
  "Real creativity. Tangible results. Discover how we've elevated brands like yours through thoughtful design and seamless development.";

const STAT_DESCRIPTION = "projects delivered with excellence across multiple industries.";

const CTA_LABEL = "View all";

const options = { next: { revalidate: 30 } };

export default async function ProjectsSection() {
  const featured = await client.fetch<Project[]>(FEATURED_PROJECTS_QUERY, {}, options);
  const allProjects = await client.fetch<Project[]>(PROJECTS_QUERY, {}, options);

  // Fall back to the general project list if nothing is marked featured yet.
  const projects = (featured.length ? featured : allProjects).slice(0, 5);

  return (
    <div className="min-h-screen pt-20 px-9">

      {/* Header row */}
      <div className="grid grid-cols-12 items-start mb-12 max-md:gap-8">

        {/* 002 sidebar */}
        <div className="col-span-12 md:col-span-4">
          <div className="border-l-2 border-primary pl-3">
            <p className="text-xs font-semibold text-primary mb-0.5">{SECTION_ID}</p>
            <p className="text-xs font-semibold">{SECTION_LABEL}</p>
          </div>
        </div>

        <div className="col-span-12 md:col-span-3">
          <h2 className="text-5xl md:text-8xl font-bold leading-none mb-3">{HEADING}</h2>
          <p className="text-sm font-bold tracking-[0.3em] text-grey uppercase">
            TAMARA<span className="text-primary">.</span>
          </p>
        </div>

          {/* Right description: aligns to far right */}
          <div className="col-span-12 md:col-span-5 pt-3 md:text-right">
          <p className="text-xs text-grey leading-relaxed md:pl-30">{DESCRIPTION}</p>
        </div>
      </div>

      {/* Project grid */}
      {/*
        Layout: 2-column grid. Rows 1 & 2 are two equal cards side-by-side.
        Row 3: left = project card, right = stat block + CTA button.
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10">

        {/* Cards 1 to 4: standard project cards */}
        {projects.slice(0, 4).map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}

        {/* Card 5: bottom-left */}
        {projects[4] && <ProjectCard project={projects[4]} />}

        {/* Bottom-right: stat + CTA block */}
        <div className="bg-background flex flex-col justify-between max-md: pt-10 md:p-10">
          {/* Stat */}
          <div className="mb-4">
            <p className="text-8xl font-bold leading-none">
              {allProjects.length}<span className="text-primary text-5xl font-bold">+</span>
            </p>
            <p className="text-2xl mt-4 leading-snug">
              <span className="font-bold text-white">projects</span>{" "}
              <span className="text-grey">{STAT_DESCRIPTION}</span>
            </p>
          </div>

          {/* View all CTA */}
          <Link
            href="/projects"
            className="w-full bg-primary hover:bg-primary/90 transition-colors text-white font-semibold py-5 px-8 flex items-center justify-center gap-3 text-sm tracking-wide"
          >
            {CTA_LABEL}
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 12L12 2M12 2H5M12 2V9"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

      </div>
    </div>
  );
}
