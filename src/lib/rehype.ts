import { RehypePlugins } from "astro"
import { map } from "unist-util-map"
import { u } from "unist-builder"
import rehypeSlug from "rehype-slug"

export const rehypePlugins = [
	rehypeSlug,
	() => (tree) => {
		return map(tree, (node) => {
			if (node.type === "element") {
				if (node.tagName === "a") {
					return u(
						"element",
						{
							tagName: "z-hoverable",
						},
						[node]
					)
				} else if (node.tagName.startsWith("h")) {
					const child = node.children[0]
					if (child.type === "text") {
						const props = {
							level: parseInt(node.tagName.charAt(1)),
							content: child.value,
							slug: node.properties?.id,
							id: node.properties?.id,
						}

						return u("element", {
							tagName: "z-heading",
							properties: props,
						})
					}
				}
			}

			return node
		})
	},
] as RehypePlugins
