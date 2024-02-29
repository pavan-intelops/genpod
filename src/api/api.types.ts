export interface UseOperationsResolvedReturnValue<T = unknown, E = unknown> {
	data: T
	error: typeof Error | E
}

export type UseOperationsReturnType<T = unknown, E = unknown> = Promise<
	Partial<UseOperationsResolvedReturnValue<T, E>>
>
