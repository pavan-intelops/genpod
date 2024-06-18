import React from 'react';
import { Task } from './types';

interface MicroserviceNodeTaskProps {
  nodeId: string;
  task: Task;
}
export default function MicroserviceNodeTask(props: MicroserviceNodeTaskProps) {
  return <div>MicroserviceNodeTask</div>;
}
