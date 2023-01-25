import { defineConfig } from "astro/config"
import solidJs from "@astrojs/solid-js"
import sitemap from "@astrojs/sitemap"
import compress from "astro-compress"
import { SITE_URL } from "./src/config"
import { rehypePlugins } from "./src/lib/rehype"
import HEADING_STYLE from "./src/styles/heading.css?raw"

// https://astro.build/config
export default defineConfig({
	integrations: [
		solidJs(),
		sitemap(),
		compress({
			css: false,
		}),
	],
	site: SITE_URL,
	vite: {
		build: {
			sourcemap: true,
		},
		resolve: {
			alias: {
				style: "/src/styles/imports.sass",
			},
		},
		define: {
			HEADING_STYLE: `\`${HEADING_STYLE}\``,
		},
	},
	markdown: {
		shikiConfig: {
			theme: "dracula",
		},
		rehypePlugins: rehypePlugins,
	},
})
