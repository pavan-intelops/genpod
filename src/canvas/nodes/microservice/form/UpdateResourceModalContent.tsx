import {
	ActionIcon,
	Button,
	Checkbox,
	Flex,
	Grid,
	Space,
	Stack,
} from '@mantine/core'
import { IconPlus, IconTrashFilled } from '@tabler/icons-react'
import { useFieldArray, useForm } from 'react-hook-form'
import { Autocomplete, TextInput } from 'react-hook-form-mantine'
import { getSupportedMethods } from '../Microservice.utils'
import { FieldMetadata, Resource } from '../MicroserviceNode.types'

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
const getInitialData = (initialData?: Resource): FormResource => {
	if (!initialData) {
		return {
			name: '',
			allowedMethods: [],
			fields: [],
		}
	} else {
		return {
			...initialData,
			allowedMethods: initialData.allowedMethods
				.map((method) => ({
					id: method,
				}))
				.filter((method) => method.id),
			fields: Object.entries(initialData.fields).map(([key, value]) => ({
				key,
				...value,
			})),
		}
	}
}
interface Props {
	onResourceUpdate: (resource: Resource, resourceIndex: number) => void
	initialData?: Resource
	resourceIndex?: number
}
const getDataTypesOptions = () => {
	return [
		{
			group: 'INT',
			items: [
				'int8',
				'int16',
				'int32',
				'int64',
				'uint8',
				'uint16',
				'uint32',
				'uint64',
				'int',
				'uint',
				'rune',
				'byte',
				'uintptr',
			],
		},
		{
			group: 'FLOAT',
			items: ['float32', 'float64'],
		},
		{
			group: 'COMPLEX',
			items: ['complex64', 'complex128'],
		},
		{
			group: 'BOOL',
			items: ['bool'],
		},
		{
			group: 'STRING',
			items: ['string'],
		},
	]
}
export default function UpdateResourceModalContent(props: Props) {
	const form = useForm<FormResource>({
		defaultValues: {
			...getInitialData(props.initialData),
		},
	})
	const allowedMethodsFieldArray = useFieldArray({
		control: form.control,
		name: 'allowedMethods',
	})
	const fieldsFieldArray = useFieldArray({
		control: form.control,
		name: 'fields',
	})

	return (
		<form
			onSubmit={form.handleSubmit((data) => {
				if (props.resourceIndex === undefined) {
					return
				}
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
				props.onResourceUpdate(resource, props.resourceIndex)
			})}
		>
			<Grid>
				<Grid.Col span={12}>
					<TextInput
						required
						withAsterisk
						label='Resource Name'
						control={form.control}
						name='name'
						placeholder='Enter Resource Name'
					/>
				</Grid.Col>
				<Grid.Col span={12}>
					<Stack>
						{getSupportedMethods().map((method, index) => (
							<Checkbox
								defaultChecked={props.initialData?.allowedMethods.includes(
									method
								)}
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
					{fieldsFieldArray.fields.map((field, index) => (
						<Flex
							key={field.id}
							justify='space-between'
							align='center'
							content='center'
							columnGap='lg'
						>
							<TextInput
								placeholder='Enter field key'
								label='Field Key'
								control={form.control}
								name={`fields.${index}.key`}
							/>
							<Autocomplete
								placeholder='Select data type'
								label='Data Type'
								control={form.control}
								name={`fields.${index}.datatype`}
								data={getDataTypesOptions()}
							/>
							<ActionIcon
								mt='xl'
								onClick={() => fieldsFieldArray.remove(index)}
							>
								<IconTrashFilled />
							</ActionIcon>
						</Flex>
					))}
				</Grid.Col>
				<Button
					leftSection={<IconPlus />}
					onClick={() => {
						fieldsFieldArray.append({
							key: '',
							datatype: '',
							isComposite: false,
						})
					}}
					variant='subtle'
				>
					Add Fields
				</Button>
			</Grid>
			<Space h={20} />
			<Button type='submit'>Submit</Button>
		</form>
	)
}
