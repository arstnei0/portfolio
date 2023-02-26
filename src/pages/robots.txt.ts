import { SITE_URL } from "~/config"

export const prerender = true

export const get = async () => ({
	body: `
User-agent: *
Allow: /
Sitemap: ${SITE_URL}/sitemap-index.xml
`,
})
