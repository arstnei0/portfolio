import { Component, createEffect, onMount } from "solid-js"
import { ScrollProgress } from "~/lib/parallex"
import "./HomeParallexPart1.sass"
import "atropos/css"
import { Atropos } from "atropos"
import { Hoverable } from "../decorative/cursor/Cursor"
import Peep11 from "~/assets/peep-11.png"
import Peep34 from "~/assets/peep-34.png"
import Peep12 from "~/assets/peep-12.png"

export const HomeParallaxPart1: Component = () => {
	return ScrollProgress((props) => {
		onMount(() => {
			const ibeaInstance = Atropos({
				el: ".ibae",
				duration: 400,
				shadow: false,
			})
		})

		return (
			<>
				<div class="atropos ibae">
					<div class="atropos-scale">
						<div class="atropos-rotate">
							<div class="atropos-inner">
								<div id="title-p1">I create</div>
								<div
									id="title-p2"
									data-atropos-offset="15"
									style={{
										"font-size": `${
											props.progress * 100 + 170
										}px`,
									}}
								>
									amazing
								</div>
								<div id="title-p3">effects</div>

								<div data-atropos-offset="-20" id="peep-11">
									<img src={Peep11} />
								</div>
								<img
									id="peep-34"
									src={Peep34}
									data-atropos-offset="-10"
								/>
								<div
									data-atropos-offset="15"
									id="peep-12"
									style={{
										left: `${props.progress * 600 + 400}px`,
									}}
								>
									<img src={Peep12} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		)
	})
}
