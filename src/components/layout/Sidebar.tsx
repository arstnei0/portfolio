import {
	Component,
	For,
	JSX,
	createSignal,
	Show,
	onMount,
	createEffect,
} from "solid-js"
import "./Sidebar.sass"
import { Dynamic } from "solid-js/web"

const SHOW_SIDEBAR = "ss"

const Sidebar: Component<{
	headings: { depth: number; slug: string; text: string }[]
}> = (props) => {
	let memo = localStorage.getItem(SHOW_SIDEBAR)
	if (!memo) {
		localStorage.setItem(SHOW_SIDEBAR, "true")
		memo = "true"
	}

	const [showSidebar, setShowSidebar] = createSignal(memo === "true")

	const toggle = () => {
		setShowSidebar((show) => !show)
		if (showSidebar()) {
			localStorage.setItem(SHOW_SIDEBAR, "true")
		} else {
			localStorage.setItem(SHOW_SIDEBAR, "false")
		}
	}

	createEffect(() => {
		console.log(showSidebar())
	})

	return (
		<Show when={props.headings && props.headings.length > 0}>
			<Show
				when={showSidebar()}
				fallback={
					<div class="toggle-sidebar">
						<svg
							id="show-sidebar-button"
							onClick={toggle}
							width="32"
							height="32"
							viewBox="0 0 24 24"
						>
							<path
								fill="currentColor"
								d="M14.71 6.71a.996.996 0 0 0-1.41 0L8.71 11.3a.996.996 0 0 0 0 1.41l4.59 4.59a.996.996 0 1 0 1.41-1.41L10.83 12l3.88-3.88c.39-.39.38-1.03 0-1.41z"
							/>
						</svg>
					</div>
				}
			>
				<aside id="sidebar">
					<div class="toggle-sidebar">
						<svg
							id="hide-sidebar"
							onClick={toggle}
							width="32"
							height="32"
							viewBox="0 0 24 24"
						>
							<path
								fill="currentColor"
								d="M9.29 6.71a.996.996 0 0 0 0 1.41L13.17 12l-3.88 3.88a.996.996 0 1 0 1.41 1.41l4.59-4.59a.996.996 0 0 0 0-1.41L10.7 6.7c-.38-.38-1.02-.38-1.41.01z"
							/>
						</svg>
					</div>
					<div id="headings">
						<For each={props.headings}>
							{(heading) => {
								return (
									<div class="heading">
										<Dynamic
											component={`h${heading.depth}`}
										>
											<a href={`#${heading.slug}`}>
												{heading.text}
											</a>
										</Dynamic>
									</div>
								)
							}}
						</For>
					</div>
				</aside>
			</Show>
		</Show>
	)
}

export default Sidebar
