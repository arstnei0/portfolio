import type { Component, JSX } from "solid-js"
import { Show } from "solid-js"
import { Portal } from "solid-js/web"
import { Backdrop } from "../Backdrop"
import "./dialog.scss"

export const Dialog: Component<{
	open: boolean
	close: () => void
	header?: JSX.Element
	content?: JSX.Element
	footer?: JSX.Element
}> = (props) => {
	let dialogDom: HTMLDivElement = undefined as unknown as HTMLDivElement
	dialogDom = null as unknown as HTMLDivElement

	return (
		<Show when={props.open}>
			<Portal mount={document.body}>
				<Backdrop />
				<div
					class="dialog-root"
					onClick={() => {
						if (!dialogDom.matches(":hover")) {
							props.close()
						}
					}}
				>
					<div class="dialog-container">
						<div role="dialog" class="dialog" ref={dialogDom}>
							<div class="dialog-header">{props.header}</div>
							<div class="dialog-content">{props.content}</div>
							<div class="dialog-footer">{props.footer}</div>
						</div>
					</div>
				</div>
			</Portal>
		</Show>
	)
}
