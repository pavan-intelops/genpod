import { NodeTypes } from '../store/types.store'
import { getInitialDBNodeFormData } from './db-node/DBNode.utils'
import { getInitialMicroserviceNodeFormData } from './microservice/Microservice.utils'

export const getInitialNodeFormData = (type: NodeTypes) => {
	if (type === NodeTypes.MICROSERVICE) {
		return getInitialMicroserviceNodeFormData()
	} else if (type === NodeTypes.DB_NODE) {
		return getInitialDBNodeFormData()
	}
}
