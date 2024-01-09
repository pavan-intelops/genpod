import { Button, Checkbox, Grid, Space, Stack } from '@mantine/core'
import { useFieldArray, useForm } from 'react-hook-form'
import { TextInput } from 'react-hook-form-mantine'
import { getSupportedMethods } from './Microservice.utils'
import { FieldMetadata, Resource } from './MicroserviceNode.types'

interface FormResource {
	name: string
	allowedMethods: {
		id: string
	}[]
	// the below map can contain metadata about the field.
	fields: {
		datatype: string
		isComposite: boolean
		key: string
	}[]
}

interface Props {
	onResourceAdd: (resource: Resource) => void
}
export default function AddResourceModalContent(props: Props) {
	const form = useForm<FormResource>({
		defaultValues: {
			name: '',
			allowedMethods: [],
			fields: [],
		},
	})
	const allowedMethodsFieldArray = useFieldArray({
		control: form.control,
		name: 'allowedMethods',
	})
	return (
		<form
			onSubmit={form.handleSubmit((data) => {
				const resource: Resource = {
					name: data.name,
					allowedMethods: data.allowedMethods.map((method) => method.id),
					fields: data.fields.reduce((acc, field) => {
						acc[field.key] = {
							datatype: field.datatype,
							isComposite: field.isComposite,
						}
						return acc
					}, {} as Record<string, FieldMetadata>),
				}
				props.onResourceAdd(resource)
			})}
		>
			<Grid>
				<Grid.Col span={12}>
					<TextInput label='Resource Name' control={form.control} name='name' />
				</Grid.Col>
				<Grid.Col span={12}>
					<Stack>
						{getSupportedMethods().map((method, index) => (
							<Checkbox
								key={index}
								label={method}
								id={method}
								name={`allowedMethods.${index}`}
								onChange={() => {
									allowedMethodsFieldArray.append({ id: method })
								}}
							/>
						))}
					</Stack>
				</Grid.Col>
				<Grid.Col span={12}>
					{Object.entries(form.watch('fields')).map(([key, value], index) => {
						return <div key={index}></div>
					})}
				</Grid.Col>
				<Button onClick={() => {}}>Add</Button>
			</Grid>
			<Space h={20} />
			<Button type='submit'>Submit</Button>
		</form>
	)
}
