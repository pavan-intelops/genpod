import { Button } from '@mantine/core'
import { useForm } from 'react-hook-form'
import { Select, TextInput, Textarea } from 'react-hook-form-mantine'
import { useFlowStore } from 'src/canvas/store/flowstore'

import { zodResolver } from '@hookform/resolvers/zod'
import { NodeTypes } from 'src/canvas/store/types.store'
import { getLanguageOptions, handleResets } from '../Microservice.utils'
import {
	MicroServiceNodeFormData,
	MicroServiceNodeFormDataUI,
} from '../MicroserviceNode.types'
import GRPCConfigForm from './GRPCConfigForm'
import RestConfigForm from './RESTConfigForm'
import { schema } from './resolvers'

interface MicroServiceNodeDrawerFormProps {
	nodeId: string
	onSubmit: (data: MicroServiceNodeFormData) => void
}

export default function MicroServiceNodeDrawerForm(
	props: MicroServiceNodeDrawerFormProps
) {
	const { getNodeFormData, setNodeFormData } = useFlowStore()
	const currentFormData = getNodeFormData(props.nodeId)

	const form = useForm<MicroServiceNodeFormDataUI>({
		defaultValues: structuredClone(currentFormData),
		resolver: zodResolver(schema),
	})
	const transformToNodeFormData = (
		data: MicroServiceNodeFormDataUI
	): MicroServiceNodeFormData => {
		const t: MicroServiceNodeFormData = {
			name: data.name,
			description: data.description,
			language: data.language,
			restConfig: data.restConfig || undefined,
			grpcConfig: data.grpcConfig || undefined,
			annotations: {},
			id: 'form' + props.nodeId,
			metadata: {},
			type: NodeTypes.MICROSERVICE,
			wsConfig: undefined,
		}
		return t
	}
	return (
		<>
			<form
				onSubmit={form.handleSubmit(() => {
					setNodeFormData(
						transformToNodeFormData(form.getValues()),
						props.nodeId
					)
					props.onSubmit(transformToNodeFormData(form.getValues()))
				}, console.error)}
			>
				<TextInput
					control={form.control}
					withAsterisk
					label='Name'
					placeholder='Name'
					name='name'
				/>
				<Textarea
					name='description'
					rows={4}
					label='Description'
					placeholder='Description'
					control={form.control}
				/>
				<Select
					control={form.control}
					name='language'
					label='Language'
					placeholder='Language'
					data={getLanguageOptions()}
					onChange={() => {
						handleResets(form)
					}}
				/>
				{!!form.watch('language') && (
					<>
						<RestConfigForm form={form} />
						<GRPCConfigForm form={form} />
					</>
				)}
				<Button type='submit' mt='lg'>
					Submit
				</Button>
			</form>
		</>
	)
}
