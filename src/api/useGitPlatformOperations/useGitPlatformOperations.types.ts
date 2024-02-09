export interface GitPlatformEntity {
	name: string
	url: string
	user_name: string
	personal_access_token: string
	owner_email: string
	created_at?: string
	updated_at?: string
}

export interface GitPlatformDTO {
	name: string
	url: string
	userName: string
	personalAccessToken: string
	ownerEmail: string
	createdAt?: string
	updatedAt?: string
}
