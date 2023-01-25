import { CollectionEntry } from "astro:content"

export const getTags = (posts: CollectionEntry<"blog">[]) => {
	const tags = {} as Record<string, typeof posts>
	posts.forEach((post) => {
		post.data.tags?.forEach((tag: string) => {
			if (!tags[tag]) tags[tag] = [post]
			else tags[tag].push(post)
		})
	})

	return tags
}
