import { notifications } from '@mantine/notifications'
import { z } from 'zod'

export const schema = z.object({
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
			port: z.string().or(z.number()).optional(),
			sqlDB: z.string().optional(),
			noSQLDB: z.string().optional(),
			openApiFileYamlContent: z.preprocess(
				(val) => {
					if (val instanceof File) {
						return val
					} else {
						return undefined
					}
				},
				z
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
					.optional()
			),
		}),
	}),
	annotations: z
		.object({
			key: z.string().optional(),
			value: z.string().optional(),
		})
		.optional(),
	grpcConfig: z
		.object({
			protoFile: z.string().min(1).optional(),
			protoFileContent: z.string().min(1).optional(),
		})
		.optional(),
	metadata: z.record(z.string()).optional(),
})
