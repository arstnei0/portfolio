import { Component, JSX, createEffect, createSignal, onMount } from "solid-js"
import "./shiningCard.sass"
import {
	createMousePosition,
	createPositionToElement,
} from "@solid-primitives/mouse"

const mouse = import.meta.env.SSR
	? { x: 0, y: 0, isInside: false, sourceType: null }
	: createMousePosition(window)

export const ShiningCard: Component<{ children: JSX.Element }> = (props) => {
	let scEl: HTMLDivElement = null as unknown as HTMLDivElement
	const [el, setEl] = createSignal<HTMLDivElement | undefined>(undefined)
	const relativePos = createPositionToElement(el, () => mouse)
	onMount(() => setEl(scEl))

	return (
		<>
			<div
				class="sc-wrap"
				ref={scEl}
				style={{
					"--c-x": `${relativePos.x}px`,
					"--c-y": `${relativePos.y}px`,
				}}
			>
				<div class="sc">{props.children}</div>
				<div class="sc-bg"></div>
				<div class="sc-highlight"></div>
			</div>
		</>
	)
}
