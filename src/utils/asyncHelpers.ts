export function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}
export function runWithDelay(fn: () => unknown, ms = 500) {
	return setTimeout(fn, ms)
}
