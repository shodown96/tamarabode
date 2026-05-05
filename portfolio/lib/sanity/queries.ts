import { type SanityDocument } from "next-sanity";

export const PROJECTS_QUERY = `*[
  _type == "project"
  && defined(slug.current)
] | order(order asc) {
  _id,
  order,
  title,
  slug,
  category,
  year,
  span,
  image,
  logoIcon,
  client,
  timeline,
  liveUrl,
  intro,
  challenges,
  results,
  images,
  video,
  svgAsset
}`

export const PROJECT_QUERY = `*[
  _type == "project"
  && slug.current == $slug
][0] {
  _id,
  order,
  title,
  slug,
  category,
  year,
  span,
  image,
  logoIcon,
  client,
  timeline,
  liveUrl,
  intro,
  challenges,
  results,
  images,
  video,
  svgAsset
}`

export const QUOTES_QUERY = `*[
  _type == "quote"
] | order(order asc) {
  _id,
  order,
  label,
  text,
  author
}`

// TypeScript types
export type Project = SanityDocument & {
  order: number
  title: string
  slug: { current: string }
  category: string
  year: string
  span: string
  image: { asset: { _ref: string } }
  logoIcon?: { asset: { _ref: string } }
  client?: string
  timeline?: string
  liveUrl?: string
  intro?: { heading: string; body: string }
  challenges?: { heading: string; body: string }
  results?: {
    heading: string
    body: string
    stats: { label: string; value: string }[]
  }
  images?: { asset: { _ref: string }; alt?: string }[]
  video?: { asset: { _ref: string } }
  svgAsset?: { asset: { _ref: string } }
}

export type Quote = SanityDocument & {
  order: number
  label: string
  text: string
  author: string
}

// const options = { next: { revalidate: 30 } }
// const projects = await client.fetch<Project[]>(PROJECTS_QUERY, {}, options)

// export default async function ProjectPage({ params }: { params: { slug: string } }) {
// const project = await client.fetch<Project>(PROJECT_QUERY, { slug: params.slug }, options)

// const quotes = await client.fetch<Quote[]>(QUOTES_QUERY, {}, options)