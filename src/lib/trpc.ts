import type { AppRouter } from "~/server/trpc/app"
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client"

export const trpc = createTRPCProxyClient<AppRouter>({
	links: [
		httpBatchLink({
			url: "/api/trpc",
		}),
	],
})
