import { useCallback, useState } from 'react'

const useForceUpdate = (): (() => void) => {
	const [, updateState] = useState<object | null>(null)
	const forceUpdate = useCallback(() => updateState({}), [])

	return forceUpdate
}

export { useForceUpdate }
