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
	SupportedServers,
	SupportedTemplates,
} from './MicroserviceNode.types'
import classes from './styles.module.css'

interface MicroServiceNodeDrawerFormProps {
	nodeId: string
}
export default function MicroServiceNodeDrawerForm(
	props: MicroServiceNodeDrawerFormProps
) {
	const { getNodeFormData } = useFlowStore()
	const currentFormData = getNodeFormData(props.nodeId)

	const form = useForm<MicroServiceNodeFormData>({
		defaultValues: structuredClone(currentFormData),
	})

	const isDBInputDisabled = (type: 'sql' | 'noSql') => {
		// if both the fields are empty then enable both the fields
		// else enable the field which is selected and disable the other
		if (
			!form.watch('restConfig.server.sqlDB') &&
			!form.watch('restConfig.server.noSQLDB')
		) {
			return false
		}
		if (type === 'sql') {
			return !!form.watch('restConfig.server.noSQLDB')
		}
		if (type === 'noSql') {
			return !!form.watch('restConfig.server.sqlDB')
		}
	}
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
							{form.watch('restConfig.template') ===
								SupportedTemplates.OPEN_API && (
								<>
									<FileInput
										control={form.control}
										name='restConfig.server.openApiFileYamlContent'
										label='Upload YAML file'
									/>
								</>
							)}
							{form.watch('restConfig.template') ===
								SupportedTemplates.COMPAGE &&
								getDBInfo(form, isDBInputDisabled)}
						</Grid>
					)}
					<Button type='submit'>Submit</Button>
				</Flex>
			</form>
		</div>
	)
}
function getDBInfo(
	form: UseFormReturn<Partial<MicroServiceNodeFormData>>,
	isDBInputDisabled: (type: 'sql' | 'noSql') => boolean | undefined
) {
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
						disabled={isDBInputDisabled('sql')}
						control={form.control}
						name='restConfig.server.sqlDB'
						label='SQL Database'
						placeholder='SQL Database'
						data={getSQLDBOptions('sql')}
					/>
					<Select
						disabled={isDBInputDisabled('noSql')}
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
