import { Box } from '@mantine/core';
import { LazyLog, Line, ScrollFollow } from '@melloware/react-logviewer';
import { useEffect, useRef } from 'react';
import { GLOBAL_CONSTANTS } from 'src/constants.global';

// Use defaultProps.style to set the style for an internal component
Line.defaultProps.style = {
  color: 'green'
};
interface SummaryPanelProps {
  nodeId: string;
  taskId: string;
}
export default function SummaryPanel({ nodeId, taskId }: SummaryPanelProps) {
  const url = `${GLOBAL_CONSTANTS.middlewareUrl}/llm/${nodeId}/${taskId}/summary`;
  const ref = useRef<LazyLog>(null);

  return (
    <div>
      <h1>Streamed Data</h1>
      <Box h="25vh" w="100%">
        <ScrollFollow
          render={({ follow, onScroll }) => (
            <>
              <LazyLog
                url={url}
                stream
                follow={follow}
                onScroll={onScroll}
                enableMultilineHighlight
                enableGutters
                enableSearch
                ref={ref}
                containerStyle={{}}
              />
            </>
          )}
        />
      </Box>
    </div>
  );
}
