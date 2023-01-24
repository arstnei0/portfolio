import dayjs from "dayjs"

export const getUrlFromPostSlug = (slug: string) => `/post/${slug}`

export const getDateString = (date: Date) => dayjs(date).format("D MMM, YYYY")
