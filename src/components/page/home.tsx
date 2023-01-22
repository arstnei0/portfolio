import { Component, createSignal } from "solid-js"
import "~/styles/home.sass"
import { Button } from "../ui/Button"
import { HomeParallaxPart1 } from "./home/HomeParallaxPart1"
import { Hoverable } from "../decorative/cursor/Cursor"
import { Dialog } from "../ui/Dialog"
import { AGE, EMAIL, EMAIL_URL, GITHUB_URL, TWITTER_URL } from "~/config"
import { FavouriteStacks } from "./home/FavouriteStacks"

export const IndexPage: Component = () => {
	const [workWithMeOpen, setWorkWithMeOpen] = createSignal(false)
	return (
		<>
			<div id="home-hero">
				<h1 id="home-hero-text">
					I build <span id="shine-text-1">wonderful</span>
					<br /> and <span id="shine-text-2">fantastic</span>{" "}
					websites.
				</h1>
				<p id="home-hero-desc">
					Hello! My name is Zihan Chen and I am both a designer and a
					fullstack dev. I am also a {AGE}-year-old boy living in
					Singapore.
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
								You can contact me through email. My email
								address is{" "}
								<Hoverable>
									<a href={EMAIL_URL}>{EMAIL}</a>
								</Hoverable>
								.
							</p>
						}
					/>

					<Button id="more-about-me">More about me</Button>
				</div>

				<HomeParallaxPart1 />

				<FavouriteStacks />

				<div id="thats-a-wrap">
					<h1>That's a wrap!</h1>
				</div>
				<div id="interested-about-me">
					Interested about me?
					<br /> Let's chat on Discord! My discord is{" "}
					<strong>zihan#4186</strong>.<br />
					I'm also mainly active on{" "}
					<Hoverable>
						<a target="_blank" href={GITHUB_URL}>
							Twitter
						</a>
					</Hoverable>{" "}
					and{" "}
					<Hoverable>
						<a target="_blank" href={TWITTER_URL}>
							Github
						</a>
					</Hoverable>
				</div>
			</div>
		</>
	)
}
