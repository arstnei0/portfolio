import { Component, createEffect } from "solid-js"
import { ScrollProgress } from "~/lib/parallex"
import "./HomeParallex.sass"

export const HomeParallax: Component = () => {
	return ScrollProgress((props) => {
		createEffect(() => {})

		return (
			<>
				<div id="develop-fast">
					<p
						id="summary"
						style={{
							"letter-spacing": `${props.progress * 2}px`,
						}}
					>
						I develop fast.
					</p>
				</div>
			</>
		)
	})
}
