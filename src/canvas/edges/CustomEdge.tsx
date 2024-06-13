import { useEffect } from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath
} from 'reactflow';

import { useDisclosure } from '@mantine/hooks';

import { useFlowsStore } from '../store/flowstore';
import CustomEdgeDrawer from './CustomEdge.drawer';

export type GetSpecialPathParams = {
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
};

export const getSpecialPath = (
  { sourceX, sourceY, targetX, targetY }: GetSpecialPathParams,
  offset: number
) => {
  const centerX = (sourceX + targetX) / 2;
  const centerY = (sourceY + targetY) / 2;

  return `M ${sourceX} ${sourceY} Q ${centerX} ${
    centerY + offset
  } ${targetX} ${targetY}`;
};

/**
 * We also get source and target as parameters for the edge component
 */
export default function CustomEdge({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
  id,
  selected
}: EdgeProps) {
  const [path, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition
  });
  const [opened, { open, close }] = useDisclosure(false);
  const { setActiveEdge } = useFlowsStore();
  useEffect(() => {
    if (selected) setActiveEdge(id);
  }, [selected]);
  return (
    <>
      <BaseEdge path={path} markerEnd={markerEnd} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            // everything inside EdgeLabelRenderer has no pointer events by default
            // if you have an interactive element, set pointer-events: all
            pointerEvents: 'all'
          }}
          className="nodrag nopan"
        >
          <button
            className="edgebutton"
            onClick={() => {
              setActiveEdge(id);
              open();
            }}
          >
            ×
          </button>
        </div>
      </EdgeLabelRenderer>
      <CustomEdgeDrawer opened={opened} close={close} edgeId={id} />
    </>
  );
}
