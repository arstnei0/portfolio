import type { Component } from "solid-js"
import "~/styles/home.sass"
import { Button } from "../ui/Button"
import { HomeParallax } from "./HomeParallax"
import { Hoverable } from "../decorative/cursor/Cursor"

export const IndexPage: Component = () => {
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
					fullstack dev.
				</p>
				<div id="home-hero-actions">
					<Button id="work-with-me">Work with me</Button>
					<Button id="more-about-me">More about me</Button>
				</div>
				<HomeParallax />
				<div id="thats-a-wrap">
					<h1>That's a wrap!</h1>
				</div>
				<div id="interested-about-me">
					Interested about me?
					<br /> Let's chat on Discord! My discord is{" "}
					<strong>zihan#4186</strong>.<br />
					I'm also mainly active on{" "}
					<Hoverable>
						<a target="_blank" href="https://twitter.com/zihanch">
							Twitter
						</a>
					</Hoverable>{" "}
					and{" "}
					<Hoverable>
						<a target="_blank" href="https://github.com/zihan-ch">
							Github
						</a>
					</Hoverable>
				</div>
			</div>
		</>
	)
}
