import { CollectionEntry } from "astro:content"
import dayjs from "dayjs"

export const getUrlFromPostSlug = (slug: string) => `/post/${slug}`

export const getDateString = (date: Date) => dayjs(date).format("D MMM, YYYY")

export const sortPosts = (posts: CollectionEntry<"blog">[]) =>
	posts.sort((a, b) =>
		dayjs(a.data.date).isBefore(dayjs(b.data.date)) ? 1 : -1
	)

export const filterPosts = (posts: CollectionEntry<"blog">[]) =>
	import.meta.env.DEV ? posts : posts.filter((post) => !post.data.draft)
