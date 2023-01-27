import {
	Component,
	createComputed,
	createEffect,
	createMemo,
	onMount,
} from "solid-js"
import { ScrollProgress } from "~/lib/parallex"
import "./ParallaxPart2.sass"
import RocketImg from "~/assets/rocket.webp"
import LighthouseImg from "~/assets/lighthouse.webp"
import ResponsiveImg from "~/assets/responsive.webp"
import { isMobile } from "~/lib/isMobile"

const ROCKET_SPEED = isMobile ? 500 : 700
const ROCKET_OFFSET = isMobile ? -300 : 0

export const ParallexPart2: Component = () => {
	return ScrollProgress((props) => {
		const rotate = createMemo(() => `rotate(${props.progress * 50}deg)`)
		const scale = createMemo(() => `scale(${props.progress * 0.6 + 1})`)
		const transform = createMemo(() => `${scale()} ${rotate()}`)
		const display = createMemo(() => props.progress >= -3)

		return (
			<>
				<div id="speed-matters-wrap">
					<div
						id="speed-matterss"
						style={{
							transform: transform(),
							display: display() ? "block" : "none",
						}}
					>
						<div id="show-grid">
							<div id="lighthouse">
								<img
									src={LighthouseImg}
									alt="lighthouse image"
								></img>
							</div>

							<div id="rocket">
								<img src={RocketImg} alt="rocket image"></img>
							</div>

							<div id="responsive">
								<img
									src={ResponsiveImg}
									alt="responsive web design image"
								/>
							</div>

							<div id="dark-mode">
								<h2>Clean code</h2>
							</div>

							<div id="ux">
								<h1>UX</h1>
							</div>
						</div>
					</div>
				</div>
			</>
		)
	})
}
