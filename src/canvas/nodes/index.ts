import { NodeTypes } from '../store/types.store';
import ClientNode from './client-node/ClientNode.node';
import DBNode from './db-node/DBNode.node';
import MicroserviceNode from './microservice/MicroserviceNode.node';

export const nodeTypes = {
  [NodeTypes.MICROSERVICE]: MicroserviceNode,
  [NodeTypes.DB_NODE]: DBNode,
  [NodeTypes.CLIENT_NODE]: ClientNode
};
