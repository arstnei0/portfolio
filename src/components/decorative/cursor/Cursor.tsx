import {
	Component,
	createEffect,
	createMemo,
	createSignal,
	JSX,
	onMount,
} from "solid-js"
import { Portal } from "solid-js/web"
import "./Cursor.scss"

const OFFSET = 6

export const Cursor: Component = () => {
	const [hoveringEl, setHoveringEl] = createSignal<HTMLDivElement | null>(
		null
	)
	const [offsetX, setOffsetX] = createSignal(0)
	const [offsetY, setOffsetY] = createSignal(0)
	const [mouseX, setMouseX] = createSignal(0)
	const [mouseY, setMouseY] = createSignal(0)
	const [pressing, setPressing] = createSignal(false)

	if (globalThis.document) {
		document.addEventListener("mousemove", (e) => {
			setMouseX(e.clientX)
			setMouseY(e.clientY)
		})

		document.addEventListener("mousedown", () => {
			setPressing(true)
		})

		document.addEventListener("mouseup", () => {
			setPressing(false)
		})

		// @ts-ignore
		globalThis.cursorEnter = (el: HTMLDivElement) => {
			setHoveringEl(el)
			setOffsetY(0)
			setOffsetX(0)
		}

		// @ts-ignore
		globalThis.cursorLeave = () => {
			setHoveringEl(null)
			setOffsetY(0)
			setOffsetX(0)
		}
	}

	const round = createMemo(() => hoveringEl()?.dataset?.round === "true")
	const hoveringElX = createMemo(() => {
		const hel = hoveringEl()
		if (!hel) return null
		return hel?.offsetLeft + hel.offsetWidth / 2
	})
	const hoveringElY = createMemo(() => {
		const hel = hoveringEl()
		if (!hel) return null
		const rect = hel.getBoundingClientRect()
		return rect.top + rect.height / 2
	})

	const yString = createMemo(() => `${hoveringElY() ?? mouseY()}px`)
	const xString = createMemo(() => `${hoveringElX() ?? mouseX()}px`)

	const isHovering = createMemo(() => !!hoveringEl())
	const width = createMemo(() =>
		hoveringEl()?.dataset.shadow === "false"
			? `0px`
			: round()
			? height()
			: `${
					hoveringEl()?.clientWidth
						? (hoveringEl()?.clientWidth as any) * 1.3
						: 20
			  }px`
	)
	const height = createMemo(() =>
		hoveringEl()?.dataset.shadow === "false"
			? `0px`
			: `${
					hoveringEl()?.clientHeight
						? (hoveringEl()?.clientHeight as any) * 1.3
						: 20
			  }px`
	)

	const transformStyle = createMemo(
		() => `translate(${offsetX() * 1.3}px, ${offsetY() * 1.3}px)`
	)

	createEffect(() => {
		const hoveringElement = hoveringEl()
		const x = mouseX()
		const y = mouseY()
		if (hoveringElement) {
			const rect = hoveringElement.getBoundingClientRect()
			setOffsetX(
				() =>
					(x -
						hoveringElement.offsetLeft -
						hoveringElement.offsetWidth / 2) /
					OFFSET
			)
			setOffsetY(() => (y - rect.top - rect.height / 2) / OFFSET)
		}
	})
	createEffect(() => {
		const hoveringElement = hoveringEl()
		if (hoveringElement) {
			hoveringElement.style.transform = `translate(${offsetX()}px, ${offsetY()}px)`
		}
	})

	return (
		<Portal mount={document.body}>
			<div id="custom-cursor">
				<div
					id="cursor"
					style={{
						top: yString(),
						left: xString(),
						width: width(),
						height: height(),
						transform: transformStyle(),
					}}
					classList={{
						pressing: pressing(),
						hovering: isHovering(),
					}}
				>
					<div id="cursor-content-wrap">
						<div
							id="cursor-content"
							classList={{
								round: round(),
							}}
						></div>
					</div>
				</div>
				<div id="cursor-highlight"></div>
			</div>
		</Portal>
	)
}

export const Hoverable: Component<{
	children: JSX.Element
	shadow?: boolean
	round?: boolean
}> = (props) => {
	let el: HTMLDivElement | null = null

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

	return (
		<div
			class="hoverable"
			ref={el as unknown as HTMLDivElement}
			data-shadow={`${props.shadow === undefined ? true : false}`}
			data-round={`${props.round === undefined ? false : props.round}`}
		>
			{props.children}
		</div>
	)
}
