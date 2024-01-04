import { useForm } from '@mantine/form'
import { MicroServiceNodeFormData } from './MicroserviceNode.types'
import { useFlowStore } from 'src/canvas/store/flowstore'
import { Button, Flex, TextInput, Textarea } from '@mantine/core'
interface MicroServiceNodeDrawerFormProps {
	nodeId: string
}
export default function MicroServiceNodeDrawerForm(
	props: MicroServiceNodeDrawerFormProps
) {
	const { getNodeFormData } = useFlowStore()

	const currentFormData = getNodeFormData(props.nodeId)
	const clone = structuredClone(currentFormData)
	const form = useForm<MicroServiceNodeFormData>({
		initialValues: clone,
	})
	console.log('====================================')
	console.log(form.values)
	console.log('====================================')
	return (
		<div>
			<form onSubmit={form.onSubmit((values) => console.log(values))}>
				<Flex direction='column' gap={10}>
					<TextInput
						label='Name'
						name='name'
						required
						{...form.getInputProps('name')}
					/>
					<Textarea
						label='Description'
						name='description'
						required
						{...form.getInputProps('description')}
					/>
					<Button type='submit'>Submit</Button>
				</Flex>
			</form>
		</div>
	)
}
