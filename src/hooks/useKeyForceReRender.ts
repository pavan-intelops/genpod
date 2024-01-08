import { useCallback, useState } from 'react'

const useKeyForceReRender = () => {
	const [key, setKey] = useState<number>(0)

	const forceRender = useCallback(() => {
		setKey((prevKey) => prevKey + Math.random())
	}, [])

	return { key, forceRender }
}

export { useKeyForceReRender }
