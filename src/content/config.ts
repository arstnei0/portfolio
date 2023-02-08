import { defineCollection } from "astro:content"
import { z } from "zod"

const blogCollection = defineCollection({
	schema: z.object({
		title: z.string(),
		date: z.coerce.date(),
		description: z.string().default("No description."),
		tags: z.array(z.string()).default([]),
		image: z
			.object({
				src: z.string(),
				alt: z.string().default("Blog post cover image"),
			})
			.optional(),
		draft: z.boolean().default(false),
	}),
})

export const collections = {
	blog: blogCollection,
}
