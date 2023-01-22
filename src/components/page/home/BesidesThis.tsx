import type { Component } from "solid-js"
import "./BesidesThis.sass"

export const BesidesThis: Component = () => {
	return (
		<>
			<div id="besides-this">
				<h1>Besides this</h1>
				<p>
					I know not only the stacks I mentioned above, but also
					almost all the famous technologies. Here's a list of them:
				</p>
				<ul>
					<li>
						<p>Rust (I love Rust!🦀)</p>
					</li>
					<li>
						<p>Neovim (I use Neovim for most of my projects🚀)</p>
					</li>
					<li>
						<p>
							Python, Java, C++, C# (I'm not using any of them any
							more☹️)
						</p>
					</li>
				</ul>

				<p>
					Other than coding, I like to listen to music🎶 and play
					basketball🏀.
				</p>

				<p>
					My birthday is March 1st. I was borned in 2009. My hometown
					is Suzhou, China. I immigrated to Singapore in July 2022.
					Therefore, I can speak both Chinese and English.
				</p>
			</div>
		</>
	)
}
