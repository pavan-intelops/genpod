import { CustomNodeFormData } from './store/types.store'

export interface NodeDrawerFormProps<T = CustomNodeFormData> {
	nodeId: string
	onSubmit: (data: T) => void
}
