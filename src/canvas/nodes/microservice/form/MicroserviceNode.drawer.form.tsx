import { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TextInput } from 'react-hook-form-mantine';
import { useFlowsStore } from 'src/canvas/store/flowstore';
import { NodeTypes } from 'src/canvas/store/types.store';
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

  const handleSubmitCapture = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const transformedData = transformToNodeData(form.getValues());
    console.log('transformedData: ', transformedData);
    setNodeFormData(transformedData, props.nodeId);
    props.onSubmit(transformedData);
  };

  return (
    <>
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
            <CodeEditor onChange={field.onChange} value={field.value ?? ''} />
          )}
        />
        <Button type="submit" mt="lg">
          Save
        </Button>
      </form>
    </>
  );
}

/**
 * apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.19.2
        ports:
        - containerPort: 80

 */
