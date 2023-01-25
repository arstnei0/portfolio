import type { Component } from "solid-js"
import "./BesidesThis.sass"
import { ShiningCard } from "~/components/ui/ShiningCard"
import RustLogo from "~/assets/logo/rust.svg"
import NeovimLogo from "~/assets/logo/neovim.svg"
import SassLogo from "~/assets/logo/sass.svg"
import SpotifyLogo from "~/assets/logo/spotify.webp"
import BasketballImgLight from "~/assets/basketball-light.svg"
import BasketballImgDark from "~/assets/basketball-dark.svg"

export const BesidesThis: Component = () => {
	return (
		<>
			<div id="besides-this">
				<h1>Besides this</h1>
				<div id="bt-grid">
					<div id="rust">
						<ShiningCard>
							<div class="logo">
								<img
									src={RustLogo}
									alt="rust logo"
									width="300px"
								/>
							</div>
							<h1>❤️ Rust ❤️</h1>
						</ShiningCard>
					</div>
					<div id="neovim">
						<ShiningCard>
							<div class="logo">
								<img
									src={NeovimLogo}
									alt="neovim logo"
									height="70%"
									loading="lazy"
								/>
							</div>
							<h1>🎉 Neovim 🎉</h1>
						</ShiningCard>
					</div>
					<div id="sass">
						<ShiningCard>
							<div class="logo">
								<img
									src={SassLogo}
									height="60%"
									alt="sass logo"
									loading="lazy"
								/>
							</div>
							<h1>Sass</h1>
						</ShiningCard>
					</div>
					<div id="more">
						<ShiningCard>
							<h1>🫵 Python, Java, C++, C# 🫵</h1>
							<p>Not using them any more</p>
						</ShiningCard>
					</div>
					<div id="basketball">
						<ShiningCard>
							<div class="logo">
								<img
									src={BasketballImgLight}
									class="lonly"
									height="70%"
									alt="basketball light"
									loading="lazy"
								/>
								<img
									src={BasketballImgDark}
									class="donly"
									height="70%"
									alt="basketball dark"
									loading="lazy"
								/>
							</div>
							<h1>🏀 Basketball 🏀</h1>
						</ShiningCard>
					</div>
					<div id="music">
						<ShiningCard>
							<div class="logo">
								<img
									src={SpotifyLogo}
									alt="spotify logo"
									height="50%"
									loading="lazy"
								/>
							</div>
							<h1>🎧 Music 🎧</h1>
						</ShiningCard>
					</div>
					<div id="info">
						<div id="lang-c">
							<ShiningCard>
								<h1>I also speak Chinese🇨🇳.</h1>
							</ShiningCard>
						</div>
						<div id="hometown">
							<ShiningCard>
								<h1>My hometown is Suzhou, China✈️.</h1>
							</ShiningCard>
						</div>
						<div id="birthday">
							<ShiningCard>
								<h1>My birthday is March 1st🎂.</h1>
							</ShiningCard>
						</div>
						<div id="living">
							<ShiningCard>
								<h1>I am now living in Singapore🇸🇬.</h1>
							</ShiningCard>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
