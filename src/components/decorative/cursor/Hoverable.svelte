<script lang="ts">
	import { onMount } from "svelte"

	export let shadow = true
	export let round = false

	let el: HTMLDivElement

	onMount(() => {
		el?.addEventListener("mouseenter", (e) => {
			// @ts-ignore
			globalThis.cursorEnter?.(el)
		})

		el?.addEventListener("mouseleave", (e) => {
			// @ts-ignore
			globalThis.cursorLeave?.()
			if (el) el.style.transform = `none`
		})
	})
</script>

<div
	class="hoverable"
	data-shadow={`${shadow === undefined ? false : shadow}`}
	data-round={`${round === undefined ? false : round}`}
	bind:this={el}
>
	<slot />
</div>

<style>
	.hoverable {
		display: inline-block;
		transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
	}
</style>
