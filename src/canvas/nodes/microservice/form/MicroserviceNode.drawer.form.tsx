import { Button, ComboboxData } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { Select, TextInput, Textarea } from 'react-hook-form-mantine';
import { useFlowsStore } from 'src/canvas/store/flowstore';

import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { NodeTypes } from 'src/canvas/store/types.store';
import { NodeDrawerFormProps } from 'src/canvas/types';
import { getLanguageOptions, handleResets } from '../Microservice.utils';
import {
  MicroServiceNodeFormData,
  MicroServiceNodeFormDataUI
} from '../MicroserviceNode.types';
import GRPCConfigForm from './GRPCConfigForm';
import RestConfigForm from './RESTConfigForm';
import { schema } from './resolvers';

export default function MicroServiceNodeDrawerForm(
  props: NodeDrawerFormProps<MicroServiceNodeFormData>
) {
  const { getNodeFormData, setNodeFormData } = useFlowsStore();
  const currentFormData = getNodeFormData(props.nodeId);

  const form = useForm<MicroServiceNodeFormDataUI>({
    defaultValues: structuredClone(currentFormData),
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    criteriaMode: 'all'
  });
  const licenseOptions: ComboboxData = useFlowsStore(
    state => state.getActiveFlow()!.licenses
  )?.map(license => ({
    label: license.tag,
    value: license.id
  }));
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedName = e.target.value.replace(/\s+/g, '_');
    form.setValue('name', updatedName, { shouldValidate: true });
  };

  const transformToNodeFormData = useCallback(
    (data: MicroServiceNodeFormDataUI): MicroServiceNodeFormData => {
      const formData: MicroServiceNodeFormData = {
        name: data.name,
        description: data.description,
        language: data.language,
        restConfig: data.restConfig,
        grpcConfig: data.grpcConfig,
        annotations: {},
        id: `form${props.nodeId}`,
        metadata: {},
        type: NodeTypes.MICROSERVICE,
        wsConfig: undefined,
        prompt: data.prompt,
        license: data.license
      };
      return formData;
    },
    [props.nodeId]
  );
  const handleSubmitCapture = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleSubmit = form.handleSubmit(() => {
    const transformedData = transformToNodeFormData(form.getValues());
    setNodeFormData(transformedData, props.nodeId);
    props.onSubmit(transformedData);
  });

  const handleLanguageChange = () => {
    handleResets(form);
  };
  return (
    <>
      <form onSubmitCapture={handleSubmitCapture} onSubmit={handleSubmit}>
        <TextInput
          control={form.control}
          withAsterisk
          label="Name"
          placeholder="Name"
          name="name"
          onChange={handleNameChange}
        />
        <Textarea
          name="description"
          rows={4}
          label="Description"
          placeholder="Description"
          control={form.control}
        />
        <Select
          control={form.control}
          name="license"
          label="License"
          placeholder="License"
          data={licenseOptions}
        />
        <Select
          control={form.control}
          name="language"
          label="Language"
          placeholder="Language"
          data={getLanguageOptions()}
          onChange={handleLanguageChange}
        />
        {!!form.watch('language') && (
          <>
            <RestConfigForm form={form} />
            <GRPCConfigForm form={form} />
          </>
        )}
        <Textarea
          name="prompt"
          rows={4}
          label="Enter Prompt"
          placeholder="Enter Prompt"
          control={form.control}
        />
        <Button type="submit" mt="lg">
          Submit
        </Button>
      </form>
    </>
  );
}
