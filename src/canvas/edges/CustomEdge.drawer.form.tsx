import { Controller, useForm } from 'react-hook-form';
import { TextInput } from 'react-hook-form-mantine';
import { useFlowsStore } from 'src/canvas/store/flowstore';
import CodeEditor from 'src/components/common/code-editor';

import { Button, Text } from '@mantine/core';
import { CustomEdgeFormData } from '../store/types.store';

interface CustomEdgeDrawerFormProps {
  edgeId: string;
  onSubmit: (data: CustomEdgeFormData) => void;
}
export default function CustomEdgeDrawerForm(props: CustomEdgeDrawerFormProps) {
  const { getEdgeFormData, setEdgeFormData } = useFlowsStore();
  const currentFormData = getEdgeFormData(props.edgeId);

  const form = useForm<CustomEdgeFormData>({
    defaultValues: structuredClone(currentFormData),
    reValidateMode: 'onChange',
    criteriaMode: 'all'
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedName = e.target.value.replace(/\s+/g, '_');
    form.setValue('name', updatedName, { shouldValidate: true });
  };

  const handleSubmitCapture = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = form.getValues();
    setEdgeFormData(data, props.edgeId);
    props.onSubmit(data);
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
