import type { inferAsyncReturnType } from "@trpc/server"
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch"

export const createContextInner = async (opts: FetchCreateContextFnOptions) => {
	return opts
}

export const createContext = async (opts: FetchCreateContextFnOptions) => {
	return await createContextInner(opts)
}

export type IContext = inferAsyncReturnType<typeof createContext>
