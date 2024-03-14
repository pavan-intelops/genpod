export interface UseOperationsResolvedReturnValue<T = unknown, E = unknown> {
  data: T;
  error: typeof Error | E;
}

export type UseOperationsReturnType<T = unknown, E = unknown> = Promise<
  Partial<UseOperationsResolvedReturnValue<T, E>>
>;

/**
 * Options for useOperations hook
 * @param onSuccess - Callback function to be called on success
 * @param onFail - Callback function to be called on failure
 * @returns void
 */
export type UseOperationsOptions<S = unknown, F = unknown> = Partial<{
  onSuccess: (args?: S) => void;
  onFail: (args?: F) => void;
}>;
