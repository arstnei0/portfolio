function calculateData(dob: Date) {
	var diff_ms = Date.now() - dob.getTime()
	var age_dt = new Date(diff_ms)

	return Math.abs(age_dt.getUTCFullYear() - 1970)
}

export const SITE_URL = `https://zihan.pages.dev`
export const AGE = calculateData(new Date(2009, 3, 1))
export const GITHUB_URL = `https://github.com/zihan-ch`
export const TWITTER_URL = `https://twitter.com/zihanch`
export const EMAIL = `zccmczh@gmail.com`
export const EMAIL_URL = `mailto:${EMAIL}`
