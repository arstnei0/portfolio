import type { Component, JSX } from "solid-js"
import "./button.scss"
import { Hoverable } from "~/components/decorative/cursor/Cursor"

export const Button: Component<JSX.HTMLAttributes<"button">> = (props) => {
	return (
		<>
			<Hoverable>
				<button {...(props as any)}>{props.children}</button>
			</Hoverable>
		</>
	)
}
