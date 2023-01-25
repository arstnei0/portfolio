import { customElement } from "solid-element"
import { Dynamic } from "solid-js/web"

// @ts-ignore
const style = HEADING_STYLE

const scroll = () =>
	document
		.getElementById(window.location.hash.slice(1))
		?.scrollIntoView({ behavior: "smooth" })

;(globalThis as any).scrollToThePos = scroll

export default () =>
	customElement(
		"z-heading",
		{
			level: 1,
			content: "",
			slug: "",
		},
		(props, _options) => {
			return (
				<>
					<style>{style}</style>
					<div class="hw">
						<Dynamic component={`h${props.level}`} id={props.slug}>
							{props.content}
						</Dynamic>
						<a
							class="ha"
							onClick={() => {
								window.location.hash = props.slug
								scroll()
							}}
						>
							{/* @ts-ignore */}
							<z-hoverable round="true">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="1em"
									height="1em"
									viewBox="0 0 256 256"
								>
									<path
										fill="currentColor"
										d="m85.6 153.4l67.9-67.8a12 12 0 0 1 16.9 16.9l-67.9 67.9a12 12 0 0 1-16.9 0a12 12 0 0 1 0-17Zm50.9 17l-28.3 28.3a36 36 0 0 1-50.9-50.9l28.3-28.3a12 12 0 0 0 0-17a12.2 12.2 0 0 0-17 0l-28.3 28.3a60 60 0 0 0 84.9 84.9l28.2-28.3a12 12 0 0 0 0-17a11.9 11.9 0 0 0-16.9 0Zm79.2-130.1a60.1 60.1 0 0 0-84.9 0l-28.3 28.3a12.2 12.2 0 0 0 0 17a12 12 0 0 0 17 0l28.3-28.3a36 36 0 1 1 50.9 50.9l-28.3 28.3a12.1 12.1 0 0 0 8.5 20.5a11.7 11.7 0 0 0 8.5-3.6l28.3-28.2a60 60 0 0 0 0-84.9Z"
									></path>
								</svg>
								{/* @ts-ignore */}
							</z-hoverable>
						</a>
					</div>
				</>
			)
		}
	)

window.addEventListener("load", scroll)
