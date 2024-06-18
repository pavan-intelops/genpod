import { Accordion, Flex, Loader, Tabs, Text } from '@mantine/core';
import { MicroserviceNodeStatusProps, Task } from './types';
import { useEffect, useState } from 'react';
import Loading from 'src/components/common/loading/Loading';

/**
 * value key prefixed with id should be the endpoint
 * for example
 * {task.id}/initialising/summary - should stream the summary
 * {task.id}/initialising/logs - should stream the logs basically tailing the logs
 */
export default function MicroserviceNodeStatus(
  props: MicroserviceNodeStatusProps
) {
  const [tasks, setTasks] = useState<Task[] | null>(null);
  useEffect(() => {
    if (!tasks)
      setTimeout(() => {
        setTasks([
          {
            id: '12345',
            name: 'Initialising',
            value: 'initialising',
            tabs: [
              {
                name: 'Summary',
                value: 'summary'
              },
              {
                name: 'Logs',
                value: 'logs'
              }
            ]
          },
          {
            id: '6789',
            name: 'Building',
            value: 'building',
            tabs: [
              {
                name: 'Summary',
                value: 'summary'
              },
              {
                name: 'Logs',
                value: 'logs'
              }
            ]
          },
          {
            id: '622789',
            name: 'Testing',
            value: 'testing'
          }
        ]);
      }, 1000);
  }, []);
  return tasks ? (
    <Accordion mt="lg" multiple variant="separated">
      {tasks.map(task => (
        <Accordion.Item key={task.id} value={task.value}>
          <Accordion.Control>{task.name}</Accordion.Control>
          <Accordion.Panel>
            {task.tabs && task.tabs.length > 0 ? (
              <Tabs defaultValue={task.tabs[0].value} variant="outline">
                <Tabs.List>
                  {task.tabs.map(tab => (
                    <Tabs.Tab key={tab.value} value={tab.value}>
                      {tab.name}
                    </Tabs.Tab>
                  ))}
                </Tabs.List>
                {task.tabs.map(tab => (
                  <Tabs.Panel key={tab.value} value={tab.value}>
                    {tab.value}
                  </Tabs.Panel>
                ))}
              </Tabs>
            ) : (
              <Text>No tabs available</Text>
            )}
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  ) : (
    <Loading loadingText="Loading tasks ..." />
  );
}
