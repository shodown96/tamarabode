// import { createImageUrlBuilder, SanityImageSource } from "@sanity/image-url";
// import { createClient } from "next-sanity";

// export const client = createClient({
//     projectId: '',
//     dataset: "production",
//     apiVersion: "2024-01-01",
//     useCdn: false,
// });

// const { projectId, dataset } = client.config();
// export const urlFor = (source: SanityImageSource) =>
//     projectId && dataset
//         ? createImageUrlBuilder({ projectId, dataset }).image(source)
//         : null;

// // Usage
// // const postImageUrl = post.image
// //     ? urlFor(post.image)?.width(550).height(310).url()
// //     : null;