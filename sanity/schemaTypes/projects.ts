import { defineField, defineType } from "sanity"

export const projectSchema = defineType({
    name: "project",
    title: "Project",
    type: "document",
    orderings: [
        {
            title: "Order - Asc",
            name: "orderAsc",
            by: [{ field: "order", direction: "asc" }],
        },
        {
            title: "Order - Desc",
            name: "orderDesc",
            by: [{ field: "order", direction: "desc" }],
        },
    ],
    fields: [
        defineField({
            name: "order",
            title: "Order",
            type: "number",
            description: "Controls the display sequence in the project grid. Lower numbers appear first.",
            validation: (Rule) => Rule.required().integer().min(1),
        }),
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            description: "The project name as it appears on the site. e.g. 'Lightspeed.'",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            description: "URL-safe identifier auto-generated from the title. e.g. 'lightspeed'",
            options: { source: "title" },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "featured",
            title: "Featured",
            type: "boolean",
            description: "Determines if the project gets displayed on the home screen.",
        }),
        defineField({
            name: "category",
            title: "Category",
            type: "string",
            description: "The primary discipline this project falls under.",
            options: {
                list: ["Product Design", "Branding", "Web App", "Mobile", "Engineering"],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "year",
            title: "Year",
            type: "string",
            description: "Displayed with a leading slash on the card. e.g. '/2024'",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "span",
            title: "Grid Span",
            type: "string",
            description: "How many columns this project card occupies in the grid.",
            options: {
                list: [
                    { title: "col-span-1", value: "col-span-1" },
                    { title: "col-span-2", value: "col-span-2" },
                ],
            },
            initialValue: "col-span-1",
        }),
        defineField({
            name: "image",
            title: "Thumbnail Image",
            type: "image",
            description: "The cover image shown on the project card in the grid.",
            options: { hotspot: true },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "logoIcon",
            title: "Logo / Icon",
            type: "image",
            description: "The client's logo or project icon used in the case study header.",
            options: { hotspot: true },
        }),
        defineField({
            name: "client",
            title: "Client",
            type: "string",
            description: "The client or brand name. e.g. 'Lightspeed.'",
        }),
        defineField({
            name: "timeline",
            title: "Timeline",
            type: "string",
            description: "How long the project took. e.g. '6 months'",
        }),
        defineField({
            name: "liveUrl",
            title: "Live Project URL",
            type: "url",
            description: "The public URL of the finished project, if available.",
        }),
        defineField({
            name: "intro",
            title: "Introduction",
            type: "object",
            description: "Section 001 — sets up the project context and goal.",
            fields: [
                defineField({
                    name: "heading",
                    title: "Heading",
                    type: "string",
                    description: "One-sentence summary of the outcome. e.g. 'How Lightspeed transformed their checkout...'",
                }),
                defineField({
                    name: "body",
                    title: "Body",
                    type: "text",
                    rows: 4,
                    description: "2–3 sentences expanding on the brief and partnership context.",
                }),
            ],
        }),
        defineField({
            name: "challenges",
            title: "Challenges",
            type: "object",
            description: "Section 002 — describes the problems the project set out to solve.",
            fields: [
                defineField({
                    name: "heading",
                    title: "Heading",
                    type: "string",
                    description: "One sentence naming the core problem. e.g. 'Lightspeed struggled with a complex checkout...'",
                }),
                defineField({
                    name: "body",
                    title: "Body",
                    type: "text",
                    rows: 4,
                    description: "2–3 sentences detailing the impact of the problem on users and the business.",
                }),
            ],
        }),
        defineField({
            name: "results",
            title: "Results",
            type: "object",
            description: "Section 003 — quantifies the impact of the work.",
            fields: [
                defineField({
                    name: "heading",
                    title: "Heading",
                    type: "string",
                    description: "One sentence leading with the biggest metric win. e.g. 'Conversion rates increased by 55%...'",
                }),
                defineField({
                    name: "body",
                    title: "Body",
                    type: "text",
                    rows: 4,
                    description: "2–3 sentences describing qualitative improvements and longer-term outcomes.",
                }),
                defineField({
                    name: "stats",
                    title: "Stats",
                    type: "array",
                    description: "Key metrics displayed as callouts. e.g. label: 'Conversion rate increase', value: '55%'",
                    of: [
                        {
                            type: "object",
                            fields: [
                                defineField({
                                    name: "label",
                                    title: "Label",
                                    type: "string",
                                    description: "Describes what the number measures. e.g. 'Cart abandonment reduction'",
                                }),
                                defineField({
                                    name: "value",
                                    title: "Value",
                                    type: "string",
                                    description: "The metric itself. e.g. '40%' or '$3.2M'",
                                }),
                            ],
                            preview: {
                                select: { title: "value", subtitle: "label" },
                            },
                        },
                    ],
                }),
            ],
        }),
        defineField({
            name: "images",
            title: "Project Images",
            type: "array",
            description: "Up to 4 mockup or process images shown throughout the case study.",
            of: [
                {
                    type: "image",
                    options: { hotspot: true },
                    fields: [
                        defineField({
                            name: "alt",
                            title: "Alt Text",
                            type: "string",
                            description: "Describes the image for screen readers. e.g. 'Mobile checkout screen'",
                        }),
                    ],
                },
            ],
            validation: (Rule) => Rule.max(4),
        }),
        defineField({
            name: "video",
            title: "Video",
            type: "file",
            description: "Optional project demo or walkthrough video. Accepts mp4, mov, webm.",
            options: { accept: "video/*" },
        }),
        defineField({
            name: "svgAsset",
            title: "SVG Asset",
            type: "image",
            description: "Optional SVG graphic used in place of a video. e.g. an animated logo or diagram.",
        }),
    ],
    preview: {
        select: {
            title: "title",
            subtitle: "category",
            media: "image",
            order: "order",
        },
        prepare({ title, subtitle, media, order }) {
            return {
                title: `${order ? `${order}. ` : ""}${title}`,
                subtitle,
                media,
            }
        },
    },
})