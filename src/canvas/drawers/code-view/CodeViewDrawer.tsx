import { Center, Loader } from '@mantine/core'
import { lazy, Suspense } from 'react'
import { useFlowStore } from 'src/canvas/store/flowstore'

const CodeHighlight = lazy(() =>
	import('@mantine/code-highlight').then((module) => ({
		default: module.CodeHighlight,
	}))
)

export default function CodeViewDrawer() {
	const { nodes, edges } = useFlowStore()
	const code = {
		nodes,
		edges,
	}

	return (
		<Suspense
			fallback={
				<Center h='80vh'>
					<Loader size={30} />
				</Center>
			}
		>
			<CodeHighlight language='json' code={JSON.stringify(code, null, 2)} />
		</Suspense>
	)
}
