import { RehypePlugins } from "astro"
import { map } from "unist-util-map"
import { u } from "unist-builder"
import rehypeSlug from "rehype-slug"
import { visit } from "unist-util-visit"

export const rehypePlugins = [
	rehypeSlug,
	() => (tree) => {
		tree.children.forEach((child, i) => {
			if (!(child.type === "raw")) return
			if (
				!(
					child.value.includes("pre") &&
					child.value.includes("astro-code") &&
					child.value.includes(
						'style="background-color: #282A36; overflow-x: auto;"'
					)
				)
			)
				return
			;(tree.children[i] as any).value =
				'<div class="code">' + child.value + "</div>"
		})

		visit(tree, "element", (node, index, parent): any => {
			if (index !== null && parent && node.type === "element") {
				if (node.tagName.startsWith("h")) {
					const child = node.children[0]
					if (child && child.type === "text") {
						const props = {
							level: parseInt(node.tagName.charAt(1)),
							content: child.value,
							slug: node.properties?.id,
							id: node.properties?.id,
						}

						if (!node.properties) node.properties = {}
						node.properties.class = "nd"

						parent.children.splice(
							index,
							0,
							u("element", {
								tagName: "z-heading",
								properties: props,
							}) as any
						)

						return index + 2
					}
				} else if (node.tagName === "a") {
					// const newNode = u(
					// 	"element",
					// 	{
					// 		tagName: "z-hoverable",
					// 	},
					// 	[node]
					// )
					const oldNode = JSON.parse(JSON.stringify(node))
					node.children = [oldNode]
					node.tagName = "z-hoverable"
					return "skip"
				}
			}
			// return true
		})
	},
] as RehypePlugins
