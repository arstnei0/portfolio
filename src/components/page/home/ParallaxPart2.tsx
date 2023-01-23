import type { Component } from "solid-js"
import { ScrollProgress } from "~/lib/parallex"
import "./ParallaxPart2.sass"
import RocketImg from "~/assets/rocket.svg"
import { isMobile } from "~/lib/isMobile"

const ROCKET_SPEED = isMobile ? 500 : 700
const ROCKET_OFFSET = isMobile ? -300 : 0

export const ParallexPart2: Component = () => {
	return ScrollProgress((props) => {
		return (
			<>
				<div id="speed-matterss">
					<h1>Speed Matters</h1>
					<p
						style={{
							opacity: props.progress + 1,
						}}
					>
						Nobody likes slow websites.
						<br /> I use performant tools to build fast and safe
						websites.
					</p>
					<p
						style={{
							opacity: props.progress + 0.7,
						}}
					>
						Speed doesn't just mean performance.
						<br /> The time needed to build an entire website is
						also essential.
						<br />
						<span
							style={{
								opacity: props.progress + 0.4,
							}}
						>
							I build websites fast along with existing nice
							libraries without breaking anything.
						</span>
					</p>
					<h2>
						Within a short period, a nice and performant website
						will be freshly baked!
					</h2>
					<img
						id="rocket"
						src={RocketImg}
						width={300}
						height={200}
						style={{
							left: `${
								props.progress * ROCKET_SPEED + ROCKET_OFFSET
							}px`,
						}}
						alt="rocket"
					/>
				</div>
			</>
		)
	})
}
