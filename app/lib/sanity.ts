// import "server-only";
import { createClient, type ClientConfig, type QueryParams } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

// Sanity client configuration
const config: ClientConfig = {
  projectId: 'cus6brc3',
  dataset: 'production',
  apiVersion: '2022-03-25', // Ensure this is up-to-date
  useCdn: false, // Set to false for real-time data
};

// Create the Sanity client
export const client = createClient(config);

// Set up image URL builder
const builder = imageUrlBuilder(client);

// Helper function to generate image URLs
export function urlFor(source: any) {
  return builder.image(source);
}

// Fetch function with cache tags
export async function sanityFetch<QueryResponse>({
  query,
  qParams = {},
  tags,
}: {
  query: string;
  qParams?: QueryParams;
  tags: string[];
}): Promise<QueryResponse> {
  return client.fetch<QueryResponse>(query, qParams, {
    cache: "force-cache", // Ensure dynamic updates
    next: { tags }, // Tags to manage cache invalidation
  });
}
