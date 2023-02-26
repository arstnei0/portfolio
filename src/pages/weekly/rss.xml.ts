import rss from "@astrojs/rss"
import { APIRoute } from "astro"
import { getCollection } from "astro:content"
import { SITE_URL } from "~/config"
import { getUrlFromWeeklySlug } from "~/lib/weekly"

export const prerender = true

export const get: APIRoute = async (context) => {
	const posts = await getCollection("weekly")

	return rss({
		title: "Zihan Weekly",
		description: "A weekl",
		site: SITE_URL,
		items: posts.map((post) => {
			return {
				title: post.data.title,
				pubDate: post.data.date,
				link: `${SITE_URL}${getUrlFromWeeklySlug(post.slug)}`,
			}
		}),
	})
}
