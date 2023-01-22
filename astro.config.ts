import { defineConfig } from "astro/config"
import solidJs from "@astrojs/solid-js"
import sitemap from "@astrojs/sitemap"
import { SITE_URL } from "./src/config"

// https://astro.build/config
export default defineConfig({
	integrations: [solidJs(), sitemap()],
	site: SITE_URL,
})
