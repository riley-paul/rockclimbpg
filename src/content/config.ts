import { z, defineCollection } from "astro:content";

const areas = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = { areas };
