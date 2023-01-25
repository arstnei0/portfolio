import { customElement } from "solid-element"
import { Hoverable } from "~/components/decorative/cursor/Cursor"

const getBoolProp = (str: string | undefined) =>
	str === undefined ? undefined : str !== "false"

const style = `.hoverable {
    display: inline-block;
    transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
    color: var(--5);
    padding-left: .5em;
    padding-right: .5em;
}`

export default () =>
	customElement(
		"z-hoverable",
		{ shadow: undefined, round: undefined },
		($, _options) => {
			return (
				<>
					<style>{style}</style>
					<Hoverable {...$}>
						<slot />
					</Hoverable>
				</>
			)
		}
	)
