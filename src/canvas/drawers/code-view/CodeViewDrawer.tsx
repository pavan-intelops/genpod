import { CodeHighlight } from '@mantine/code-highlight'
import { useFlowStore } from 'src/canvas/store/flowstore'

export default function CodeViewDrawer() {
	const { nodes, edges } = useFlowStore()
	const code = {
		nodes,
		edges,
	}
	return (
		<>
			<CodeHighlight language='json' code={JSON.stringify(code, null, 2)} />
		</>
	)
}
