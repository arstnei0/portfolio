import { Component, onMount } from "solid-js"
import Swiper, { Pagination, EffectCards, Autoplay } from "swiper"
import "swiper/css"
import "./FavouriteStacks.sass"
import "swiper/css/pagination"
import "swiper/css/effect-cards"
import AstroLogoLight from "~/assets/logo/astro-light.svg"
import AstroLogoDark from "~/assets/logo/astro-dark.svg"
import SolidLogo from "~/assets/logo/solid.svg"
import TRPCLogo from "~/assets/logo/trpc.svg"
import PrismaLogo from "~/assets/logo/prisma.svg"
import { isMobile } from "~/lib/isMobile"

export const FavouriteStacks: Component = () => {
	onMount(() => {
		const swiper = new Swiper(".swiper", {
			spaceBetween: 16,
			modules: [Pagination, ...(isMobile ? [] : [EffectCards])],

			centeredSlides: true,

			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			...(isMobile ? {} : { effect: "cards" }),
		})
	})

	const LOGO_SIZE = 120

	return (
		<>
			<div id="favourite-stacks">
				<h1>My favourite stacks</h1>
				<div class="swiper">
					<div class="swiper-wrapper">
						<div class="swiper-slide" id="astro">
							<div class="slide-inner">
								<img
									class="lonly"
									src={AstroLogoLight}
									width={LOGO_SIZE}
									height={LOGO_SIZE}
									alt="astro logo light"
								/>
								<img
									class="donly"
									src={AstroLogoDark}
									width={LOGO_SIZE}
									height={LOGO_SIZE}
									alt="astro logo dark"
								/>
								<h1>
									<a href="https://astro.build">Astro</a>
								</h1>

								<p>
									Astro allows me to build performant websites
									fast without struggling! I can easily
									integrate my favourite tools or libraries
									into Astro.
									<br />
									BTW, this website is just built with Astro!
								</p>
							</div>
						</div>

						<div class="swiper-slide" id="solid">
							<div class="slide-inner">
								<img
									src={SolidLogo}
									width={LOGO_SIZE}
									height={LOGO_SIZE}
									alt="solid logo"
								/>
								<h1>
									<a href="https://solidjs.com">Solid</a>
								</h1>

								<p>
									Solid has the best performance and the
									fine-grained reactivity. With Solid, I can
									build the most performant UI easily. <br />
									This site is also powered by Solid!
								</p>
							</div>
						</div>

						<div class="swiper-slide" id="trpc">
							<div class="slide-inner">
								<img
									src={TRPCLogo}
									width={LOGO_SIZE}
									height={LOGO_SIZE}
									alt="trpc logo"
								/>
								<h1>
									<a href="https://trpc.io">tRPC</a>
								</h1>

								<p>
									tRPC provides End-to-End typesafety and
									gives us the experience of the full power of
									TypeScript to boost productivity to our
									fullstack applications. Long live
									typesafety!
								</p>
							</div>
						</div>

						<div class="swiper-slide" id="prisma">
							<div class="slide-inner">
								<img
									src={PrismaLogo}
									width={LOGO_SIZE}
									height={LOGO_SIZE}
									alt="prisma logo"
								/>
								<h1>
									<a href="https://prisma.io">Prisma</a>
								</h1>

								<p>
									Thank god, I don't need to write SQL any
									more with Prisma! Define a schema of your
									data, and then Prisma will generate a fully
									typesafe TypeScript API for you! Prisma +
									tRPC = Super Typesafe!
								</p>
							</div>
						</div>
					</div>

					<div class="swiper-pagination"></div>
				</div>
			</div>
		</>
	)
}
