import { z, defineCollection } from "astro:content";

const areas = defineCollection({
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

export const collections = { areas };
