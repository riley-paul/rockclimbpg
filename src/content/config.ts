import { z, reference, defineCollection } from "astro:content";

const climbingAreas = defineCollection({
  type: "content",
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
  type: "content",
  schema: z.object({
    title: z.string(),
    area: reference("climbingAreas"),
  }),
});

export const collections = { climbingAreas, climbingRoutes };
