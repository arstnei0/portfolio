import { Component, JSX, createSignal, onMount } from "solid-js"
import "~/styles/home.sass"
import { Button } from "../ui/Button"
import { HomeParallaxPart1 } from "./home/HomeParallaxPart1"
import { ParallexPart2 } from "./home/ParallaxPart2"
import { Hoverable } from "../decorative/cursor/Cursor"
import { Dialog } from "../ui/Dialog"
import { AGE, EMAIL, EMAIL_URL, GITHUB_URL, TWITTER_URL } from "~/config"
import { FavouriteStacks } from "./home/FavouriteStacks"
import { BesidesThis } from "./home/BesidesThis"
import { trpc } from "~/lib/trpc"

export const IndexPage: Component<{ children: JSX.Element }> = (props) => {
	const [workWithMeOpen, setWorkWithMeOpen] = createSignal(false)

	return (
		<>
			<div id="home-hero">
				<div id="first">
					<div>
						<h1 id="home-hero-text">
							I build <span id="shine-text-1">wonderful</span>
							<br /> and <span id="shine-text-2">
								fantastic
							</span>{" "}
							websites.
						</h1>
						<p id="home-hero-desc">
							Hello! My name is Zihan Chen and I am both a
							designer and a fullstack dev. I am also a {AGE}
							-year-old boy living in Singapore.
						</p>
						<div id="home-hero-actions">
							<Button
								id="work-with-me"
								onClick={() => setWorkWithMeOpen(true)}
							>
								Work with me
							</Button>
							<Dialog
								open={workWithMeOpen()}
								close={() => setWorkWithMeOpen(false)}
								header={<h1>Work with me</h1>}
								content={
									<p id="wwm-contact-me">
										You can contact me through email. My
										email address is{" "}
										<Hoverable>
											<a href={EMAIL_URL}>{EMAIL}</a>
										</Hoverable>
										.
									</p>
								}
							/>
							<Button
								id="read-my-blog"
								onClick={() =>
									(window.location.pathname = "/blog")
								}
							>
								Read my blog
							</Button>
						</div>
					</div>
					<div id="three-d">{props.children}</div>
				</div>

				<HomeParallaxPart1 />
				<ParallexPart2 />

				<FavouriteStacks />

				<BesidesThis />

				<div id="interested-about-me">
					Interested about me?
					<br /> Let's chat on Discord! My discord is{" "}
					<strong>zihan#4186</strong>.<br />
					I'm also mainly active on{" "}
					<Hoverable>
						<a target="_blank" href={TWITTER_URL}>
							Twitter
						</a>
					</Hoverable>{" "}
					and{" "}
					<Hoverable>
						<a target="_blank" href={GITHUB_URL}>
							Github
						</a>
					</Hoverable>
				</div>
			</div>
		</>
	)
}
