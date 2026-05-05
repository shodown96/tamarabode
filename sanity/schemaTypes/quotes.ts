// schemas/quote.js
import { defineField, defineType } from "sanity"

export const quoteSchema = defineType({
    name: "quote",
    title: "Quote",
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
            description: "Controls the sequence quotes are cycled through on the site. Lower numbers appear first.",
            validation: (Rule) => Rule.required().integer().min(1),
        }),
        defineField({
            name: "label",
            title: "Label",
            type: "string",
            description: "The section heading this quote appears under. e.g. 'Stay Motivated'",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "text",
            title: "Quote Text",
            type: "text",
            rows: 3,
            description: "The full quote body, without quotation marks.",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "author",
            title: "Author",
            type: "string",
            description: "The person the quote is attributed to. e.g. 'Kevin Hart'",
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: "author",
            subtitle: "text",
            order: "order",
        },
        prepare({ title, subtitle, order }) {
            return {
                title: `${order ? `${order}. ` : ""}${title}`,
                subtitle: subtitle?.length > 60 ? `${subtitle.slice(0, 60)}…` : subtitle,
            }
        },
    },
})