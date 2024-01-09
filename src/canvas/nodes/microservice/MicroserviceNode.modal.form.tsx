import { Button, Flex, Grid, Group, Text } from '@mantine/core'
import { UseFormReturn, useForm } from 'react-hook-form'
import {
	FileInput,
	NumberInput,
	Select,
	TextInput,
	Textarea,
} from 'react-hook-form-mantine'
import { useFlowStore } from 'src/canvas/store/flowstore'

import {
	getFrameworkOptions,
	getLanguageOptions,
	getSQLDBOptions,
	getTemplateOptions,
	handleResets,
} from './Microservice.utils'
import {
	MicroServiceNodeFormData,
	MicroServiceNodeFormDataUI,
	SupportedServers,
	SupportedTemplates,
} from './MicroserviceNode.types'
import classes from './styles.module.css'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { notifications } from '@mantine/notifications'

interface MicroServiceNodeDrawerFormProps {
	nodeId: string
}

const schema = z.object({
	name: z.string().min(1),
	description: z.string().optional(),
	language: z.string().min(1),
	restConfig: z.object({
		template: z.string().min(1, {
			message: 'Please select a template',
		}),
		framework: z.string().min(1, {
			message: 'Please select a framework',
		}),
		server: z.object({
			port: z.number().nonnegative().optional(),
			sqlDB: z.string().min(1).optional(),
			noSQLDB: z.string().min(1).optional(),
			openApiFileYamlContent: z
				.custom<File>((val) => val instanceof File, 'Please upload a file')
				.refine(
					(val) => {
						if (
							val.type === 'application/json' ||
							val.type === 'application/x-yaml'
						) {
							return true
						} else {
							notifications.show({
								title: 'Not Supported File Type',
								message: 'Please upload a yaml or json file',
								color: 'red',
								autoClose: 3000,
							})

							return false
						}
					},
					{
						message: 'Please upload a yaml or json file',
					}
				)
				.optional(),
		}),
	}),
	annotations: z
		.array(
			z.object({
				key: z.string().min(1),
				value: z.string().min(1),
			})
		)
		.optional(),
	grpcConfig: z
		.object({
			protoFile: z.string().min(1).optional(),
			protoFileContent: z.string().min(1).optional(),
		})
		.optional(),
	metadata: z.record(z.string()).optional(),
})

export default function MicroServiceNodeDrawerForm(
	props: MicroServiceNodeDrawerFormProps
) {
	const { getNodeFormData } = useFlowStore()
	const currentFormData = getNodeFormData(props.nodeId)

	const form = useForm<MicroServiceNodeFormDataUI>({
		defaultValues: structuredClone(currentFormData),
		resolver: zodResolver(schema),
	})
	return (
		<div>
			<form onSubmit={form.handleSubmit((data) => console.log(data))}>
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
				<Flex direction='column' className={classes.group} mt='md' gap='md'>
					<Text size='md' fw='bold' c='orange.5'>
						Rest Config
					</Text>
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
						<Grid grow>
							<Grid.Col span={6}>
								<Select
									w='100%'
									defaultValue={
										getTemplateOptions(
											form.getValues('language')!,
											SupportedServers.REST
										)?.[0]
									}
									name='restConfig.template'
									control={form.control}
									label='Template'
									placeholder='Template'
									data={
										getTemplateOptions(
											form.getValues('language')!,
											SupportedServers.REST
										) || []
									}
								/>
							</Grid.Col>
							<Grid.Col span={6}>
								<Select
									w='100%'
									defaultValue={
										getFrameworkOptions(
											form.getValues('language')!,
											SupportedServers.REST,
											(form.getValues(
												'restConfig.template'
											) as SupportedTemplates)!
										)?.[0]
									}
									disabled={!form.watch('restConfig.template')}
									name='restConfig.framework'
									control={form.control}
									label='Framework'
									placeholder='Framework'
									data={
										getFrameworkOptions(
											form.getValues('language')!,
											SupportedServers.REST,
											(form.getValues(
												'restConfig.template'
											) as SupportedTemplates)!
										) || []
									}
								/>
							</Grid.Col>
							<Grid.Col span={12}>
								{form.watch('restConfig.template') ===
									SupportedTemplates.OPEN_API && (
									<>
										<FileInput
											accept='.yaml,.yml,.json'
											control={form.control}
											name='restConfig.server.openApiFileYamlContent'
											label='Upload YAML file'
										/>
									</>
								)}
							</Grid.Col>
							{form.watch('restConfig.template') ===
								SupportedTemplates.COMPAGE && getDBInfo(form)}
						</Grid>
					)}
					<Button type='submit'>Submit</Button>
				</Flex>
			</form>
		</div>
	)
}

function getDBInfo(form: UseFormReturn<Partial<MicroServiceNodeFormData>>) {
	return (
		<>
			<Grid.Col span={6}>
				<NumberInput
					control={form.control}
					name='restConfig.server.port'
					label='Port'
					placeholder='Port'
				/>
			</Grid.Col>
			<Grid.Col span={12}>
				<Group>
					<Select
						control={form.control}
						name='restConfig.server.sqlDB'
						label='SQL Database'
						placeholder='SQL Database'
						data={getSQLDBOptions('sql')}
					/>
					<Select
						control={form.control}
						name='restConfig.server.noSQLDB'
						label='No SQL Database'
						placeholder='No SQL Database'
						data={getSQLDBOptions('noSql')}
					/>
				</Group>
			</Grid.Col>
		</>
	)
}
