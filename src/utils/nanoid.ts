import { customAlphabet } from 'nanoid'

const alphabet =
	'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz'
const nanoid = customAlphabet(alphabet, 23)

export const getRandomNodeId = (): string => {
	const id = nanoid()
	if (id.startsWith('_')) return getRandomNodeId()
	return 'node_' + id
}
