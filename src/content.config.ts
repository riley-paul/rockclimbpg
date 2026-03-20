import { reference, defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const climbingAreas = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/climbingAreas" }),
  schema: z.object({
    title: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    distance_km: z.number(),
    distance_time: z.string(),
    nearest_town: z.string().nullable(),
    hike_duration: z.string().nullable(),
    height: z.string().nullable(),
    type: z.string().nullable(),
    climbs: z.string().nullable(),
  }),
});

const climbingRoutes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/climbingRoutes" }),
  schema: z.object({
    title: z.string(),
    area: reference("climbingAreas"),
  }),
});

export const collections = { climbingAreas, climbingRoutes };
