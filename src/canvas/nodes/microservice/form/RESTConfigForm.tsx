import {
  ActionIcon,
  ActionIconGroup,
  Button,
  Flex,
  Grid,
  Group,
  Modal,
  Table
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, IconTrashFilled } from '@tabler/icons-react';
import { useState } from 'react';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { FileInput, NumberInput, Select } from 'react-hook-form-mantine';
import {
  getDBOptions,
  getFrameworkOptions,
  getTemplateOptions
} from '../Microservice.utils';
import {
  MicroServiceNodeFormDataUI,
  Resource,
  SupportedServers,
  SupportedTemplates
} from '../MicroserviceNode.types';
import classes from '../styles.module.css';
import AddResourceModalContent from './AddResourceModalContent';
import UpdateResourceModalContent from './UpdateResourceModalContent';
interface RestConfigFormProps {
  form: UseFormReturn<MicroServiceNodeFormDataUI>;
}
export default function RestConfigForm({ form }: RestConfigFormProps) {
  const [
    isAddResourceModalOpen,
    { close: closeAddResourceModal, open: openAddResourceModal }
  ] = useDisclosure(false);

  const [
    isEditResourceModalOpen,
    { close: closeEditResourceModal, open: openEditResourceModal }
  ] = useDisclosure(false);

  const [editResourceIndex, setEditResourceIndex] = useState<
    number | undefined
  >(undefined);

  const {
    append: appendResource,
    update: updateResource,
    remove: removeResource
  } = useFieldArray({
    control: form.control,
    name: 'restConfig.server.resources'
  });

  const handleAddResourceClick = () => {
    openAddResourceModal();
  };

  const handleEditIconClick = (index: number) => {
    setEditResourceIndex(index);
    openEditResourceModal();
  };

  const handleTrashIconClick = (index: number) => {
    removeResource(index);
  };

  const handleResourceAdd = (resource: Resource) => {
    appendResource(resource);
    closeAddResourceModal();
  };

  const handleResourceUpdate = (resource: Resource, index: number) => {
    updateResource(index, resource);
    closeEditResourceModal();
  };

  return (
    <>
      <Flex direction="column" className={classes.group} mt="md" gap="md">
        <Button size="md" fw="bold" variant="transparent">
          REST Config
        </Button>
        <Grid grow>
          <Grid.Col span={6}>
            <Select
              w="100%"
              defaultValue={
                getTemplateOptions(
                  form.getValues('language')!,
                  SupportedServers.REST
                )?.[0]
              }
              name="restConfig.template"
              control={form.control}
              label="Template"
              placeholder="Template"
              data={
                getTemplateOptions(
                  form.getValues('language')!,
                  SupportedServers.REST
                ) || []
              }
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              w="100%"
              defaultValue={
                getFrameworkOptions(
                  form.getValues('language')!,
                  SupportedServers.REST,
                  (form.getValues('restConfig.template') as SupportedTemplates)!
                )?.[0]
              }
              disabled={!form.watch('restConfig.template')}
              name="restConfig.framework"
              control={form.control}
              label="Framework"
              placeholder="Framework"
              data={
                getFrameworkOptions(
                  form.getValues('language')!,
                  SupportedServers.REST,
                  (form.getValues('restConfig.template') as SupportedTemplates)!
                ) || []
              }
            />
          </Grid.Col>
          <Grid.Col span={12}>
            {form.watch('restConfig.template') ===
              SupportedTemplates.OPEN_API && (
              <>
                <FileInput
                  accept=".yaml,.yml,.json"
                  control={form.control}
                  name="restConfig.server.openApiFileYamlContent"
                  label="Upload YAML file"
                />
              </>
            )}
          </Grid.Col>
          {form.watch('restConfig.template') === SupportedTemplates.COMPAGE && (
            <>
              <Grid.Col span={6}>
                <NumberInput
                  control={form.control}
                  name="restConfig.server.port"
                  label="Port"
                  placeholder="Port"
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <Group>
                  <Select
                    control={form.control}
                    name="restConfig.server.sqlDB"
                    label="SQL Database"
                    placeholder="SQL Database"
                    data={getDBOptions('sql')}
                  />
                  <Select
                    control={form.control}
                    name="restConfig.server.noSQLDB"
                    label="No SQL Database"
                    placeholder="No SQL Database"
                    data={getDBOptions('noSql')}
                  />
                </Group>
              </Grid.Col>
            </>
          )}
          <Grid.Col span={6}>
            <Button onClick={handleAddResourceClick} variant="outline">
              Add Resources
            </Button>
          </Grid.Col>
        </Grid>
        {!!form.watch('restConfig.server.resources') &&
          form.watch('restConfig.server.resources')!.length > 0 && (
            <Table>
              <Table.Caption>Existing Resources</Table.Caption>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Resource</Table.Th>
                  <Table.Th>Methods</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {form
                  .watch('restConfig.server.resources')
                  ?.map((resource, index) => (
                    <Table.Tr key={index}>
                      <Table.Td>{resource.name}</Table.Td>
                      <Table.Td>{resource.allowedMethods.join(', ')}</Table.Td>
                      <Table.Td>
                        <ActionIconGroup>
                          <ActionIcon
                            variant="transparent"
                            c="white"
                            onClick={() => {
                              handleEditIconClick(index);
                            }}
                          >
                            <IconEdit />
                          </ActionIcon>
                          <ActionIcon
                            variant="transparent"
                            c="red"
                            ml="xs"
                            onClick={() => {
                              handleTrashIconClick(index);
                            }}
                          >
                            <IconTrashFilled />
                          </ActionIcon>
                        </ActionIconGroup>
                      </Table.Td>
                    </Table.Tr>
                  ))}
              </Table.Tbody>
            </Table>
          )}
      </Flex>
      <Modal
        opened={isAddResourceModalOpen}
        onClose={closeAddResourceModal}
        title="Add Resources"
        size="lg"
      >
        <AddResourceModalContent onResourceAdd={handleResourceAdd} />
      </Modal>
      <Modal
        opened={isEditResourceModalOpen}
        onClose={closeEditResourceModal}
        title="Edit Resource"
        size="lg"
      >
        <UpdateResourceModalContent
          onResourceUpdate={handleResourceUpdate}
          resourceIndex={editResourceIndex}
          initialData={
            form.getValues('restConfig.server.resources')?.[
              editResourceIndex!
            ] as Resource
          }
        />
      </Modal>
    </>
  );
}
