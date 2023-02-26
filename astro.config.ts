import { defineConfig } from "astro/config"
import solidJs from "@astrojs/solid-js"
import sitemap from "@astrojs/sitemap"
import compress from "astro-compress"
import { SITE_URL } from "./src/config"
import { rehypePlugins } from "./src/lib/rehype"
import HEADING_STYLE from "./src/styles/heading.css?raw"
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin"
import mdx from "@astrojs/mdx"
import vercel from "@astrojs/vercel/serverless"
import svelte from "@astrojs/svelte"

// https://astro.build/config
export default defineConfig({
	integrations: [
		solidJs(),
		sitemap(),
		compress({
			css: false,
		}),
		mdx(),
		svelte(),
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
		plugins: [vanillaExtractPlugin()],
	},
	markdown: {
		shikiConfig: {
			theme: "dracula",
		},
		rehypePlugins: rehypePlugins,
	},
	output: "server",
	adapter: vercel(),
})
