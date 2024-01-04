export interface FieldMetadata {
	datatype: string
	isComposite: boolean
}

export interface Resource {
	name: string
	allowedMethods: string[]
	// the below map can contain metadata about the field.
	fields: Record<string, FieldMetadata>
}
export interface GRPCConfig {
	template: string
	framework: string
	server?: {
		port?: string
		sqlDB: string
		noSQLDB: string
		resources?: Resource[]
		protoFileContent?: string
	}
	clients?: GRPCClient[]
}

export interface GRPCClient {
	sourceNodeName: string
	sourceNodeId: string
	port: string
}

export interface RESTConfig {
	template: string
	framework: string
	server: {
		port: string
		sqlDB: string
		noSQLDB: string
		resources?: Resource[]
		openApiFileYamlContent?: string
	}
	clients: RESTClient[]
}
export interface RESTClient {
	sourceNodeName: string
	sourceNodeId: string
	port: string
}
export interface WsConfig {
	template: string
	framework: string
	server?: {
		port?: string
		sqlDB: string
		noSQLDB: string
		resources?: Resource[]
	}
	clients?: WsClient[]
}

export interface WsClient {
	sourceNodeName: string
	sourceNodeId: string
	port: string
}

export type MicroServiceNodeFormData = Partial<{
	id: string
	name: string
	description: string
	language: string
	restConfig?: RESTConfig
	grpcConfig?: GRPCConfig
	wsConfig?: WsConfig
	metadata: Record<string, string>
	annotations: Record<string, string>
}>

export enum SupportedLanguages {
	GO = 'go',
	JAVA = 'java',
	JAVASCRIPT = 'javascript',
	RUST = 'rust',
	RUBY = 'ruby',
	PYTHON = 'python',
}
export enum SupportedServers {
	REST = 'restServer',
	GRPC = 'grpcServer',
}
export enum SupportedTemplates {
	COMPAGE = 'compage',
	OPEN_API = 'openapi',
}
export enum SupportedFrameworks {
	GO_SERVER = 'go-server',
	GO_GIN_SERVER = 'go-gin-server',
	GO_ECHO_SERVER = 'go-echo-server',
	GO_GRPC_SERVER = 'go-grpc-server',
	JAVA_MICRONAUT_SERVER = 'java-micronaut-server',
	JAVA_UNDERTOW_SERVER = 'java-undertow-server',
	JAVA_SPRING_SERVER = 'spring',
	NODEJS_EXPRESS_SERVER = 'nodejs-express-server',
	RUST_SERVER = 'rust-server',
	RUBY_ON_RAILS = 'ruby-on-rails',
	RUBY_SINATRA = 'ruby-sinatra',
	PYTHON_FLASK = 'python-flask',
}
