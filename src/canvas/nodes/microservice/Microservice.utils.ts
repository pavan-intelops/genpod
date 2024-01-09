import { ComboboxItem } from '@mantine/core'
import { UseFormReturn } from 'react-hook-form'
import { NodeTypes } from 'src/canvas/store/types.store'
import {
	MicroServiceNodeFormData,
	SupportedDBs,
	SupportedFrameworks,
	SupportedLanguages,
	SupportedMethods,
	SupportedServers,
	SupportedTemplates,
} from './MicroserviceNode.types'

export const languageRelatedData = {
	[SupportedLanguages.GO]: {
		servers: [SupportedServers.REST, SupportedServers.GRPC],
		[SupportedServers.REST]: {
			templates: [SupportedTemplates.COMPAGE, SupportedTemplates.OPEN_API],
			[SupportedTemplates.COMPAGE]: {
				frameworks: [SupportedFrameworks.GO_GIN_SERVER],
			},
			[SupportedTemplates.OPEN_API]: {
				frameworks: [
					SupportedFrameworks.GO_ECHO_SERVER,
					SupportedFrameworks.GO_GIN_SERVER,
					SupportedFrameworks.GO_SERVER,
				],
			},
		},
		[SupportedServers.GRPC]: {
			templates: [SupportedTemplates.COMPAGE],
			[SupportedTemplates.COMPAGE]: {
				frameworks: [SupportedFrameworks.GO_GRPC_SERVER],
			},
			[SupportedTemplates.OPEN_API]: {
				frameworks: [],
			},
		},
	},
	[SupportedLanguages.JAVA]: {
		servers: [SupportedServers.REST, SupportedServers.GRPC],
		[SupportedServers.REST]: {
			templates: [SupportedTemplates.OPEN_API],
			[SupportedTemplates.COMPAGE]: {
				frameworks: [],
			},
			[SupportedTemplates.OPEN_API]: {
				frameworks: [
					SupportedFrameworks.JAVA_MICRONAUT_SERVER,
					SupportedFrameworks.JAVA_UNDERTOW_SERVER,
					SupportedFrameworks.JAVA_SPRING_SERVER,
				],
			},
		},
		[SupportedServers.GRPC]: {
			templates: [],
			[SupportedTemplates.COMPAGE]: {
				frameworks: [],
			},
			[SupportedTemplates.OPEN_API]: {
				frameworks: [],
			},
		},
	},
	[SupportedLanguages.JAVASCRIPT]: {
		servers: [SupportedServers.REST, SupportedServers.GRPC],
		[SupportedServers.REST]: {
			templates: [SupportedTemplates.OPEN_API],
			[SupportedTemplates.COMPAGE]: {
				frameworks: [],
			},
			[SupportedTemplates.OPEN_API]: {
				frameworks: [SupportedFrameworks.NODEJS_EXPRESS_SERVER],
			},
		},
		[SupportedServers.GRPC]: {
			templates: [],
			[SupportedTemplates.COMPAGE]: {
				frameworks: [],
			},
			[SupportedTemplates.OPEN_API]: {
				frameworks: [],
			},
		},
	},
	[SupportedLanguages.RUST]: {
		servers: [SupportedServers.REST, SupportedServers.GRPC],
		[SupportedServers.REST]: {
			templates: [SupportedTemplates.OPEN_API],
			[SupportedTemplates.COMPAGE]: {
				frameworks: [],
			},
			[SupportedTemplates.OPEN_API]: {
				frameworks: [SupportedFrameworks.RUST_SERVER],
			},
		},
		[SupportedServers.GRPC]: {
			templates: [],
			[SupportedTemplates.COMPAGE]: {
				frameworks: [],
			},
			[SupportedTemplates.OPEN_API]: {
				frameworks: [],
			},
		},
	},
	[SupportedLanguages.RUBY]: {
		servers: [SupportedServers.REST, SupportedServers.GRPC],
		[SupportedServers.REST]: {
			templates: [SupportedTemplates.OPEN_API],
			[SupportedTemplates.COMPAGE]: {
				frameworks: [],
			},
			[SupportedTemplates.OPEN_API]: {
				frameworks: [
					SupportedFrameworks.RUBY_ON_RAILS,
					SupportedFrameworks.RUBY_SINATRA,
				],
			},
		},
		[SupportedServers.GRPC]: {
			templates: [],
			[SupportedTemplates.COMPAGE]: {
				frameworks: [],
			},
			[SupportedTemplates.OPEN_API]: {
				frameworks: [],
			},
		},
	},
	[SupportedLanguages.PYTHON]: {
		servers: [SupportedServers.REST, SupportedServers.GRPC],
		[SupportedServers.REST]: {
			templates: [SupportedTemplates.OPEN_API],
			[SupportedTemplates.COMPAGE]: {
				frameworks: [],
			},
			[SupportedTemplates.OPEN_API]: {
				frameworks: [SupportedFrameworks.PYTHON_FLASK],
			},
		},
		[SupportedServers.GRPC]: {
			templates: [],
			[SupportedTemplates.COMPAGE]: {
				frameworks: [],
			},
			[SupportedTemplates.OPEN_API]: {
				frameworks: [],
			},
		},
	},
}

export const getFrameworkOptions = (
	language: SupportedLanguages,
	server: SupportedServers,
	template: SupportedTemplates
): string[] | null => {
	const languageData = languageRelatedData[language]
	if (!languageData) return null
	const serverData = languageData[server]
	if (!serverData) return null
	const templateData = serverData[template]
	if (!templateData) return null
	return templateData.frameworks.length ? templateData.frameworks : null
}

export const getTemplateOptions = (
	language: SupportedLanguages,
	server: SupportedServers
): string[] | null => {
	const languageData = languageRelatedData[language]
	if (!languageData) return null
	const serverData = languageData[server]
	if (!serverData) return null
	return serverData.templates.length ? serverData.templates : null
}

export const getServerOptions = (
	language: SupportedLanguages
): SupportedServers[] | null => {
	const languageData = languageRelatedData[language]
	if (!languageData) return null
	return languageData.servers.length ? languageData.servers : null
}

export const getLanguageOptions = (): ComboboxItem[] => {
	const arr = Object.keys(languageRelatedData).map((key) => {
		return {
			value: key,
			label: key,
			disabled: false,
		} as ComboboxItem
	})
	return arr
}

export const getInitialMicroserviceNodeFormData =
	(): MicroServiceNodeFormData => {
		return {
			id: '',
			name: '',
			type: NodeTypes.MICROSERVICE,
			description: '',
			restConfig: {
				clients: [],
				framework: '',
				server: {
					port: '',
					resources: [],
					sqlDB: '',
					noSQLDB: '',
					openApiFileYamlContent: '',
				},
				template: '',
			},
			grpcConfig: {
				framework: '',
				template: '',
				clients: [],
				server: {
					noSQLDB: '',
					port: '',
					resources: [],
					sqlDB: '',
					protoFileContent: '',
				},
			},
			wsConfig: {
				framework: '',
				template: '',
				clients: [],
				server: {
					noSQLDB: '',
					port: '',
					resources: [],
					sqlDB: '',
				},
			},
			annotations: {},
			metadata: {},
		}
	}

export const handleResets = (
	form: UseFormReturn<Partial<MicroServiceNodeFormData>>
) => {
	form.resetField('restConfig.template', {
		defaultValue: getTemplateOptions(
			form.getValues('language')!,
			SupportedServers.REST
		)?.[0],
	})
	form.resetField('restConfig.framework', {
		defaultValue: getFrameworkOptions(
			form.getValues('language')!,
			SupportedServers.REST,
			(form.getValues('restConfig.template') as SupportedTemplates)!
		)?.[0],
	})
}

export const getSQLDBOptions = (type: 'sql' | 'noSql'): string[] => {
	if (type === 'sql') {
		return [
			SupportedDBs.Map,
			SupportedDBs.MySQL,
			SupportedDBs['MySQL-GORM'],
			SupportedDBs.SQLite,
			SupportedDBs['SQLite-GORM'],
		]
	} else {
		return [SupportedDBs.MongoDB]
	}
}

export const getSupportedMethods = (): SupportedMethods[] => {
	return [
		SupportedMethods.DELETE,
		SupportedMethods.GET,
		SupportedMethods.POST,
		SupportedMethods.LIST,
		SupportedMethods.PUT,
	]
}
