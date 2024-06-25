import { Controller, useForm } from 'react-hook-form';
import { TextInput } from 'react-hook-form-mantine';
import { useFlowsStore } from 'src/canvas/store/flowstore';
import { CustomNodeFormData, NodeTypes } from 'src/canvas/store/types.store';
import { NodeDrawerFormProps } from 'src/canvas/types';
import CodeEditor from 'src/components/common/code-editor';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Text } from '@mantine/core';

import {
  MicroServiceNodeData,
  MicroServiceNodeDataUI
} from '../MicroserviceNode.types';
import { schema } from './resolvers';

export default function MicroServiceNodeDrawerForm(
  props: NodeDrawerFormProps<MicroServiceNodeData>
) {
  const { getNodeFormData, setNodeFormData } = useFlowsStore();
  const currentFormData = getNodeFormData(props.nodeId);

  const form = useForm<MicroServiceNodeDataUI>({
    defaultValues: structuredClone(currentFormData),
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    criteriaMode: 'all'
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedName = e.target.value.replace(/\s+/g, '_');
    form.setValue('name', updatedName, { shouldValidate: true });
  };

  const transformToNodeData = (
    data: MicroServiceNodeDataUI
  ): MicroServiceNodeData => {
    const formData: MicroServiceNodeData = {
      name: data.name,
      id: `form${props.nodeId}`,
      type: NodeTypes.MICROSERVICE,
      requirements: data.requirements
    };
    return formData;
  };
  const handleNodeDataChange = () => {
    const transformedData = transformToNodeData(form.getValues());

    setNodeFormData(transformedData, props.nodeId);
  };

  const handleOnGenerateButtonClick = () => {
    props.onGenerateButtonClick();
    handleNodeDataChange();
  };
  const handleSubmitCapture = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleNodeDataChange();
    const transformedData = transformToNodeData(form.getValues());
    props.onSubmit(transformedData);
  };

  return (
    <form onSubmit={handleSubmitCapture}>
      <TextInput
        control={form.control}
        label="Name"
        placeholder="Name"
        name="name"
        onChange={handleNameChange}
      />
      <Text> Configuration File (Yaml)</Text>
      <Controller
        name="requirements"
        control={form.control}
        render={({ field }) => (
          <CodeEditor
            height="50vh"
            onChange={field.onChange}
            value={field.value ?? ''}
          />
        )}
      />
      <Button type="submit" mt="lg" mr="lg">
        Save
      </Button>
      <Button
        mt="lg"
        variant="gradient"
        onClick={handleOnGenerateButtonClick}
        disabled={form.watch('requirements')?.length === 0}
      >
        Generate
      </Button>
    </form>
  );
}
