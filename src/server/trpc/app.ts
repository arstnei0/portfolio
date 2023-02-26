import { z } from "zod"
import { procedure, router, t } from "./utils"
import { db } from "../db"

export const appRouter = router({
	celebrate: procedure
		.input(
			z.object({
				name: z.string(),
				msg: z.string(),
			})
		)
		.mutation(async ({ input }) => {
			return db.vote.create({
				data: {
					name: input.name,
					msg: input.msg,
				},
			})
		}),
})

export type AppRouter = typeof appRouter
