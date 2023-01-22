import { SITE_URL } from "~/config"

export const get = async () => ({
	body: `
User-agent: *
Allow: /
Sitemap: ${SITE_URL}/sitemap-index.xml
`,
})
