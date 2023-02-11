import { CollectionEntry } from "astro:content"
import dayjs from "dayjs"

export const getUrlFromWeeklySlug = (slug: string) => `/weekly/${slug}`

export const sortWeekly = (posts: CollectionEntry<"weekly">[]) =>
	posts.sort((a, b) =>
		dayjs(a.data.date).isBefore(dayjs(b.data.date)) ? 1 : -1
	)

export const filterWeekly = (posts: CollectionEntry<"weekly">[]) =>
	import.meta.env.DEV ? posts : posts.filter((post) => !post.data.draft)
