function calculateData(dob: Date) {
	var diff_ms = Date.now() - dob.getTime()
	var age_dt = new Date(diff_ms)

	return Math.abs(age_dt.getUTCFullYear() - 1970)
}

export const SITE_URL = `https://zihanchen.vercel.app`
export const AGE = calculateData(new Date(2009, 3, 1))
