export enum Status {
	ACTIVE = 'ACTIVE',
	INACTIVE = 'INACTIVE',
}
export interface UserDTO {
	email: string
	firstName?: string
	lastName?: string
	role?: string
	status?: Status
	createdAt?: string
	updatedAt?: string
}
