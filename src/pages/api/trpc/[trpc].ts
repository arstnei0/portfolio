import { createContext } from "~/server/trpc/context"
import { appRouter } from "~/server/trpc/app"
import { fetchRequestHandler } from "@trpc/server/adapters/fetch"
import { APIRoute } from "astro"

const hander: APIRoute = async (ctx) => {
	const result = await fetchRequestHandler({
		req: ctx.request,
		endpoint: "/api/trpc",
		router: appRouter as any,
		createContext: createContext,
	})

	return result
}

export const get = hander
export const post = hander
