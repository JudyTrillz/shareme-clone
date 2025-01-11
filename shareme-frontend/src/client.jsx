import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: import.meta.env.VITE_SHARE_ME_ID,
  dataset: "production",
  useCdn: true,
  apiVersion: "2025-01-09",
  token: import.meta.env.VITE_SHARE_ME_TOKEN,
  ignoreBrowserTokenWarning: true,
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
