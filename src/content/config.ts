import { z, reference, defineCollection } from "astro:content";

const climbingAreas = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    distance: z.string().optional(),
    nearest_town: z.string().optional(),
    hike_duration: z.string().optional(),
    height: z.string().optional(),
    type: z.string().optional(),
    climbs: z.string().optional(),
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
