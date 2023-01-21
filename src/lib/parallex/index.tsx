import { createScrollPosition as createScrollPositionPrimitive } from "@solid-primitives/scroll"
import { createEffect, createSignal, onMount } from "solid-js"
import type { Component } from "solid-js"

export type ScrollProgress = number

export const trackScrollProgress = (
	el: HTMLDivElement,
	accesser: (progress: ScrollProgress) => void
) => {
	const windowScrollPosition = globalThis.document
		? createScrollPositionPrimitive()
		: { x: 0, y: 0 }

	createEffect(() => {
		const d = globalThis.document?.documentElement
		if (!d) return

		const scrollPos = windowScrollPosition.y - el.offsetTop
		const pos = parseFloat((scrollPos / el.offsetHeight).toFixed(2))

		accesser(pos)
	})
}

export const createScrollPosition = (el: HTMLDivElement) => {
	const [scrollProgress, setScrollProgress] = createSignal(0)
	trackScrollProgress(el, (progress) => setScrollProgress(progress))

	return scrollProgress
}

export const ScrollProgress = (Comp: Component<{ progress: number }>) => {
	let el: HTMLDivElement = null as unknown as HTMLDivElement
	const [scrollProgress, setScrollProgress] = createSignal(0)

	onMount(() => {
		trackScrollProgress(el, (progress) => setScrollProgress(progress))
	})

	return (
		<div ref={el}>
			<Comp progress={scrollProgress()}></Comp>
		</div>
	)
}
